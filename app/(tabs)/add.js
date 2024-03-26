import { View, Pressable, Alert } from "react-native";
import React, { useContext, useState } from "react";
import AddStory from "../../components/AddStory";
import { AuthContext } from "../../context/authcontext";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../../constants";
import { useRouter } from "expo-router";
import { addStory } from "../../constants/api";
import Loading from "../../components/Loading";
const Add = () => {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("image", image);
  const upateProfile = (url) => {
    setImage(url);
  };

  const handleStory = async () => {
    setLoading(true);
    const { success, msg } = await addStory(
      {
        image,
        userId: user.id,
        userName: user.name,
        profileUrl: user.profileUrl,
        date: Date.now(),
      },
      user.id
    );
    if (success) {
      Alert.alert("Success", "Story Created successfully", [
        {
          text: "OK",
          onPress: () => {
            router.navigate("/home");
          },
        },
      ]);
    } else {
      Alert.alert("Error", msg);
    }
    setLoading(false);
  };
  return (
    <View className="flex-1 justify-center items-center">
      {image !== "" ? (
        <>
          <Image
            style={{
              width: wp(95),
              aspectRatio: 1,
              backgroundColor: "#0553",
            }}
            source={image}
            placeholder={blurhash}
            transition={500}
          />
          <>
            {loading ? (
              <Loading size={hp(8.5)} />
            ) : (
              <View
                className="flex-row  justify-center"
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <Pressable
                  className="bg-black rounded-md w-2/4"
                  onPress={() => {
                    setImage("");
                  }}
                  style={{
                    marginTop: 20,
                  }}
                >
                  <RNText
                    style={{ fontSize: hp(2) }}
                    className="text-white font-bold tracking-wide text-center p-2 rounded-md"
                    font={"Poppins-Bold"}
                  >
                    Retake
                  </RNText>
                </Pressable>
                <Pressable
                  className="bg-blue-500 rounded-md w-2/4 ml-2"
                  onPress={handleStory}
                  style={{
                    marginTop: 20,
                    marginLeft: 10,
                  }}
                >
                  <RNText
                    style={{ fontSize: hp(2) }}
                    className="text-white font-bold tracking-wide text-center p-2 rounded-md"
                    font={"Poppins-Bold"}
                  >
                    Add to Story
                  </RNText>
                </Pressable>
              </View>
            )}
          </>
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <AddStory id={user.id} upateProfile={upateProfile} />
        </View>
      )}
    </View>
  );
};

export default Add;
