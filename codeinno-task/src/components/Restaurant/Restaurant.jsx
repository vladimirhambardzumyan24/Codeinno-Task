/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";

export default function Restaurant() {
  const id = useParams();
  const [restaurantData, setRestaurantData] = useState("");
  const [feedbackValue, setFeedbackValue] = useState("");
  const [feedbackErrorMessage, setFeedbackErrorMessage] = useState("");
  const [isSendFeedback, setIsSetFeedback] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.post("/restaurant-data", { ...id }).then((resp) => {
      setRestaurantData(resp.data[0]);
      setIsLoading(true);
    });
  }, [isSendFeedback]);

  const handleAddFeedBack = (e) => {
    e.preventDefault();
    if (feedbackValue) {
      setIsLoading(false);
      axios
        .post("/add-feedback", { ...id, comments: feedbackValue })
        .then(() => {
          setIsLoading(true);
          setFeedbackValue("");
          setIsSetFeedback(!isSendFeedback);
        });
    } else {
      setFeedbackErrorMessage("The filed is required!");
    }
  };

  const handleGetInputData = (e) => {
    setFeedbackErrorMessage("");
    setFeedbackValue(e.target.value);
  };

  return isLoading ? (
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
            <li>{restaurantData.rate} %</li>
          </ul>
        </div>
        <div className=" text-xl font-extrabold py-2 px-4 text-left">
          Feedback
        </div>
        {restaurantData.reviews.map((feedback, index) => {
          return (
            <div key={index} className="break-words py-2">
              {index + 1}. {feedback.comments}
            </div>
          );
        })}
        <footer className="text-center py-3 px-8 text-gray-500">
          <form
            onSubmit={(e) => handleAddFeedBack(e)}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="feedback"
              >
                ADD Feedback
              </label>
              <input
                onChange={(e) => handleGetInputData(e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="feedback"
                value={feedbackValue}
                type="feedback"
                placeholder="Enter Feedback"
              />
              <p className="text-red-500 text-xs italic">
                {feedbackErrorMessage}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
