import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import CreateDeck from "../CreateDeck";
import NotFound from "./NotFound";
import HomeScreen from "../HomePage/HomeScreen";
import StudyScreen from "../StudyPage/StudyScreen";
import DeckScreen from "../DeckPage/DeckScreen";

function Layout() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          {/*Home Screen */}
          <Route exact={true} path="/">
            <HomeScreen />
          </Route>
          {/*Study Screen */}
          <Route exact={true} path="/decks/:deckId/study">
            <StudyScreen />
          </Route>
          {/*Deck Screen */}
          <Route exact={true} path="/decks/:deckId">
            <DeckScreen />
          </Route>
          {/*Create Deck Screen */}
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          {/*Not Found Screen*/}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default Layout;
