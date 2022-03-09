export default function RestaurantDataSave(items) {
    localStorage.setItem("restaurantData", JSON.stringify(items));
  }
  
  export function getRestaurantData() {
    return JSON.parse(localStorage.getItem("restaurantData"));
  }