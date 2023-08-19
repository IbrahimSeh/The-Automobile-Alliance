import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box, Container, ImageList, ImageListItem } from "@mui/material";

const UploadImage = ({
  passSelectedFromChildToParent,
  itemDataFromCarEdit,
}) => {
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
  useEffect(() => {
    if (flagToclear !== true && itemDataFromCarEdit !== undefined) {
      setItemData(itemDataFromCarEdit);
    }
  }, [itemDataFromCarEdit, flagToclear]);

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
    passSelectedFromChildToParent(event);
    if (file !== undefined) reader.readAsDataURL(file);
    if (file1 !== undefined) reader1.readAsDataURL(file1);
    if (file2 !== undefined) reader2.readAsDataURL(file2);
  };

  const handelClickClearPhotos = (event) => {
    setItemData([]);
    setFlagToclear(true);
  };
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <label htmlFor="upload-image">
        {itemData.length === 0 ? (
          ""
        ) : (
          <ImageList
            sx={{ width: 850, height: 450, mt: 2, mb: 2 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {itemData.map((item, index) =>
              item.img !== undefined && item.img !== "" ? (
                <ImageListItem
                  key={index + Date.now()}
                  cols={item.cols || 1}
                  rows={item.rows || 1}
                >
                  <img src={item.img} alt={item.title} loading="lazy" />
                </ImageListItem>
              ) : (
                ""
              )
            )}
          </ImageList>
        )}
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
  );
};
export default UploadImage;
