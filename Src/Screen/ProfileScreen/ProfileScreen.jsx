import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import React, { useContext } from "react";
// import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { moderateScale, verticalScale } from "../../Utils/Dimensions";
import { auth } from "../../Utils/FirebaseConfig";
import { Authcontext } from "../../Context/Authcontext";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function ProfileScreen() {
  // const { signOut } = useAuth();
  const { user } = useContext(Authcontext);
  const signOut = () => {
    auth.signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: hp(2), fontWeight: "600" }}>
        Login Email address:- {user?.email}
      </Text>
      <View>
        <TouchableOpacity onPress={signOut} style={styles.signOut}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit",
              fontSize: 17,
            }}
          >
            Signout
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
            <Text style={{ color: Colors.BLUE, textAlign: "center" }}>
              Privacy Policy
            </Text>
            , made by shivang thacker(developer)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signOut: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 40,
  },
  container: {
    padding: moderateScale(16),
    justifyContent: "center",
    flex: 1,
    paddingVertical: verticalScale(10),
    justifyContent: "space-around",
    backgroundColor: Colors.WHITE,
  },
});
