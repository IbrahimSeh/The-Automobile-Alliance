import { Typography } from "@mui/material";
import BottomNavBar from "./BottomNavBar";
const styles = {
  TypographyStyle: {
    color: "#9453a6",
  },
};

const BCarFooter = () => {
  return (
    <div className="the-footer">
      <BottomNavBar />
      <Typography align="center" style={styles.TypographyStyle} variant="h4">
        T H E - A U T O M O B I L E - A L L I A N C E
      </Typography>

      <div>
        <p className="copyright">
          Website design and construction by Ibrahim Seh ©
        </p>
        <div className="social">
          <a href="https://www.facebook.com/abrahem.seh">
            <i className="icon ion-social-facebook"></i>
          </a>
          <a href="https://wa.me/+972522740589?text=Welcome%20every%20body">
            <i className="icon ion-social-whatsapp"></i>
          </a>
          <a href="https://www.linkedin.com/in/ibrahim-seh-23b935157/">
            <i className="icon ion-social-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BCarFooter;
