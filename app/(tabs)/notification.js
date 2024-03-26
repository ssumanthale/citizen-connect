import { View } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/authcontext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import RNText from "../../components/RNText";
import Colors from "../../constants/Colors";

const Notification = () => {
  const { notifications } = useContext(AuthContext);
  return (
    <View>
      {notifications.map((notification) => (
        <View
          key={notification.id}
          style={{
            backgroundColor: "#f9f9f9",
            margin: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name={"bell"} size={28} color={"#000"} />
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <RNText style={{}} font={"Poppins-Bold"}>
              Update on your complaint
            </RNText>
            <RNText style={{ maxWidth: widthPercentageToDP(80) }}>
              {notification.message}
            </RNText>
            <RNText
              style={{
                color: Colors.mediumGray,
              }}
              className="text-xs"
              font={"Poppins-Medium"}
            >
              2 hours ago
            </RNText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Notification;
