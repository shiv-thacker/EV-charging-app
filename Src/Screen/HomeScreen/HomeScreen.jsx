import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AppMapView from "./Components/AppMapView";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import { UserLocationContext } from "../../Context/UserLocationContext";
import GlobalApi from "../../Utils/GlobalApi";
import PlaceListView from "./Components/PlaceListView";
import { SelectedMarkerContext } from "../../Context/SelectedMarkerContext";

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(0);
  useEffect(() => {
    location && GetNearByPlace();
  }, [location]);

  const GetNearByPlace = () => {
    const data = {
      includedTypes: ["electric_vehicle_charging_station"],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
          radius: 5000.0,
        },
      },
    };
    GlobalApi.NewNearByPlace(data)
      .then((res) => {
        //it gives data but showing [object] somewhere instead of whole data, for that we will add JSON.stringify(res.data), still it has few [object]
        console.log(res.data);
        setPlaceList(res.data?.places);
      })
      .catch((error) => {
        console.error("Error occurred while fetching nearby places:", error);
      });
  };
  return (
    <SelectedMarkerContext.Provider
      value={{ selectedMarker, setSelectedMarker }}
    >
      <View>
        <View style={styles.headercontainer}>
          <Header />
          <SearchBar
            searchedLocation={(location) => {
              setLocation({ latitude: location.lat, longitude: location.lng });
            }}
          />
        </View>
        {placeList && <AppMapView placeList={placeList} />}
        <View style={styles.placeListContainer}>
          {placeList && <PlaceListView placeList={placeList} />}
        </View>
      </View>
    </SelectedMarkerContext.Provider>
  );
}
const styles = StyleSheet.create({
  headercontainer: {
    position: "absolute",
    padding: 10,
    zIndex: 10,
    width: "100%",
    paddingHorizontal: 20,
  },

  placeListContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 11,
    width: "100%",
  },
});
