import { Grid } from "@mui/material";
import RequestsComponent from "../../Requests/RequestsComponent";

const TabsForRequestPage = ({
  carsArr,
  handleOnClick,
  handleDeleteFromInitialCarsArr,
  handleLikesFromInitialCarsArr,
}) => {
  return (
    <Grid container spacing={2}>
      {carsArr.map((item) => (
        <Grid item xs={4} key={item._id + Date.now()}>
          <RequestsComponent
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
            clickOnCar={handleOnClick}
            bizNumber={item.bizNumber}
            onDelete={handleDeleteFromInitialCarsArr}
            onLike={handleLikesFromInitialCarsArr}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default TabsForRequestPage;
