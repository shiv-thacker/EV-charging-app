import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState, useCallback, useContext } from "react";
import Colors from "../../Utils/Colors";
import { db } from "../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { useUser } from "@clerk/clerk-expo";
import PlaceItem from "../HomeScreen/Components/PlaceItem";
import { useFocusEffect } from "@react-navigation/native";
import { Authcontext } from "../../Context/Authcontext";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "../../Utils/Dimensions";

const ios = Platform.OS == "ios";
export default function FavouriteScreen() {
  const { top } = useSafeAreaInsets();
  const [favList, setFavList] = useState([]);
  // const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(Authcontext);

  useFocusEffect(
    useCallback(() => {
      user && getFav();
    }, [user])
  );

  useEffect(() => {
    user && getFav();
  }, [user]);
  const getFav = async () => {
    setLoading(true);
    //it's very important to do it. because when you delete data from firebase side, it's not become empty and still show data,
    //so every time you call this function, make it empty
    setFavList([]);
    const q = query(
      collection(db, "ev-fav-place"),
      where("email", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setFavList((favList) => [...favList, doc.data()]);
      setLoading(false);
    });
  };
  return (
    <View
      style={{
        paddingTop: ios ? top : top + hp(0),
      }}
    >
      <Text style={{ padding: 10, fontFamily: "outfit-medium", fontSize: 30 }}>
        My Favourite <Text style={{ color: Colors.PRIMARY }}>Place</Text>
      </Text>
      {favList.length == 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: hp(3), marginTop: hp(5) }}>
            Fav places not found...
          </Text>
        </View>
      ) : (
        <FlatList
          data={favList}
          onRefresh={() => getFav()}
          refreshing={loading}
          style={{ paddingBottom: 200 }}
          renderItem={({ item, index }) => (
            <PlaceItem
              place={item.place}
              isFav={true}
              markedFav={() => getFav()}
            />
          )}
        />
      )}
      <View style={{ marginBottom: 200, height: 200 }}></View>
    </View>
  );
}
