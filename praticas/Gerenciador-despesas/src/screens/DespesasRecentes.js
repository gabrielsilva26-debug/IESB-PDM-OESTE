import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useDespesas } from '../context/DespesasContext';

const CATEGORIAS = ['Todas', 'Alimentação', 'Transporte', 'Lazer', 'Contas'];

function DespesasRecentes() {
  const { despesas } = useDespesas();
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const limite = new Date();
  limite.setDate(limite.getDate() - 7);

  const despesasRecentes = despesas.filter(
    (despesa) => new Date(despesa.data) >= limite
  );

  const despesasFiltradas = despesasRecentes.filter((despesa) =>
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
      <DespesaSaida despesas={despesasFiltradas} periodo="Últimos 7 dias" />
    </View>
  );
}

export default DespesasRecentes;

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