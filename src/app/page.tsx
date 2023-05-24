import Image from "next/image";
import UpdateFeedContainer from "./UpdateFeed";

export const metadata = {
  title: "Home | SamTheQ", //* Currently layout templates wont work on same level page files
};

export default function Home() {
  return (
    <main
      id="stq-page-content"
      className="bs-container-lg mt-16 flex w-full grow scroll-mt-16 flex-col items-center justify-center"
    >
      <h1 className="text-center text-3xl sm:text-4xl md:text-6xl">Samuel Quinones</h1>
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
      <UpdateFeedContainer />
    </main>
  );
}
