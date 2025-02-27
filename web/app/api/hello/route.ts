import { NextResponse } from "next/server";

export type APIResponse<DataType> = {
  status: "success" | "error";
  data?: DataType;
  message?: string;
};

type Data = {
  name: string;
  height: string;
};

export async function GET(req: Request) {
  return NextResponse.json<APIResponse<Data>>({
    status: "success",
    data: {
      name: "Luke Skywalker",
      height: "172",
    },
  });
}
