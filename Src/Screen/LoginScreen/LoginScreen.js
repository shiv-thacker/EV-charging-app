import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import { horizontalScale, verticalScale } from "../../Utils/Dimensions";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        marginTop: 80,
      }}
    >
      <Image
        style={styles.logoImage}
        source={require("../../../assets/Images/evlogo.png")}
      />

      <Image
        source={require("../../../assets/Images/ev-vehicle.png")}
        style={styles.bgImage}
      />

      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>
          Your ultimate EV charging Station Finder app
        </Text>
        <Text style={styles.desc}>
          Find EV charging Station near you,plan trip and so much more in just
          one click
        </Text>
        <TouchableOpacity style={styles.buttons} onPress={onPress}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Login with google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: horizontalScale(200),
    height: verticalScale(80),
    resizeMode: "stretch",
  },
  bgImage: {
    width: "100%",
    height: verticalScale(240),
    marginTop: 20,
    objectFit: "cover",
  },
  heading: {
    fontSize: 25,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginTop: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: "outfit",
    textAlign: "center",
    marginTop: 15,
    color: Colors.GRAY,
  },

  buttons: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 40,
  },
});
