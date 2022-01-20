const localhost = process.env.REACT_APP_LOCALHOST_KEY;


export async function getrequest() {

  const res = await fetch(`${localhost}:3000/`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "GET",
  });

  const responseToJson = res.json();

  return responseToJson;
}
