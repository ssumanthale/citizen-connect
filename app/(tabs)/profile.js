import React from "react";
import { ScrollView, Text, View } from "react-native";
import { blurhash } from "../../constants";
import RNText from "../../components/RNText";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Profile = () => {
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
          source="https://picsum.photos/seed/696/3000/2000"
          placeholder={blurhash}
          transition={500}
        />
      </View>
      <RNText className="text-2xl font-bold text-center" font={"Poppins-Bold"}>
        Emma Brony
      </RNText>
      <RNText
        className="font-bold text-center"
        style={{
          color: "#9ca3af",
          marginTop: -2,
        }}
        font={"Poppins-Bold"}
      >
        @emma
      </RNText>
      <RNText className="text-center my-1" font={"Poppins-Medium"}>
        My Name is Emma, I am a developer
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
            // backgroundColor: "#000",
            // color: "#fff",
            padding: 8,
            paddingHorizontal: 10,
            borderRadius: 20,
            textAlign: "center",
          }}
          font={"Poppins-Bold"}
        >
          Story
        </RNText>
        <RNText
          style={{
            flex: 1,
            backgroundColor: "#000",
            color: "#fff",
            padding: 8,
            paddingHorizontal: 10,
            borderRadius: 20,
            textAlign: "center",
          }}
          font={"Poppins-Bold"}
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
        {Array.from({ length: 24 }, (_, i) => i.toString()).map((item, id) => (
          <ImageComponent item={item} key={id} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;

//write a new component called ImageComponent that will be used to render the images in the flatlist to fit 3 images in a row with out any space between them

const ImageComponent = ({ item }) => {
  return (
    <View
      style={{
        width: wp(29),
        height: wp(29),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        margin: 2.5,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
        }}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={blurhash}
        transition={200}
      />
      <Text>{item}</Text>
    </View>
  );
};
