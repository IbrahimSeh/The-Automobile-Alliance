import { Box, TableCell, TableSortLabel } from "@mui/material";
import { Fragment } from "react";
import { visuallyHidden } from "@mui/utils";

const acceptOrRejectHeader = (orderBy, order, createSortHandler) => {
    return (
        <Fragment key={"accept/reject" + Date()}>
            <TableCell
                key={"reject"}
                align={"right"}
                padding={"normal"}
                sortDirection={orderBy === "reject" ? order : false}
            >
                <TableSortLabel
                    active={orderBy === "reject"}
                    direction={orderBy === "reject" ? order : "asc"}
                    onClick={createSortHandler("reject")}
                >
                    {"reject"}
                    {orderBy === "reject" ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                        </Box>
                    ) : null}
                </TableSortLabel>
            </TableCell>
            <TableCell
                key={"accept"}
                align={"right"}
                padding={"normal"}
                sortDirection={orderBy === "accept" ? order : false}
            >
                <TableSortLabel
                    active={orderBy === "accept"}
                    direction={orderBy === "accept" ? order : "asc"}
                    onClick={createSortHandler("accept")}
                >
                    {"accept"}
                    {orderBy === "accept" ? (
                        <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                                ? "sorted descending"
                                : "sorted ascending"}
                        </Box>
                    ) : null}
                </TableSortLabel>
            </TableCell>
        </Fragment>
    );
}
export default acceptOrRejectHeader;