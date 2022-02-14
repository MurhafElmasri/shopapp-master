const localhost = process.env.REACT_APP_LOCALHOST_KEY;


export async function deleteall() {


  const res = await fetch(`${localhost}:3000/delete-all-products`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "DELETE",
  });
}