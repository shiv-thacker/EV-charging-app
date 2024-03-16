import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../../Utils/Colors";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../Utils/Dimensions";

export default function Header() {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: horizontalScale(45),
          height: verticalScale(45),
          borderRadius: moderateScale(99),
        }}
      />
      <Image
        source={require("../../../../assets/Images/evlogo.png")}
        style={{
          width: horizontalScale(200),
          height: verticalScale(55),
          resizeMode: "contain",
        }}
      />
      <FontAwesome name="filter" size={24} color="transparent" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
