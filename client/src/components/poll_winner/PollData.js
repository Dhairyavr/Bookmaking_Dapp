import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Modal,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import Avt from "../layout/AvatarImg";
import axios from "axios";

function MatchInfoModal({
  open,
  setPollDataModalOpen,
  teamdata,
  bookmakingdata,
  polldata,
}) {
  //   const [stage, Setstage] = useState({ name: "" });

  //   const getStage = async () => {
  //     const response = await axios.get(
  //       `https://cricket.sportmonks.com/api/v2.0/stages/${match[2].stage_id}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
  //     );
  //     Setstage(response.data.data);
  //   };

  useEffect(() => {
    // getStage();
    // console.log(rankings);
  }, []);

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

  const infoTable = () => {
    return (
      <TableContainer>
        <Table
          style={{
            marginTop: "15px",
            border: "2px #F8F8FF solid",
            fontColor: "#F8F8FF",
          }}
        >
          <TableHead style={{ border: "2px #F8F8FF solid" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                Bookmaker Margin
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Team A Payout
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Team B Payout
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>ODDS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>
                {`${parseInt(bookmakingdata[0]) / Math.pow(10, 18)} Ethers`}
              </TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                {`${parseInt(bookmakingdata[1]) / Math.pow(10, 18)} Ethers`}
              </TableCell>
              <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                {`${parseInt(bookmakingdata[2]) / Math.pow(10, 18)} Ethers`}
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>{`${
                parseInt(polldata[3]) / 10
              }:${parseInt(polldata[4]) / 10}`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontColor: "#F8F8FF",
      }}
      open={open}
      onClose={() => setPollDataModalOpen(false)}
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
          ABOUT GAME
        </span>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid
              item
              xs={12}
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "yellowgreen",
              }}
            >
              {teamdata[2].data.round}
            </Grid>
            <Grid item xs={5}>
              {getImage(teamdata[0])}
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
              {getImage(teamdata[1])}
            </Grid>
          </Grid>

          {infoTable()}
        </Paper>
      </div>
    </Modal>
  );
}

const modalStyle = {
  position: "absolute",
  top: "20%",
  margin: "auto",
  backgroundColor: "#424242",
  width: "50%",
  height: "58%",
  padding: "10px",
};

export default MatchInfoModal;
