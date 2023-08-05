import { Box, CardActionArea, CardMedia, Tooltip } from "@mui/material";
import Fade from "@mui/material/Fade";
import imageGallery from "../../assets/images/gallery.jpg";
import "../../css/image.css";

const InterfaceImage = () => {
  const imgstyle = {
    borderRadius: 20,
    marginBottom: 15,
    marginTop: 15,
  };
  return (
    <Box>
      <CardActionArea>
        <Tooltip
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
          title="An exclusive picture from inside the car showroom"
          placement="bottom-end"
        >
          <CardMedia
            style={imgstyle}
            className="drop-shadow2"
            component="img"
            image={imageGallery}
          />
        </Tooltip>
      </CardActionArea>
    </Box>
  );
};
export default InterfaceImage;
