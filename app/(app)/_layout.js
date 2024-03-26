import React from "react";
import { Stack } from "expo-router";

export default AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="post"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="story"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Edit Profile",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};
