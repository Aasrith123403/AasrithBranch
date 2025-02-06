import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#005A3D', // Use standard light color
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#343434', // Set the background color to white
        },
      }}>
      <Tabs.Screen
        name="Clubs"
        options={{
          title: 'Clubs',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={'#005A3D'} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Schedule',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={'#005A3D'} />
          ),
        }}
      />
      <Tabs.Screen
        name="mentalhealth"
        options={{
          title: 'Mental Health',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={'#005A3D'} />
          ),
        }}
      />
    </Tabs>
  );
}