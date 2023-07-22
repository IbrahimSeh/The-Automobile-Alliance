import { Box, Divider, Grid, Typography } from "@mui/material";
import CardComponentExample from "../components/Card/CardComponentExample";

const AboutPage = () => {
  return (
    <Box mt={3}>
      <Typography mb={3} variant="h3" color="blue">
        About Page
      </Typography>
      <Typography mb={3} variant="h5" color="blue">
        On this page you can find explanations about using the application
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={8}>
          <Typography mb={5} variant="body1" color="initial">
            A site for displaying cards ,The site contains different types of
            users like normail user - watching user, bussiness user - user that
            can watch ,create and edit cards, admin user - In addition to the
            possibility of a bussiness user he can delete of all users but edit
            just his own cards. the site contain different pages ,main pages
            like home about register and login page, secondary pages like if the
            registered as normal user - he has Profile Page and FavCards Page
            registered as bussiness user - he has in addition to normal user
            MyCards Page registered as admin user - he has in addition to
            bussiness user Sandbox Page. the site own page for edit card that
            just the owner of the card can edit it, and page for edit user
            information that all user can edit his information.
          </Typography>
          <Divider />
          <Typography mt={5} variant="body1" color="initial">
            the site is opnennig for any body to display his own photo card that
            may likes other users. all user can push like button to card that he
            like. at the right side you can see example of Card and the buttons
            at the bottom of card structure , like edit delete like and phone to
            Contact the owner.
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <CardComponentExample />
        </Grid>
      </Grid>
    </Box>
  );
};
export default AboutPage;
