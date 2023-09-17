import { Box, Divider, Grid, Typography } from "@mui/material";
import CarComponentExample from "../components/Car/CarComponent/CarComponentExample";
import DviderLine from "../components/Home/DviderLine";

const AboutPage = () => {
  return (
    <Box mt={3}>
      <DviderLine text={"About Page"} />
      <Typography mb={3} variant="h4" color="blue">
        On this page you can find explanations about using the application
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <Typography variant="h5" color="#00897b">
            introduction
          </Typography>
        </Grid>
        <Grid item xs={6} md={8}>
          <Typography mb={5} variant="h6" color="blue">
            This site serves a store that offers new or used cars for sale ,
            This website has several pages for displaying information. And also
            forms to serve the surfers on the site,some of these pages is : home
            , about ,favorite ,sellers from outside , specific search and login,
            some of these forms is :sign up, add car, offered you'r car for sale
            and user profile. The site contains different types of users like
            watching user , normail user , Subscription user & Admin user.
          </Typography>
        </Grid>
        <Divider />
        <Grid item xs={6} md={8}>
          <Typography variant="h5" color="#00897b">
            type of users
          </Typography>
        </Grid>
        <Grid item xs={6} md={8}>
          <Typography mb={5} variant="h6" color="blue">
            types of users : This site serves a store that offers new or used
            cars for sale , This website has several pages for displaying
            information. And also forms to serve the surfers on the site,some of
            these pages is : home , about ,favorite ,sellers from outside ,
            specific search and login, some of these forms is :sign up, add car,
            offered you'r car for sale and user profile. The site contains
            different types of users like watching user , normail user ,
            Subscription user & Admin user.
          </Typography>
        </Grid>
        <Divider />

        {/* <Grid item xs={6} md={4}>
          <CarComponentExample />
        </Grid> */}
      </Grid>
    </Box>
  );
};
export default AboutPage;
