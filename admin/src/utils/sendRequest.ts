const localhost = process.env.REACT_APP_LOCALHOST_KEY;
type Args = { data: any };

export async function sendRequest(params: Args) {
  const { data } = params;

  const res = await fetch(`${localhost}:3000/Addproduct`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "POST",
    body: JSON.stringify(data),
  });

  console.log(data);
  const responseToJson = res.json();

  return responseToJson;
}
