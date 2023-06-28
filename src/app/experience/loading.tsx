import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ExperienceLoading() {
  return (
    <>
      <div className="my-3 text-center text-lg">
        <p className="italic">Loading...</p>
      </div>
      <div className="mt-8 flex grow flex-col items-center justify-center gap-10">
        <h3 className="text-lg md:text-2xl">Loading Timeline items</h3>
        <FontAwesomeIcon height="1em" size="8x" icon={faRotate} spin />
        <h3 className="text-lg md:text-2xl">Please wait</h3>
      </div>
    </>
  );
}
