import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewStyle from "../../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../../Context/UserLocationContext";
import Markers from "./Markers";
import { horizontalScale, verticalScale } from "../../../Utils/Dimensions";

const AppMapView = ({ placeList }) => {
  const { location, setLocation } = useContext(UserLocationContext);
  return (
    location?.latitude && (
      <View>
        <MapView
          style={styles.map}
          provider="google"
          customMapStyle={MapViewStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0522,
            longitudeDelta: 0.0421,
          }}
        >
          {location ? (
            <Marker
              coordinate={{
                latitude: location?.latitude,
                longitude: location?.longitude,
              }}
            >
              <Image
                source={require("../../../../assets/Images/car-marker.png")}
                style={{
                  width: horizontalScale(50),
                  height: verticalScale(50),
                }}
              />
            </Marker>
          ) : null}

          {placeList &&
            placeList.map((item, index) => (
              <Markers key={index} place={item} index={index} />
            ))}
        </MapView>
      </View>
    )
  );
};

export default AppMapView;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
