import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BiCheck } from "react-icons/bi";
import Img from "./aaaa.jpeg";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setcurrentuser } from "./redux/user/user-actions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Dream Arena {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10rem",
    height: "50vh",
  },
  image: {
    backgroundColor: "White",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
    fontWeight: "Bold",
    fontSize: "19px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide({ history, setcurrentuser }) {
  const classes = useStyles();

  useEffect(() => {}, []);

  const checkcredentails = async () => {
    console.log(details);
    Seterrormsg({ user_id: "", password: "" });
    if (details.user_id === "") {
      Seterrormsg({ password: "", user_id: "This field is required" });
    } else if (details.password === "") {
      Seterrormsg({ user_id: "", password: "This field is required" });
    } else if (details.password.length <= 6) {
      Seterrormsg({
        user_id: "",
        password: "Password Should be minimum 7 Characters",
      });
    } else {
      const response = await axios.post("http://localhost:5000/login", {
        user_id: details.user_id,
        password: details.password,
      });
      console.log(response.data);
      if (response.data === "") {
        Seterrormsg({ ...errormsg, invalid: "Invalid Credentials" });
      } else {
        setcurrentuser(response.data);
        history.push("/dashboard");
      }
    }
  };
  const [details, Setdetails] = useState({ user_id: "", password: "" });
  const [errormsg, Seterrormsg] = useState({
    user_id: "",
    password: "",
    invalid: "",
  });
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <img src={Img} alt="Logo" height={200} width={200} />
        <div style={{ fontWeight: "1000" }}>About Us</div>
        <div style={{ marginBottom: "3rem" }}>
          Dream Arena is a Bookmaking Application that allows its users to place
          bets on their desired polls and win big!{" "}
        </div>
        <div>
          <span style={{ fontWeight: "800" }}>Why Choose Us?</span>
          <br />
          <div>
            <span>
              <BiCheck /> Decentralized
            </span>
            <br />
            <span>
              <BiCheck /> Easy To Use
            </span>
            <br />

            <span>
              <BiCheck /> Easy Money Processing
            </span>
            <br />

            <span>
              <BiCheck /> Easy To Track Payments
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {errormsg.invalid && (
          <Alert
            severity="error"
            onClose={() => Seterrormsg({ ...errormsg, invalid: "" })}
          >
            {errormsg.invalid}
          </Alert>
        )}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user_id"
              label="User ID"
              name="user_id"
              value={details.user_id}
              error={errormsg.user_id ? true : false}
              helperText={errormsg.user_id}
              onChange={(e) =>
                Setdetails({ ...details, [e.target.name]: e.target.value })
              }
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={details.password}
              error={errormsg.password ? true : false}
              helperText={errormsg.password}
              onChange={(e) =>
                Setdetails({ ...details, [e.target.name]: e.target.value })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={checkcredentails}
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
          <Copyright />
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setcurrentuser: (user) => dispatch(setcurrentuser(user)),
});
export default withRouter(connect(null, mapDispatchToProps)(SignInSide));
