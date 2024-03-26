import React, { useContext, useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { blurhash } from "../../constants";
import RNText from "../../components/RNText";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AuthContext } from "../../context/authcontext";
import { router, useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
const Profile = () => {
  const { user, stories, posts, logout } = useContext(AuthContext);

  const [isStory, setIsStory] = useState(false);

  const memoizedStories = useMemo(() => {
    return stories.filter((story) => story.id.includes(user.id));
  }, [stories, user.id]);
  const memoizedPosts = useMemo(() => {
    return posts.filter((post) => post.id.includes(user.id));
  }, [posts, user.id]);
  const results = isStory ? memoizedStories : memoizedPosts;

  const navigation = useNavigation();

  // create this right header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <MaterialIcons
            name="logout"
            size={24}
            color={Colors.primary}
            style={{ marginRight: 10 }}
            onPress={() => {
              logout();
            }}
          />
        );
      },
    });
  }, [navigation]);

  return (
    <ScrollView className="flex-1 p-2">
      <View className="flex-row justify-center my-4">
        <Image
          style={{
            height: hp(14),
            aspectRatio: 1,
            borderRadius: hp(14) / 2,
            backgroundColor: "#0553",
          }}
          source={
            user.profileUrl
              ? user.profileUrl
              : "https://picsum.photos/seed/696/3000/2000"
          }
          placeholder={blurhash}
          transition={500}
        />
      </View>
      <RNText className="text-2xl font-bold text-center" font={"Poppins-Bold"}>
        {user.name}
      </RNText>
      <RNText
        className="font-bold text-center"
        style={{
          color: "#9ca3af",
          marginTop: -2,
        }}
        font={"Poppins-Bold"}
      >
        @{user.username}
      </RNText>
      <RNText className="text-center my-1" font={"Poppins-Medium"}>
        {user.bio}
      </RNText>
      <View
        className="flex-row"
        style={{
          // justifyContent: "space-around",
          //spread the items evenly accupying the whole width
          justifyContent: "space-evenly",
          backgroundColor: "#fff",
          alignItems: "center",
          marginTop: 20,
          borderRadius: 50,
          width: wp(95),
          //border
          borderColor: "#ccc",
        }}
      >
        <RNText
          style={{
            flex: 1,
            backgroundColor: isStory ? "#000" : "#fff",
            color: isStory ? "#fff" : "#000",
            padding: 8,
            paddingHorizontal: 10,
            borderRadius: 20,
            textAlign: "center",
          }}
          onPress={() => setIsStory(true)}
          font={"Poppins-Bold"}
        >
          Story
        </RNText>
        <RNText
          style={{
            flex: 1,
            backgroundColor: isStory ? "#fff" : "#000",
            color: isStory ? "#000" : "#fff",
            padding: 8,
            paddingHorizontal: 10,
            borderRadius: 20,
            textAlign: "center",
          }}
          font={"Poppins-Bold"}
          onPress={() => setIsStory(false)}
        >
          Requests
        </RNText>
      </View>
      <View
        className="flex-1 w-full mt-4 p-2 flex-row "
        style={{
          flexWrap: "wrap",
          paddingBottom: 20,
        }}
      >
        {results.map((item, id) => (
          <ImageComponent item={item} key={id} isStory={isStory} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;

//write a new component called ImageComponent that will be used to render the images in the flatlist to fit 3 images in a row with out any space between them

const ImageComponent = ({ item, isStory }) => {
  return (
    <Pressable
      style={{
        width: wp(29),
        height: wp(29),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 2.5,
      }}
      onPress={() => {
        if (isStory === false) {
          console.log("post");
          router.push({
            pathname: "post",
            params: {
              ...item,
            },
          });
        }
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
        }}
        source={item.image}
        placeholder={blurhash}
        transition={200}
      />
    </Pressable>
  );
};
