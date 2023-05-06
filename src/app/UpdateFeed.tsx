"use client";

import Button from "@/components/Button";
import Drawer from "@/components/Drawer";
import Modal from "@/components/Modal";
import { useBreakpoints, useIsomorphicLayoutEffect } from "@/hooks";
import { fetcherGET } from "@/lib/SWR/fetcher";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { UpdateFeed } from "@prisma/client";
import { format } from "date-fns";
import { AnimatePresence, m } from "framer-motion";
import { useState, useCallback, useRef, useContext, createContext, useMemo, Fragment } from "react";
import useSWRInfinite from "swr/infinite";

//#region FetchData
type Updates = Omit<
  UpdateFeed,
  | "preview_text"
  | "check_it_out_link"
  | "inactive_timestamp"
  | "active"
  | "preview_text"
  | "update_card_time"
> & {
  preview_text?: string;
  check_it_out_link?: string;
  update_card_time: string;
};

interface UpdateFeedResponse {
  nextCursor?: number;
  count: number;
  total: number;
  updates: Updates[];
}

function getKey(index: number, previousPageData: UpdateFeedResponse | null) {
  // reached the end
  if (previousPageData && !previousPageData.nextCursor) return null;
  // first page, we don't have `previousPageData`
  if (index === 0) return "/api/update-feed";
  // add the cursor to the API endpoint
  return `/api/update-feed?limit=10&cursor=${previousPageData?.nextCursor}`;
}

function useUpdateFeed<E = { message: string }>() {
  const { data, error, setSize, mutate, isValidating, isLoading, size } = useSWRInfinite<
    UpdateFeedResponse,
    E
  >(getKey, fetcherGET);
  const isEmpty = data?.[0].updates.length === 0;
  const isRefreshing = isValidating && data && data.length === size;

  return {
    mutate,
    setSize,
    total: data?.[0]?.total || 0,
    isRefreshing,
    isReachingEnd: isEmpty || (data && !data[data.length - 1]?.nextCursor),
    isLoadingInitialData: !data && !error && isLoading,
    isLoadingMore: isLoading || (size > 0 && data && typeof data[size - 1] === "undefined"),
    initialUpdates: data?.[0]?.updates,
    additionalUpdates:
      data
        ?.slice(1)
        ?.map(({ updates }) => updates)
        .flat() ?? [],
    isError: error,
  };
}
//#endregion FetchData

//#region Updatecontext
interface UpdateContextValue {
  prepareMessage: (msg: string) => void;
}

const UpdateContext = createContext<UpdateContextValue | null>(null);

const useUpdateCard = () => {
  const context = useContext(UpdateContext);
  if (!context && process.env.NODE_ENV === "development") {
    throw Error("Please make sure this component is contained within the Update Feed Container");
  } else {
    return context as UpdateContextValue;
  }
};
//#endregion UpdateContext

//#region UpdateFeedItem
interface UpdateItemProps {
  title: string;
  message: string;
  link?: string;
  feedDate: string;
}

const cardVariants = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } };

export function UpdateFeedItem({ title, message, link, feedDate }: UpdateItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(true);
  const { prepareMessage } = useUpdateCard();
  const { isExtraSmall, isSmall, isMedium, isLarge, isExtraLarge, isDoubleExtraLarge } =
    useBreakpoints();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const child = el.firstElementChild as HTMLElement;
    if (child.offsetHeight < child.scrollHeight || child.offsetWidth < child.scrollWidth) {
      el.classList.add("is-truncated");
      setDisabled(false);
    } else {
      el.classList.remove("is-truncated");
      setDisabled(true);
    }
  }, [isExtraSmall, isSmall, isMedium, isLarge, isExtraLarge, isDoubleExtraLarge]);

  return (
    <m.div
      variants={cardVariants}
      className="flex flex-col rounded-md border border-black border-opacity-5 bg-gray-900 p-4 text-white shadow-md"
    >
      <section>
        <h4 className="mb-2 line-clamp-1 text-xl italic">{title}</h4>
      </section>
      <section ref={ref} className="peer mb-6 mt-4 grow">
        <p className="line-clamp-2">{message}</p>
      </section>
      <section className="flex justify-end gap-2 peer-[&:not(.is-truncated)]:[&_>_:first-child]:invisible">
        <Button disabled={disabled} onClick={() => prepareMessage(message)}>
          Read More
        </Button>
        {link && (
          <Button href={link} outline target="_blank" rel="noopener noreferrer" variant="secondary">
            Check it Out
          </Button>
        )}
      </section>
      <section className="-m-2 mt-3">{feedDate}</section>
    </m.div>
  );
}
//#endregion UpdateFeedItem

