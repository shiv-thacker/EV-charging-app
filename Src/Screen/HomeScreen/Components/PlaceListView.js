import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react";
import PlaceItem from "./PlaceItem";
import { SelectedMarkerContext } from "../../../Context/SelectedMarkerContext";
import { db } from "../../../Utils/FirebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
// import { useUser } from "@clerk/clerk-expo";
import { useFocusEffect } from "@react-navigation/native";
import { Authcontext } from "../../../Context/Authcontext";

const PlaceListView = ({ placeList }) => {
  const { user } = useContext(Authcontext);
  useFocusEffect(
    useCallback(() => {
      getFav();
    }, [])
  );

  // const { user } = useUser();
  const [favList, setFavList] = useState([]);
  useEffect(() => {
    user && getFav();
  }, [user]);
  const getFav = async () => {
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
    });
  };

  const isFav = (place) => {
    const result = favList.find((item) => item?.place?.id === place.id);
    console.log(result);
    return result ? true : false;
  };

  //makw ref to direct perticular state in flatlist
  const flatListRef = useRef(null);
  const { selectedMarker, setSelectedMarker } = useContext(
    SelectedMarkerContext
  );
  useEffect(() => {
    selectedMarker && scrollToIndex(selectedMarker);
  }, [selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({ animated: true, index });
  };

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index,
  });

  return (
    <View>
      <FlatList
        data={placeList}
        horizontal={true}
        // enabled paging for scroll pagewise
        pagingEnabled
        getItemLayout={getItemLayout}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PlaceItem
              place={item}
              isFav={isFav(item)}
              markedFav={() => getFav()}
            />
          </View>
        )}
      />
    </View>
  );
};

export default PlaceListView;

const styles = StyleSheet.create({});
