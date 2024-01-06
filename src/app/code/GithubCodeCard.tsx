import Button from "@/components/Button";
import type { Repository } from "@/lib/Github/types";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye, faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";

const ActionItem = ({ children, href }: { children: ReactNode; href: string }) => (
  <Button
    asChild
    className="flex size-full items-center justify-center gap-x-1 rounded-none border-0 first:rounded-bl-sm last:rounded-br-sm focus:ring-0"
  >
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  </Button>
);

export default function GithubCodeCard(props: Repository) {
  return (
    <div className="flex flex-col gap-y-3 rounded-md border-2 border-primary bg-gray-900 p-3 shadow-lg">
      <h3 className="text-lg">
        <FontAwesomeIcon icon={faGithub} height="1em" /> {props.name}
      </h3>
      <div className="flex-auto">
        <p>{props.description}</p>
      </div>
      <div className="-mx-3 -mb-3 grid grid-cols-3 items-center divide-x-2 divide-gray-900 rounded-b-md border-t border-primary">
        <ActionItem href={props.html_url + "/stargazers"}>
          <FontAwesomeIcon height="1em" icon={faStar} />{" "}
          {props.stargazers_count !== undefined &&
            props.stargazers_count > 0 &&
            props.stargazers_count}
          <span className="sr-only">View Stargazers</span>
        </ActionItem>
        <ActionItem href={props.html_url}>
          <FontAwesomeIcon height="1em" icon={faEye} /> View
          <span className="sr-only">View Repository</span>
        </ActionItem>
        <ActionItem href="">P</ActionItem>
      </div>
    </div>
  );
}
