import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, item) => total + item.valor, 0);
  const acimaDoLimite = somaDespesas > 200;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, acimaDoLimite && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#e8eaf6',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodo: {
    fontSize: 14,
    color: '#3949ab',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
  },
  somaAlerta: {
    color: 'red',
  },
});