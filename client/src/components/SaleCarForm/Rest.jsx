import { Box, Typography } from "@mui/material";

const Rest = () => {
  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <Typography mb={3} variant="h3" align="center" color="blue">
          REST OF DATA
        </Typography>
      </div>
    </Box>
  );
};
export default Rest;
