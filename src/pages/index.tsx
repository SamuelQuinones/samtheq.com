import type { NextPage } from "next";
import PageLayout from "layout/Page";
import Card from "@components/Card";
import { useFetchHomeUpdate } from "@util/Prisma/HomeUpdate";
import { AnimatePresence, motion } from "framer-motion";
import UpdateContainer from "@components/HomeUpdate/Container";
import HomeUpdateItem from "@components/HomeUpdate/Item";

const MotionCard = motion(Card);

const variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const DummyToast = ({ shouldShow = false }) => (
  <AnimatePresence>
    {shouldShow && (
      <MotionCard
        variants={variants}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="fixed right-1 top-16 z-[999999] bg-yellow-600 p-3 text-black shadow-md"
      >
        Unable to fetch new data for updates
      </MotionCard>
    )}
  </AnimatePresence>
);

const Home: NextPage = () => {
  const { isError, isLoading, updates } = useFetchHomeUpdate();
  return (
    <PageLayout
      containerClasses="flex items-center flex-col justify-center"
      title="Home"
    >
      <DummyToast shouldShow={!!(isError && updates)} />
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">
        Samuel Quinones
      </h1>
      <div className="my-12 inline-block h-52 w-52 rounded-full bg-white" />
      <p className="text-center text-base sm:text-lg md:text-xl">
        Developer | Video Editor | Internet Funny Man
      </p>
      <AnimatePresence exitBeforeEnter initial={false}>
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
          <motion.p
            key="loading"
            variants={variants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mt-24 mb-3"
          >
            Loading...
          </motion.p>
        )}
        {updates && (
          <UpdateContainer>
            {updates.map((update, index) => (
              <HomeUpdateItem
                key={`${index}-${update.ID}`}
                checkItOutLink={update.check_it_out_link}
                message={update.message}
                previewText={update.preview_text}
              />
            ))}
          </UpdateContainer>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Home;
