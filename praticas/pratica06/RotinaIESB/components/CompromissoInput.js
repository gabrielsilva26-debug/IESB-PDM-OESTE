import {
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#CCCCCC' }}
      >
        <Text style={styles.buttonText}>
          {labels.botaoAdicionar}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999999',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },

  button: {
    width: '28%',
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