//#region UpdateFeedContainer
const opacityVariants = { hidden: { opacity: 0 }, show: { opacity: 1 } };

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.5 } },
};

export default function UpdateFeedContainer() {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    setSize,
    mutate,
    total,
    isError,
    initialUpdates,
    additionalUpdates,
    isRefreshing,
    isReachingEnd,
    isLoadingInitialData,
    isLoadingMore,
  } = useUpdateFeed();

  const prepareMessage = useCallback((msg: string) => {
    setMessage(msg);
    setShowModal(true);
  }, []);

  const updateValue = useMemo(() => ({ prepareMessage }), [prepareMessage]);

  //? Does this need to be memozied?
  const loadMoreError = useMemo(
    () => isError && additionalUpdates.length === 0 && !isRefreshing,
    [additionalUpdates.length, isError, isRefreshing]
  );
  //? Does this need to be memozied?
  const loadMoreLoad = useMemo(() => isLoadingMore || isRefreshing, [isLoadingMore, isRefreshing]);

  const handleViewMore = useCallback(() => {
    setDrawerOpen(true);
    if (additionalUpdates.length === 0 && !loadMoreError) setSize(2);
  }, [additionalUpdates.length, loadMoreError, setSize]);

  return (
    <UpdateContext.Provider value={updateValue}>
      <Modal
        open={showModal}
        handleClose={() => setShowModal(false)}
        footer={<Button onClick={() => setShowModal(false)}>Close</Button>}
        footerClassName="p-2 text-right"
      >
        {message}
      </Modal>
      {/* Main Three Cards */}
      <AnimatePresence mode="wait">
        {isError && !initialUpdates && (
          <m.div
            key="initial-error"
            variants={opacityVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-3 mt-24 flex w-full max-w-xl flex-col rounded-md border border-black border-opacity-5 bg-yellow-600 p-4 text-black shadow-md"
          >
            <h3 className="mb-3 text-2xl font-bold">Unable to fetch data</h3>
            <p>Unable to fetch data to populates update cards</p>
            <p>{isError.message}</p>
          </m.div>
        )}
        {isLoadingInitialData && (
          <div key="loading-initial-updates" className="mb-3 mt-16 w-full">
            <section className="mb-4 flex w-full animate-pulse items-center justify-between px-3">
              <h2 className="w-1/6 text-xl">
                <span className="inline-block min-h-[1em] w-full cursor-wait bg-current align-middle opacity-50" />
              </h2>
              <button
                tabIndex={-1}
                disabled
                className="btn btn-info inline-block min-h-[1em] w-1/6 cursor-wait bg-current align-middle opacity-50 before:inline-block before:content-['']"
                aria-hidden="true"
              />
            </section>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-md border border-black border-opacity-5 bg-gray-900 p-4 text-white shadow-md"
                >
                  <div className="flex animate-pulse flex-col justify-between">
                    <h4 className="mb-2">
                      <span className="inline-block min-h-[1em] w-1/2 cursor-wait bg-current align-middle opacity-50" />
                    </h4>
                    <p className="line-clamp-2">
                      <span className="inline-block min-h-[1em] w-7/12 cursor-wait bg-current align-middle opacity-50" />{" "}
                      <span className="inline-block min-h-[1em] w-1/3 cursor-wait bg-current align-middle opacity-50" />{" "}
                      <span className="inline-block min-h-[1em] w-1/4 cursor-wait bg-current align-middle opacity-50" />{" "}
                      <span className="inline-block min-h-[1em] w-1/4 cursor-wait bg-current align-middle opacity-50" />{" "}
                      <span className="inline-block min-h-[1em] w-1/3 cursor-wait bg-current align-middle opacity-50" />
                    </p>
                    <div className="-m-4 mt-4 flex justify-end rounded-b-md px-4 py-2">
                      <button
                        tabIndex={-1}
                        disabled
                        className="btn btn-primary inline-block min-h-[1em] w-1/3 cursor-wait bg-current align-middle opacity-50 before:inline-block before:content-['']"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="-m-2 mb-1 mt-4">
                      <span className="inline-block min-h-[1em] w-1/5 cursor-wait bg-current align-middle opacity-50" />{" "}
                      <span className="inline-block min-h-[1em] w-1/5 cursor-wait bg-current align-middle opacity-50" />
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
        {initialUpdates && (
          <Fragment key="initial-updates">
            <m.section
              variants={opacityVariants}
              initial="hidden"
              animate="show"
              className="mb-4 mt-16 flex w-full items-center justify-between px-3"
            >
              <h2 className="text-2xl">Update Feed</h2>
              <Button
                className="relative flex items-center gap-x-1.5"
                variant="info"
                onClick={handleViewMore}
              >
                <span>View History</span>
                <FontAwesomeIcon height="16" icon={faClockRotateLeft} />
                {total - 3 > 0 && (
                  <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-primary-600 px-2 py-1 text-xs/none font-bold">
                    {total - 3} <span className="sr-only">Additional updates</span>
                  </span>
                )}
              </Button>
            </m.section>
            <m.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mb-3 grid gap-5 md:grid-cols-3"
            >
              {initialUpdates.map((update) => (
                <UpdateFeedItem
                  key={`update-${update.ID}`}
                  title={update.title}
                  link={update.check_it_out_link}
                  message={update.message}
                  feedDate={format(new Date(update.update_card_time), "MMMM do, yyyy")}
                />
              ))}
            </m.div>
          </Fragment>
        )}
      </AnimatePresence>
      {/* Feed History */}
      <Drawer
        headerClassName="z-10"
        header={<h1 className="max text-center text-xl">Update Feed History</h1>}
        footerClassName="p-3 grid grid-cols-2 gap-x-2 z-10"
        footer={
          <>
            <Button
              variant="blue"
              onClick={() => setSize((size) => size + 1)}
              disabled={isLoadingMore || isReachingEnd}
            >
              {isLoadingMore ? "loading..." : isReachingEnd ? "no more updates" : "load more"}
            </Button>
            <Button variant="secondary" disabled={isRefreshing} onClick={() => mutate()}>
              {isRefreshing ? "refreshing..." : "refresh"}
            </Button>
          </>
        }
        open={drawerOpen}
        handleClose={() => setDrawerOpen(false)}
      >
        {!isError && additionalUpdates.length > 0 && (
          <m.div initial="hidden" animate="show" className="grid grid-cols-1 gap-5">
            {additionalUpdates.map((update) => (
              <UpdateFeedItem
                key={`update-${update.ID}`}
                title={update.title}
                link={update.check_it_out_link}
                message={update.message}
                feedDate={format(new Date(update.update_card_time), "MMMM do, yyyy")}
              />
            ))}
          </m.div>
        )}
        <AnimatePresence mode="wait" initial={false}>
          {loadMoreError && (
            <m.div
              key="loading-more-error"
              variants={opacityVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="absolute inset-0 flex flex-col items-center justify-center bg-yellow-600/50 px-3"
            >
              <h2 className="mb-3 text-3xl font-bold text-black">Failed To Fetch More</h2>
            </m.div>
          )}
          {loadMoreLoad && (
            <m.div
              key="loading-more"
              variants={opacityVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="absolute inset-0 flex items-center justify-center bg-info-800/75"
            >
              <h2 className="text-3xl font-bold text-white">Loading...</h2>
            </m.div>
          )}
        </AnimatePresence>
      </Drawer>
    </UpdateContext.Provider>
  );
}
//#endregion UpdateFeedContainer
