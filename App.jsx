import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useState, useEffect } from "react";
import LoginScreen from "./Src/Screen/LoginScreen/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./Src/Navigations/TabNavigation";
import * as Location from "expo-location";
import { UserLocationContext } from "./Src/Context/UserLocationContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Src/Utils/FirebaseConfig";
import { Authcontext } from "./Src/Context/Authcontext";

SplashScreen.preventAutoHideAsync();

// const tokenCache = {
//   async getToken(key) {
//     try {
//       return SecureStore.getItemAsync(key);
//     } catch (err) {
//       return null;
//     }
//   },
//   async saveToken(key, value) {
//     try {
//       return SecureStore.setItemAsync(key, value);
//     } catch (err) {
//       return;
//     }
//   },
// };

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}
export default function App() {
  //from doc of expo-fonts
  const [fontsLoaded, fontError] = useFonts({
    outfit: require("./assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./assets/fonts/Outfit-SemiBold.ttf"),
    "outfit-bold": require("./assets/fonts/Outfit-Bold.ttf"),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    //take publish key from clerk provider and wrap whole app.js, from doc of expo clerk
    // <ClerkProvider
    //   tokenCache={tokenCache}
    //   publishableKey={"pk_test_bW92aW5nLWNvcmFsLTY1LmNsZXJrLmFjY291bnRzLmRldiQ"}
    // >
    //   <UserLocationContext.Provider value={{ location, setLocation }}>
    //     <View style={styles.container} onLayout={onLayoutRootView}>
    //       {/* clerk has default control components signIN and signOut */}
    //       <SignedIn>
    //         <NavigationContainer>
    //           <TabNavigation />
    //         </NavigationContainer>
    //       </SignedIn>
    //       <SignedOut>
    //         <LoginScreen />
    //       </SignedOut>

    //       <StatusBar style="auto" />
    //     </View>
    //   </UserLocationContext.Provider>
    // </ClerkProvider>
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <Authcontext.Provider value={{ user }}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer>
            <Stack.Navigator intialRouteName="Login">
              {user ? (
                <Stack.Screen
                  name="InsideLayout"
                  component={InsideLayout}
                  options={{ headerShown: false }}
                />
              ) : (
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Authcontext.Provider>
    </UserLocationContext.Provider>
  );
}

//external style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
