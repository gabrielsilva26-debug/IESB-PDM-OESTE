import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  onToggleConcluido,
  tituloLista,
  listaVazia,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            
            {/* Botão para marcar como concluído */}
            <Pressable
              style={styles.checkButton}
              onPress={() => onToggleConcluido(item.id)}
              android_ripple={{ color: '#CCCCCC' }}
            >
              <Text style={styles.checkText}>
                {item.concluido ? '☑' : '☐'}
              </Text>
            </Pressable>

            {/* Texto do compromisso */}
            <Text
              style={[
                styles.text,
                item.concluido && styles.textConcluido,
              ]}
            >
              {item.texto}
            </Text>

            {/* Botão excluir */}
            <Pressable
              style={({ pressed }) => [
                styles.deleteButton,
                pressed && styles.deleteButtonPressed,
              ]}
              onPress={() => onDelete(item.id)}
              android_ripple={{ color: '#CCCCCC' }}
            >
              <Text style={styles.deleteText}>
                Excluir
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {listaVazia}
          </Text>
        }
        contentContainerStyle={
          itens.length === 0 ? styles.emptyList : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },

  checkButton: {
    marginRight: 10,
  },

  checkText: {
    fontSize: 24,
  },

  text: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },

  textConcluido: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#EEEEEE',
  },

  deleteButtonPressed: {
    opacity: 0.6,
  },

  deleteText: {
    fontWeight: 'bold',
  },

  emptyList: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 16,
  },
});