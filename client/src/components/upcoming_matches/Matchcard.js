import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Avt from "../layout/AvatarImg";
import { Button, Paper } from "@material-ui/core";
import MatchModal from "./MatchModal";
import MatchInfoModal from "./MatchInfoModal";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ScheduleIcon from "@material-ui/icons/Schedule";
import axios from "axios";

export const MatchCard = ({ match }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createInfoModalOpen, setCreateInfoModalOpen] = useState(false);
  const [venue, Setvenue] = useState("");
  const [rankings, Setrankings] = useState([]);

  const getdata = async () => {
    const response = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/venues/${match[2].venue_id}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
    );
    Setvenue(response.data.data.name);
    const res1 = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/team-rankings?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK&filter[type]=T20I&filter[gender]=men`
    );
    Setrankings(res1.data.data[0].team);
  };

  useEffect(() => {
    getdata();
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
        <span style={{ fontSize: "14px" }}>{`${
          date.getMonth() + 1
        }-${date.getDate()}-${date.getFullYear()}`}</span>
        <ScheduleIcon style={{ marginLeft: "10px", marginRight: "10px" }} />
        <span style={{ fontSize: "14px" }}>
          {`${date.getHours()}:${date.getMinutes()}`} UTC
        </span>
      </div>
    );
  };

  return (
    <div>
      {/* <img src={match.league.image_url} alt='' style={{width:'60px',borderRadius:"50%"}}/> */}
      <Grid style={{ fontWeight: "bold", fontSize: "14px" }}>
        {match[2].round}
      </Grid>
      <Grid container spacing={3} alignItems="center" justify="center">
        <Grid item xs={5}>
          {getDetails(match[0])}
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
          {getDetails(match[1])}
        </Grid>
        <Grid style={{ fontWeight: "bold", fontSize: "14px" }}>
          Venue :{venue}
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
            {getDateString(match[2].starting_at)}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            style={{
              backgroundColor: "#408cff",
              color: "#ffffff",
              fontWeight: "bold",
            }}
            onClick={() => setCreateInfoModalOpen(true)}
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
            }}
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
            fullWidth
          >
            CREATE MATCH
          </Button>
        </Grid>
      </Grid>
      {createModalOpen && (
        <MatchModal
          open={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          match={match}
        />
      )}
      {createInfoModalOpen && (
        <MatchInfoModal
          open={createInfoModalOpen}
          setCreateModalOpen={setCreateInfoModalOpen}
          match={match}
          rankings={rankings.filter(
            (team) =>
              team.id === match[0].data.id || team.id === match[1].data.id
          )}
        />
      )}
    </div>
  );
};

// UpcomingMatchCard.propTypes = {
//match: PropTypes.object.isRequired
// };

export default MatchCard;
