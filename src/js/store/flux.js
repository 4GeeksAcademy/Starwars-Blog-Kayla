const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white"
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white"
		  }
		],
		people: [],
		vehicles: [],
		planets: [],
		favorites: []
	  },
	  actions: {
		// Existing actions
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
		changeColor: (index, color) => {
		  const store = getStore();
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
		  setStore({ demo: demo });
		},
		// New actions for fetching data
		loadPeople: () => {
		  fetch("https://www.swapi.tech/api/people")
			.then((response) => response.json())
			.then((data) => setStore({ people: data.results }));
		},
		loadVehicles: () => {
		  fetch("https://www.swapi.tech/api/vehicles")
			.then((response) => response.json())
			.then((data) => setStore({ vehicles: data.results }));
		},
		loadPlanets: () => {
		  fetch("https://www.swapi.tech/api/planets")
			.then((response) => response.json())
			.then((data) => setStore({ planets: data.results }));
		},
		// Action to handle favorites
		toggleFavorite: (item) => {
		  const store = getStore();
		  const favorites = store.favorites;
		  const index = favorites.findIndex((fav) => fav.uid === item.uid);
		  if (index === -1) {
			favorites.push(item);
		  } else {
			favorites.splice(index, 1);
		  }
		  setStore({ favorites: favorites });
		}
	  }
	};
  };
  
  export default getState;
  