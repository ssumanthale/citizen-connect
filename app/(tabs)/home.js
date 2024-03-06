import { View, Pressable, FlatList } from "react-native";
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
import { posts } from "../../constants";

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
];

const Home = () => {
  // const { logout, user } = useContext(AuthContext);
  return (
    <View className="">
      <View
        className="p-2 justify-center pr-1"
        style={{
          height: hp("11%"),
        }}
      >
        <FlatList
          data={markers}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => <Story item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>

      <PostList data={posts} />
    </View>
  );
};
export default Home;
