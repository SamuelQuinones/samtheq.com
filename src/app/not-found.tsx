import Button from "@/components/Button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Tooltip";
// import Tooltip from "@/components/Tooltip";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

// July 21st 2023, Metadata now works in not-found files, but only if rendered on the server
export const metadata = {
  title: "404: Not Found",
};

export default function Notfound() {
  return (
    <main
      id="stq-page-content"
      className="bs-container-md mt-16 flex w-full grow scroll-mt-16 flex-col items-center justify-center"
    >
      <Image src="/Logo_866.png" alt="Large site logo" height={220} width={220} />
      <h1 className="text-center text-7xl font-semibold">404</h1>
      <p className="mt-5 text-center">The page you requested could not be found</p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Button asChild>
          <Link href="/">Go to the Home Page</Link>
        </Button>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant="secondary"
                className="flex items-center justify-center gap-1"
              >
                <a
                  href="https://github.com/SamuelQuinones/samtheq.com/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Report a Problem</span>
                  <FontAwesomeIcon height="1em" width="1em" icon={faGithub} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <span>Open a GitHub Issue</span>
              <TooltipArrow height={5} width={10} className="fill-primary" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <Tooltip placement="bottom" tooltipText="Open a GitHub Issue">

        </Tooltip> */}
      </div>
    </main>
  );
}
