import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import { Marker } from "react-native-maps";
import { SelectedMarkerContext } from "../../../Context/SelectedMarkerContext";
import { horizontalScale, verticalScale } from "../../../Utils/Dimensions";
import Colors from "../../../Utils/Colors";

const Markers = ({ index, place }) => {
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );
  return (
    <Marker
      coordinate={{
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
      }}
      onPress={() => setSelectedMarker(index)}
    >
      <Image
        source={require("../../../../assets/Images/power-marker.png")}
        style={{
          width: horizontalScale(50),
          height: verticalScale(50),
          tintColor: selectedMarker === index ? Colors.PRIMARY : null,
        }}
      />
    </Marker>
  );
};

export default Markers;

const styles = StyleSheet.create({});
