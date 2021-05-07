import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MatchCard from "./Matchcard";
import Preloader from "../layout/Preloader";
import axios from "axios";
// import { getMatches } from "../../actions/apiActions";

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

export const Upcoming = () => {
  const classes = useStyles();
  const [matches, Setmatches] = useState([]);

  const getMatches = async () => {
    let date = new Date();
    let d1 = date.toLocaleDateString("en-CA");
    date.setMonth(date.getMonth() + 3);
    let d2 = date.toLocaleDateString("en-CA");
    console.log(d1, d2);
    const response = await axios.get(
      `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK&filter[starts_between]=${d1},${d2}`
    );
    response.data.data.map(async (data) => {
      const res1 = await axios.get(
        `https://cricket.sportmonks.com/api/v2.0/teams/${data.localteam_id}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
      );
      const res2 = await axios.get(
        `https://cricket.sportmonks.com/api/v2.0/teams/${data.visitorteam_id}?api_token=dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK`
      );
      Setmatches((prevmatch) => [...prevmatch, [res1.data, res2.data, data]]);
    });
  };
  useEffect(() => {
    getMatches();
    //eslint-disable-next-line
  }, []);
  console.log(matches);
  // if (matches.length === []) <Preloader />;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {matches.map((match, index) => (
          <Grid key={index} item xs={12} sm={4}>
            <Paper className={classes.paper} elevation={2}>
              <MatchCard match={match} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Upcoming.propTypes = {
//   api: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   api: state.api,
// });

export default Upcoming;
