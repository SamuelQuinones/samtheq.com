//TODO: Add toast component for warning of error but data is present

import type { NextPage } from "next";
import Image from "next/image";
import PageLayout from "layout/Page";
import Card from "@components/Card";
import { useFetchUpdateFeed } from "@lib/Prisma/UpdateFeed";
import { AnimatePresence, m } from "framer-motion";
import UpdateContainer from "@components/UpdateFeed/Container";
import UpdateFeedItem from "@components/UpdateFeed/Item";
import UpdateItemSkeleton from "@components/UpdateFeed/Skeleton";

const MotionCard = m(Card);

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const Home: NextPage = () => {
  const { isError, isLoading, updates } = useFetchUpdateFeed();
  return (
    <PageLayout
      containerClasses="flex items-center flex-col justify-center"
      title="Home"
    >
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">
        Samuel Quinones
      </h1>
      <div className="relative my-12 inline-block h-56 w-56 rounded-full border-2">
        <Image
          src="/SamuelQuinonesHeadShot.jpeg"
          alt="Samuel Quinones Headshot"
          height={220}
          width={220}
          className="rounded-full"
          priority
        />
      </div>
      <p className="text-center text-base sm:text-lg md:text-xl">
        Developer | Video Editor | Internet Funny Man
      </p>
      <AnimatePresence exitBeforeEnter /* initial={false} */>
        {isError && !updates && (
          <MotionCard
            key="error"
            variants={variants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-24 mb-3 w-full max-w-xl bg-yellow-600 text-black"
          >
            <h3 className="mb-3 text-2xl font-bold">Unable to fetch data</h3>
            <p>Unable to fetch data to populates update cards</p>
            <p>{isError.message}</p>
          </MotionCard>
        )}
        {isLoading && (
          <m.div
            key="loading"
            variants={variants}
            initial={false}
            animate="show"
            exit="hidden"
            className="mt-24 mb-3 grid w-full grid-cols-1 gap-5 md:grid-cols-3"
          >
            <UpdateItemSkeleton />
            <UpdateItemSkeleton />
            <UpdateItemSkeleton />
          </m.div>
        )}
        {updates && (
          <UpdateContainer>
            {updates.map((update) => (
              <UpdateFeedItem
                // key={`${index}-${update.ID}`} //* all cards will slide up together on revalidate with new info
                key={`update-${update.ID}`} //* only newest card will animate on revalidate
                title={update.title}
                checkItOutLink={update.check_it_out_link}
                message={update.message}
                previewText={update.preview_text}
                feedDate={update.update_card_time}
              />
            ))}
          </UpdateContainer>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Home;
