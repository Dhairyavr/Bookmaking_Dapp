import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { logout } from "./redux/user/user-actions";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  MenuItem: {
    fontSize: "18px",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Navigation = ({ history, userdata, logout }) => {
  const classes = useStyles();
  const [route, setroute] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setroute(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const logoutuser = () => {
    logout();
    history.push("/");
    window.location.reload();
  };
  return (
    <div>
      <nav
        id="menu"
        className="navbar navbar-default navbar-fixed-top"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          position: "sticky",
        }}
      >
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              {" "}
              <span className="sr-only">Toggle navigation</span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
            <a
              className="navbar-brand page-scroll"
              href="/"
              style={{ fontWeight: "bold" }}
            >
              Dream Arena
            </a>{" "}
          </div>

          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/#features" className="page-scroll">
                  Features
                </a>
              </li>

              <li>
                <a href="/#contact" className="page-scroll">
                  Contact
                </a>
              </li>

              <li>
                {Object.keys(userdata).length > 0 ? (
                  <div>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={route}
                        onChange={handleChange}
                      >
                        <MenuItem
                          value="dashboard"
                          className="page-scroll"
                          style={{ fontColor: "black" }}
                          onClick={() => history.push("/dashboard")}
                        >
                          DashBoard
                        </MenuItem>
                        <MenuItem
                          value="logout"
                          className="page-scroll"
                          onClick={logoutuser}
                        >
                          Logout
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                ) : (
                  <a className="page-scroll" href="/login">
                    Login
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Navigation)
);
