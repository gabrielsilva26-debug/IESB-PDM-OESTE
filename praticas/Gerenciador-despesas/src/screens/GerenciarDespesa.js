import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

function GerenciarDespesa({ route, navigation }) {
  const despesaEditada = route?.params?.despesa;
  const onSalvar = route?.params?.onSalvar;

  const [descricao, setDescricao] = useState(despesaEditada ? despesaEditada.descricao : '');
  const [valor, setValor] = useState(despesaEditada ? String(despesaEditada.valor) : '');
  const [categoria, setCategoria] = useState(despesaEditada ? despesaEditada.categoria : '');
  const [data, setData] = useState(despesaEditada ? new Date(despesaEditada.data) : null);
  const [mostrarPicker, setMostrarPicker] = useState(false);

  function alterarValor(texto) {
    const normalizado = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalizado)) {
      setValor(normalizado);
    }
  }

  function alterarData(evento, dataSelecionada) {
    if (Platform.OS === 'android') {
      setMostrarPicker(false);
    }
    if (evento.type === 'set' && dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function confirmar() {
    const valorNumero = parseFloat(valor);

    if (
      descricao.trim().length === 0 ||
      valor.length === 0 ||
      isNaN(valorNumero) ||
      valorNumero <= 0 ||
      categoria === '' ||
      !data
    ) {
      Alert.alert('Dados inválidos', 'Preencha descrição, valor, categoria e data.');
      return;
    }

    const despesa = {
      id: despesaEditada ? despesaEditada.id : new Date().getTime().toString(),
      descricao: descricao.trim(),
      valor: valorNumero,
      categoria,
      data,
    };

    if (onSalvar) {
      onSalvar(despesa);
    }
    if (navigation) {
      navigation.goBack();
    }
  }

  function cancelar() {
    if (navigation) {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {despesaEditada ? 'Editar Despesa' : 'Nova Despesa'}
      </Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Supermercado"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={alterarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => setCategoria(cat)}
            style={[styles.botaoCategoria, categoria === cat && styles.botaoCategoriaAtivo]}
          >
            <Text
              style={[
                styles.botaoCategoriaTexto,
                categoria === cat && styles.botaoCategoriaTextoAtivo,
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Data</Text>
      <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
        <Text style={data ? styles.dataTexto : styles.dataPlaceholder}>
          {data ? formatarData(data) : 'Selecionar data'}
        </Text>
      </Pressable>

      {mostrarPicker && (
        <DateTimePicker
          value={data || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={alterarData}
        />
      )}

      {Platform.OS === 'ios' && mostrarPicker && (
        <Pressable style={styles.botaoOk} onPress={() => setMostrarPicker(false)}>
          <Text style={styles.botaoOkTexto}>OK</Text>
        </Pressable>
      )}

      <View style={styles.acoes}>
        <Pressable style={[styles.botaoAcao, styles.botaoCancelar]} onPress={cancelar}>
          <Text style={styles.botaoAcaoTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botaoAcao, styles.botaoConfirmar]} onPress={confirmar}>
          <Text style={styles.botaoAcaoTexto}>
            {despesaEditada ? 'Atualizar' : 'Adicionar'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  dataTexto: {
    fontSize: 16,
    color: '#222222',
  },
  dataPlaceholder: {
    fontSize: 16,
    color: '#999999',
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  botaoCategoria: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
    marginBottom: 8,
  },
  botaoCategoriaAtivo: {
    backgroundColor: '#3949ab',
  },
  botaoCategoriaTexto: {
    color: '#444444',
  },
  botaoCategoriaTextoAtivo: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  botaoOk: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#3949ab',
    borderRadius: 6,
    marginTop: 4,
  },
  botaoOkTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  botaoAcao: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  botaoCancelar: {
    backgroundColor: '#9e9e9e',
  },
  botaoConfirmar: {
    backgroundColor: '#2e7d32',
  },
  botaoAcaoTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});