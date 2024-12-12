// src/screens/HealthMonitorScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';

interface HealthRecord {
  id: number;
  bloodPressure: string;
  glucoseLevel: string;
  date: string;
}

const HealthMonitorScreen = ({ navigation }: any) => {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [bloodPressure, setBloodPressure] = useState('');
  const [glucoseLevel, setGlucoseLevel] = useState('');
  const [date, setDate] = useState('');

  const addHealthRecord = () => {
    if (bloodPressure && glucoseLevel && date) {
      const newRecord = {
        id: healthRecords.length + 1,
        bloodPressure,
        glucoseLevel,
        date,
      };
      setHealthRecords([...healthRecords, newRecord]);
      setBloodPressure('');
      setGlucoseLevel('');
      setDate('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento de Saúde</Text>

      <TextInput
        style={styles.input}
        placeholder="Pressão Arterial"
        value={bloodPressure}
        onChangeText={setBloodPressure}
      />
      <TextInput
        style={styles.input}
        placeholder="Nível de Glicose"
        value={glucoseLevel}
        onChangeText={setGlucoseLevel}
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={date}
        onChangeText={setDate}
      />

      <Button title="Adicionar Registro" onPress={addHealthRecord} />

      <FlatList
        data={healthRecords}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text>Pressão: {item.bloodPressure}</Text>
            <Text>Glicose: {item.glucoseLevel}</Text>
            <Text>Data: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Button title="Voltar para Home" onPress={() => navigation.goBack()} />
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
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  recordItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default HealthMonitorScreen;
