import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons, Feather } from "@expo/vector-icons";

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Câmera',
          tabBarIcon: ({ color }) => <Ionicons name="camera" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
