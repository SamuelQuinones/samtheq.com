import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Subscribe = () => {
  return (
    <fieldset data-form="" className="-mx-2 flex flex-wrap">
      <div className="mt-3 grow-[9999] basis-64 px-2">
        <div className="group relative">
          <FontAwesomeIcon
            icon={["far", "envelope"]}
            height="1em"
            className="absolute inset-y-0 left-3 h-full w-6 text-slate-400 group-focus-within:text-sky-500"
          />
          <input
            aria-label="email address"
            placeholder="Subscribe via email"
            type="email"
            className="block w-full appearance-none rounded-md border border-transparent bg-slate-900 py-2 pr-3 pl-12 shadow ring-1 ring-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            name="blogEmail"
          />
        </div>
      </div>
      <div className="mt-3 flex grow px-2">
        <Button
          className="block flex-auto py-2 px-3 text-sm font-semibold"
          variant="blue"
        >
          Subscribe
        </Button>
      </div>
    </fieldset>
  );
};

export default Subscribe;
