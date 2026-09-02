import { useState } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

function MetaInput(props) {
  const [inputMeta, setInputMeta] = useState('');

  function adicionarMeta() {
    if (inputMeta.trim().length === 0) {
      return;
    }

    props.onAddMeta(inputMeta);
    setInputMeta('');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma meta"
        value={inputMeta}
        onChangeText={setInputMeta}
      />

      <Button
        title="Adicionar"
        onPress={adicionarMeta}
      />
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});
