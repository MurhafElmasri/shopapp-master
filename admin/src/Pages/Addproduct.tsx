import React, { useState } from "react";
import "./Addproduct.css";
import { sendRequest } from "../utils/sendRequest";
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
const Addproduct = () => {
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [amount, setamount] = useState("1");
  const [category, setcategory] = useState("Elecetronics");

  function submit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const ProductData = {
      title: title,
      image: image,
      description: description,
      price: price,
    };
  }
  const navigate = useNavigate();
  const classes = useStyles();
  const verify = async () => {
    const response = await sendRequest({
      data: {
        title,
        image,
        description,
        price,
        amount,
        category,
      },
    });
  };
  const navigator = () => {
    navigate("/");
  };

  return (
    <div className="productinfo">
      <div className="form">
        <TextField
          className={classes.field}
          onChange={(e) => settitle(e.target.value)}
          label="Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          className={classes.field}
          onChange={(e) => setimage(e.target.value)}
          label="Image URL"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          className={classes.field}
          onChange={(e) => setdescription(e.target.value)}
          label="Description"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <TextField
          className={classes.field}
          onChange={(e) => setprice(e.target.value)}
          label="Price"
          variant="outlined"
          color="secondary"
          fullWidth
          required
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Category
            </InputLabel>
            <NativeSelect
              onChange={(e) => setcategory(e.target.value)}
              defaultValue="Elecetronics"
            >
              <option value="Elecetronics"> Elecetronics </option>
              <option value="Fashion"> Fashion </option>
              <option value="Sports"> Sports </option>
              <option value="Home improvement"> Home improvement </option>
            </NativeSelect>
          </FormControl>
        </Box>
        <div className="actions">
          <button onClick={() => console.log(category)}>fhss</button>
          <button
            onClick={() => {
              if (title === "") {
                alert("some inputs is empty");
              } else {
                if (image === "") {
                  alert("some inputs is empty");
                } else {
                  if (description === "") {
                    alert("some inputs is empty");
                  } else {
                    if (price === "") {
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
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
