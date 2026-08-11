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
        name="teste"
        options={{
          title: 'Olá, esse é um teste',
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
