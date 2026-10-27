import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';
import useNotices from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.message}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.button} onPress={reload}>
          <Text style={styles.buttonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      refreshing={isLoading}
      onRefresh={reload}
      ListEmptyComponent={
        <Text style={styles.message}>Nenhum aviso no momento.</Text>
      }
      renderItem={({ item, index }) => (
        <FadeIn delay={index * 80} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardBody}>{item.body}</Text>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 14,
    gap: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardBody: { fontSize: 14, color: '#374151' },
  message: { textAlign: 'center', color: '#6b7280' },
  errorText: { textAlign: 'center', color: '#dc2626', fontSize: 16 },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});