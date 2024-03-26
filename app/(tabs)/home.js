import { View, Pressable, FlatList, Platform, ScrollView } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import { Link } from "expo-router";
import RNText from "../../components/RNText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Story from "../../components/Story";
import PostList from "../../components/PostsList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { posts } from "../../constants";

// create some fake user stories with images and names
const markers = [
  {
    id: "1",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "3",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "6",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "7",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: "8",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
const ios = Platform.OS === "ios";

const Home = () => {
  const { top } = useSafeAreaInsets();

  const { posts, last24H } = useContext(AuthContext);
  return (
    <ScrollView
      style={
        {
          // paddingTop: ios ? top : top + 10,
        }
      }
      className=""
    >
      {last24H.length > 0 && (
        <View
          className="justify-center"
          style={{
            paddingHorizontal: 10,
            paddingVertical: 8,
            paddingBottom: 2,
          }}
        >
          <FlatList
            data={last24H}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => <Story item={item} />}
            keyExtractor={(item) => item.date}
          />
        </View>
      )}

      <PostList data={posts} />
    </ScrollView>
  );
};
export default Home;
