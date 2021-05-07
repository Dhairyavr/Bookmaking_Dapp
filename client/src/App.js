import "./App.css";
import React from "react";
import Polls from "./components/live-polls/Polls";
import Upcoming from "./components/upcoming_matches/Upcoming";
import ContainerMain from "./components/layout/ContainerMain";
import { Route } from "react-router-dom";
import AllPolls from "./components/poll_winner/AllPolls";
import Navigation from "./navigation";
import HomePage from "./HomePage";
import SignInSide from "./LoginForm";
import { withRouter } from "react-router-dom";
import DashBoard from "./components/dashboard/DashBoard";
import Bets from "./components/AllBets/Bets";

function App() {
  // const [matches, Setmatches] = useState([]);

  // const getMatches = async () => {
  //   let token = "dElBVcftKTVCDpKHGNijsMtnKMW7GmGLT2sdmJQw0pWZ3H92COVoCed0ySiK";
  //   const response = await axios.get(
  //     `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=${token}&filter[starts_between]=2021-05-01,2021-07-02`
  //   );
  //   console.log(response.data.data);
  //   let temp = [];
  //   response.data.data.map(async (data) => {
  //     const res1 = await axios.get(
  //       `https://cricket.sportmonks.com/api/v2.0/teams/${data.localteam_id}?api_token=${token}`
  //     );
  //     const res2 = await axios.get(
  //       `https://cricket.sportmonks.com/api/v2.0/teams/${data.visitorteam_id}?api_token=${token}`
  //     );
  //     temp.push([res1.data, res2.data, data]);
  //     Setmatches((matches) => [...matches, [res1.data, res2.data, data]]);
  //   });
  // };

  // useEffect(()=> {
  //     getMatches();
  // },[])

  // console.log(matches);

  return (
    <div className="App">
      <Navigation />
      <Route exact path="/" component={HomePage} />

      <ContainerMain>
        <Route path="/bets" component={Bets} />
        <Route path="/login" component={SignInSide} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/upcoming" component={Upcoming} />
        <Route path="/live-polls" component={Polls} />
        <Route path="/your-polls" component={AllPolls} />
      </ContainerMain>
    </div>
  );
}

export default withRouter(App);
