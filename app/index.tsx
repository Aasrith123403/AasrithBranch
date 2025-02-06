import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { create } from 'react-test-renderer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import Clubs from './(tabs)/Clubs';
import MentalHealthPage from './(tabs)/mentalhealth';
import { useState } from 'react';
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Clubs" component={Clubs} />
      <InsideStack.Screen name="mentalhealth" component={MentalHealthPage} />
    </InsideStack.Navigator>
  );
}
export default function SignUp() {
    const [user, setUser] = useState<User | null>(null);
    const FIREBASE_AUTH = getAuth();

    useEffect(() => {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        console.log('user', user);
      });
    }, [])
    return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="SignUpScreen">
            {user ? (
            <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}} />
            ) : (
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
            )}
            </Stack.Navigator>
      </NavigationContainer>  
    );
  };
