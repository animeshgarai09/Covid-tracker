import "./static/css/app.scss";
import React, { lazy,Suspense} from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Search from "./components/Search";
import { ReactComponent as HomeIcon } from "./static/svg/icons/home.svg";
import { ReactComponent as NewsIcon } from "./static/svg/icons/newspaper.svg";
import { ReactComponent as QuestionIcon } from "./static/svg/icons/question.svg";
import { ReactComponent as SearchIcon } from "./static/svg/icons/search.svg";

import { Route,Redirect, Switch, useLocation } from "react-router-dom";

const Home=lazy(()=> import('./components/Home'));
const News = lazy(() => import("./components/News"));
const State = lazy(() => import("./components/State"));


const App = () => {
  const location = useLocation()
  const pages = [
    {
      pageLink: "/",
      view: Home,
      icon: HomeIcon,
      displayName: "Home",
      showInNavbar: true,
    },
    {
      pageLink: "/news",
      view: News,
      icon: NewsIcon,
      displayName: "News",
      showInNavbar: true,
    },
    {
      pageLink: "/about",
      view: About,
      icon: QuestionIcon,
      displayName: "About",
      showInNavbar: true,
    },
    {
      pageLink: "/search",
      view: Search,
      icon: SearchIcon,
      displayName: "Search",
      showInNavbar: true,
    },
    {
      pageLink: "/state/:stateCode",
      view: State,
      displayName: "State",
      showInNavbar: false,
    },
  ];

  return (
    <div className="App parent-con">
      <Navbar pages={pages} />
      <Suspense fallback={<div />}>
        <Switch location={location}>
          {pages.map((page, i) => {
            return (
              <Route
                exact
                path={page.pageLink}
                render={({ match }) => <page.view />}
                key={i}
              ></Route>
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
