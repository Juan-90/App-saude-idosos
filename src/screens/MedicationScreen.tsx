import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';

type Medication = {
  id: string;
  name: string;
  dosage: string;
  time: string;
};

const MedicationScreen = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]); // Tipo explícito aqui

  const validateForm = () => {
    if (!medicationName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome da medicação.');
      return false;
    }

    if (!dosage || isNaN(Number(dosage)) || Number(dosage) <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma dosagem válida.');
      return false;
    }

    if (!time.trim()) {
      Alert.alert('Erro', 'Por favor, insira o horário da medicação.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newMedication: Medication = {
        id: Date.now().toString(),
        name: medicationName,
        dosage,
        time,
      };

      setMedications((prevMedications) => [...prevMedications, newMedication]);
      Alert.alert('Sucesso', 'Medicação cadastrada com sucesso!');

      // Limpar os campos após adicionar
      setMedicationName('');
      setDosage('');
      setTime('');
    }
  };

  return (
    <View>
      <Text>Nome da Medicação</Text>
      <TextInput
        value={medicationName}
        onChangeText={setMedicationName}
        placeholder="Nome da medicação"
      />

      <Text>Dosagem</Text>
      <TextInput
        value={dosage}
        onChangeText={setDosage}
        keyboardType="numeric"
        placeholder="Dosagem"
      />

      <Text>Horário</Text>
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="Horário (ex.: 08:00)"
      />

      <Button title="Salvar Medicação" onPress={handleSubmit} />

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Nome: {item.name}</Text>
            <Text>Dosagem: {item.dosage}</Text>
            <Text>Horário: {item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MedicationScreen;
