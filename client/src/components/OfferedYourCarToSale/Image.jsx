import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SliderImages from "../Car/ExtendedCarComponent/SliderImages";
import { useEffect, useState } from "react";
import { imageData } from "../Pagination/arrayOfPages";

const Image = ({ passSrcData, passAltData }) => {
  let tempSrcData = [];
  let tempAltData = [];
  const [itemSrcData, setItemSrcData] = useState([]);
  const [itemAltData, setItemAltData] = useState([]);

  //first useEffect when page load
  useEffect(() => {
    if (imageData.src.length !== 0) setItemSrcData(imageData.src);
    if ((imageData.alt.length !== 0) !== "") setItemAltData(imageData.alt);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) tempAltData[0] = file.name;
    const file1 = event.target.files[1];
    if (file1) tempAltData[1] = file1.name;
    const file2 = event.target.files[2];
    if (file2) tempAltData[2] = file2.name;
    const reader = new FileReader();
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    setItemAltData(tempAltData);

    reader.onloadend = () => {
      tempSrcData[0] = reader.result;
      setItemSrcData(tempSrcData);
    };

    reader1.onloadend = () => {
      tempSrcData[1] = reader1.result;
      setItemSrcData(tempSrcData);
    };

    reader2.onloadend = () => {
      tempSrcData[2] = reader2.result;
      setItemSrcData(tempSrcData);
    };

    if (file !== undefined) reader.readAsDataURL(file);
    if (file1 !== undefined) reader1.readAsDataURL(file1);
    if (file2 !== undefined) reader2.readAsDataURL(file2);

    passSrcData("src", tempSrcData);
    passAltData("alt", tempAltData);
  };

  const handelClickClearPhotos = () => {
    imageData.src = [];
    imageData.alt = [];
    setItemSrcData([]);
  };
  const getStyle = () => {
    if (itemSrcData.length !== 0) return {};

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
      {itemSrcData.length !== 0 ? (
        <SliderImages sliderImages={itemSrcData} alt={itemAltData} />
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
          {itemSrcData.length === 0 ? (
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
