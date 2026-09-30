import { StyleSheet, Text, View } from 'react-native';

export default function GerenciarDespesa() {
  return (
    <View style={styles.container}>
      <Text>Gerenciar Despesa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});