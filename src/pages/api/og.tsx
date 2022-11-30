/* eslint-disable @next/next/no-img-element */
import { format } from "@util/DateHelper";
import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const font = fetch(
  new URL("../../fonts/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const fontBold = fetch(
  new URL("../../fonts/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontData = await font;
    const fontDataBold = await fontBold;
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title");
    const date = searchParams.get("date");

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, #24243e, #302b63, #0f0c29)",
          }}
          tw="h-full w-full flex items-start justify-start"
        >
          <div tw="flex items-start justify-start h-full">
            <div tw="flex flex-col justify-between w-full h-full p-20">
              {/* Replace with your own logo */}
              <div tw="flex justify-between items-center w-full">
                <div tw="flex items-center font-normal">
                  <div tw="flex flex-col items-center justify-center bg-black rounded-full p-1">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/Logo_866.png`}
                      height="40px"
                      width="40px"
                      alt="Logo"
                    />
                  </div>
                  <p tw="text-[40px] text-white leading-none m-0 ml-2">
                    samtheq.com
                  </p>
                </div>
                <div tw="flex items-center font-normal">
                  <p tw="text-[30px] m-0 leading-none text-white text-opacity-50">
                    <svg
                      style={{
                        verticalAlign: "-.125em",
                        // height: "1em",
                        // width: "1em",
                        fill: "currentcolor",
                        marginRight: "0.5rem",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="rgba(255,255,255,0.5)"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zM2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                    </svg>{" "}
                    {date ? format(date, "MMMM Do, YYYY") : "January 1st, 1970"}
                  </p>
                </div>
              </div>
              <h1 tw="text-[60px] text-white font-bold text-left">{title}</h1>
            </div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: fontDataBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
