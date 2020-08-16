import React, { useState } from "react";
import { ReactComponent as Virus } from "../static/svg/virus.svg";
import { ReactComponent as Sun } from "../static/svg/icons/sun.svg";
import { ReactComponent as Moon } from "../static/svg/icons/night.svg";
import { ReactComponent as Menu } from "../static/svg/icons/menu.svg";
import { ReactComponent as Close } from "../static/svg/icons/close.svg";
import { ReactComponent as Abstract } from "../static/svg/abstract.svg";

import { NavLink } from "react-router-dom";
import { useWindowSize } from "react-use";
import useDarkMode from "use-dark-mode";
import classNames from "classnames";

const Navbar = (props) => {
  const darkmode = useDarkMode(false);
  const windowSize = useWindowSize();
  console.log(windowSize.width);

  const [drawerExpand, setdrawerExpand] = useState(false);

  return (
    <div className="navbar">
      <div className="logo">
        <Virus />
        <span className={classNames({ abstract: windowSize.width > 768 })}>
          Covid<b>Tracker</b>
          {windowSize.width > 768 && <Abstract />}
        </span>
      </div>
      {windowSize.width < 769 && (
        <div className="options" onClick={() => setdrawerExpand(!drawerExpand)}>
          {drawerExpand ? <Close /> : <Menu />}
        </div>
      )}
      <div
        className={classNames("links-con", {
          hide: !drawerExpand && windowSize.width < 769,
        })}
      >
        {props.pages.map((page, i) => {
          if (page.showInNavbar === true) {
            return (
              <NavLink
                exact
                to={page.pageLink}
                activeClassName="active"
                onClick={() => {
                  setdrawerExpand(false);
                }}
                key={i}
              >
                <div className="link-group">
                  <page.icon />
                  <span>{page.displayName}</span>
                </div>
              </NavLink>
            );
          }
          return null;
        })}
        <div className="link-group " onClick={darkmode.toggle}>
          {darkmode.value ? <Sun /> : <Moon />}
          <span>{darkmode.value ? "Lights On" : "Lights Off"}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
