import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Box, Container, Grid } from "@mui/material";
import QuiltedImageList from "./QuiltedImageList";

const UploadImage = () => {
  const [itemData, setItemData] = useState([]);
  let tempItemData = [
    {
      img: "",
      title: "",
      rows: 2,
      cols: 2,
    },
    {
      img: "",
      title: "",
      rows: 3,
      cols: 2,
    },
    {
      img: "",
      title: "",
      rows: 2,
      cols: 2,
    },
  ];
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) tempItemData[0].title = file.name;
    const file1 = event.target.files[1];
    if (file1) tempItemData[1].title = file1.name;
    const file2 = event.target.files[2];
    if (file2) tempItemData[2].title = file2.name;
    const reader = new FileReader();
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader.onloadend = () => {
      tempItemData[0].img = reader.result;
      setItemData(tempItemData);
    };

    reader1.onloadend = () => {
      tempItemData[1].img = reader1.result;
      setItemData(tempItemData);
    };

    reader2.onloadend = () => {
      tempItemData[2].img = reader2.result;
      setItemData(tempItemData);
    };
    if (file !== undefined) reader.readAsDataURL(file);
    if (file1 !== undefined) reader1.readAsDataURL(file1);
    if (file2 !== undefined) reader2.readAsDataURL(file2);
  };

  const handelClick = (event) => {
    event.stopPropagation();
    console.log("yes");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <label htmlFor="upload-image">
        {itemData.length === 0 ? "" : <QuiltedImageList itemData={itemData} />}
        <Button variant="contained" component="span">
          Add up to three photos
        </Button>
        {itemData.length === 0 ? (
          ""
        ) : (
          <Box
            mt={-5}
            //margin
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button variant="outlined" color="secondary" onClick={handelClick}>
              clear photos
            </Button>
          </Box>
        )}

        {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                component="span"
                sx={{ mt: 3, mb: 2 }}
              >
                Add up to three photos
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={handelClick}
              >
                clear photos
              </Button>
            </Grid>
          </Grid> */}
        <input
          id="upload-image"
          hidden
          accept="image/*"
          multiple
          type="file"
          onChange={handleFileUpload}
        />
      </label>
    </Container>
  );
};
export default UploadImage;
