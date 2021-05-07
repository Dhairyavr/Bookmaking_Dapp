import React from "react";
import { Grid, Button } from "@material-ui/core";
import data from "./data/data.json";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
const HomePage = ({ history, userdata }) => {
  console.log(data);
  return (
    <>
      <div style={{ marginTop: "150px" }}>
        <Grid style={{ width: "90%", margin: "auto" }} container>
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            item
            sm={5}
          >
            <div style={{ marginLeft: "20px", marginBottom: "35px" }}>
              <h1 style={{ margin: "5px", fontWeight: "bold" }}>
                E-SPORTS BETTING PLATFORM ON ETHEREUM
              </h1>
              <p style={{ fontWeight: "lighter", margin: "15px" }}>
                Bet on outcome of E-sports events from all around the globe.
                Login to your account to start betting over the on-going
                matches.
              </p>
              {Object.keys(userdata).length === 0 ? (
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    color: "white",
                    background: "#202020",
                    fontWeight: "bold",
                  }}
                  onClick={() => history.push("/login")}
                >
                  LOGIN TO START
                </Button>
              ) : null}
            </div>
          </Grid>
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            item
            sm={7}
          >
            <img
              alt="Landing page"
              width="90%"
              style={{ opacity: 0.9 }}
              src={process.env.PUBLIC_URL + "/images/landing.svg"}
            />
          </Grid>
        </Grid>
      </div>
      <div
        id="features"
        className="text-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2 style={{ color: "White" }}>Features</h2>
          </div>
          <div className="row">
            {data
              ? data.Features.map((d, i) => (
                  <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                    {" "}
                    <img src={d.icon} height="250px" width="250px" alt="icon" />
                    <h3 style={{ color: "White", fontWeight: "1000" }}>
                      {d.title}
                    </h3>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#393e46" }}>
        <div id="contact" style={{ backgroundColor: "#393e46" }}>
          <div className="container" style={{ backgroundColor: "#393e46" }}>
            <div className="col-md-8" style={{ backgroundColor: "#393e46" }}>
              <div className="row" style={{ backgroundColor: "#393e46" }}>
                <div
                  className="section-title"
                  style={{ backgroundColor: "#393e46" }}
                >
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </p>
                </div>
                <form name="sentMessage" id="contactForm" noValidate>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          placeholder="Name"
                          required="required"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email"
                          required="required"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker"></i> Address
                  </span>
                  {data ? data.Contact.address : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  {data ? data.Contact.phone : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                  {data ? data.Contact.email : "loading"}
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="social">
                  <ul>
                    <li>
                      <a href={data ? data.Contact.facebook : "/"}>
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href={data ? data.Contact.twitter : "/"}>
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href={data ? data.Contact.youtube : "/"}>
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});
export default withRouter(connect(mapStateToProps)(HomePage));
