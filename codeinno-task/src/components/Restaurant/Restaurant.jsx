/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { requestUrl } from "../../constants/requestUrl";

export default function Restaurant() {
  const id = useParams();
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    axios.post("/restaurant-data", { id }).then((resp) => {
      setRestaurantData(resp.data[0]);
    });
  }, []);
  return (
    <div className="flex justify-center">
      <div className="w-1/2 rounded-lg shadow-xl bg-white p-10">
        <img
          src={restaurantData.photograph}
          alt=""
          className="rounded-full p-4 h-40 mx-auto"
        />
        <header className=" text-2xl font-extrabold py-4 px-4 text-center">
          {restaurantData.name}
        </header>
        <div>
          <ul className="text-gray-500 text-center font-semibold">
            <li>{restaurantData.neighborhood}</li>
            <li>{restaurantData.address}</li>
            <li>{restaurantData.rate}</li>
          </ul>
        </div>
        <footer className="text-center py-3 px-8 text-gray-500">
          <button className="py-2 px-4 mt-5 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-600">
            FOLLOW
          </button>
        </footer>
      </div>
    </div>
  );
}
