import React from "react";
import { Link } from "react-router-dom";
import css from "../../styles/SubHeader.module.css";

const SubHeader = () => {
  return (
    <div className="nav-scroller bg-body shadow-sm">
      <nav className="nav" aria-label="Secondary navigation">
        <Link className={`${css.myOpt} ${css.myleftOpt} nav-link`} to="/movies">
          Movies
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="/streams">
          Stream
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="/events">
          Events
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="/plays">
          Plays
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="/sports">
          Sports
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="/activities">
          Activities
        </Link>
        <Link className={`${css.myrigthOpt} ${css.myOpt} nav-link`} to="#">
          ListYourShow
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="#">
          Corporates
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="#">
          Offer
        </Link>
        <Link className={`${css.myOpt} nav-link`} to="#">
          Gift Cards
        </Link>
      </nav>
    </div>
  );
};

export default SubHeader;
