import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import DespesaItem from './DespesaItem';

function renderizarItem({ item }) {
  return (
    <DespesaItem
      categoria={item.categoria}
      descricao={item.descricao}
      valor={item.valor}
      data={item.data}
    />
  );
}

function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={renderizarItem}
      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhuma despesa encontrada.</Text>
      }
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#777777',
  },
});