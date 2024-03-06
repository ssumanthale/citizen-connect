import { View, Pressable } from "react-native";
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
const NewRequest = () => {
  const { user } = useContext(AuthContext);
  // const [image, setImage] = useState(
  //   "https://firebasestorage.googleapis.com/v0/b/citizen-connect-edfd5.appspot.com/o/images%2FJHQLtteCivTs3JyyaeipgDW6ZzF3?alt=media&token=a3d0ca17-2645-4d16-a8d0-4a08c8dd1646"
  // );
  const [image, setImage] = useState("");

  const router = useRouter();

  const upateProfile = (url) => {
    setImage(url);

    console.log("Update Profile", url);
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
          <View className="flex-row  justify-center">
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
              onPress={() => {
                router.navigate("/home");
              }}
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
                New Request to Story
              </RNText>
            </Pressable>
          </View>
        </>
      ) : (
        <View className="flex-1">
          <AddStory id={user.id} upateProfile={upateProfile} />
        </View>
      )}
    </View>
  );
};

export default NewRequest;
