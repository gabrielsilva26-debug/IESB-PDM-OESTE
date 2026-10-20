import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { cardShadow, getColors } from '../../constants/theme';

export default function DespesaSumario({ title, count, total }) {
  const c = getColors(useColorScheme());

  return (
    <View style={[styles.container, cardShadow, { backgroundColor: c.card }]}>
      <View>
        <Text style={[styles.title, { color: c.text }]}>{title}</Text>
        <Text style={{ color: c.textSecondary }}>
          {count} {count === 1 ? 'despesa' : 'despesas'}
        </Text>
      </View>
      <Text style={[styles.total, { color: c.primary }]}>R$ {total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    margin: 16,
    borderRadius: 10,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  total: { fontSize: 20, fontWeight: 'bold' },
});