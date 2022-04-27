import Card from "@components/Card";
import Button from "@components/Button";

const UpdateItemSkeleton = () => {
  return (
    <Card className="bg-gray-900 text-white">
      <div className="flex animate-pulse flex-col justify-between">
        <p>
          <span className="text-placeholder mb-1 w-[58%]" />{" "}
          <span className="text-placeholder mb-1 w-[33%]" />{" "}
          <span className="text-placeholder mb-1 w-[33%]" />{" "}
          <span className="text-placeholder mb-1 w-[50%]" />{" "}
          <span className="text-placeholder mb-1 w-[66%]" />
        </p>
        <div className="-m-4 mt-4 flex justify-end rounded-b-md py-2 px-4">
          <Button
            href="#"
            tabIndex={-1}
            disabled
            className="text-placeholder w-[40%] before:inline-block before:content-['']"
            aria-hidden="true"
          />
        </div>
        <p className="-m-2 mt-4">
          <span className="text-placeholder mb-1 w-[20%]" />{" "}
          <span className="text-placeholder mb-1 w-[20%]" />
        </p>
      </div>
    </Card>
  );
};

export default UpdateItemSkeleton;
