import { Fragment, useCallback, useMemo, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useFetchUpdateFeedInfinite } from "@lib/Prisma/UpdateFeed";
import Card from "@components/Card";
import Drawer from "@components/Drawer";
import Button from "@components/Button";
import UpdateItemSkeleton from "./Skeleton";
import UpdateContainer from "./Container";
import UpdateFeedItem from "./Item";

const MotionCard = m(Card);

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

/** Card That Shows When No Data is Present */
const NoDataCard = ({ message = "" }) => (
  <MotionCard
    variants={variants}
    initial="hidden"
    animate="show"
    exit="hidden"
    className="mt-24 mb-3 w-full max-w-xl bg-yellow-600 text-black"
  >
    <h3 className="mb-3 text-2xl font-bold">Unable to fetch data</h3>
    <p>Unable to fetch data to populates update cards</p>
    <p>{message}</p>
  </MotionCard>
);

/** Base Loading Skeleton */
const LoadingSkeleton = () => (
  <m.div
    variants={variants}
    initial={false}
    animate="show"
    exit="hidden"
    className="mt-16 mb-3 w-full"
  >
    <section className="mb-4 flex w-full animate-pulse items-center justify-between px-3">
      <h2 className="w-1/6 text-xl">
        <span className="text-placeholder w-full" />
      </h2>
      <Button
        variant="info"
        href="#"
        tabIndex={-1}
        disabled
        className="text-placeholder w-1/6 before:inline-block before:content-['']"
        aria-hidden="true"
      />
    </section>
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <UpdateItemSkeleton />
      <UpdateItemSkeleton />
      <UpdateItemSkeleton />
    </section>
  </m.div>
);

/** Drawer Overlay when loading more / there is an error loading more */
const ViewMoreOverLay = ({ isLoading = false, isError = false }) => (
  <AnimatePresence exitBeforeEnter initial={false}>
    {isError && (
      <m.div
        key="loading-more-error"
        variants={variants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="absolute inset-0 flex flex-col items-center justify-center bg-yellow-600/50 px-3"
      >
        <h2 className="mb-3 text-3xl font-bold text-black">
          Failed To Fetch More
        </h2>
      </m.div>
    )}
    {isLoading && (
      <m.div
        key="loading-more"
        variants={variants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="absolute inset-0 flex items-center justify-center bg-info-800/75"
      >
        <h2 className="text-3xl font-bold text-white">Loading...</h2>
      </m.div>
    )}
  </AnimatePresence>
);

const UpdateFeed = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {
    isError,
    isLoadingInitialData,
    initialUpdates,
    additionalUpdates,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
    setSize,
    mutate,
  } = useFetchUpdateFeedInfinite();

  const loadMoreError = useMemo(
    () => isError && additionalUpdates.length === 0 && !isRefreshing,
    [additionalUpdates.length, isError, isRefreshing]
  );
  const loadMoreLoad = useMemo(
    () => isLoadingMore || isRefreshing,
    [isLoadingMore, isRefreshing]
  );

  const handleViewMore = useCallback(() => {
    setDrawerOpen(true);
    if (additionalUpdates.length === 0 && !loadMoreError) {
      setSize(2);
    }
  }, [additionalUpdates.length, loadMoreError, setSize]);

  return (
    <AnimatePresence exitBeforeEnter /* initial={false} */>
      {isError && !initialUpdates && (
        <NoDataCard key="error" message={isError.message} />
      )}
      {isLoadingInitialData && <LoadingSkeleton key="loading" />}
      {initialUpdates && (
        <Fragment key="updates">
          <m.section
            variants={variants}
            initial="hidden"
            animate="show"
            className="mt-16 mb-4 flex w-full items-center justify-between px-3"
          >
            <h2 className="text-2xl">Update Feed</h2>
            <Button variant="info" onClick={handleViewMore}>
              View Previous
            </Button>
          </m.section>
          <UpdateContainer>
            {initialUpdates.map((update) => (
              <UpdateFeedItem
                key={`update-${update.ID}`}
                title={update.title}
                checkItOutLink={update.check_it_out_link}
                message={update.message}
                previewText={update.preview_text}
                feedDate={update.update_card_time}
              />
            ))}
            {/* ADDITIONAL ITEMS */}
            <Drawer
              headerClassName="z-10"
              header={
                <h1 className="text-center text-xl">Update Feed History</h1>
              }
              footerClassName="p-3 grid grid-cols-2 gap-x-2 z-10"
              footer={
                <>
                  <Button
                    variant="blue"
                    onClick={() => setSize((size) => size + 1)}
                    disabled={isLoadingMore || isReachingEnd}
                  >
                    {isLoadingMore
                      ? "loading..."
                      : isReachingEnd
                      ? "no more updates"
                      : "load more"}
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={isRefreshing}
                    onClick={() => mutate()}
                  >
                    {isRefreshing ? "refreshing..." : "refresh"}
                  </Button>
                </>
              }
              open={drawerOpen}
              handleClose={() => setDrawerOpen(false)}
            >
              {!isError && additionalUpdates.length > 0 && (
                <m.div
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-5"
                >
                  {additionalUpdates.map((update) => (
                    <UpdateFeedItem
                      key={`update-${update.ID}`}
                      title={update.title}
                      checkItOutLink={update.check_it_out_link}
                      message={update.message}
                      previewText={update.preview_text}
                      feedDate={update.update_card_time}
                    />
                  ))}
                </m.div>
              )}
              <ViewMoreOverLay
                isError={loadMoreError}
                isLoading={loadMoreLoad}
              />
            </Drawer>
            {/* ADDITIONAL ITEMS END */}
          </UpdateContainer>
        </Fragment>
      )}
    </AnimatePresence>
  );
};
export default UpdateFeed;
