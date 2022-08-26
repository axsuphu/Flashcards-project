import React, { useState } from "react";
import { Link } from "react-router-dom";

function CreateDeck() {
  const [newDeck, setNewDeck] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  //when submit is clicked, save the input form data and direct them to deck
  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit} name="create">
        <div className="nameLabel">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Deck Name"
            required
          ></input>
        </div>
        <div className="descriptionLabel">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Brief description of the deck"
            required
          ></textarea>
        </div>
        <Link to="/" className="btn btn-secondary" role="button">
          Cancel
        </Link>
        <input className="btn btn-primary" type="submit" value="Submit"></input>
      </form>
    </React.Fragment>
  );
}

export default CreateDeck;
