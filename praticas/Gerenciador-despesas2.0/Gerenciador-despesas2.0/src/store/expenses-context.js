import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@expenses';

const ExpensesContext = createContext(null);

// O reducer SEMPRE devolve um array novo (nada de push/splice).
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) Ao abrir o app: carrega do AsyncStorage
  useEffect(() => {
    async function loadExpenses() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          dispatch({ type: 'SET', payload: JSON.parse(stored) });
        }
      } catch (error) {
        console.warn('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadExpenses();
  }, []);

  // 2) A cada mudança: salva (só depois de carregar, para não apagar os dados)
  useEffect(() => {
    if (!isLoaded) return;
    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.warn('Erro ao salvar despesas:', error);
      }
    }
    saveExpenses();
  }, [expenses, isLoaded]);

  function addExpense(data) {
    const newExpense = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...data,
    };
    dispatch({ type: 'ADD', payload: newExpense });
  }

  function updateExpense(id, data) {
    dispatch({ type: 'UPDATE', payload: { id, ...data } });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  // Evita piscar o estado vazio antes de os dados carregarem
  if (!isLoaded) return null;

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de um ExpensesContextProvider');
  }
  return context;
}