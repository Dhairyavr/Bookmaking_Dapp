import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Paper, Button } from "@material-ui/core";
import Avt from "../layout/AvatarImg";
import "../../App.css";
import Preloader from "../layout/Preloader";
//import { connect } from "react-redux";
import CasinoIcon from "@material-ui/icons/Casino";
import PlaceBetModal from "./PlaceBetModal";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const PollCard = ({ polls, poll_id }) => {
  const [teamdata, Setteamdata] = useState(null);
  const [PlaceBetModalOpen, SetPlaceBetModalOpen] = useState(false);

  const getteamdata = async () => {
    console.log(polls);
    const res1 = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/teams/${polls[1].toString()}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
    );
    const res2 = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/teams/${polls[2].toString()}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
    );
    const res3 = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/fixtures/${polls[0]}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
    );
    Setteamdata([res1.data, res2.data, res3.data]);
  };

  useEffect(() => {
    getteamdata();
    //eslint-disable-next-line
  }, []);

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
        <CalendarTodayIcon style={{ marginRight: "10px" }} />
        <span style={{ fontSize: "17px" }}>{`${
          date.getMonth() + 1
        }-${date.getDate()}-${date.getFullYear()}`}</span>
      </div>
    );
  };

  console.log(teamdata);
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

  if (teamdata === null) return <Preloader />;

  return (
    <div>
      <Grid style={{ fontWeight: "bold", fontSize: "18px" }}>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              {polls.ended ? (
                <span style={{ color: "red", fontWeight: "bold" }}>CLOSED</span>
              ) : (
                <>
                  <span>
                    <CasinoIcon
                      style={{ fontSize: "24px", marginRight: "5px" }}
                    />
                  </span>
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>{`${
                    parseInt(polls[3]) / 10
                  } : ${parseInt(polls[4]) / 10}`}</span>
                </>
              )}
              <span
                style={{
                  fontSize: "24px",
                  marginLeft: "25px",
                  marginRight: "5px",
                }}
                className="material-icons"
              ></span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginTop: "1px",
                }}
              >
                {getDateString(teamdata[2].data.starting_at)}
              </span>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => SetPlaceBetModalOpen(true)}
            style={{
              backgroundColor: "#357a38",
              color: "#ffffff",
              fontWeight: "bold",
            }}
            variant="contained"
            fullWidth
          >
            PLACE BET
          </Button>
        </Grid>
      </Grid>
      {PlaceBetModalOpen && (
        <PlaceBetModal
          open={PlaceBetModalOpen}
          SetPlaceBetModalOpen={SetPlaceBetModalOpen}
          polls={teamdata}
          oddsA={polls[3]}
          oddsB={polls[4]}
          poll_id={parseInt(poll_id)}
        />
      )}
    </div>
  );
};

// PollsCard.propTypes = {
//   polls: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     network: state.ethereum.network,
//   };
// };

export default PollCard;
