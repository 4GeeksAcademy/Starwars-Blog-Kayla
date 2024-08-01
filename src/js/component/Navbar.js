import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
//import "../styles/home.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(store.favorites);
  }, [store.favorites]);

  return (
    <nav className="navbar bg-body-territory">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="search"
            aria-label="search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true"
            aria-controls="favoritesDropdown"
          >
            Favorites
          </button>
          <ul className="dropdown-menu dropdown-menu-end" id="favoritesDropdown">
            {favorites?.map((favorite) => (
              <li key={favorite.id}>
                {favorite.type === "character" && (
                  <Link to={`/CharacterDetails/${favorite.id}`}>
                    {favorite.name}
                  </Link>
                )}
                {favorite.type === "starship" && (
                  <Link to={`/StarshipDetails/${favorite.id}`}>
                    {favorite.name}
                  </Link>
                )}
                {favorite.type === "planet" && (
                  <Link to={`/PlanetDetails/${favorite.id}`}>
                    {favorite.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
