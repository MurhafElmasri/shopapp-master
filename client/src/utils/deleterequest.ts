const localhost = process.env.REACT_APP_LOCALHOST_KEY;
type Args = { id: string, userID: string };

export async function deleterequest(params: Args) {
  const { id, userID } = params;

  const res = await fetch(`${localhost}:3000/Deletecartitem/${id}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "DELETE",
    body: JSON.stringify(userID)
  });
  console.log("hello World")
}

