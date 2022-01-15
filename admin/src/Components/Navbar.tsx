import React from "react";
import "./Navbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="NavbarWrapper">
        <div className="topLeft">
          <span className="title">DashBoard</span>
        </div>
        <div className="topRight">
          <div className="NavbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="NavbarIconContainer">
            <Language />
            <span className="IconBadge">2</span>
          </div>
          <div className="NavbarIconContainer">
            <Settings />
          </div>
          <img src="" alt="" className="Avatar" />
        </div>
      </div>
    </div>
  );
}
