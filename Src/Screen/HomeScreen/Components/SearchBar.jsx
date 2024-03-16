import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const SearchBar = ({ searchedLocation }) => {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="Search EV Charging Station"
        // to erase powered by google, you have to provide false to enablePoweredByContainer
        enablePoweredByContainer={false}
        //to fetch details, like coordinates lati, longi
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log("data ----->", data, "details----->", details);
          searchedLocation(details?.geometry?.location);
        }}
        query={{
          key: "AIzaSyCXsk8oRxfkEmQCh8IO96JFms-7ajCKE24",
          language: "en",
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
