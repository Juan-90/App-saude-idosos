import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function MedicationScreen() {
  const [medications, setMedications] = useState([
    { id: '1', name: 'Remédio A', time: '08:00' },
    { id: '2', name: 'Remédio B', time: '12:00' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicações</Text>
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.time}
          </Text>
        )}
      />
      <Button title="Adicionar Lembrete" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 18, padding: 5 },
});
