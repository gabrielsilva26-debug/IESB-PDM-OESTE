import { Stack } from 'expo-router';
import { ExpensesContextProvider } from '../store/expenses-context';

export default function RootLayout() {
  return (
    <ExpensesContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ title: 'Tarefa' }} />
        <Stack.Screen
          name="new-task"
          options={{ title: 'Nova tarefa', presentation: 'modal' }}
        />
      </Stack>
    </ExpensesContextProvider>
  );
}