import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
// import web3 from "../../ethereum/web3";
import betting from "../../ethereum/betting";
import OneBet from "./OneBet.js";
import axios from "axios";
// const Bets = (props) => {
//   const [allbets, Setallbets] = useState([]);

//   const getBets = async () => {
//     const response = await betting.getPastEvents("Bet", {
//       fromBlock: 0,
//       filter: { better_address: "0x956a97a2c6afe9d3b254358117e020c54b99032b" },
//     });
//     Setallbets(response);
//     console.log(response);
//   };
//   console.log("Bets", allbets, allbets.length);
//   useEffect(() => {
//     getBets();
//   }, []);

//   return (
//     <Fragment>
//       <div className="container">
//         <div className="row" style={{}}>
//           <div className="col-md-12">
//             <h4 className="mb-4 pt-3 text-white" style={{ fontColor: "White" }}>
//               Bet Statuses
//             </h4>
//             <div className="bet-status-tab">
//               <div className="tab-content">
//                 <div className="tab-pane show active">
//                   <div className="card-table mb-0">
//                     <div className="card-body" style={{ width: "1000px" }}>
//                       <div className="table-responsive">
//                         <table className="table table-center mb-0">
//                           <thead className="text-muted">
//                             <tr
//                               style={{ fontWeight: "bold", fontSize: "18px" }}
//                             >
//                               <th
//                                 className="text-center"
//                                 style={{
//                                   position: "absolute",
//                                   left: "20px",
//                                 }}
//                               >
//                                 Series Name
//                               </th>
//                               <th
//                                 className="text-center"
//                                 style={{
//                                   position: "absolute",
//                                   left: "220px",
//                                 }}
//                               >
//                                 Bet Date
//                               </th>
//                               <th
//                                 className="text-center"
//                                 style={{
//                                   position: "absolute",
//                                   left: "350px",
//                                 }}
//                               >
//                                 Poll ID
//                               </th>
//                               <th
//                                 className="text-center"
//                                 style={{
//                                   position: "absolute",
//                                   left: "420px",
//                                 }}
//                               >
//                                 Team Name
//                               </th>
//                               <th
//                                 className="text-center"
//                                 style={{
//                                   position: "absolute",
//                                   left: "560px",
//                                 }}
//                               >
//                                 Bet Amount
//                               </th>
//                               <th
//                                 className="text-center"
//                                 style={{
//                                   position: "absolute",
//                                   left: "780px",
//                                 }}
//                               >
//                                 Bet Result
//                               </th>
//                               <th />
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {allbets.map((bet, idx) => (
//                               <OneBet data={bet.returnValues} key={idx} />
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };
// export default Bets;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "18px",
    fontWeight: "bold",
  },
  body: {
    fontSize: "12px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 1000,
  },
});

function Bets({ userdata }) {
  const classes = useStyles();
  const [allbets, Setallbets] = useState([]);

  const getBets = async () => {
    const response = await betting.getPastEvents("Bet", {
      fromBlock: 0,
      filter: { better_address: userdata.details.wallet_address },
    });
    const res1 = await axios.get("http://localhost:5000/getbet");
    console.log("Cancel bets", res1.data);
    let temp = [];
    res1.data.map((data) => temp.push(data.id));
    console.log("temp", temp);

    Setallbets(response.filter((res) => !temp.includes(res.id)));
    console.log(response);
  };

  console.log("Userdata", userdata);
  console.log("Bets", allbets, allbets.length);

  useEffect(() => {
    getBets();
    //eslint-disable-next-line
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Series Name</StyledTableCell>
            <StyledTableCell>Bet Date</StyledTableCell>
            <StyledTableCell align="right">Poll ID</StyledTableCell>
            <StyledTableCell align="right">Team Name</StyledTableCell>
            <StyledTableCell align="right">Bet Amount(in Eth)</StyledTableCell>
            <StyledTableCell align="right">Bet Result</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allbets.map((row, idx) => (
            <OneBet data={row} key={idx} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});

export default connect(mapStateToProps)(Bets);
