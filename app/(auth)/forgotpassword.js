import React, { useContext, useState } from "react";
import { View, TextInput, Button, Alert, Pressable, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SvgXml } from "react-native-svg";
import loginImg from "../../assets/svg/login";
import Loading from "../../components/Loading";
import { AuthContext } from "../../context/authcontext";
import { useRouter } from "expo-router";
import RNText from "../../components/RNText";
const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useContext(AuthContext);
  const router = useRouter();
  const handleResetPassword = async () => {
    // check for email validation
    if (
      email === "" ||
      !email.includes("@") ||
      !email.includes(".") ||
      email.length < 5
    ) {
      Alert.alert("Reset Password", "Please enter a valid email address");
      return;
    }
    setLoading(true);
    const status = await resetPassword(email);
    setLoading(false);

    if (status.success) {
      Alert.alert(
        "Password Reset Email Sent",
        "Please check your email to reset your password.",
        [
          {
            text: "Go to Sign In",
            onPress: () => router.replace("/signin"),
          },
        ]
      );
    } else {
      Alert.alert("Reset Password", status.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
        }}
        className="flex-1 gap-4"
      >
        <View className="items-center  mb-4">
          <Image source={require("../../assets/app/logo.png")} />
          <RNText className="text-4xl text-center" font={"Poppins-Bold"}>
            CitizenConnect
          </RNText>
          <RNText className="text-center text-sm">
            From click to Resolution, Transforming cities
          </RNText>
        </View>

        <RNText className="text-3xl text-center mb-3" font={"Poppins-Bold"}>
          Forgot Password
        </RNText>
        <RNText className="">Email</RNText>
        <TextInput
          placeholder="test@test.com"
          className="border-2 -mt-2 border-gray-300 rounded-md p-2 w-full"
          value={email}
          onChangeText={setEmail}
        />
        <RNText className="text-md" font={"Poppins-Medium"}>
          Note: Please enter your registered email address. You will receive a
          link to create a new password via email.
        </RNText>
        <View>
          {loading ? (
            <View className="flex-row justify-center">
              <Loading size={hp(6.5)} className="" />
            </View>
          ) : (
            <>
              <Pressable
                className="bg-blue-500 rounded-md"
                onPress={handleResetPassword}
              >
                <RNText
                  style={{ fontSize: hp(2.2) }}
                  className="text-white  tracking-wide text-center p-2 rounded-md"
                  font={"Poppins-Bold"}
                >
                  Reset
                </RNText>
              </Pressable>
              <Pressable
                className="rounded-md mt-4"
                style={{
                  backgroundColor: "#222831",
                }}
                onPress={() => {
                  router.replace("/signin");
                }}
              >
                <RNText
                  style={{ fontSize: hp(2.2) }}
                  className="text-white  tracking-wide text-center p-2 rounded-md"
                  font={"Poppins-Bold"}
                >
                  Back
                </RNText>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
