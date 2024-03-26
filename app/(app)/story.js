import { router, useGlobalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { blurhash } from "../../constants";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import dayjs from "dayjs";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import { AuthContext } from "../../context/authcontext";

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const Story = () => {
  const { stories } = useContext(AuthContext);

  const { id } = useGlobalSearchParams();

  const [index, setIndex] = useState(
    stories.findIndex((story) => story.id === id)
  );

  const { image, userName, profileUrl, date } = stories[index];

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipe={(direction, state) => {
        const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_DOWN } = swipeDirections;
        if (direction === SWIPE_LEFT) {
          if (index < stories.length - 1) {
            setIndex(index + 1);
          }
        } else if (direction === SWIPE_RIGHT) {
          if (index > 0) {
            setIndex(index - 1);
          }
        } else if (direction === SWIPE_DOWN) {
          router.back();
        }
      }}
      // onSwipeUp={(state) => this.onSwipeUp(state)}
      // onSwipeDown={(state) => this.onSwipeDown(state)}
      // onSwipeLeft={(state) => this.onSwipeLeft(state)}
      // onSwipeRight={(state) => this.onSwipeRight(state)}
      config={config}
      style={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View
          className="flex-row items-center"
          style={{
            position: "absolute",
            marginBottom: 15,
            marginTop: 10,
            minHeight: 40,
            top: 20,
            left: 20,
            zIndex: 3,
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
            source={profileUrl}
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
            <View className="flex-row items-center">
              <RNText className="text-white" font={"Poppins-Bold"}>
                {userName}
                {" ·"}
              </RNText>
              <RNText
                className="text-xs"
                font={"Poppins-Bold"}
                style={{
                  color: "#eee",
                  marginTop: -2,
                  marginLeft: 3,
                }}
              >
                {dayjs(+date).fromNow(true)}
              </RNText>
            </View>
          </View>
        </View>
        <Image
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(40),
            backgroundColor: "#0553",
          }}
          source={image}
          placeholder={blurhash}
          transition={200}
        />
        <View style={[styles.overlay, { height: heightPercentageToDP(100) }]} />
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    position: "relative",
  },
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.15,
    backgroundColor: "black",
    width: widthPercentageToDP(100),
  },
});

export default Story;
