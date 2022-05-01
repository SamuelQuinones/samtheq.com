import Card from "@components/Card";
import Button from "@components/Button";

const UpdateItemSkeleton = () => {
  return (
    <Card className="bg-gray-900 text-white">
      <div className="flex animate-pulse flex-col justify-between">
        <p className="mb-1">
          <span className="text-placeholder w-7/12" />{" "}
          <span className="text-placeholder w-1/3" />{" "}
          <span className="text-placeholder w-1/3" />{" "}
          <span className="text-placeholder w-1/2" />{" "}
          <span className="text-placeholder w-2/3" />
        </p>
        <div className="-m-4 mt-4 flex justify-end rounded-b-md py-2 px-4">
          <Button
            href="#"
            tabIndex={-1}
            disabled
            className="text-placeholder w-1/3 before:inline-block before:content-['']"
            aria-hidden="true"
          />
        </div>
        <p className="-m-2 mt-4 mb-1">
          <span className="text-placeholder w-1/5" />{" "}
          <span className="text-placeholder w-1/5" />
        </p>
      </div>
    </Card>
  );
};

export default UpdateItemSkeleton;
