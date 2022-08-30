import React from "react";
import CreateDeckButton from "./CreateDeckButton";
import DeckList from "./DeckList";

function HomeScreen() {
  return (
    <React.Fragment>
      <CreateDeckButton />
      <DeckList />
    </React.Fragment>
  );
}

export default HomeScreen;
