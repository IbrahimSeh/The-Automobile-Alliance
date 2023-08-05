import { Chip, Divider } from "@mui/material";
import "../../css/image.css";

const DviderLine = ({ text }) => {
  return (
    <Divider>
      <Chip
        className="drop-shadow3"
        sx={{
          fontSize: 25,
          fontWeight: "medium",
          m: 5,
          p: 3,
          color: "#00897b",
          border: 2,
          borderColor: "info.dark",
          borderRadius: 2,
        }}
        label={text}
      />
    </Divider>
  );
};
export default DviderLine;
