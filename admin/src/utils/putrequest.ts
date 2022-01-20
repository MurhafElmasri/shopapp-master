const localhost = process.env.REACT_APP_LOCALHOST_KEY
type Args = {  id: string; data: any };

export async function putrequest(params: Args) {
  const { id, data } = params;


  const res = await fetch(`${localhost}:3000/Editproduct/${id}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "PUT",
    body: JSON.stringify(data)
  })

}