import { Image } from "expo-image";
import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../constants";
import { router } from "expo-router";
import dayjs from "dayjs";
import RNText from "./RNText";
import Chip from "./Chip";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const Item = ({ item }) => {
  const {
    content,
    date,
    image,
    profileUrl,
    stage,
    title,
    department,
    location,
    userId,
    userName,
  } = item;
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: "post",
          params: {
            content,
            date,
            image,
            profileUrl,
            stage,
            title,
            department,
            location,
            userId,
            userName,
          },
        });
      }}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
      }}
    >
      <View
        className="mb-3 flex-row items-center"
        style={{
          marginBottom: 10,
          minHeight: 40,
          width: wp(100),
        }}
      >
        <Image
          style={{
            height: hp(5),
            aspectRatio: 1,
            borderRadius: 50,
            backgroundColor: "#0553",
          }}
          source={profileUrl}
          placeholder={blurhash}
          transition={200}
        />
        <View
          className="flex-row items-center justify-between"
          style={{
            marginLeft: 12,
          }}
        >
          <View>
            <View className="flex-row items-center">
              <RNText className="" font={"Poppins-Bold"}>
                {userName}{" "}
              </RNText>
              <RNText
                className="text-xs"
                font={"Poppins-Bold"}
                style={{
                  color: "#9ca3af",

                  marginTop: -2,
                  marginLeft: 3,
                }}
              >
                · {dayjs(date).fromNow()}
              </RNText>
            </View>

            <RNText
              className="font-semibold text-xs "
              style={{
                fontFamily: "Poppins-SemiBold",
                marginLeft: 1,
                color: "#9ca3af",
                marginTop: -2,
                fontSize: 12,
              }}
            >
              {location}
            </RNText>
          </View>
        </View>
      </View>
      <View className="gap-3 relative">
        <RNText
          className="font-semibold text-sm "
          style={{
            fontFamily: "Poppins-SemiBold",
          }}
          //3 lines
          numberOfLines={2}
        >
          {title}
        </RNText>
        <Image
          style={{
            height: hp(28),
            maxWidth: wp(100),
            borderRadius: 4,
            backgroundColor: "#0553",
          }}
          source={image}
          placeholder={blurhash}
          transition={200}
        />
        <View
          className="absolute z-30"
          style={{
            bottom: 5,
            right: 5,
          }}
        >
          <Chip stage={stage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const PostList = (props) => {
  return (
    <View className="p-2">
      {props.data.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </View>
  );
};

export default PostList;
