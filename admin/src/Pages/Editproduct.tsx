import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getbyid } from "../utils/getbyid";
import { putrequest } from "../utils/putrequest";


const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
export type CartItemType = {
  _id: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  category: string;
};

const Editproduct = () => {
  const params = useParams() as { id: string };

  const [oldTitle, setTitle] = useState("title");
  const [oldImage, setImage] = useState("");
  const [oldDescription, setDescription] = useState("");
  const [oldPrice, setPrice] = useState("");
  const [oldCategory, setCategory] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
      price: "",
      category: ""
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  useEffect(() => {
    const LoadOldValue = async () => {
      const response = await getbyid({
        id: params.id,
      });
      setTitle(response.productData.title);
      setImage(response.productData.image);
      setDescription(response.productData.description);
      setPrice(response.productData.price);
      setCategory(response.productData.category);  
      // console.log(response.productData.title)
      // setProduct(response.data);
    };
    LoadOldValue();

    // (async() => {})();
  }, [params.id]);
  

  const navigate = useNavigate();
  const classes = useStyles();

  const navigator = () => {
    navigate("/");
  };

  const verify = async () => {
    const response = await putrequest({
      data: {
        title: formik.values.title,
        image: formik.values.image,
        description: formik.values.description,
        price: formik.values.price,
        category: formik.values.category
      },
      id: params.id,
    });
  };
  
  return (
    <div className="productinfo">
      <div className="form">
        <TextField
          className={classes.field}
          onChange={formik.handleChange}
          label="Title"
          variant="outlined"
          color="secondary"
          defaultValue={oldTitle}
          value={formik.values.title}
          required
        />
        <TextField
          className={classes.field}
          onChange={formik.handleChange}
          label="Image URL"
          variant="outlined"
          color="secondary"
          defaultValue={oldImage}
          fullWidth
          value={formik.values.image}
          required
        />
        <TextField
          className={classes.field}
          onChange={formik.handleChange}
          label="Description"
          variant="outlined"
          color="secondary"
          defaultValue={oldDescription}
          fullWidth
          value={formik.values.description}
          required
        />
        <TextField
          className={classes.field}
          onChange={formik.handleChange}
          label="Price"
          variant="outlined"
          color="secondary"
          defaultValue={oldPrice}
          fullWidth
          required
          value={formik.values.price}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Category
            </InputLabel>
            <NativeSelect
              onChange={formik.handleChange}
              defaultValue={oldCategory}
              value={formik.values.category}
            >
              <option value="Electronics"> Electronics </option>
              <option value="Fashion"> Fashion </option>
              <option value="Sports"> Sports </option>
              <option value="Home improvement"> Home improvement </option>
            </NativeSelect>
          </FormControl>
        </Box>
        <div className="actions">
          <button
            onClick={() => {
              if (formik.values.title === "") {
                alert("some inputs is empty");
              } else {
                if (formik.values.image === "") {
                  alert("some inputs is empty");
                } else {
                  if (formik.values.description === "") {
                    alert("some inputs is empty");
                  } else {
                    if (formik.values.price === "") {
                      alert("some inputs is empty");
                    } else {
                      verify();
                      navigator();
                    }
                  }
                }
              }
            }}
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editproduct;
