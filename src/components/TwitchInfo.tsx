import Card from "./Card";
import Tooltip from "./Tooltip";
import { useFetchTwitchInfo } from "@lib/Twitch";

const TwitchInfo = () => {
  const { isError, isLoading, data } = useFetchTwitchInfo();

  // return (
  //   <Card className="flex w-full max-w-xs items-center gap-x-2 p-1">
  //     <div className="text-placeholder mr-2 h-10 w-10 rounded-full" />
  //     <div className="flex-grow">
  //       <span className="mb-0.5 mr-2 flex justify-between sm:flex-row">
  //         <p>CorporalSaturn</p>
  //         <div className="flex items-center gap-x-1">
  //           <span className="h-3 w-3 rounded-full bg-green-600" />
  //           <p>Online</p>
  //         </div>
  //       </span>
  //       <span className="mb-0.5 mr-2 flex justify-between sm:flex-row">
  //         <Tooltip placement="bottom" tooltipText="Game Title" flip>
  //           <p className="text-sm">Game Title</p>
  //         </Tooltip>
  //         <div className="flex items-center gap-x-1">
  //           <span className="text-sm">💁‍♂️</span>
  //           <p className="text-sm">100</p>
  //         </div>
  //       </span>
  //     </div>
  //   </Card>
  // );

  if (isLoading) {
    return (
      <Card className="w-full max-w-xs p-1">
        <div className="flex animate-pulse gap-x-2">
          <div className="text-placeholder w-9 rounded-full" />
          <div className="flex-grow">
            <p className="mb-0.5 text-xs">
              <span className="text-placeholder w-10/12" />{" "}
              <span className="text-placeholder w-1/12" />
            </p>
            <p className="mb-0.5 text-xs">
              <span className="text-placeholder w-1/5" />{" "}
              <span className="text-placeholder w-3/5" />
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (isError && !data) {
    return (
      <Card className="flex w-full max-w-xs gap-x-2 p-1">
        <div className="text-placeholder mr-2 w-10 rounded-full" />
        <div className="flex-grow">
          <span className="mb-0.5 mr-3 flex justify-between sm:flex-row">
            <p className="text-sm">CorporalSaturn</p>
            <p className="text-sm">Unkown</p>
          </span>
          <p className="mb-0.5 text-xs">Somehing went wrong</p>
        </div>
      </Card>
    );
  }

  if (!data?.online) {
    return (
      <Card className="flex w-full max-w-xs items-center gap-x-2 p-1">
        <div className="text-placeholder mr-2 h-10 w-10 rounded-full" />
        <div className="flex-grow">
          <span className="mb-0.5 mr-2 flex justify-between sm:flex-row">
            <p>CorporalSaturn</p>
            <div className="flex items-center gap-x-1">
              <span className="inline-block h-3 w-3 rounded-full bg-primary-600" />
              <p>Offline</p>
            </div>
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex w-full max-w-xs items-center gap-x-2 p-1">
      <div className="text-placeholder mr-2 h-10 w-10 rounded-full" />
      <div className="flex-grow">
        <span className="mb-0.5 mr-2 flex justify-between sm:flex-row">
          <p>{data.user_name}</p>
          <div className="flex items-center gap-x-1">
            <span className="h-3 w-3 rounded-full bg-green-600" />
            <p>Online</p>
          </div>
        </span>
        <span className="mb-0.5 mr-2 flex justify-between sm:flex-row">
          <Tooltip
            placement="bottom"
            tooltipText={data.game_name}
            flip
            rootClose
          >
            <a href="#" className="block text-sm">
              {data.game_name}
            </a>
          </Tooltip>
          <div className="flex items-center gap-x-1">
            <span className="text-sm">💁‍♂️</span>
            <p className="text-sm">{data.viewer_count}</p>
          </div>
        </span>
      </div>
    </Card>
  );
};

export default TwitchInfo;
