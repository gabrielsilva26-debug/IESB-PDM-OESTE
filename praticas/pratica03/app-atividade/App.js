import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MetasList from './components/MetasList';
import MetaInput from './components/MetaInput';

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    const novaMeta = {
      id: Math.random().toString(),
      texto: inputMeta,
    };

    setMetas([...metas, novaMeta]);
  }

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicionarMetaHandler} />

      <View style={styles.metaContainer}>
        <MetasList array={metas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
  },

  metaContainer: {
    flex: 1,
  },
});
``
