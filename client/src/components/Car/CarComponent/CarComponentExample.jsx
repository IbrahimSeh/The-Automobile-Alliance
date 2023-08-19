import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DEFAULTCARIMAGE from "./helpers/DefaultCarImage";

const CarComponentExample = ({
  img,
  title,
  subTitle,
  phone,
  address,
  bizNumber,
}) => {
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardActionArea>
        <CardHeader title={title} subheader={subTitle}></CardHeader>
      </CardActionArea>
      <Divider variant="middle" />
      <CardContent>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Phone :
          </Box>{" "}
          {phone}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Address :
          </Box>{" "}
          {address}
        </Typography>
        <Typography component="div">
          <Box fontWeight="fontWeightMedium" display="inline">
            Card Number :
          </Box>{" "}
          {bizNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ color: "#1b1b00" }}>
          <DeleteRoundedIcon />
        </Button>

        <Button sx={{ color: "#008e24" }}>
          <EditRoundedIcon />
        </Button>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button sx={{ color: "#2196f3" }}>
            <LocalPhoneRoundedIcon />
          </Button>

          <Button sx={{ color: "#e91616" }}>
            <FavoriteRoundedIcon />
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

CarComponentExample.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  bizNumber: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  candelete: PropTypes.bool,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  clickOnCard: PropTypes.func,
  onLike: PropTypes.func,
};

CarComponentExample.defaultProps = {
  img: DEFAULTCARIMAGE,
  title: "example title",
  subTitle: "example subtitle",
  phone: "0501234567",
  address: "Country: C, State: ST, City: CT, Street: STR, houseNumber: HN",
  bizNumber: "100000000000000000000000",
  canEdit: false,
  disLike: true,
};

export default CarComponentExample;
