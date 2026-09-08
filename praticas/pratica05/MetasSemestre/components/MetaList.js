import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

export default function MetaList({
  metas,
  onDelete,
  onToggleComplete,
}) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Pressable
            onPress={() => onToggleComplete(item.id)}
            android_ripple={{ color: '#cccccc' }}
            style={styles.metaContent}
          >
            <Text
              style={[
                styles.text,
                item.concluida && styles.textCompleted,
              ]}
            >
              {item.concluida ? '✓ ' : '○ '}
              {item.texto}
            </Text>

            <Text style={styles.status}>
              {item.concluida
                ? 'Concluída'
                : 'Pendente'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#cccccc' }}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.deleteText}>
              Excluir
            </Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          Nenhuma meta cadastrada.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  metaContent: {
    flex: 1,
    marginRight: 10,
  },

  text: {
    fontSize: 16,
    marginBottom: 5,
  },

  textCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  status: {
    fontSize: 13,
    opacity: 0.6,
  },

  deleteButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#D32F2F',
  },

  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});