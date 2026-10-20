import { View } from 'react-native';
import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ expenses, title, emptyMessage }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={{ flex: 1 }}>
      <DespesaSumario title={title} count={expenses.length} total={total} />
      <DespesaLista expenses={expenses} emptyMessage={emptyMessage} />
    </View>
  );
}