import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import HealthMonitorScreen from '../screens/HealthMonitorScreen';
import MedicationScreen from '../screens/MedicationScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Início') {
            iconName = 'home';
          } else if (route.name === 'Monitoramento') {
            iconName = 'monitor-heart';
          } else if (route.name === 'Cadastro Medicamento') {
            iconName = 'pill';
          }

          return <Icon name={iconName} type="material-community" size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Monitoramento" component={HealthMonitorScreen} />
      <Tab.Screen name="Cadastro Medicamento" component={MedicationScreen} />
    </Tab.Navigator>
  );
};

export default Navigation;
