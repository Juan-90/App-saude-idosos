import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Define o tipo das referências dos TextInputs
type InputRefs = {
  name?: TextInput;
  dosage?: TextInput;
  time?: TextInput;
};

const MedicationScreen = () => {
  const [medications, setMedications] = useState([
    { id: '1', name: 'Paracetamol', dosage: '500mg', time: '08:00' },
    { id: '2', name: 'Ibuprofeno', dosage: '200mg', time: '14:00' },
  ]);

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  const inputRefs = useRef<InputRefs>({});

  const validateTime = (input: string) => {
    // Remove caracteres não numéricos
    const numericInput = input.replace(/\D/g, '');

    // Formata a string como HH:mm
    if (numericInput.length >= 3) {
      const hours = numericInput.slice(0, 2);
      const minutes = numericInput.slice(2, 4);
      return `${hours}:${minutes}`;
    }
    return numericInput;
  };

  const addMedication = useCallback(() => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Valida formato HH:mm (12h ou 24h)

    if (name.trim() === '' || dosage.trim() === '' || time.trim() === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (!timeRegex.test(time)) {
      Alert.alert('Erro', 'Insira um horário válido no formato HH:mm!');
      return;
    }

    const newMedication = {
      id: Date.now().toString(),
      name,
      dosage,
      time,
    };

    setMedications((prevMedications) => [...prevMedications, newMedication]);
    setName('');
    setDosage('');
    setTime('');
    Alert.alert('Sucesso', 'Medicamento adicionado com sucesso!');
  }, [name, dosage, time]);

  const renderHeader = useMemo(() => {
    return (
      <View style={styles.formContainer}>
        <Text style={styles.header}>Cadastro de Medicamentos</Text>
        <TextInput
          ref={(el) => (inputRefs.current.name = el!)} // "!" diz ao TypeScript que não é nulo
          style={styles.input}
          placeholder="Nome do medicamento"
          placeholderTextColor="#90A4AE"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
          onSubmitEditing={() => inputRefs.current.dosage?.focus()}
        />
        <TextInput
          ref={(el) => (inputRefs.current.dosage = el!)}
          style={styles.input}
          placeholder="Dosagem (ex: 500mg)"
          placeholderTextColor="#90A4AE"
          value={dosage}
          onChangeText={setDosage}
          returnKeyType="next"
          onSubmitEditing={() => inputRefs.current.time?.focus()}
        />
        <TextInput
          ref={(el) => (inputRefs.current.time = el!)}
          style={styles.input}
          placeholder="Horário (HH:mm)"
          placeholderTextColor="#90A4AE"
          value={time}
          onChangeText={(text) => setTime(validateTime(text))}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={addMedication}
        />
        <Button title="Adicionar Medicamento" color={styles.button.color} onPress={addMedication} />
        <Text style={styles.listHeader}>Medicamentos Cadastrados</Text>
      </View>
    );
  }, [name, dosage, time, addMedication]);

  return (
    <View style={styles.container}>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        extraData={medications}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.medicationCard}>
            <Icon name="pill" size={30} color="#0288D1" />
            <View style={styles.medicationDetails}>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={styles.medicationInfo}>Dosagem: {item.dosage}</Text>
              <Text style={styles.medicationInfo}>Horário: {item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 40, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00796B',
    textAlign: 'center',
    marginBottom: 12,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginBottom: 12,
    color: '#37474F',
  },
  button: {
    color: '#00796B',
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    marginTop: 12,
    textAlign: 'center',
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  medicationDetails: {
    marginLeft: 12,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288D1',
  },
  medicationInfo: {
    fontSize: 14,
    color: '#455A64',
  },
});

export default MedicationScreen;
