import { View, Text, ActivityIndicator, FlatList, Alert } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Colors from "../../Utils/Colors";
import { db } from "../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import PlaceItem from "../HomeScreen/Components/PlaceItem";
import { useFocusEffect } from "@react-navigation/native";
export default function FavouriteScreen() {
  const [favList, setFavList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getFav();
    }, [])
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
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
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
    <View>
      <Text style={{ padding: 10, fontFamily: "outfit-medium", fontSize: 30 }}>
        My Favourite <Text style={{ color: Colors.PRIMARY }}>Place</Text>
      </Text>
      {!favList ? (
        <View
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.PRIMARY} />
          <Text style={{ fontFamily: "outfit", marginTop: 5 }}>Loading...</Text>
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
