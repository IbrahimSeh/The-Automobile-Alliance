import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SliderImages from "../Car/ExtendedCarComponent/SliderImages";
import { useEffect, useState } from "react";

const Image = () => {
  const [itemData, setItemData] = useState([]);
  const [flagToclear, setFlagToclear] = useState(false);
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

  // useEffect(() => {
  //   if (flagToclear !== true ) {
  //     setItemData(itemDataFromCarEdit);
  //   }
  // }, [itemDataFromCarEdit, flagToclear]);

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
    // passSelectedFromChildToParent(event);
    if (file !== undefined) reader.readAsDataURL(file);
    if (file1 !== undefined) reader1.readAsDataURL(file1);
    if (file2 !== undefined) reader2.readAsDataURL(file2);
  };

  const handelClickClearPhotos = (event) => {
    setItemData([]);
    setFlagToclear(true);
  };

  return (
    <div>
      <Typography mb={3} variant="h3" align="center" color="blue">
        IMAGE DATA
      </Typography>
      <Grid container spacing={2}>
        <SliderImages
          sliderImages={[itemData[0].img, itemData[1].img, itemData[2].img]}
          alt={"alt"}
        />
        <Container maxWidth="md" sx={{ mt: 8 }}>
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
