import React, { useState, useEffect } from "react";
import "./bets.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import betting from "../../ethereum/betting";
import web3 from "../../ethereum/web3";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import axios from "axios";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "18px",
    fontWeight: "bold",
  },
  body: {
    fontSize: "16px",
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 800,
  },
});
const OneBet = ({ data, userdata }) => {
  const classes = useStyles();
  const [betstatus, Setbetstatus] = useState("");
  const [winnerstatus, Setwinnerstatus] = useState([]);
  const betStatus = async () => {
    const accounts = await web3.eth.getAccounts();
    const response = await betting.methods
      .getWinnerDetails(parseInt(data.returnValues.poll_id))
      .call({ from: accounts[0] });
    Setwinnerstatus(response);
    console.log("response", response, data.id);
    if (response[2] === "0") {
      Setbetstatus("Results Awaited");
    } else if (
      response[2].toString() !== data.returnValues.team_id.toString()
    ) {
      Setbetstatus("You lost this bet");
    } else {
      Setbetstatus("1");
    }
  };

  const MakeBetPayout = async () => {
    const accounts = await web3.eth.getAccounts();
    const amount =
      ((parseInt(winnerstatus[1]) / 10) * parseInt(data.returnValues.amount)) /
      Math.pow(10, 18);
    console.log("amount", amount);
    await betting.methods
      .transferBetProfit(
        userdata.details.wallet_address,
        web3.utils.toWei(`${parseFloat(amount)}`, "ether")
      )
      .send({ from: accounts[0] });
    await axios.post("http://localhost:5000/addbet", { id: data.id });
    window.location.reload();
  };

  useEffect(() => {
    betStatus();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          {data.returnValues.round}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {data.returnValues.date}
        </StyledTableCell>
        <StyledTableCell align="right">
          {data.returnValues.poll_id}
        </StyledTableCell>
        <StyledTableCell align="right">
          {data.returnValues.team_name}
        </StyledTableCell>
        <StyledTableCell align="right">
          {`${data.returnValues.amount / Math.pow(10, 18)} Ethers`}
        </StyledTableCell>
        <StyledTableCell align="right">
          {betstatus === "1" ? (
            <Button variant="contained" color="primary" onClick={MakeBetPayout}>
              Get Bet Payout
            </Button>
          ) : (
            betstatus
          )}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};
const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});
export default connect(mapStateToProps)(OneBet);
