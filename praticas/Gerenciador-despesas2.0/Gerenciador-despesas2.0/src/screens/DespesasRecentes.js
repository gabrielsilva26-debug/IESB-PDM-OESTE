import { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import { getColors } from '../constants/theme';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const c = getColors(useColorScheme());

  const recent = useMemo(() => {
    const limit = new Date();
    limit.setDate(limit.getDate() - 7);
    limit.setHours(0, 0, 0, 0);
    return expenses.filter((expense) => new Date(expense.date) >= limit);
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <DespesaSaida expenses={recent} title="Últimos 7 dias" />
    </View>
  );
}