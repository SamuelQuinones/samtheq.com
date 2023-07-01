"use client";

// TODO: Throttle reset

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    process.env.NODE_ENV !== "production" && console.error(error);
  }, [error]);

  return (
    <section className="space-y-3">
      <p className="text-center text-lg">Something went wrong trying to load extra links</p>
      <p className="text-center text-lg">
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
      <hr />
      <pre className="rounded-md border border-gray-900 bg-gray-800 p-2 text-center">
        <code>In the future an error message will go here</code>
      </pre>
    </section>
  );
}
