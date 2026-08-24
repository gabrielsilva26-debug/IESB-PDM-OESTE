import { useState } from 'react';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  ADD_BUTTON,
  LIST_TITLE,
} from './labels';

export default function App() {
  const [disciplina, setDisciplina] = useState('');

  const disciplinas = [
    'Programação para Dispositivos Móveis',
    'Banco de Dados',
    'Engenharia de Software',
    'Desenvolvimento Web',
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* Cabeçalho */}
        <Text style={styles.title}>{APP_TITLE}</Text>

        {/* Área de cadastro */}
        <View style={styles.inputRow}>

          <TextInput
            style={styles.input}
            placeholder={INPUT_PLACEHOLDER}
            value={disciplina}
            onChangeText={setDisciplina}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={ADD_BUTTON}
              onPress={() => {}}
            />
          </View>

        </View>

        {/* Lista de disciplinas */}
        <Text style={styles.listTitle}>{LIST_TITLE}</Text>

        {disciplinas.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },

  inputRow: {
    flexDirection: 'row',

    // Coloca o campo e o botão lado a lado.
    alignItems: 'center',

    // Distribui o espaço entre o campo e o botão.
    justifyContent: 'space-between',

    marginBottom: 25,
  },

  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },

  buttonContainer: {
    width: '27%',
  },

  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  item: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  itemText: {
    fontSize: 16,
  },
});