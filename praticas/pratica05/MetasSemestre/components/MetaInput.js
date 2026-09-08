import { StyleSheet, TextInput, Pressable, Text } from 'react-native';

export default function MetaInput({ value, onChangeText, onAdd }) {
  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="Digite uma meta de estudo"
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#cccccc' }}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },

  button: {
    width: '30%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});