import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@components/Button";
import { NextPage } from "next";
import PageLayout from "layout/Page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "@components/Tooltip";

const Custom404: NextPage = () => {
  const { back } = useRouter();
  return (
    <PageLayout
      containerClasses="flex flex-col justify-center items-center"
      title="404: Not Found"
      titleTemplate="%s"
      openGraphUrl="/404"
    >
      <h1 className="text-center text-6xl">404</h1>
      <p className="mt-5 text-center">
        The page you requested could not be found
      </p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/" passHref>
          <Button>Go to the Home Page</Button>
        </Link>
        <Button variant="secondary" onClick={() => back()}>
          Go Back
        </Button>
        <Tooltip placement="bottom" tooltipText="Open a GitHub Issue">
          <Button
            variant="blue"
            href="https://github.com/SamuelQuinones/samtheq.com/issues"
            target="_blank"
            className="flex items-center justify-center gap-1"
            rel="noopener noreferrer"
          >
            <span>Report a Problem</span>
            <FontAwesomeIcon
              height="1em"
              width="1em"
              icon={["fab", "github"]}
            />
          </Button>
        </Tooltip>
      </div>
    </PageLayout>
  );
};

export default Custom404;
