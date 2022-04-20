import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@components/Button";
import { NextPage } from "next";
import PageLayout from "layout/Page";

const Custom404: NextPage = () => {
  const router = useRouter();
  return (
    <PageLayout
      containerClasses="flex flex-col justify-center items-center"
      title="404: Not Found"
      titleTemplate="%s"
    >
      <h1 className="text-center text-6xl">404</h1>
      <p className="mt-5 text-center">
        The page you requested could not be found
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/" passHref>
          <Button>Go to the Home Page</Button>
        </Link>
        <Button variant="secondary" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </PageLayout>
  );
};

export default Custom404;
