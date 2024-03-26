import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import Colors from "../../constants/Colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.background },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerShadowVisible: false,
        tabBarLabel: () => null,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "CitizenConnect",
          title: "CitizenConnect",
          headerTitleAlign: "center",
          // hide title
          // headerShown: false,
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
          // create a custom header component
        }}
      />
      <Tabs.Screen
        name="edit"
        options={{
          headerTitle: "New Request",
          title: "New Request",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name="edit" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          headerTitle: "New Story",
          title: "New Story",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <Octicons name="diff-added" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          headerTitle: "Notifications",
          title: "Notifications",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarBadge: 1,
          tabBarBadgeStyle: {
            backgroundColor: Colors.primary,
          },
          tabBarBadgeStyle: {
            backgroundColor: Colors.primary,
            color: Colors.background,
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name="bell" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "My Profile",
          title: "My Profile",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Poppins-Bold",
          },
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
          //edit component on the left side of the header

          headerLeft: () => {
            return (
              <MaterialIcons
                name="edit"
                size={24}
                color={Colors.primary}
                style={{ marginLeft: 10 }}
                onPress={() => {
                  //route to proflie edit page
                  router.push("/profile");
                }}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
