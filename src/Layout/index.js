import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import CreateDeck from "../Deck/CreateDeck";
import NotFound from "./NotFound";
import HomeScreen from "../Deck/HomeScreen";
import StudyScreen from "../Deck/StudyScreen";
import DeckScreen from "../Deck/DeckScreen";
import CreateCard from "../Card/CreateCard";
import EditDeck from "../Deck/EditDeck";
import EditCard from "../Card/EditCard";

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
        {/*Edit Card Screen */}
        <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        {/*Create Card Screen */}
        <Route exact={true} path="/decks/:deckId/cards/new">
          <CreateCard />
        </Route>
        <Route exact={true} path="/decks/:deckId/edit">
          <EditDeck />
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
    </>
  );
}

export default Layout;
