import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mainpage from './src/Mainpage';
import Display from './src/Display';
import SuggestPage from './src/SuggestPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c6f266',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nutritionalyzer">
        <Stack.Screen name="Nutritionalyzer" component={Mainpage} />
        <Stack.Screen
          name="Suggested"
          component={SuggestPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FoodDetails"
          component={Display}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
