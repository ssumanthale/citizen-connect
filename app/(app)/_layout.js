import React from "react";
import { Stack } from "expo-router";

export default AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
