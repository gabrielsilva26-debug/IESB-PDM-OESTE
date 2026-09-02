import { StyleSheet, Text, ScrollView } from 'react-native';

function MetasList(props) {
  return (
    <ScrollView>
      {props.array.map((meta) => (
        <Text key={meta.id} style={styles.item}>
          {meta.texto}
        </Text>
      ))}
    </ScrollView>
  );
}

export default MetasList;

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightblue',
  },
});
