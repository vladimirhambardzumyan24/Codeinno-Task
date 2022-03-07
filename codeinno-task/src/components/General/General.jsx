/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import axios from "axios";
import { requestUrl } from "../../constants/requestUrl";
import { Link } from "react-router-dom";

export default function General() {
  const [restaurantsData, setRestaurantsData] = useState([]);

  useEffect(() => {
    axios.get(requestUrl.GET_RESTAURANTS).then((resp) => {
      const sortedRestaurantData = resp.data.restaurants.sort(
        (a, b) => b.rate - a.rate
      );
      setRestaurantsData(sortedRestaurantData);
      console.log(resp.data.restaurants);
    });
  }, []);

  return (
    <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Restaurants List
        </h5>
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {restaurantsData.length > 0
            ? restaurantsData.map((restaurant) => {
                return (
                  <li key={restaurant.id} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={restaurant.photograph}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {restaurant.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {restaurant.neighborhood}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {restaurant.rate}
                      </div>
                      <div>
                        <Link
                          to={`/restaurant/${restaurant.id}`}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          View Restaurant
                        </Link>
                      </div>
                    </div>
                  </li>
                );
              })
            : ""}
        </ul>
      </div>
    </div>
  );
}
