// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App Saúde de Idosos</Text>
      <Button 
        title="Ver Medicações"
        onPress={() => navigation.navigate('Medicações')}
      />
      <Button 
        title="Ver Monitoramento"
        onPress={() => navigation.navigate('Monitoramento')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
