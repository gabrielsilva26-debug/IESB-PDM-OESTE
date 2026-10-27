import { useState } from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const router = useRouter();
  const [place, setPlace] = useState(null);
  const [loadingPlace, setLoadingPlace] = useState(false);

  async function handleCheckIn() {
    setLoadingPlace(true);
    try {
      const result = await getCurrentPlace();

      if (!result) {
        Alert.alert(
          'Permissão negada',
          'Sem acesso à localização não é possível fazer o check-in.'
        );
        return;
      }

      setPlace(result);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    } finally {
      setLoadingPlace(false);
    }
  }

  async function handleReminder() {
    try {
      const id = await scheduleReminder('Hora de estudar!', 10);

      if (!id) {
        Alert.alert(
          'Permissão negada',
          'Ative as notificações nos ajustes para receber lembretes.'
        );
        return;
      }

      Alert.alert('Lembrete agendado', 'Você será avisado em 10 segundos.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível agendar o lembrete.');
    }
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      // sem vibração (ex.: emulador): o app segue normalmente
    }
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <Pressable style={styles.button} onPress={() => router.push('/new-task')}>
        <Text style={styles.buttonText}>Nova tarefa</Text>
      </Pressable>

      <Link href="/task/42" style={styles.link}>
        Abrir tarefa 42
      </Link>

      <Pressable
        style={[styles.button, loadingPlace && styles.buttonDisabled]}
        onPress={handleCheckIn}
        disabled={loadingPlace}
      >
        <Text style={styles.buttonText}>
          {loadingPlace ? 'Buscando local...' : 'Estudei aqui'}
        </Text>
      </Pressable>

      {place && <Text style={styles.place}>Local: {place.label}</Text>}

      <Pressable style={styles.button} onPress={handleReminder}>
        <Text style={styles.buttonText}>Lembrar em 10 s</Text>
      </Pressable>

      <Pressable style={styles.buttonGreen} onPress={handleComplete}>
        <Text style={styles.buttonText}>Concluir</Text>
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
    gap: 16,
  },
  title: { fontSize: 22, fontWeight: 'bold' },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonGreen: {
    backgroundColor: '#16a34a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#2563eb', fontSize: 16, textDecorationLine: 'underline' },
  place: { fontSize: 16, textAlign: 'center' },
});