import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import Colors from "../../../Utils/Colors";
import GlobalApi from "../../../Utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Utils/FirebaseConfig";
// import { useUser } from "@clerk/clerk-expo";
import { deleteDoc } from "firebase/firestore";
import { verticalScale } from "../../../Utils/Dimensions";
import { Authcontext } from "../../../Context/Authcontext";

const PlaceItem = ({ place, isFav, markedFav }) => {
  const { user } = useContext(Authcontext);
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  // const { user } = useUser();
  const onSetFav = async (place) => {
    await setDoc(doc(db, "ev-fav-place", place?.id.toString()), {
      place: place,
      email: user?.email,
    });
    ToastAndroid.show("fav place addded!", ToastAndroid.BOTTOM);
    markedFav();
  };

  const onRemoveFav = async (placeId) => {
    await deleteDoc(doc(db, "ev-fav-place", placeId.toString()));
    ToastAndroid.show("Fav Removed!", ToastAndroid.TOP);
    markedFav();
  };

  const onDirectionClick = () => {
    const url = Platform.select({
      ios:
        "maps:" +
        place?.location?.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
      android:
        "geo:" +
        place?.location?.latitude +
        "," +
        place?.location?.longitude +
        "?q=" +
        place?.formattedAddress,
    });

    Linking.openURL(url);
  };

  console.log("redering placeitem");
  return (
    <View
      style={{
        borderRadius: 10,
        width: Dimensions.get("window").width,
      }}
    >
      <LinearGradient
        colors={["transparent", "#ffffff", "#ffffff"]}
        style={{ padding: 15 }}
      >
        <ImageBackground
          source={
            place?.photos
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "/media?key=" +
                    GlobalApi.API_KEY +
                    "&maxHeightPx=800&maxWidthPx=1000",
                }
              : require("../../../../assets/Images/ev-vehicle.png")
          }
          style={{
            width: "100%",
            borderRadius: 10,
            height: verticalScale(150),
            resizeMode: "cover",
          }}
        >
          {!isFav ? (
            <TouchableOpacity
              style={{
                position: "absolute",
                margin: 5,
                right: 0,
              }}
              onPress={() => onSetFav(place)}
            >
              <Ionicons name="heart-outline" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                position: "absolute",
                margin: 5,
                right: 0,
              }}
              onPress={() => onRemoveFav(place.id)}
            >
              <Ionicons name="heart-sharp" size={24} color="red" />
            </TouchableOpacity>
          )}
        </ImageBackground>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 17, fontFamily: "outfit-medium" }}>
            {place.displayName?.text}
          </Text>
          <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>
            {place?.shortFormattedAddress}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: "outfit",
                  color: Colors.GRAY,
                  fontSize: 17,
                }}
              >
                Connectors
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 20,
                  marginTop: 2,
                }}
              >
                {place?.evChargeOptions?.connectorCount} Points
              </Text>
            </View>
            <Pressable
              style={{
                padding: 12,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 6,
                paddingHorizontal: 14,
                height: verticalScale(50),
              }}
              onPress={() => onDirectionClick()}
            >
              <FontAwesome name="location-arrow" size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
