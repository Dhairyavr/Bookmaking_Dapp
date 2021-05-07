import React from "react";
import "./card.css";
const Card = () => {
  return (
    <div
      className="ui card"
      style={{
        width: "500px",
        boxShadow: "2px 4px 6px 2px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="content">
        <div className="header">About Amy</div>
      </div>
      <div className="content">
        <div class="ui equal width grid">
          <div class="column">
            <div class="ui segment">1</div>
          </div>
          <div class="eight wide column">
            <div class="ui segment">2</div>
          </div>
          <div class="column">
            <div class="ui segment">3</div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <img
              src="https://cdn.sportmonks.com/images/cricket/teams/7/39.png"
              alt="ok"
              heigth="110"
              width="100"
              style={{}}
            />
          </div>
          <div className="col">
            <img
              src="https://cdn.sportmonks.com/images/cricket/teams/7/39.png"
              alt="ok"
              heigth="110"
              width="100"
              style={{}}
            />
          </div>
        </div>
      </div>
      <div className="extra content">
        <i aria-hidden="true" className="user icon"></i>4 Friends
      </div>
      <div></div>
    </div>
  );
};

export default Card;
