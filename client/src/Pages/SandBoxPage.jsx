import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SandBoxPage = () => {
  const [inputstate, setinputstate] = useState(null);
  useEffect(() => {
    axios
      .get("/users/getAllUsers")
      .then(({ data }) => {
        setinputstate(data);
      })
      .catch((err) => {
        console.log("err from axioas", err);
        toast.error("Oops");
      });
  }, []);

  if (!inputstate) {
    return <CircularProgress />;
  }

  function createData(name, isBiz, isAdmin, email, phone) {
    return { name, isBiz, isAdmin, email, phone };
  }
  let row = [];
  for (let index = 0; index < inputstate.users.length; index++) {
    row = [
      ...row,
      createData(
        inputstate.users[index].firstName,
        inputstate.users[index].biz,
        inputstate.users[index].isAdmin,
        inputstate.users[index].email,
        inputstate.users[index].phone
      ),
    ];
  }

  return (
    <Box>
      <Typography variant="h5" color="initial" m={3}>
        CRM SYSTEM
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name of the user</TableCell>
              <TableCell align="right">Is Bussiness</TableCell>
              <TableCell align="right">Is Admin</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.isBiz + ""}</TableCell>
                <TableCell align="right">{row.isAdmin + ""}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default SandBoxPage;
