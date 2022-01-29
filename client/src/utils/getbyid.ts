const localhost = process.env.REACT_APP_LOCALHOST_KEY;

interface props {
  id: string;
}

export async function getbyid(props: props) {
  const { id } = props;

  const res = await fetch(`${localhost}:3000/getcartitemById/${id}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "GET",
  });

  const responseToJson = res.json();

  return responseToJson;
}
