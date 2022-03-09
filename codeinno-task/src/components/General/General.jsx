import { useState } from "react";
import Map from "../Map/Map.jsx";
import RestaurantsList from "../RestaurantsList/RestaurantsList";

export default function General() {
  const [id, setID] = useState("");

  const getRestaurantsID = (id) => {
    setID(id);
  };

  return (
    <div className="flex">
      <RestaurantsList getRestaurantsID={getRestaurantsID} />
      <Map id={id} />
    </div>
  );
}
