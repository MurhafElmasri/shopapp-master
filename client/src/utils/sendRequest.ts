
const localhost = process.env.REACT_APP_LOCALHOST_KEY
type Args = { route: string; data: any };

export async function sendRequest(params: Args) {
  const { route, data } = params;


  const res = await fetch(`${localhost}:3000/${route}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "POST",
    body: JSON.stringify(data),
  })


  const responseToJson = res.json()

  return responseToJson;
}

