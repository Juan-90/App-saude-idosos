import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import MedicationScreen from './src/screens/MedicationScreen';
import HealthMonitorScreen from './src/screens/HealthMonitorScreen';

type RootTabParamList = {
  Home: undefined;
  Medicações: undefined;
  Monitoramento: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Medicações" component={MedicationScreen} />
        <Tab.Screen name="Monitoramento" component={HealthMonitorScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
