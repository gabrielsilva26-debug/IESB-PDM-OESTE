import { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import { getColors } from '../constants/theme';

export default function TodasDespesas() {
  const { expenses } = useExpenses();
  const c = getColors(useColorScheme());

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    if (!term) return expenses;
    return expenses.filter((expense) => expense.description.toLowerCase().includes(term));
  }, [expenses, debouncedSearch]);

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <TextInput
        style={[
          styles.search,
          { backgroundColor: c.card, color: c.text, borderColor: c.border },
        ]}
        placeholder="Buscar por descrição..."
        placeholderTextColor={c.textSecondary}
        value={search}
        onChangeText={setSearch}
      />
      <DespesaSaida
        expenses={filtered}
        title={debouncedSearch ? 'Resultado da busca' : 'Todas as despesas'}
        emptyMessage={debouncedSearch ? 'Nenhuma despesa encontrada para essa busca.' : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 16,
  },
});