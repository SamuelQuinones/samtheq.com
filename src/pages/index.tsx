import type { NextPage } from "next";
import PageLayout from "layout/Page";
import { motion } from "framer-motion";
import HomeUpdate from "@components/Card/HomeUpdate";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const Home: NextPage = () => {
  return (
    <PageLayout
      containerClasses="flex items-center flex-col justify-center"
      title="Home"
    >
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">
        Samuel Quinones
      </h1>
      <div className="my-12 inline-block h-52 w-52 rounded-full bg-white" />
      <p className="text-center text-base sm:text-lg md:text-xl">
        Developer | Video Editor | Internet Funny Man
      </p>
      <motion.div
        className="mt-24 mb-3 grid grid-cols-1 gap-5 md:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <HomeUpdate
          checkItOutLink="/404"
          previewText="Lorem ipsum dolor sit amet consectetur adipisicing"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus optio eligendi fuga aliquam? Repellendus, consectetur impedit neque itaque reiciendis tenetur voluptatum totam qui corrupti aspernatur, minima temporibus possimus, soluta pariatur?"
        />
        <HomeUpdate
          checkItOutLink="https://twitter.com"
          previewText="Lorem ipsum dolor sit amet consectetur"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus optio eligendi fuga aliquam? Repellendus, consectetur impedit neque itaque reiciendis tenetur voluptatum totam qui corrupti aspernatur, minima temporibus possimus, soluta pariatur?"
        />
        <HomeUpdate message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus optio eligendi fuga aliquam? Repellendus, consectetur impedit neque itaque reiciendis tenetur voluptatum totam qui corrupti aspernatur, minima temporibus possimus, soluta pariatur?" />
      </motion.div>
    </PageLayout>
  );
};

export default Home;
