const localhost = process.env.REACT_APP_LOCALHOST_KEY;
type Args = { id: string };

export async function deleterequest(params: Args) {
  const { id } = params;

  const res = await fetch(`${localhost}:3000/Deletecartitem/${id}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "DELETE",
  });
}
