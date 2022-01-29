import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
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

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const LoadOldValue = async () => {
      const response = await getbyid({
        id: params.id,
      });
      setTitle(response.data.title);
      setImage(response.data.image);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setCategory(response.data.category);  

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
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          variant="outlined"
          color="secondary"
          defaultValue={title}
          value={title}
          required
        />
        <TextField
          className={classes.field}
          onChange={(e) => setImage(e.target.value)}
          label="Image URL"
          variant="outlined"
          color="secondary"
          defaultValue={image}
          fullWidth
          value={image}
          required
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDescription(e.target.value)}
          label="Description"
          variant="outlined"
          color="secondary"
          defaultValue={description}
          fullWidth
          value={description}
          required
        />
        <TextField
          className={classes.field}
          onChange={(e) => setPrice(e.target.value)}
          label="Price"
          variant="outlined"
          color="secondary"
          defaultValue={price}
          fullWidth
          required
          value={price}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Category
            </InputLabel>
            <NativeSelect
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
              value={category}
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
