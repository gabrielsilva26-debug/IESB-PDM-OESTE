import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useDespesas } from '../context/DespesasContext';

const CATEGORIAS = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

function TodasDespesas() {
  const { despesas } = useDespesas();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const despesasFiltradas = despesas.filter((despesa) =>
    categoriaFiltro === 'Todas' ? true : despesa.categoria === categoriaFiltro
  );

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoriaFiltro(cat)}
            style={[styles.botao, categoriaFiltro === cat && styles.botaoAtivo]}
          >
            <Text style={[styles.botaoTexto, categoriaFiltro === cat && styles.botaoTextoAtivo]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
      <DespesaSaida despesas={despesasFiltradas} periodo="Total" />
    </View>
  );
}

export default TodasDespesas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  botao: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  botaoAtivo: {
    backgroundColor: '#3949ab',
  },
  botaoTexto: {
    color: '#444444',
    fontSize: 13,
  },
  botaoTextoAtivo: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});