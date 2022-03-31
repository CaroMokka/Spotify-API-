import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "./Card.js";
import "../../styles/artists.css";

export const Artists = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");
  console.log(store.artists);
  console.log(store.albums);
  console.log(store.tracks);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const paramsArray = [
      {
        q: search,
      },
      {
        type: "artist,album,track",
      },
      {
        offset: 10,
      },
    ];
    const searchResponse = await actions.searchArtists(paramsArray);
    console.log(searchResponse);
  };

  return (
    <div className="container-gallery d-flex flex-column">
      <div className="search-box p-4">
        <h1>ARTISTS</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="container-gallery">
        {store.artists.map((artist) => {
          return (
            <Card
              key={artist.id}
              name={artist.name}
              img={
                artist.images.length ? (
                  <img width={"30%"} src={artist.images[0].url} alt=""></img>
                ) : (
                  <div>No Image</div>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
};
