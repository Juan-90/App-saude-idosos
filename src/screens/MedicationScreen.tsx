// Importações necessárias
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Biblioteca para ícones

const App = () => {
  const medications = [
    { id: '1', name: 'Paracetamol', dosage: '500mg', time: '08:00' },
    { id: '2', name: 'Ibuprofeno', dosage: '200mg', time: '14:00' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meu App de Saúde</Text>

      {/* Lista de Medicamentos */}
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.medicationCard}>
            <Icon name="pill" size={30} color={styles.iconColor.color} />
            <View style={styles.medicationDetails}>
              <Text style={styles.medicationName}>{item.name}</Text>
              <Text style={styles.medicationInfo}>Dosagem: {item.dosage}</Text>
              <Text style={styles.medicationInfo}>Horário: {item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Button title="Adicionar Medicação" color={styles.button.color} onPress={() => Alert.alert('Botão clicado!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Fundo suave (Turquesa claro)
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B', // Verde escuro
    textAlign: 'center',
    marginBottom: 16,
  },
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Branco
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  medicationDetails: {
    marginLeft: 12,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0288D1', // Azul
  },
  medicationInfo: {
    fontSize: 14,
    color: '#455A64', // Cinza escuro
  },
  button: {
    color: '#00796B', // Verde escuro
  },
  iconColor: {
    color: '#0288D1', // Azul para ícones
  },
});

export default App;
