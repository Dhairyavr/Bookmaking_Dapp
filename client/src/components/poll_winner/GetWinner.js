import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Avt from "../layout/AvatarImg";
import { Button, Paper } from "@material-ui/core";
import axios from "axios";
import web3 from "../../ethereum/web3";
import betting from "../../ethereum/betting";
import Preloader from "../layout/Preloader";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CasinoIcon from "@material-ui/icons/Casino";
import PollData from "./PollData";
import AddMargin from "./AddMargin";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { setcurrentuser } from "../../redux/user/user-actions";

const GetWinner = ({ poll_id, userdata, setcurrentuser }) => {
  const [polldata, Setpolldata] = useState(null);
  const [bookmakingdata, Setbookmakingdata] = useState(null);
  const [teamdata, Setteamdata] = useState(null);
  const [PollDataModalOpen, setPollDataModalOpen] = useState(false);
  const [addmarginModalOpen, setaddmarginModalOpen] = useState(false);
  const [errormsg, seterrormsg] = useState("");
  console.log(poll_id, polldata, bookmakingdata, teamdata);

  const getWinner = async () => {
    seterrormsg("");
    console.log(teamdata[2]);
    if (
      teamdata[2].data.winner_team_id === null ||
      teamdata[2].data.winner_team_id === undefined
    ) {
      seterrormsg("Results awaited");
    } else {
      try {
        const accounts = await web3.eth.getAccounts();
        await betting.methods
          .setWinner(
            parseInt(poll_id),
            parseInt(teamdata[2].data.winner_team_id)
          )
          .send({ from: accounts[0] });
      } catch (e) {
        console.log(e);
      }

      await axios.post("http://localhost:5000/close-poll", {
        poll_id: poll_id.toString(),
        wallet_address: userdata.details.wallet_address,
      });
      const response = await axios.post("http://localhost:5000/login", {
        user_id: userdata.user_id,
        password: userdata.password,
      });
      setcurrentuser(response.data);
      window.location.reload();
      // alert(teamdata[2].data.winner_team_id);
    }
  };

  const getPollData = async () => {
    const accounts = await web3.eth.getAccounts();
    let response;
    try {
      response = await betting.methods
        .pollDetails(parseInt(poll_id))
        .call({ from: accounts[0] });
      console.log("blockchain 1", response);
      Setpolldata(response);
    } catch (e) {
      alert(e);
    }
    try {
      const res2 = await betting.methods
        .validationBeforeBet(parseInt(poll_id))
        .call({ from: accounts[0] });
      console.log("blockchain 2", res2);
      Setbookmakingdata(res2);
    } catch (e) {
      alert(e);
    }

    console.log("Getmatchdata", polldata);
    const res1 = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/teams/${response[1]}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
    );
    const res2 = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/teams/${response[2]}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
    );
    const res3 = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/fixtures/${response[0]}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
    );
    Setteamdata([res1.data, res2.data, res3.data]);
  };

  useEffect(() => {
    getPollData();
    //eslint-disable-next-line
  }, []);

  const getDetails = (team) => {
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

  const getDateString = (ds) => {
    const date = new Date(ds);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CalendarTodayIcon
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>{`${
          date.getMonth() + 1
        }-${date.getDate()}-${date.getFullYear()}`}</span>
        <ScheduleIcon style={{ marginLeft: "10px", marginRight: "10px" }} />
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>
          {`${date.getHours()}:${date.getMinutes()}`} UTC
        </span>

        <span>
          <CasinoIcon
            style={{ fontSize: "24px", marginRight: "5px", marginLeft: "10px" }}
          />
        </span>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>{`${
          parseInt(polldata[3]) / 10
        } : ${parseInt(polldata[4]) / 10}`}</span>
      </div>
    );
  };

  if (teamdata === null || polldata === null) return <Preloader />;
  return (
    <div>
      {errormsg && (
        <Alert severity="error" onClose={() => seterrormsg("")}>
          {errormsg}
        </Alert>
      )}
      {/* <img src={match.league.image_url} alt='' style={{width:'60px',borderRadius:"50%"}}/> */}
      <Grid style={{ fontWeight: "bold", fontSize: "14px" }}>
        {teamdata[2].data.round}
      </Grid>
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={5}>
          {getDetails(teamdata[0])}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          VS
        </Grid>
        <Grid item xs={5}>
          {getDetails(teamdata[1])}
        </Grid>
        <Grid item xs={12}>
          <Paper
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#505050",
              padding: "8px",
            }}
            elevation={0}
          >
            {getDateString(teamdata[2].data.starting_at)}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: "#408cff",
              color: "#ffffff",
              fontWeight: "bold",
            }}
            onClick={() => setPollDataModalOpen(true)}
            variant="contained"
            fullWidth
          >
            SHOW MORE
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: "#e94560",
              color: "#ffffff",
              fontWeight: "bold",
              marginRight: "20px",
              width: "40%",
            }}
            onClick={getWinner}
            variant="contained"
          >
            Get Result
          </Button>
          <Button
            style={{
              backgroundColor: "#00917c",
              color: "#ffffff",
              fontWeight: "bold",
              marginLeft: "20px",
              width: "40%",
            }}
            onClick={() => setaddmarginModalOpen(true)}
            variant="contained"
          >
            Add Margin
          </Button>
        </Grid>
      </Grid>
      {PollDataModalOpen && (
        <PollData
          open={PollDataModalOpen}
          setPollDataModalOpen={setPollDataModalOpen}
          teamdata={teamdata}
          bookmakingdata={bookmakingdata}
          polldata={polldata}
        />
      )}
      {addmarginModalOpen && (
        <AddMargin
          open={addmarginModalOpen}
          setaddmarginModalOpen={setaddmarginModalOpen}
          poll_id={poll_id}
        />
      )}
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});
const mapDispatchToProps = (dispatch) => ({
  setcurrentuser: (user) => dispatch(setcurrentuser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GetWinner);
