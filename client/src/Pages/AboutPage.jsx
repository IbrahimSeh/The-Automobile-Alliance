import { Box, Divider, Grid, Typography } from "@mui/material";
import DviderLine from "../components/Home/DviderLine";

const AboutPage = () => {
  return (
    <Box mt={3}>
      <DviderLine text={"About Page"} />
      <Typography mb={3} variant="h4" color="blue">
        On this page you can find explanations about the using of the
        application
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
            1) watching user :Can look to browse the cars on display from the
            site store or from visitors who have posted their vehicles for sale
            on the site .<br /> 2) normal logged in user :In addition to the
            capabilities of Watching user , can tag cars with like/dislike icon,
            can edit his profile include photo of user, can enter his favorite
            vehicles page .<br /> 3) Subscription logged in user : In addition
            to the capabilities of normal logged in user,You can use the option
            that you have sent a request to the webmaster, The request will be a
            card that contains details of a vehicle offered for sale .<br /> 4)
            Admin logged in user : In addition to the capabilities of
            Subscription logged in user,The site administrator is authorized to
            delete, update or publish the site's content ,Can agree or reject
            requests sent from customers on the site due to advertising their
            vehicles for sale ,If the admin agreed to publish their requests he
            can only delete them later but cannot update .
          </Typography>
        </Grid>
        <Divider />
        <Grid item xs={6} md={8}>
          <Typography variant="h5" color="#00897b">
            Site characteristics
          </Typography>
        </Grid>
        <Grid item xs={6} md={8}>
          <Typography mb={5} variant="h6" color="blue">
            1) features of dark/light theme .
            <br /> 2) features of display content on tabs or tables .<br /> 3)
            In case of inspection of the car ,the user can browse the photo of
            the car by slider image.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
export default AboutPage;
