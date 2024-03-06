import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../../components/Loading";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import CustomKeyboardView from "../../components/CustomKeybordView";
import RNText from "../../components/RNText";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const SignUp = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [hidePassword, setHidePassword] = useState(true);

  const handleSignIn = async () => {
    if (email === "" || password === "" || name === "") {
      Alert.alert("SignUp", "All fields are required");
      return;
    }

    setLoading(true);

    let response = await register(email, password, name);

    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <View
        style={{
          paddingTop: hp(6),
          paddingHorizontal: wp(5),
        }}
        className="flex-1"
      >
        <View className="items-center  mb-6 ">
          <Image source={require("../../assets/app/logo.png")} />
          <RNText className="text-4xl text-center" font={"Poppins-Bold"}>
            CitizenConnect
          </RNText>
          <RNText className="text-center text-sm">
            From click to Resolution, Transforming cities
          </RNText>
        </View>

        <RNText className="text-3xl text-center" font={"Poppins-Bold"}>
          Sign Up
        </RNText>
        <View className="flex-1 gap-4">
          <RNText className="" font="Poppins-Bold">
            Name
          </RNText>
          <TextInput
            placeholder="Name"
            className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
            value={name}
            onChangeText={setName}
          />
          <RNText className="" font="Poppins-Bold">
            Email
          </RNText>
          <TextInput
            placeholder="test@test.com"
            className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
            value={email}
            onChangeText={setEmail}
          />
          <RNText className="" font="Poppins-Bold">
            Password
          </RNText>

          <View className="relative">
            <TextInput
              placeholder="*********"
              secureTextEntry={hidePassword ? true : false}
              className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
              className="absolute right-5 top-2 z-10"
            >
              {hidePassword ? (
                <AntDesign name="eye" size={20} color="black" />
              ) : (
                <FontAwesome name="eye-slash" size={20} color="black" />
              )}
            </Pressable>
          </View>
          <View className="px-1">
            <BouncyCheckbox
              size={22}
              unfillColor="#ddd"
              fillColor="#3B82F6"
              text="I would like to receive your newsletter and other promotional information."
              innerIconStyle={{ borderWidth: 1.5, borderColor: "transparent" }}
              textStyle={{
                fontFamily: "Poppins-Regular",
                textDecorationLine: "none",
                fontSize: hp(1.8),
              }}
              iconStyle={{
                borderRadius: 5,
                borderColor: "#bbb",
              }}
            />
          </View>
          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(6.5)} className="" />
              </View>
            ) : (
              <Pressable
                className="bg-blue-500 rounded-full"
                onPress={handleSignIn}
              >
                <RNText
                  style={{ fontSize: hp(2.2) }}
                  className="text-white  tracking-wide text-center p-2 rounded-md"
                  font={"Poppins-Bold"}
                >
                  Sign Up
                </RNText>
              </Pressable>
            )}
          </View>

          <View className="flex-row justify-between items-center">
            <RNText className="text-gray-500">Already have an account? </RNText>
            <TouchableOpacity
              onPress={() => {
                router.replace("/signin");
              }}
            >
              <RNText
                style={{ color: "#3B82F6" }}
                className="text-blue-500"
                font={"Poppins-Bold"}
              >
                Sign In
              </RNText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignUp;
