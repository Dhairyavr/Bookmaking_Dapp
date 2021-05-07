import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  TextField,
  CircularProgress,
} from "@material-ui/core";
// import { connect } from "react-redux";
import Avt from "../layout/AvatarImg";
import web3 from "../../ethereum/web3";
import betting from "../../ethereum/betting";
import axios from "axios";
import { connect } from "react-redux";
const MatchModal = ({ open, setCreateModalOpen, match, userdata }) => {
  const [loading, setLoading] = useState(false);
  const [oddsA, setOddsA] = useState(0);
  const [oddsB, setOddsB] = useState(0);
  const [margin, setMargin] = useState(0);
  const [errormsg, Seterrormsg] = useState({
    oddsA: "",
    oddsB: "",
    margin: "",
  });
  const createMatch = async (e) => {
    Seterrormsg({ oddsA: "", oddsB: "", margin: "" });
    if (oddsA === 0) {
      Seterrormsg({ oddsA: "This field is required", oddsB: "", margin: "" });
    } else if (oddsB === 0) {
      Seterrormsg({ oddsB: "This field is required", oddsA: "", margin: "" });
    } else if (margin === 0) {
      Seterrormsg({ margin: "This field is required", oddsB: "", oddsA: "" });
    } else if (parseFloat(oddsA) < 0 || parseFloat(oddsA) > 10) {
      Seterrormsg({ oddsA: "Enter valid odds", oddsB: "", margin: "" });
    } else if (parseFloat(oddsB) < 0 || parseFloat(oddsB) > 10) {
      Seterrormsg({ oddsA: "", oddsB: "Enter valid odds", margin: "" });
    } else if (parseFloat(margin) <= 1) {
      Seterrormsg({
        margin: "Enter margin greater than 1 Ether",
        oddsB: "",
        oddsA: "",
      });
    } else {
      setLoading(true);
      let current_poll_id;
      const accounts = await web3.eth.getAccounts();
      try {
        await betting.methods
          .createPoll(
            match[2].id.toString(),
            parseInt(match[0].data.id),
            parseInt(match[1].data.id),
            oddsA * 10,
            oddsB * 10,
            web3.utils.toWei(`${parseFloat(margin)}`, "ether")
          )
          .send({
            from: accounts[0],
            value: web3.utils.toWei(`${parseFloat(margin)}`, "ether"),
          });
        current_poll_id = await betting.methods
          .poll_id()
          .call({ from: accounts[0] });
      } catch (e) {
        alert(e);
      }
      setLoading(false);
      await axios.post("http://localhost:5000/insert-poll", {
        poll_id: parseInt(current_poll_id) - 1,
        wallet_address: userdata.details.wallet_address,
        starting_at: new Date(match[2].starting_at).toDateString(),
      });
      console.log("Success", current_poll_id);
    }
  };
  console.log(errormsg);

  const getImage = (team) => {
    console.log(team);
    return (
      <div>
        {team.data.image_path ? (
          <>
            <Avt link={team.data.image_path} letter={null} index={team} />
          </>
        ) : (
          <Avt link={null} letter={team.data.name} index={team} />
        )}
        <span style={{ fontSize: "15px", fontWeight: "bold" }}>
          {team.data.name}
        </span>
      </div>
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={open}
      onClose={() => setCreateModalOpen(false)}
    >
      <div style={modalStyle}>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            padding: "5px",
            fontColor: "#F8F8FF",
          }}
        >
          CREATE MATCH
        </span>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={5}>
              {getImage(match[0])}
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                fontColor: "#F8F8FF",
              }}
            >
              VS
            </Grid>
            <Grid item xs={5}>
              {getImage(match[1])}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                value={oddsA}
                onChange={(e) => setOddsA(e.target.value)}
                variant="outlined"
                fullWidth
                label="Odds for Team A"
                error={errormsg.oddsA ? true : false}
                helperText={errormsg.oddsA}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                value={oddsB}
                onChange={(e) => setOddsB(e.target.value)}
                variant="outlined"
                fullWidth
                label="Odds for Team B"
                error={errormsg.oddsB ? true : false}
                helperText={errormsg.oddsB}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                value={margin}
                onChange={(e) => setMargin(e.target.value)}
                variant="outlined"
                fullWidth
                label="Initial Margin in Ether"
                error={errormsg.margin ? true : false}
                helperText={errormsg.margin}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ fontWeight: "bold" }}
                onClick={createMatch}
                variant="contained"
                fullWidth
                color="primary"
              >
                {loading ? (
                  <CircularProgress style={{ color: "white" }} size={24} />
                ) : (
                  "CREATE MATCH"
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Modal>
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

// const mapStateToProps = (state) => {
//   return {
//     contract: state.ethereum.contract,
//     account: state.ethereum.account,
//   };
// };
const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});
export default connect(mapStateToProps)(MatchModal);
