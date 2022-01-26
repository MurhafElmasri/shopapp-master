import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { putrequest } from "../utils/putrequest";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
const localhost = process.env.REACT_APP_LOCALHOST_KEY;

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const Editproduct = () => {
  const params = useParams() as { id: string };

  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");

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

  const navigator = () => {
    navigate("/");
  };
  const verify = async () => {
    const response = await putrequest({
      data: {
        title,
        image,
        description,
        price,
      },
      id: params.id,
    });
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
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editproduct;
