import Image from "next/image";

export default function LinkHeader({ lastUpdated }: { lastUpdated: string }) {
  return (
    <>
      <section className="pb-1.5">
        <Image
          src="/SamuelQuinonesHeadShot.jpeg"
          alt="Samuel Quinones Headshot"
          height={120}
          width={120}
          className="mx-auto rounded-full"
          priority
          quality={100}
        />
      </section>
      <section className="mb-4">
        <h1 className="mb-3 text-center text-2xl">Samuel Quinones' Social Links</h1>
        <p className="mb-2 text-center">
          <em className="block">Last updated: {lastUpdated}</em>
        </p>
        <p className="text-center">
          The buttons below will take you to my other social media profiles.
        </p>
      </section>
    </>
  );
}
