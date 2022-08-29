import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import CreateDeck from "../CreateNewDeck/CreateDeck";
import NotFound from "./NotFound";
import HomeScreen from "../HomePage/HomeScreen";
import StudyScreen from "../StudyPage/StudyScreen";
import DeckScreen from "../DeckPage/DeckScreen";
import CreateCard from "../CreateNewCard/CreateCard";

function Layout() {
  return (
    <>
      <Header />
      <Switch>
        {/*Home Screen */}
        <Route exact={true} path="/">
          <HomeScreen />
        </Route>
        {/*Study Screen */}
        <Route exact={true} path="/decks/:deckId/study">
          <StudyScreen />
        </Route>
        {/*Create Deck Screen */}
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        {/*Create Card Screen */}
        <Route exact={true} path="/decks/:deckId/cards/new">
          <CreateCard />
        </Route>
        {/*Deck Screen */}
        <Route exact={true} path="/decks/:deckId">
          <DeckScreen />
        </Route>
        {/*Not Found Screen*/}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default Layout;
