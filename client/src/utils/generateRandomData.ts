import { map, range } from "lodash";

type GenerateDataArgs = {
  itemsLength: number;
};

export default async function generateRandomData(args: GenerateDataArgs) {
  const { itemsLength } = args;

  const categoriesList = [
    "Electronics",
    "Fashion",
    "Sports",
    "Home improvement",
  ];

  const descriptionLength = [300, 600, 200, 450];

  const imagesResponse = await fetch(
    "https://picsum.photos/v2/list?page=2&limit=100"
  );
  const imagesJson = await imagesResponse.json();
  const imagesUrls = map(imagesJson, (value) => {
    return value.download_url;
  });

  const result = range(itemsLength).map((index) => {
    const randomPrice = Math.floor(Math.random() * 1300);
    const randomCategory =
      categoriesList[Math.floor(Math.random() * categoriesList.length)];
    const randomTitle = randomText(10) + "  " + randomText(5);
    const randomDescription = randomText(
      descriptionLength[Math.floor(Math.random() * descriptionLength.length)]
    );

    const randomImageUrl =
      imagesUrls[Math.floor(Math.random() * imagesUrls.length)];

    return {
      title: randomTitle,
      description: randomDescription,
      price: randomPrice,
      category: randomCategory,
      image: randomImageUrl,
    };
  });

  return result;
}

function randomText(length: number) {
  let result = "";
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
