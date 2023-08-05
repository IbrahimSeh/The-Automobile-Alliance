import { Box, CardActionArea, CardMedia } from "@mui/material";
import imageGallery from "../../assets/images/gallery.jpg";
import "../../css/image.css";
import "react-image-shadow/assets/index.css";

const InterfaceImage = () => {
  const imgstyle = {
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 15,
  };
  return (
    <Box>
      <CardActionArea>
        <CardMedia
          style={imgstyle}
          className="drop-shadow2"
          component="img"
          image={imageGallery}
        />
      </CardActionArea>
      {/* <ImageShadow src={imageGallery} /> */}
    </Box>
  );
};
export default InterfaceImage;
