import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { moderateScale } from "../../Utils/Dimensions";

export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
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
  },
});
