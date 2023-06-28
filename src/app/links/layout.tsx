import Image from "next/image";

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="stq-page-content"
      className="bs-container-md mt-16 w-full max-w-2xl grow scroll-mt-16"
    >
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
      {children}
    </main>
  );
}
