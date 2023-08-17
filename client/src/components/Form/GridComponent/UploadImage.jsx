import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrl1, setImageUrl1] = useState(null);
  const [imageUrl2, setImageUrl2] = useState(null);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const file1 = event.target.files[1];
    const file2 = event.target.files[2];
    const reader = new FileReader();
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader1.onloadend = () => {
      setImageUrl1(reader1.result);
    };
    reader2.onloadend = () => {
      setImageUrl2(reader2.result);
    };
    if (file !== undefined) reader.readAsDataURL(file);
    if (file1 !== undefined) reader1.readAsDataURL(file1);
    if (file2 !== undefined) reader2.readAsDataURL(file2);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="upload-image">
          {imageUrl && <img src={imageUrl} alt="Uploaded hj" height="300" />}
          {imageUrl1 && <img src={imageUrl1} alt="Uploaded hj" height="300" />}
          {imageUrl2 && <img src={imageUrl2} alt="Uploaded hj" height="300" />}
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
      </Stack>
    </Container>
  );
};
export default UploadImage;
