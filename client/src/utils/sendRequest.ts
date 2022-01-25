const localhost = process.env.REACT_APP_LOCALHOST_KEY;
type Args = { route: string; data?: any; method?: "GET" | "POST" };

export async function sendRequest(params: Args) {
  const { route, data, method = "POST" } = params;

  const res = await fetch(`${localhost}:3000/${route}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method,
    ...(method === "GET" ? {} : { body: JSON.stringify(data ? data : {}) }),
  });

  const responseToJson = res.json();

  return responseToJson;
}
