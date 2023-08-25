import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SliderImages from "../Car/ExtendedCarComponent/SliderImages";
import { useState } from "react";

const Image = () => {
  let tempItemData = [];
  const [itemData, setItemData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const file1 = event.target.files[1];
    const file2 = event.target.files[2];
    const reader = new FileReader();
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader.onloadend = () => {
      tempItemData[0] = reader.result;
      setItemData(tempItemData);
    };

    reader1.onloadend = () => {
      tempItemData[1] = reader1.result;
      setItemData(tempItemData);
    };

    reader2.onloadend = () => {
      tempItemData[2] = reader2.result;
      setItemData(tempItemData);
    };

    if (file !== undefined) reader.readAsDataURL(file);
    if (file1 !== undefined) reader1.readAsDataURL(file1);
    if (file2 !== undefined) reader2.readAsDataURL(file2);
  };

  const handelClickClearPhotos = () => setItemData([]);

  const getStyle = () => {
    if (itemData.length !== 0) return {};

    return {
      margin: "auto",
      width: "fit-content",
      alignItems: "center",
    };
  };
  return (
    <div>
      <Typography mb={3} variant="h3" align="center" color="blue">
        IMAGE DATA
      </Typography>
      {itemData.length !== 0 ? (
        <SliderImages sliderImages={itemData} alt={"alt"} />
      ) : (
        ""
      )}
      <Grid container spacing={2}>
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Box sx={getStyle()}>
            <label htmlFor="upload-image">
              <Button variant="contained" component="span">
                Add up to three photos
              </Button>

              <input
                id="upload-image"
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
            </label>
          </Box>
          {itemData.length === 0 ? (
            ""
          ) : (
            <Box
              mt={-5}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={handelClickClearPhotos}
              >
                clear photos
              </Button>
            </Box>
          )}
        </Container>
      </Grid>
    </div>
  );
};
export default Image;
