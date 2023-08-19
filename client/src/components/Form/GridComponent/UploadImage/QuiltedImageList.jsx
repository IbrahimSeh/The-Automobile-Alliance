import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const QuiltedImageList = ({ itemData, }) => {
  return (
    <ImageList
      sx={{ width: 850, height: 450, mt: 2, mb: 2 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) =>
        item.img !== "" ? (
          <ImageListItem
            key={item.title + Date.now()}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img src={item.img} alt={item.title} loading="lazy" />
          </ImageListItem>
        ) : (
          ""
        )
      )}
    </ImageList>
  );
};
export default QuiltedImageList;
