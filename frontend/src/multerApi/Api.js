import axios from "axios";
export const getMultipleFiles = async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (error) {
    throw error;
  }
};
export const multipleFilesUpload = async (data) => {
  console.log("dataupload", data);
  const datas = {
    user: "61765a978ad5752627b851b5",
    category: "rifle",
    subcategory: "rifle",
    brand: "light-gun",
    productInfo: {
      info: {
        name: "akm",
        values1: ["hello", "boy"],
        values2: ["hello", "boy"],
      },
      title: "hey",
      price: 152,
      shortdescription: "des",
      longdescription: "crip",
      countInStock: 50,
    },
    files: data,
  };
  try {
    await axios.post("/api/products", datas);
  } catch (error) {
    throw error;
  }
};
