import React, { useState, useEffect } from "react";
//import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PollCard from "./PollCard";
import Preloader from "../layout/Preloader";
import axios from "axios";
import web3 from "../../ethereum/web3";
import betting from "../../ethereum/betting";
// import { getContractMatches } from "../../actions/matchesActions";

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

const Polls = () =>
  // {matches: { matches, loading },getContractMatches,contract,}
  {
    const [loading, Setloading] = useState(false);
    const classes = useStyles();
    const [polls, Setpolls] = useState([]);
    // useEffect(() => {
    //   (async () => {
    //     if (contract) getContractMatches();
    //   })();
    // }, [contract, getContractMatches]);

    const getPolls = async () => {
      Setloading(true);
      const response = await axios.get("http://localhost:5000/all-polls");
      console.log("All polls", response.data);
      let date = new Date();
      date.setHours(0, 0, 0, 0);

      const final_polls = response.data.filter(
        (poll) => new Date(poll.starting_at).getTime() > date.getTime()
      );
      console.log("Filtered polls", final_polls);
      const accounts = await web3.eth.getAccounts();
      final_polls.map(async (poll) => {
        try {
          const pollData1 = await betting.methods
            .pollDetails(parseInt(poll.poll_id))
            .call({ from: accounts[0] });
          Setpolls((prevpolls) => [...prevpolls, [pollData1, poll.poll_id]]);
        } catch (e) {
          console.log(e);
        }
      });
      Setloading(false);
    };

    useEffect(() => {
      getPolls();
    }, []);
    // if (loading) {
    //   return <Preloader />;
    // }
    console.log(polls);
    if (loading) return <Preloader />;
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {polls.length === 0 ? (
            <p className="center">No Current Matches to show....</p>
          ) : (
            polls.map((match, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Paper className={classes.paper} elevation={2}>
                  <PollCard polls={match[0]} poll_id={match[1]} />
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </div>
    );
  };

// Matches.propTypes = {
//   matches: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   matches: state.matches,
//   contract: state.ethereum.contract,
// });

export default Polls;
