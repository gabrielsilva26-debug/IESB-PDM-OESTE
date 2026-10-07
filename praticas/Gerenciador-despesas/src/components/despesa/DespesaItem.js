import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function formatarData(data) {
  const d = new Date(data);
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function DespesaItem({ categoria, descricao, valor, data }) {
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{categoria}</Text>
        </View>
        <Text style={styles.descricao}>{descricao}</Text>
        <Text style={styles.data}>{formatarData(data)}</Text>
      </View>
      <View style={styles.valorContainer}>
        <Text style={styles.valor}>R$ {Number(valor).toFixed(2)}</Text>
      </View>
    </View>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  info: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 6,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444444',
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 4,
  },
  data: {
    fontSize: 12,
    color: '#777777',
  },
  valorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
  },
  valor: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
});