const localhost = process.env.REACT_APP_LOCALHOST_KEY;

interface props {
  route: string;
}

export async function getbyid(props: props) {
  const { route } = props;

  const res = await fetch(`${localhost}:3000/${route}`, {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    } as any,
    method: "GET",
  });

  const responseToJson = res.json();

  return responseToJson;
}
