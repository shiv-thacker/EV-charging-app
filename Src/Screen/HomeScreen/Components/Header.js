import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
// import { useUser } from "@clerk/clerk-expo";
import Colors from "../../../Utils/Colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../Utils/Dimensions";
import { Authcontext } from "../../../Context/Authcontext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";

export default function Header() {
  // const { user } = useUser();
  const { user } = useContext(Authcontext);
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {/* <Image
        source={{
          uri: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/35/IronMan-EndgameProfile.jpg/revision/latest?cb=20231025163251",
        }}
        style={{
          width: horizontalScale(45),
          height: verticalScale(45),
          borderRadius: moderateScale(99),
        }}
      /> */}

      <Image
        source={require("../../../../assets/Images/evlogo.png")}
        style={{
          width: horizontalScale(200),
          height: verticalScale(55),
          resizeMode: "contain",
          alignSelf: "center",
          backgroundColor: "#ffffff88",
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
