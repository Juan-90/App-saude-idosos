import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HealthMonitorScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [systolicPressure, setSystolicPressure] = useState('');
  const [diastolicPressure, setDiastolicPressure] = useState('');
  const [temperature, setTemperature] = useState('');

  const calculateIMC = (weight: number, height: number) => {
    return weight / (height * height);
  };

  const getWeightStatus = (weight: number, height: number) => {
    const imc = calculateIMC(weight, height);
    let status = '';
    if (imc < 18.5) {
      status = 'Você está abaixo do peso. É recomendável procurar orientação médica.';
    } else if (imc >= 18.5 && imc <= 24.9) {
      status = 'Seu peso está dentro da faixa saudável. Continue cuidando de sua saúde.';
    } else if (imc >= 25 && imc <= 29.9) {
      status = 'Você está com sobrepeso. Procure um nutricionista ou médico para orientações.';
    } else {
      status = 'Você está em obesidade. É importante buscar ajuda médica imediatamente.';
    }
    return { imc, status };
  };

  const getBloodPressureStatus = (systolic: number, diastolic: number) => {
    if (systolic < 90 || diastolic < 60) {
      return 'Sua pressão está baixa. Se você estiver sentindo sintomas, procure um médico.';
    } else if (systolic >= 90 && systolic <= 120 && diastolic >= 60 && diastolic <= 80) {
      return 'Sua pressão está normal. Continue monitorando regularmente.';
    } else if (systolic > 120 && systolic <= 180 && diastolic > 80 && diastolic <= 120) {
      return 'Sua pressão está alta. Tente reduzir o estresse e, se persistir, consulte um médico.';
    } else {
      return 'Sua pressão está muito alta. Procure atendimento médico imediato.';
    }
  };

  const getTemperatureStatus = (temperature: number) => {
    if (temperature < 35) {
      return 'Sua temperatura está baixa. Procure aquecer-se e, se persistir, busque ajuda médica.';
    } else if (temperature >= 35 && temperature <= 37.5) {
      return 'Sua temperatura está normal. Continue cuidando de sua saúde.';
    } else if (temperature > 37.5 && temperature <= 39.9) {
      return 'Você está com febre. Mantenha-se hidratado e, se persistir, procure um médico.';
    } else {
      return 'Você está com febre alta. Procure atendimento médico imediato!';
    }
  };

  const validateForm = () => {
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um peso válido.');
      return false;
    }
    if (!height || isNaN(Number(height)) || Number(height) <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma altura válida (em metros).');
      return false;
    }
    if (!systolicPressure || isNaN(Number(systolicPressure)) || Number(systolicPressure) < 90 || Number(systolicPressure) > 180) {
      Alert.alert('Erro', 'A pressão sistólica deve estar entre 90 e 180.');
      return false;
    }
    if (!diastolicPressure || isNaN(Number(diastolicPressure)) || Number(diastolicPressure) < 60 || Number(diastolicPressure) > 120) {
      Alert.alert('Erro', 'A pressão diastólica deve estar entre 60 e 120.');
      return false;
    }
    if (!temperature || isNaN(Number(temperature)) || Number(temperature) < 35 || Number(temperature) > 42) {
      Alert.alert('Erro', 'A temperatura corporal deve estar entre 35°C e 42°C.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const weightStatus = getWeightStatus(Number(weight), Number(height));
      const pressureStatus = getBloodPressureStatus(Number(systolicPressure), Number(diastolicPressure));
      const temperatureStatus = getTemperatureStatus(Number(temperature));

      Alert.alert('Monitoramento de Saúde', `
        IMC: ${weightStatus.imc.toFixed(2)} - ${weightStatus.status}
        \nPressão Arterial: ${systolicPressure}/${diastolicPressure} mmHg - ${pressureStatus}
        \nTemperatura: ${temperature}°C - ${temperatureStatus}
      `);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputGroup}>
        <MaterialCommunityIcons name="weight-kilogram" size={24} color="#4CAF50" />
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="Peso (kg)"
          style={styles.input}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <MaterialCommunityIcons name="human-male-height" size={24} color="#4CAF50" />
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          placeholder="Altura (m)"
          style={styles.input}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <MaterialCommunityIcons name="heart-pulse" size={24} color="#4CAF50" />
        <TextInput
          value={systolicPressure}
          onChangeText={setSystolicPressure}
          keyboardType="numeric"
          placeholder="Pressão Sistólica"
          style={styles.input}
        />
      </View>
      
      <View style={styles.inputGroup}>
        <MaterialCommunityIcons name="heart-pulse" size={24} color="#4CAF50" />
        <TextInput
          value={diastolicPressure}
          onChangeText={setDiastolicPressure}
          keyboardType="numeric"
          placeholder="Pressão Diastólica"
          style={styles.input}
        />
      </View>

      <View style={styles.inputGroup}>
        <MaterialCommunityIcons name="thermometer" size={24} color="#4CAF50" />
        <TextInput
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
          placeholder="Temperatura (°C)"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <MaterialCommunityIcons name="check" size={24} color="#fff" />
        <Text style={styles.buttonText}>Salvar Monitoramento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default HealthMonitorScreen;
