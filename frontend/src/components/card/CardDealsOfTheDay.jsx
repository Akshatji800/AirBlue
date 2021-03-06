import React from "react";
import { ReactComponent as IconStopwatch } from "bootstrap-icons/icons/stopwatch.svg";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

// Random component
const Completionist = () => <span>Deals End!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span className="text-muted small">
        {hours}:{minutes}:{seconds} Left
      </span>
    );
  }
};

const CardDealsOfTheDay = (props) => {
  var path = window.location.pathname
  var n = path.lastIndexOf("/");
  var user = path.substring(n+1);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title pb-3 border-bottom">
          {props.title} <IconStopwatch className="text-primary" />{" "}
          <Countdown
            date={props.endDate}
            renderer={renderer}
          />
          <span className="float-right">
            <Link to={{
        pathname: `/category/${user}`,
        state: { authenticated: true }
      }} className="btn btn-sm btn-outline-primary">
              View All
            </Link>
          </span>
        </h5>
        {props.children}
      </div>
    </div>
  );
};

export default CardDealsOfTheDay;
