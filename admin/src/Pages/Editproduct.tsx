import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { values } from "lodash";
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

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
      price: "",
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const LoadOldValue = async () => {
      const response = await getbyid({
        id: params.id,
      });
      formik.setFieldValue("title", response.productData.title);
      formik.setFieldValue("image", response.productData.image);
      formik.setFieldValue("description", response.productData.description);
      formik.setFieldValue("price", response.productData.price);
      formik.setFieldValue("category", response.productData.category);

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
        category: formik.values.category,
      },
      id: params.id,
    });
    navigator();
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
          defaultValue={formik.values.title}
          value={formik.values.title}
          required
          name="title"
        />
        <TextField
          className={classes.field}
          onChange={formik.handleChange}
          label="Image URL"
          variant="outlined"
          color="secondary"
          defaultValue={formik.values.image}
          fullWidth
          value={formik.values.image}
          name="image"
          required
        />
        <TextField
          className={classes.field}
          onChange={formik.handleChange}
          label="Description"
          variant="outlined"
          color="secondary"
          defaultValue={formik.values.description}
          fullWidth
          value={formik.values.description}
          name="description"
          required
        />
        <TextField
          className={classes.field}
          onChange={formik.handleChange}
          label="Price"
          variant="outlined"
          color="secondary"
          defaultValue={formik.values.price}
          fullWidth
          required
          name="price"
          value={formik.values.price}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Category
            </InputLabel>
            <NativeSelect
              onChange={formik.handleChange}
              defaultValue={formik.values.category}
              value={formik.values.category}
              name="category"
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
