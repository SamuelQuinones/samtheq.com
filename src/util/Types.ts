import { NextPage } from "next";

export type OBJ = Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type PageView<T = {}> = NextPage<T> & {};
