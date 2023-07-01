"use client";

// TODO: Throttle reset

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    process.env.NODE_ENV !== "production" && console.error(error);
  }, [error]);

  return (
    <div className="my-10 space-y-4">
      <section className="space-y-4 text-xl md:text-center">
        <p>Something went wrong when trying to retrieve information</p>
        <p>Said information is still available in my aforementioned resume</p>
        <p>
          Please{" "}
          <button className="text-blue-500 hocus:text-blue-700" onClick={() => reset()}>
            try again
          </button>{" "}
          or{" "}
          <a
            className="text-blue-500 hocus:text-blue-700"
            href="https://github.com/SamuelQuinones/samtheq.com/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            open a github issue
          </a>
        </p>
      </section>
      <hr />
      <pre className="rounded-md border border-gray-900 bg-gray-800 p-2 text-center">
        <code>In the future an error message will go here</code>
      </pre>
    </div>
  );
}
