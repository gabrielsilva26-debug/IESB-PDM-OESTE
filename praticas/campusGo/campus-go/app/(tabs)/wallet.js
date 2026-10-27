import { View, Text, Pressable, Share, Alert, StyleSheet } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();

  const total = (expenses ?? []).reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  async function handleShare() {
    try {
      await Share.share({
        message: `Gastei R$ ${total.toFixed(2)} neste semestre.`,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o resumo.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {total.toFixed(2)}</Text>

      <Pressable style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Compartilhar resumo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  label: { fontSize: 16, color: '#6b7280' },
  total: { fontSize: 36, fontWeight: 'bold' },
  button: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});