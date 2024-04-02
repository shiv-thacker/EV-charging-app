import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Linking,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../Utils/Colors";
// import * as WebBrowser from "expo-web-browser";
// import { useOAuth } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "../../../hooks/useWarmUpBrowser";
import { horizontalScale, verticalScale } from "../../Utils/Dimensions";
import { auth } from "../../Utils/FirebaseConfig";
import { Octicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// WebBrowser.maybeCompleteAuthSession();

const ios = Platform.OS == "ios";

export default function LoginScreen() {
  const { top } = useSafeAreaInsets();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  // // Warm up the android browser to improve UX
  // // https://docs.expo.dev/guides/authentication/#improving-user-experience
  // useWarmUpBrowser();

  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // const onPress = async () => {
  //   try {
  //     const { createdSessionId, signIn, signUp, setActive } =
  //       await startOAuthFlow();

  //     if (createdSessionId) {
  //       setActive({ session: createdSessionId });
  //     } else {
  //       // Use signIn or signUp for next steps such as MFA
  //     }
  //   } catch (err) {
  //     console.error("OAuth error", err);
  //   }
  // };
  const signIn = async () => {
    if (!email || !password) {
      Alert.alert("Sign In", "Please Fill All The Feilds");
      return;
    }
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-credential)")) msg = "Wrong Credentials";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";

      Alert.alert("Sign in", `${msg}`);
    } finally {
      setLoading(false);
    }
  };
  const signUp = async () => {
    if (!email || !password) {
      Alert.alert("Sign In", "Please Fill All The Feilds");
      return;
    }
    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      Alert.alert("Sign up", "user signed up");
    } catch (error) {
      let msg = error.message;

      if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "This email is already in use";
      if (
        msg.includes(
          "Firebase: Password should be at least 6 characters (auth/weak-password)"
        )
      )
        msg =
          "Firebase: Password should be at least 6 characters / weak password";
      Alert.alert(`Sign Up`, `${msg}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "white",
          flex: 1,
          paddingTop: ios ? top : top + hp(0),
        }}
      >
        <StatusBar style={"dark"} />
        {/* <Image
          style={styles.logoImage}
          source={require("../../../assets/Images/evlogo.png")}
        /> */}

        <Image
          source={require("../../../assets/Images/ev-vehicle.png")}
          style={styles.bgImage}
        />

        <View style={{ padding: wp(2) }}>
          <Text style={styles.heading}>
            Your ultimate EV charging Station Finder app
          </Text>
          <Text style={styles.desc}>
            Find EV charging Station near you,plan trip and so much more in just
            one click
          </Text>
          <View style={{ gap: hp(2.5) }}>
            <View style={styles.inputtextcontainer}>
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.inputtextcontainer}>
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                placeholder="Password"
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            {loading ? (
              <View style={{ alignSelf: "center" }}>
                <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
              </View>
            ) : (
              <View>
                <TouchableOpacity style={styles.buttons} onPress={signIn}>
                  <Text
                    style={{
                      color: Colors.WHITE,
                      textAlign: "center",
                      fontFamily: "outfit",
                      fontSize: hp(2.3),
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} onPress={signUp}>
                  <Text
                    style={{
                      color: Colors.WHITE,
                      textAlign: "center",
                      fontFamily: "outfit",
                      fontSize: hp(2.3),
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "80%",
                    alignSelf: "center",
                  }}
                  onPress={() => {
                    Linking.openURL(
                      "https://sites.google.com/view/evcharging-station-app/home"
                    );
                  }}
                >
                  <Text
                    style={{
                      color: Colors.GRAY,
                      textAlign: "center",
                      marginTop: verticalScale(2),
                      fontSize: verticalScale(15),
                    }}
                  >
                    By continuing, you are assure to accept our{" "}
                    <Text style={{ color: Colors.BLUE, textAlign: "center" }}>
                      Privacy Policy
                    </Text>
                    , made by shivang thacker(developer)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
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
    marginTop: hp(1),
    objectFit: "cover",
  },
  heading: {
    fontSize: hp(3.2),
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginTop: hp(1),
  },
  desc: {
    fontSize: 17,
    fontFamily: "outfit",
    textAlign: "center",
    marginTop: hp(1),
    color: Colors.GRAY,
    marginBottom: hp(1),
  },

  buttons: {
    backgroundColor: Colors.PRIMARY,
    padding: hp(2),
    display: "flex",
    borderRadius: 99,
    marginTop: hp(2),
  },
  input: {
    fontSize: hp(2),
    flex: 1,
    fontWeight: "500",
    color: "#222222",
  },
  inputtextcontainer: {
    flexDirection: "row",
    gap: wp(4),
    paddingHorizontal: wp(4),
    height: hp(7),
    backgroundColor: "#DDDDDD",
    alignItems: "center",
    borderRadius: 20,
  },
});
