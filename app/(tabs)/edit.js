import {
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import AddStory from "../../components/AddStory";
import { AuthContext } from "../../context/authcontext";
import { Image } from "expo-image";
import RNText from "../../components/RNText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { blurhash } from "../../constants";
import { useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { addPost } from "../../constants/api";
import Loading from "../../components/Loading";

const departmants = [
  {
    id: 1,
    name: "Water",
    icon: "https://img.icons8.com/?size=256&id=26264&format=png",
  },
  {
    id: 2,
    name: "Road",
    icon: "https://img.icons8.com/?size=256&id=DKG5EanykiIZ&format=png",
  },
  {
    id: 3,
    name: "Railways",
    icon: "https://img.icons8.com/?size=256&id=u1DomTMEHl1A&format=png",
  },
  {
    id: 4,
    name: "Electricity",
    icon: "https://img.icons8.com/?size=256&id=69682&format=png",
  },
  {
    id: 5,
    name: "Eduction",
    icon: "https://img.icons8.com/?size=256&id=12197&format=png",
  },
  {
    id: 6,
    name: "Medical",
    icon: "https://img.icons8.com/?size=256&id=EtrvEl4qafJw&format=png",
  },
  {
    id: 7,
    name: "Others",
    icon: "https://img.icons8.com/?size=256&id=13746&format=png",
  },
];
const NewRequest = () => {
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const [location, setLocation] = useState("Hyderabad");
  const router = useRouter();
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const upateProfile = (url) => {
    setImage(url);
  };

  const handleSubmit = async () => {
    if (title === "" || content === "" || department === "") {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    const { success, msg } = await addPost(
      {
        title,
        content,
        department,
        location,
        image,
        userId: user.id,
        userName: user.name,
        profileUrl: user.profileUrl,
        date: Date.now(),
        stage: "NEW_CASE",
      },
      user.id
    );
    if (success) {
      Alert.alert("Success", "Request raised successfully", [
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
    <View className="flex-1 p-2">
      {image !== "" ? (
        <ScrollView>
          <View className="relative">
            <Image
              style={{
                widht: wp(100),
                height: hp(30),
                backgroundColor: "#0553",
                borderRadius: 10,
              }}
              source={image}
              placeholder={blurhash}
              transition={500}
            />

            <TouchableOpacity
              className="rounded-md"
              onPress={() => {
                setImage("");
              }}
              style={{
                position: "absolute",
                bottom: 10,
                left: hp(23),
                marginTop: 10,
              }}
            >
              <MaterialCommunityIcons
                name="camera-retake"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-1">
            <RNText
              style={{
                marginTop: 10,
                padding: 4,
              }}
              font={"Poppins-Medium"}
            >
              Choose the departmant under which you want to raise the request
            </RNText>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                marginVertical: 5,
              }}
            >
              {departmants.map((item) => (
                <Pressable
                  key={item.id}
                  style={{
                    padding: 10,
                    backgroundColor: department === item.name ? "#111" : "#fff",
                    borderRadius: 10,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: wp(22),
                    gap: 2,
                  }}
                  onPress={() => setDepartment(item.name)}
                >
                  <Image
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 20,
                    }}
                    source={item.icon}
                    placeholder={blurhash}
                    transition={500}
                  />

                  <RNText
                    className=""
                    font={"Poppins-Medium"}
                    style={{
                      fontSize: 13,
                      color: department === item.name ? "#fff" : "#111",
                    }}
                  >
                    {item.name}
                  </RNText>
                </Pressable>
              ))}
            </View>
            <View
              className="flex-1 gap-3 my-2"
              style={{
                padding: 4,
              }}
            >
              <RNText className="" font={"Poppins-Medium"}>
                Post Title
              </RNText>
              <TextInput
                placeholder="Title"
                className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
                value={title}
                onChangeText={setTitle}
              />
              <RNText className="" font={"Poppins-Medium"}>
                Post Content
              </RNText>
              <TextInput
                className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
                value={content}
                placeholder="Details you think are important"
                onChangeText={setContent}
                multiline={true}
                numberOfLines={3}
                style={{
                  height: 100,
                  // start the text from the top
                  textAlignVertical: "top",
                }}
              />
            </View>
            <View
              style={{
                marginBottom: 10,
              }}
            >
              {!openLocation ? (
                <View style={styles.container}>
                  <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation
                    showsMyLocationButton
                    onPress={() => {
                      setOpenLocation(true);
                      setLocation("Test Location");
                    }}
                  />

                  <RNText className="text-center" font={"Poppins-Medium"}>
                    Tap to choose location
                  </RNText>
                </View>
              ) : (
                <>
                  <View className="flex-row items-center justify-between">
                    <RNText
                      className="tracking-wide  p-2 rounded-md"
                      style={{
                        maxWidth: wp(80),
                      }}
                    >
                      Location:{" "}
                      <RNText
                        className="text-black  tracking-wide text-center p-2  "
                        font={"Poppins-Bold"}
                      >
                        {location}
                      </RNText>
                    </RNText>
                    <TouchableOpacity
                      onPress={() => {
                        setOpenLocation(false);
                        setLocation("");
                      }}
                    >
                      <RNText
                        className="text-blue-500 text-xs tracking-wide text-center p-2  "
                        font={"Poppins-Bold"}
                        style={{
                          textDecorationLine: "underline",
                        }}
                      >
                        (change)
                      </RNText>
                    </TouchableOpacity>
                  </View>
                  <View
                    className="flex-row  gap-2 justify-center"
                    style={{
                      marginVertical: 10,
                    }}
                  >
                    {loading ? (
                      <View className="flex-row justify-center">
                        <Loading size={hp(6.5)} className="" />
                      </View>
                    ) : (
                      <Pressable
                        onPress={handleSubmit}
                        style={{
                          backgroundColor: "#222831",
                          borderRadius: 10,
                          paddingHorizontal: 20,
                          fontSize: 14,
                        }}
                      >
                        <RNText
                          className="text-white text-sm tracking-wide text-center p-2 "
                          font={"Poppins-Bold"}
                        >
                          Submit Complaint
                        </RNText>
                      </Pressable>
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center">
          <AddStory id={user.id} upateProfile={upateProfile} />
        </View>
      )}
    </View>
  );
};

export default NewRequest;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: wp(100),
    height: hp(30),
  },
});
