const localhost = process.env.REACT_APP_LOCALHOST_KEY;
type Args = { data: any };

export async function deleterequest(params: Args) {
  const { data } = params;

  const res = await fetch(`${localhost}:3000/Deletecartitem`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "DELETE",
    body: JSON.stringify(data)
  });
  console.log(data)
}

