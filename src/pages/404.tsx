import Link from "next/link";
import { PageView } from "@util/Types";
import { useRouter } from "next/router";
import PageLayout from "@modules/Layout/Page";
import Button from "@components/Button";

const Custom404: PageView = () => {
  const router = useRouter();
  return (
    <PageLayout
      containerClasses="flex-auto flex flex-col justify-center items-center"
      title="404: This page could not be found"
    >
      <h1 className="text-center text-6xl">404</h1>
      <p className="mt-5 text-center">
        The page you requested could not be found
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
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
