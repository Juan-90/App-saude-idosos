import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, FlatList } from 'react-native';

const MedicationScreen = () => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [medications, setMedications] = useState([]);

  const validateForm = () => {
    if (!medicationName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome da medicação.');
      return false;
    }

    if (!dosage || isNaN(Number(dosage)) || Number(dosage) <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma dosagem válida.');
      return false;
    }

    if (!time.trim() || !/^\d{2}:\d{2}$/.test(time)) {
      Alert.alert('Erro', 'Por favor, insira um horário válido no formato HH:MM.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newMedication = {
        id: Date.now().toString(),
        name: medicationName,
        dosage,
        time,
      };

      setMedications((prevMedications) => [...prevMedications, newMedication]);
      setMedicationName('');
      setDosage('');
      setTime('');
      Alert.alert('Sucesso', 'Medicação cadastrada com sucesso!');
    }
  };

  const renderMedication = ({ item }) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 5,
      }}
    >
      <Text>Nome: {item.name}</Text>
      <Text>Dosagem: {item.dosage} mg</Text>
      <Text>Horário: {item.time}</Text>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text>Nome da Medicação</Text>
      <TextInput
        value={medicationName}
        onChangeText={setMedicationName}
        placeholder="Nome da medicação"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          marginVertical: 5,
          padding: 10,
        }}
      />

      <Text>Dosagem (mg)</Text>
      <TextInput
        value={dosage}
        onChangeText={setDosage}
        keyboardType="numeric"
        placeholder="Dosagem"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          marginVertical: 5,
          padding: 10,
        }}
      />

      <Text>Horário (HH:MM)</Text>
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="Horário"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          marginVertical: 5,
          padding: 10,
        }}
      />

      <Button title="Salvar Medicação" onPress={handleSubmit} />

      <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Medicações Cadastradas:</Text>
      {medications.length > 0 ? (
        <FlatList
          data={medications}
          renderItem={renderMedication}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={{ marginTop: 10 }}>Nenhuma medicação cadastrada.</Text>
      )}
    </View>
  );
};

export default MedicationScreen;
