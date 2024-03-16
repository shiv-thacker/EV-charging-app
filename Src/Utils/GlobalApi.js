import axios from "axios";
const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";

const API_KEY = "AIzaSyCXsk8oRxfkEmQCh8IO96JFms-7ajCKE24";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formatted_address",
      "places.location",
      "places.evChargeOptions",
      "places.shortFormattedAddress",
      "places.photos",
      "places.id",
    ],
    //google places returns too much details, where google feild mask provide only details what you need
  },
};

const NewNearByPlace = (data) => {
  return axios.post(BASE_URL, data, config);
};

export default {
  NewNearByPlace,
  API_KEY,
};
