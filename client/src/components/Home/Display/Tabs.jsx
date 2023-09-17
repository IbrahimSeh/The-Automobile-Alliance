import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
//import jwt_decode from "jwt-decode";
import CarComponent from "../../Car/CarComponent/CarComponent";

const Tabs = ({
  carsArrFromHome,
  handleOnClick,
  handleDeleteFromInitialCarsArr,
  handleEditFromInitialCarsArr,
  handleLikeFromInitialCarsArr,
  from,
  collection,
}) => {
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  // let userID = "";
  // if (localStorage.getItem("token")) {
  //   userID = jwt_decode(localStorage.getItem("token"))._id;
  // }
  const canEdit = () => {
    if (from === "SellersFromOutSide") return false;
    if (payload && payload.isAdmin) return true;
    return false;
  };
  const clickOnCar = (id) => handleOnClick(id);
  const onDelete = (id) => handleDeleteFromInitialCarsArr(id);
  const onEdit = (id) => handleEditFromInitialCarsArr(id);
  const onLike = (id) => handleLikeFromInitialCarsArr(id);
  return (
    <Grid container spacing={2}>
      {carsArrFromHome.map((item, i) => (
        <Grid item xs={4} key={item._id + Date.now()}>
          <CarComponent
            img={item.image ? item.image.url[0] : ""}
            manufacturer={
              item.manufacturerData ? item.manufacturerData.manufacturer : ""
            }
            type={item.manufacturerData ? item.manufacturerData.type : ""}
            subType={item.manufacturerData ? item.manufacturerData.subType : ""}
            yearOfProduction={
              item.yearOfProduction ? item.yearOfProduction : ""
            }
            phone={item.phone}
            address={
              item.address
                ? item.address.country +
                  ", " +
                  item.address.city +
                  ", " +
                  item.address.street
                : ""
            }
            id={item._id}
            clickOnCar={clickOnCar}
            bizNumber={item.bizNumber}
            userId={item.user_id}
            onDelete={onDelete}
            candelete={payload && payload.isAdmin}
            onEdit={onEdit}
            canEdit={canEdit()}
            disLike={item.likes.includes(payload && payload._id) ? true : false}
            onLike={onLike}
            collection={collection}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default Tabs;
