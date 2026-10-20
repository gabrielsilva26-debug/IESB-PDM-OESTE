import { FlatList, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DespesaItem from './DespesaItem';
import { getColors } from '../../constants/theme';

export default function DespesaLista({
  expenses,
  emptyMessage = 'Toque em + para adicionar uma despesa.',
}) {
  const c = getColors(useColorScheme());

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem expense={item} />}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Ionicons name="wallet-outline" size={56} color={c.textSecondary} />
          <Text style={[styles.emptyTitle, { color: c.text }]}>Nenhuma despesa</Text>
          <Text style={{ color: c.textSecondary, textAlign: 'center' }}>{emptyMessage}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12, marginBottom: 4 },
});