import React from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import Chip from "../../components/Chip";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { blurhash, departmants, states } from "../../constants";
import dayjs from "dayjs";
import { MaterialIcons } from "@expo/vector-icons";
import Timeline from "../../components/Timeline";
import VerticalTimeline from "../../components/VerticalTimeline";
import Colors from "../../constants/Colors";

const Post = () => {
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
  } = useGlobalSearchParams();
  const imageUrl = image.toString().replace(/\/(?=[^\/]*$)/, "%2F");
  const profileUrlU = profileUrl.toString().replace(/\/(?=[^\/]*$)/, "%2F");

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <Image
        style={{
          height: heightPercentageToDP(40),
          backgroundColor: "#0553",
        }}
        source={imageUrl}
        placeholder={blurhash}
        transition={200}
      />
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 3,
          backgroundColor: "#fff",
          width: 34,
          height: 34,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name={"keyboard-arrow-left"}
          size={32}
          color={"black"}
          onPress={() => router.back()}
        />
      </View>

      <View
        style={{
          padding: widthPercentageToDP(4),
          position: "relative",
        }}
      >
        <RNText className="text-3xl" font={"Poppins-Bold"}>
          {title}
        </RNText>

        <View
          className="flex-row items-center"
          style={{
            marginBottom: 15,
            marginTop: 10,
            minHeight: 40,
            width: widthPercentageToDP(100),
          }}
        >
          <Image
            style={{
              height: heightPercentageToDP(5),
              aspectRatio: 1,
              borderRadius: 50,
              backgroundColor: "#0553",
            }}
            source={profileUrlU}
            placeholder={blurhash}
            transition={200}
          />
          <View
            className="flex-row items-center justify-between"
            style={{
              marginLeft: 12,
              width: widthPercentageToDP(80),
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
                  · {dayjs(+date).fromNow()}
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
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: widthPercentageToDP(22),
                gap: 2,
              }}
            >
              <Image
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 20,
                }}
                source={departmants[department]}
                placeholder={blurhash}
                transition={500}
              />

              <RNText
                className=""
                font={"Poppins-Medium"}
                style={{
                  fontSize: 13,
                  color: "#111",
                }}
              >
                {department}
              </RNText>
            </View>
          </View>
        </View>
        <RNText
          className="font-semibold text-sm "
          style={{
            fontFamily: "Poppins-SemiBold",
          }}
          numberOfLines={3}
        >
          {content}
        </RNText>
      </View>
      {/* justify-end flex-1 */}

      <View className="">
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.lightGray,
            margin: 5,
            padding: 10,
            paddingBottom: 20,
            gap: 10,
            borderRadius: 5,
          }}
        >
          <Timeline currentState={stage} states={states} />
          {/* <VerticalTimeline currentState={{ id: 3 }} states={states} /> */}
        </View>
      </View>

      {/* Create Buttons for cancel and completing the request */}
      <View
        className="justify-end flex-1"
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#f87171",
            width: widthPercentageToDP(40),
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
          textStyle={{
            color: "#fff",
          }}
        >
          <RNText className="text-sm" style={styles.text}>
            Cancel
          </RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#34d399",
            width: widthPercentageToDP(40),
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
          textStyle={{
            color: "#fff",
          }}
        >
          <RNText className="text-sm" style={styles.text}>
            Complete
          </RNText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  text: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    letterSpacing: 0.5,
  },
});
