import React, { useState } from "react";
import {
  Button,
  Grid,
  Modal,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
// import { connect } from "react-redux";
//import Avt from "../layout/AvatarImg";
// import history from "../../history";
import web3 from "../../ethereum/web3";
import betting from "../../ethereum/betting";
const PlaceBetModal = ({
  open,
  SetPlaceBetModalOpen,
  polls,
  oddsA,
  oddsB,
  poll_id,
}) => {
  const [loading, Setloading] = useState(false);
  const [teamSelected, setTeamSelected] = useState(null);
  const [betAmount, setBetAmount] = useState(0);
  const [errormsg, Seterrormsg] = useState("");

  const PlaceBet = async () => {
    console.log("Bet");
    if (betAmount <= 0) {
      Seterrormsg("Enter valid bet amount");
    } else if (teamSelected == null) {
      Seterrormsg("Select a team");
    } else {
      let date = new Date();
      let date1 = date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" });
      const accounts = await web3.eth.getAccounts();
      const data = await betting.methods
        .validationBeforeBet(0)
        .call({ from: accounts[0] });
      console.log(
        data,
        data[0],
        poll_id,
        betAmount,
        typeof betAmount,
        parseFloat(betAmount)
      );
      if (teamSelected === polls[0]) {
        console.log(
          "Bet payout is : ",
          parseInt(web3.utils.toWei(`${parseFloat(betAmount)}`, "ether")) *
            (oddsA / 10),
          oddsA,
          data[1]
        );
        if (
          parseInt(data[0]) <=
          parseInt(web3.utils.toWei(`${parseFloat(betAmount)}`, "ether")) *
            (oddsA / 10) +
            parseInt(data[1])
        ) {
          Seterrormsg("Insufficient margin within this pool for team1");
        } else {
          try {
            await betting.methods
              .placeBet(
                poll_id,
                parseInt(teamSelected.data.id),
                web3.utils.toWei(`${parseFloat(betAmount)}`, "ether"),
                teamSelected.data.name,
                date1.toString(),
                polls[2].data.round
              )
              .send({
                from: accounts[0],
                value: web3.utils.toWei(`${parseFloat(betAmount)}`, "ether"),
              });
          } catch (e) {
            alert(e);
          }
          console.log("Bet placed");
        }
      } else {
        console.log(
          "Bet payout is :",
          parseInt(web3.utils.toWei(`${parseFloat(betAmount)}`, "ether")) *
            (oddsB / 10),
          oddsB,
          data[2]
        );
        if (
          parseInt(data[0]) <=
          parseInt(web3.utils.toWei(`${parseFloat(betAmount)}`, "ether")) *
            (oddsB / 10) +
            parseInt(data[2])
        ) {
          Seterrormsg("Insufficient margin within this pool for team2");
        } else {
          try {
            await betting.methods
              .placeBet(
                poll_id,
                parseInt(teamSelected.data.id),
                web3.utils.toWei(`${parseFloat(betAmount)}`, "ether"),
                teamSelected.data.name,
                date1.toString(),
                polls[2].data.round
              )
              .send({
                from: accounts[0],
                value: web3.utils.toWei(`${parseFloat(betAmount)}`, "ether"),
              });
          } catch (e) {
            alert(e);
          }
          console.log("Bet placed");
        }
      }
    }
  };

  const getImageSection = (team) => {
    const avatarStyle = {
      width: "196px",
      height: "196px",
      fontSize: "72px",
      color: "#ffffff",
      cursor: "pointer",
    };

    const borderStyle = {
      padding: teamSelected === team ? "5px" : "10px",
      border: teamSelected === team ? `5px #ff2e2e dashed` : "none",
    };

    const handleSelection = () => {
      setTeamSelected(team);
    };

    let avatar;

    avatar = (
      <div onClick={handleSelection} style={borderStyle}>
        <Avatar
          variant="rounded"
          style={{ ...avatarStyle, position: "relative" }}
          src={team.data.image_path}
        ></Avatar>
      </div>
    );
    console.log(teamSelected);

    return (
      <React.Fragment>
        {avatar}
        <Grid>
          <div>
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {team.data.name}
            </span>
            <span
              style={{
                fontSize: "21px",
                fontWeight: "bold",
                marginLeft: "15px",
              }}
            >
              {team === polls[0] ? parseInt(oddsA) / 10 : parseInt(oddsB) / 10}
            </span>
          </div>
        </Grid>
      </React.Fragment>
    );
  };
  console.log(polls, oddsA, oddsB);
  return (
    <div>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={() => SetPlaceBetModalOpen(false)}
      >
        <div style={modalStyle}>
          {errormsg && (
            <Alert severity="error" onClose={() => Seterrormsg("")}>
              {errormsg}
            </Alert>
          )}
          <Grid style={gridItemStyle} item container xs={12}>
            <Card style={cardStyle}>
              <CardHeader
                title={
                  <h5 style={cardHeader}>
                    <span>PLACE BET</span>
                  </h5>
                }
              />
              <CardContent style={{ height: "100%" }}>
                <Grid style={{ height: "65%" }} container spacing={2}>
                  <Grid style={gridItemStyle} item xs={5} container>
                    {getImageSection(polls[0])}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    container
                    style={{
                      justifyContent: "center",
                      marginTop: "7.3rem",
                      fontSize: "2rem",
                      fontWeight: "bold",
                      fontColor: "#F8F8FF",
                    }}
                  >
                    VS
                  </Grid>
                  <Grid item xs={5} style={gridItemStyle} container>
                    {getImageSection(polls[1])}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={`Bet Amount in Eth`}
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      // onClick={bet}
                      style={{
                        backgroundColor: "#357a38",
                        color: "#ffffff",
                        fontWeight: "bold",
                      }}
                      variant="contained"
                      fullWidth
                      onClick={PlaceBet}
                    >
                      {loading ? (
                        <CircularProgress
                          size={24}
                          style={{ color: "white" }}
                        />
                      ) : (
                        "PLACE BET"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: "absolute",
  top: "20%",
  margin: "auto",
  backgroundColor: "#424242",
  width: "50%",
  height: "58%",
  padding: "10px",
};
const cardHeader = {
  display: "flex",
  alignItem: "center",
  justifyContent: "space-between",
  fontWeight: "bold",
  margin: "0px",
  fontSize: "18px",
};
const cardStyle = { height: "95%", width: "100%" };
const gridItemStyle = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  justifyContent: "center",
  flexDirection: "column",
};

export default PlaceBetModal;
