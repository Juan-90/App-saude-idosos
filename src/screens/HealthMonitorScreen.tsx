import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HealthMonitorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento da Saúde</Text>
      <Text style={styles.subtitle}>Registre e acompanhe seus dados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: 'gray', marginTop: 10 },
});
