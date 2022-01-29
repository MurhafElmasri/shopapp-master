const localhost = process.env.REACT_APP_LOCALHOST_KEY;
type Args = { data: any };

export async function putrequest(params: Args) {
  const { data } = params;

  const res = await fetch(`${localhost}:3000/Editcartitem`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "PUT",
    body: JSON.stringify(data),
  });
  console.log(data);
}
