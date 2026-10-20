import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardShadow, getColors } from '../../constants/theme';

export default function DespesaItem({ expense }) {
  const navigation = useNavigation();
  const c = getColors(useColorScheme());

  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa', { expenseId: expense.id })}
      style={({ pressed }) => [
        styles.card,
        cardShadow,
        { backgroundColor: c.card },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: c.text }]}>{expense.description}</Text>
        <Text style={{ color: c.textSecondary }}>
          {new Date(expense.date).toLocaleDateString('pt-BR')} · {expense.category}
        </Text>
      </View>
      <Text style={[styles.amount, { color: c.primary }]}>
        R$ {expense.amount.toFixed(2)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
  },
  pressed: { opacity: 0.7 },
  info: { flex: 1, marginRight: 12 },
  description: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  amount: { fontSize: 16, fontWeight: 'bold' },
});