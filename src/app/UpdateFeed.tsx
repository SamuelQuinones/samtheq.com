"use client";

import { useState, useCallback, useRef, Fragment, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import * as Portal from "@radix-ui/react-portal";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, m } from "framer-motion";
import { format } from "date-fns";
import Button from "@/components/Button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogContentSheet,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { useBreakpoints, useIsomorphicLayoutEffect } from "@/hooks";
import { getUpdates } from "./update-feed-action";

const UPDATE_FEED_HOME_AMOUNT = 3;

//#region UpdateFeedItem
interface UpdateItemProps {
  title: string;
  message: string;
  link?: string | null;
  feedDate: string;
}

const cardVariants = { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 } };

export function UpdateFeedItem({ title, message, link, feedDate }: UpdateItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(true);
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
      className="flex flex-col rounded-md border border-background-lighter-10 bg-black p-4 shadow-md shadow-white/10"
    >
      <section>
        <h4 className="mb-2 line-clamp-1 text-xl italic">{title}</h4>
      </section>
      <section ref={ref} className="peer mb-6 mt-4 grow">
        <p className="line-clamp-2">{message}</p>
      </section>
      <section className="flex justify-end gap-2 peer-[&:not(.is-truncated)]:[&_>_:first-child]:invisible">
        <Dialog>
          <DialogContent>
            <DialogBody>{message}</DialogBody>
          </DialogContent>
          <DialogTrigger asChild>
            <Button disabled={disabled} className="overflow-hidden text-ellipsis whitespace-nowrap">
              Read More
            </Button>
          </DialogTrigger>
        </Dialog>
        {link && (
          <Button
            asChild
            variant="secondary" /* TODO: Make this outline */
            className="overflow-hidden text-ellipsis whitespace-nowrap"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              Check it Out
            </a>
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

function UpdateFeedSkeleton() {
  return (
    <div key="loading-initial-updates" className="mb-3 mt-16 w-full">
      <section className="mb-4 flex w-full animate-pulse items-center justify-between px-3">
        <h2 className="w-1/6 text-xl">
          <span className="inline-block min-h-[1em] w-full cursor-wait bg-current align-middle opacity-50" />
        </h2>
        <Button
          variant="accent"
          tabIndex={-1}
          disabled
          className="min-h-[1em] w-1/6 cursor-wait align-middle opacity-50 before:inline-block before:content-['']"
          aria-hidden="true"
        />
      </section>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[...Array(UPDATE_FEED_HOME_AMOUNT)].map((_, i) => (
          <div
            key={i}
            className="rounded-md border border-background-lighter-10 bg-black p-4 shadow-md"
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
                <Button
                  tabIndex={-1}
                  disabled
                  className="min-h-[1em] w-1/3 cursor-wait align-middle opacity-50 before:inline-block before:content-['']"
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
  );
}

export default function UpdateFeedContainer() {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const {
    data,
    status,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["updates"],
    queryFn: async ({ pageParam }) => {
      const res = await getUpdates(pageParam);
      if (!res.ok) throw new Error(res.error);
      return res;
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const total = useMemo(() => data?.pages[0].total ?? 0, [data]);

  const handleViewMore = useCallback(() => {
    if (data && data?.pages.length <= 1 && status !== "error" && !isFetching) {
      void fetchNextPage();
    }
  }, [data, fetchNextPage, isFetching, status]);

  return (
    <>
      {/* Main Three Cards */}
      <AnimatePresence mode="wait">
        {status === "error" && !data?.pages && (
          <m.div
            key="initial-error"
            variants={opacityVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-3 mt-24 flex w-full max-w-xl flex-col rounded-md border border-yellow-400 border-opacity-60 bg-yellow-950 p-4 text-yellow-400 shadow-md"
          >
            <h3 className="mb-3 text-2xl font-bold">Unable to fetch data</h3>
            <p>Unable to fetch data to populates update cards</p>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-md bg-yellow-900 p-2">
              <code>{error.message}</code>
            </pre>
          </m.div>
        )}
        {status === "pending" && isFetching && <UpdateFeedSkeleton />}
        {data?.pages[0].updates && (
          <Fragment key="initial-updates">
            <m.section
              variants={opacityVariants}
              initial="hidden"
              animate="show"
              className="mb-4 mt-16 flex w-full items-center justify-between px-3"
            >
              <h2 className="text-2xl">Update Feed</h2>
              <div className="contents" ref={setRef} />
            </m.section>
            <m.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="mb-3 grid gap-5 md:grid-cols-3"
            >
              {data.pages[0].updates.map((update) => (
                <UpdateFeedItem
                  key={`update-${update.ID}`}
                  title={update.title}
                  link={update.check_it_out_link}
                  message={update.message}
                  feedDate={format(update.update_card_time, "MMMM do, yyyy")}
                />
              ))}
            </m.div>
          </Fragment>
        )}
      </AnimatePresence>
      {/* Feed History */}
      <Dialog>
        <DialogContentSheet side="left">
          <DialogHeader>
            <DialogTitle>Update Feed History</DialogTitle>
          </DialogHeader>
          <DialogBody className="py-6">
            {status === "success" && data.pages.length > 1 && (
              <m.div initial="hidden" animate="show" className="grid grid-cols-1 gap-5">
                {data.pages.map((page, i) => {
                  if (i === 0) return null;
                  return page.updates.map((update) => (
                    <UpdateFeedItem
                      key={`update-${update.ID}`}
                      title={update.title}
                      link={update.check_it_out_link}
                      message={update.message}
                      feedDate={format(update.update_card_time, "MMMM do, yyyy")}
                    />
                  ));
                })}
              </m.div>
            )}
            <AnimatePresence mode="wait" initial={false}>
              {status === "error" && !isFetching && (
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
              {isFetching && (
                <m.div
                  key="loading-more"
                  variants={opacityVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="absolute inset-0 flex items-center justify-center bg-background/75"
                >
                  <h2 className="text-3xl font-bold">Loading...</h2>
                </m.div>
              )}
            </AnimatePresence>
          </DialogBody>
          <DialogFooter className="grid grid-cols-2 gap-x-2">
            <Button
              variant="secondary"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? "loading..." : hasNextPage ? "load more" : "no more updates"}
            </Button>
            <Button disabled={isFetching} onClick={() => refetch()}>
              {isFetching ? "refreshing..." : "refresh"}
            </Button>
          </DialogFooter>
        </DialogContentSheet>
        <Portal.Root container={ref}>
          <DialogTrigger asChild>
            <Button
              className="relative flex items-center gap-x-1.5"
              variant="accent"
              onClick={handleViewMore}
            >
              <span>View History</span>
              <FontAwesomeIcon height="16" icon={faClockRotateLeft} />
              {total - UPDATE_FEED_HOME_AMOUNT > 0 && (
                <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-rose-600 px-2 py-1 text-xs/none font-bold text-white">
                  {total - UPDATE_FEED_HOME_AMOUNT}
                  <span className="sr-only">Additional updates</span>
                </span>
              )}
            </Button>
          </DialogTrigger>
        </Portal.Root>
      </Dialog>
    </>
  );
}
//#endregion UpdateFeedContainer
