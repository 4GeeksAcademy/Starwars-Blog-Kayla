import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

function StarshipCard() {
  const { store, actions } = useContext(Context);
  const [starships, setStarships] = useState([]);

useEffect(() => {
    actions.fetchstarships();
    }, []);

useEffect(() => {
    setStarships(store.starships);
}, [store.starships]);

const handlefavorites = (starship) => {
    const isFavorite = store.favorites.some((fav) => fav.uid === starship.uid);
    if (isFavorite) {
        actions.removefavorites(starship.name);
    } else {
        actions.addfavorites(starship.model, starship.uid, "starships");
    }
};

return (
    <div
      className="d-flex col-10 overflow-auto mt-5 mx-auto cards"
      style={{ height: "50rem" }}
    >
      {starships.map((starship, index) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.uid === starship.uid && fav.type === "starships"
        );
        return (
          <div
            key={index}
            className="card col-1 mx-1"
            style={{ width: "30rem", height: "48rem" }}
          >
            <h3>{starship.name}</h3>
            <img
              src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`}
              className="card-img-top"
              alt={starship.name}
              style={{ height: "30rem", width: "30rem" }}
            />
            <Link to={`/StarshipDetail/` + (starship.uid)}>Learn More</Link>
            <button
              className={isFavorite ? "fas fa-heart" : "far fa-heart"}
              onClick={() => handleFavorites(starship)}
            >
              {" "}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default StarshipCard;
