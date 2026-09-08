import { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Carrega as metas salvas quando o aplicativo inicia.
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos) {
          const metasSalvas = JSON.parse(dadosSalvos);

          const metasAtualizadas = metasSalvas.map((meta) => ({
            ...meta,
            concluida: Boolean(meta.concluida),
          }));

          setMetas(metasAtualizadas);
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar suas metas.'
        );
      } finally {
        setCarregado(true);
      }
    }

    carregarMetas();
  }, []);

  // Salva as metas sempre que a lista é alterada.
  useEffect(() => {
    if (!carregado) {
      return;
    }

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(metas)
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar suas metas.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregado]);

  function adicionarMeta() {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert(
        'Atenção',
        'Digite uma meta antes de adicionar.'
      );
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [
      ...metasAtuais,
      novaMeta,
    ]);

    setTexto('');
  }

  function removerMeta(id) {
    setMetas((metasAtuais) =>
      metasAtuais.filter((meta) => meta.id !== id)
    );
  }

  function alternarConclusao(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id
          ? {
              ...meta,
              concluida: !meta.concluida,
            }
          : meta
      )
    );
  }

  const pendentes = metas.filter(
    (meta) => !meta.concluida
  ).length;

  const concluidas = metas.filter(
    (meta) => meta.concluida
  ).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/icon.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>
            Metas do Semestre
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Cadastre suas metas de estudo
        </Text>

        <View style={styles.inputRow}>
          <MetaInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarMeta}
          />
        </View>

        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {pendentes} pendentes • {concluidas} concluídas
          </Text>
        </View>

        <Text style={styles.listTitle}>
          Minhas metas
        </Text>

        <MetaList
          metas={metas}
          onDelete={removerMeta}
          onToggleComplete={alternarConclusao}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  logo: {
    width: 45,
    height: 45,
    marginRight: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  counter: {
    alignItems: 'center',
    marginBottom: 15,
  },

  counterText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});