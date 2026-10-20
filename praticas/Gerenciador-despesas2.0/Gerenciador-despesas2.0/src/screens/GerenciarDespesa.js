import { createElement, useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categories';
import { getColors } from '../constants/theme';

// Converte a data ISO em "AAAA-MM-DD" no fuso local (usado só no navegador)
function toInputDate(iso) {
  const d = new Date(iso);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  if (new Date(values.date) > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const c = getColors(useColorScheme());

  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);

  // Um único objeto para todo o formulário
  const [form, setForm] = useState(() => {
    const existing = expenses.find((expense) => expense.id === expenseId);
    if (existing) {
      return {
        description: existing.description,
        amount: String(existing.amount),
        date: existing.date,
        category: existing.category,
      };
    }
    return { description: '', amount: '', date: new Date().toISOString(), category: '' };
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    // Depois da primeira tentativa de salvar, revalida a cada mudança:
    // o erro de um campo some assim que ele é corrigido.
    if (Object.keys(errors).length > 0) {
      setErrors(validate(next));
    }
  }

  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleSave() {
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function handleDelete() {
    function remove() {
      deleteExpense(expenseId);
      navigation.goBack();
    }

    // No navegador o Alert.alert não funciona; usamos o confirm do browser
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja excluir esta despesa?')) remove();
      return;
    }

    Alert.alert('Excluir despesa', 'Essa ação não pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: remove },
    ]);
  }

  function handleDateChange(event, selected) {
    setShowPicker(Platform.OS === 'ios');
    if (selected) handleChange('date', selected.toISOString());
  }

  const inputStyle = (field) => [
    styles.input,
    { backgroundColor: c.card, color: c.text, borderColor: errors[field] ? c.danger : c.border },
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {/* Descrição */}
        <Text style={[styles.label, { color: c.text }]}>Descrição</Text>
        <TextInput
          style={inputStyle('description')}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={c.textSecondary}
        />
        {errors.description && (
          <Text style={[styles.error, { color: c.danger }]}>{errors.description}</Text>
        )}

        {/* Valor */}
        <Text style={[styles.label, { color: c.text }]}>Valor (R$)</Text>
        <TextInput
          style={inputStyle('amount')}
          value={form.amount}
          onChangeText={handleAmountChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={c.textSecondary}
        />
        {errors.amount && <Text style={[styles.error, { color: c.danger }]}>{errors.amount}</Text>}

        {/* Data */}
        <Text style={[styles.label, { color: c.text }]}>Data</Text>
        {Platform.OS === 'web' ? (
          createElement('input', {
            type: 'date',
            value: toInputDate(form.date),
            onChange: (e) => {
              if (e.target.value) {
                handleChange('date', new Date(`${e.target.value}T12:00:00`).toISOString());
              }
            },
            style: {
              padding: 12,
              fontSize: 16,
              borderRadius: 8,
              border: `1px solid ${errors.date ? c.danger : c.border}`,
              backgroundColor: c.card,
              color: c.text,
            },
          })
        ) : (
          <>
            <Pressable style={inputStyle('date')} onPress={() => setShowPicker(true)}>
              <Text style={{ color: c.text }}>
                {new Date(form.date).toLocaleDateString('pt-BR')}
              </Text>
            </Pressable>
            {showPicker && (
              <DateTimePicker
                value={new Date(form.date)}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            )}
          </>
        )}
        {errors.date && <Text style={[styles.error, { color: c.danger }]}>{errors.date}</Text>}

        {/* Categoria (Modal) */}
        <Text style={[styles.label, { color: c.text }]}>Categoria</Text>
        <Pressable style={inputStyle('category')} onPress={() => setShowModal(true)}>
          <Text style={{ color: form.category ? c.text : c.textSecondary }}>
            {form.category || 'Selecionar categoria'}
          </Text>
        </Pressable>
        {errors.category && (
          <Text style={[styles.error, { color: c.danger }]}>{errors.category}</Text>
        )}

        {/* Botões */}
        <Pressable style={[styles.button, { backgroundColor: c.primary }]} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>

        {isEditing && (
          <Pressable
            style={[styles.button, { backgroundColor: c.danger }]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Excluir despesa</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          style={[styles.overlay, { backgroundColor: c.overlay }]}
          onPress={() => setShowModal(false)}
        >
          <View style={[styles.sheet, { backgroundColor: c.card }]}>
            <Text style={[styles.sheetTitle, { color: c.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[styles.option, { borderBottomColor: c.border }]}
                onPress={() => {
                  handleChange('category', category);
                  setShowModal(false);
                }}
              >
                <Text style={{ color: c.text, fontSize: 16 }}>{category}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 15, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12 },
  error: { fontSize: 13, marginTop: 4 },
  button: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 },
  sheetTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  option: { paddingVertical: 14, borderBottomWidth: 1 },
});