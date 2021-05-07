import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import GetWinner from "./GetWinner";
import { connect } from "react-redux";

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

const AllPolls = ({ userdata }) => {
  const classes = useStyles();
  const [polls, Setpolls] = useState({});
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-details", {
        params: {
          wallet_address: userdata.details.wallet_address,
        },
      });
      console.log(response);
      Setpolls(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);

  console.log("userdata", userdata, polls);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(polls).length > 0 &&
          polls.polls.map(
            (match, index) =>
              match.closed === "false" && (
                <Grid key={index} item xs={12} sm={12}>
                  <Paper className={classes.paper} elevation={2}>
                    <GetWinner poll_id={match.poll_id} />
                  </Paper>
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});
export default connect(mapStateToProps)(AllPolls);
