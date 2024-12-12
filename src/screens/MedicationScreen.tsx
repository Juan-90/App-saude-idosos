// src/screens/MedicationScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, FlatList } from 'react-native';

interface Medication {
  id: number;
  name: string;
  dose: string;
  time: string;
}

const MedicationScreen = ({ navigation }: any) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');

  const addMedication = () => {
    if (name && dose && time) {
      const newMedication = {
        id: medications.length + 1,
        name,
        dose,
        time,
      };
      setMedications([...medications, newMedication]);
      setName('');
      setDose('');
      setTime('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicações</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da Medicação"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dose"
        value={dose}
        onChangeText={setDose}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário"
        value={time}
        onChangeText={setTime}
      />

      <Button title="Adicionar Medicação" onPress={addMedication} />

      <FlatList
        data={medications}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text>{item.name}</Text>
            <Text>{item.dose}</Text>
            <Text>{item.time}</Text>
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
  medicationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default MedicationScreen;
