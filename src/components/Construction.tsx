import { FC } from "react";
import Button from "./Button";

// type ConstructionProps = {
//   sourceFile
// }

const UnderConstruction: FC<{ sourceFile?: string }> = ({ sourceFile }) => {
  return (
    <div className="text-center text-yellow-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="currentColor"
        className="inline-block w-40 h-40"
        viewBox="0 0 16 16"
        style={{
          verticalAlign: "-.125em",
          filter: "drop-shadow(0px 0px 20px rgb(0 0 0 / 0.8))",
        }}
      >
        <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z" />
      </svg>
      <h1
        style={{
          filter: "drop-shadow(0px 0px 10px rgb(0 0 0 / 0.8))",
        }}
      >
        Under Contstruction
      </h1>
      {sourceFile && (
        <div>
          <Button
            className="m-1"
            href={sourceFile}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
          </Button>
          <Button className="m-1" variant="secondary">
            Hi
          </Button>
        </div>
      )}
    </div>
  );
};

export default UnderConstruction;
