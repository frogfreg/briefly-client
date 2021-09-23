import "./tailwind.css";
import "./style.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { loggedUserDataVar, refetchFavoritesVar } from "./cache";
import Home from "./components/Home";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import User from "./components/User";
import Thread from "./components/Thread";
import Search from "./components/Search";

const GET_USER_FEED = gql`
  query getUserFeed {
    loggedInUser {
      userId
      picture
      feed {
        briefId
        text
        images
        childBriefs {
          briefId
        }
        author {
          username
          userId
          picture
        }
        dateCreated
        favoriteCount
        deleted
      }
    }
  }
`;

const GET_USER_FAVORITES = gql`
  query getUserFavorites($userId: ID!) {
    user(id: $userId) {
      favorites {
        briefId
      }
    }
  }
`;

function App() {
  const [getUserFeed, { error, data }] = useLazyQuery(GET_USER_FEED);
  const [getUserFavorites, { data: favoritesData, refetch: refetchFavorites }] =
    useLazyQuery(GET_USER_FAVORITES);

  refetchFavoritesVar(refetchFavorites);

  useEffect(() => {
    if (data && !favoritesData) {
      getUserFavorites({ variables: { userId: data.loggedInUser.userId } });
    } else if (data && favoritesData) {
      loggedUserDataVar({
        feed: data.loggedInUser.feed,
        favorites: favoritesData.user.favorites,
        userId: data.loggedInUser.userId,
      });
    }
    if (error) {
      console.error(error);
    }
  }, [data, favoritesData, error]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home">
          <Home getUserFeed={getUserFeed} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/:username/:briefid">
          <Thread />
        </Route>
        <Route path="/:username">
          <User />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
