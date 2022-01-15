// import dotenv from "dotenv";
// dotenv.config();

type Args = { route: string; data: any };

export async function sendRequest(params: Args) {
  const { route, data } = params;

  // console.log({ loc: process.env.LOCALHOST });

  const res = await fetch(`http://127.0.0.1:3000/${route}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "POST",
    body: JSON.stringify(data),
  });

  const responseToJson = res.json();
  return responseToJson;
}

