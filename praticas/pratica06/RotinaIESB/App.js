import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  tituloApp,
  placeholderCompromisso,
  botaoAdicionar,
  tituloLista,
  listaVazia,
} from './labels';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [itens, setItens] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // ==========================================
  // CARREGAR OS DADOS DO ASYNCSTORAGE
  // ==========================================
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos) {
          const dados = JSON.parse(dadosSalvos);
          setItens(dados);
        }
      } catch (error) {
        console.log(
          'Erro ao carregar compromissos:',
          error
        );
      } finally {
        setCarregado(true);
      }
    }

    carregarCompromissos();
  }, []);

  // ==========================================
  // SALVAR OS DADOS NO ASYNCSTORAGE
  // ==========================================
  useEffect(() => {
    async function salvarCompromissos() {
      // Evita salvar a lista vazia antes de terminar
      // o carregamento inicial.
      if (!carregado) {
        return;
      }

      try {
        const dados = JSON.stringify(itens);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          dados
        );
      } catch (error) {
        console.log(
          'Erro ao salvar compromissos:',
          error
        );
      }
    }

    salvarCompromissos();
  }, [itens, carregado]);

  // ==========================================
  // ADICIONAR COMPROMISSO
  // ==========================================
  function adicionarCompromisso() {
    const textoLimpo = texto.trim();

    // Não permite adicionar texto vazio.
    if (!textoLimpo) {
      Alert.alert(
        'Atenção',
        'Digite um compromisso antes de adicionar.'
      );

      return;
    }

    const novoCompromisso = {
      id: `${Date.now()}-${Math.random()}`,
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
      concluido: false,
    };

    setItens((itensAtuais) => [
      ...itensAtuais,
      novoCompromisso,
    ]);

    // Limpa o campo depois de adicionar.
    setTexto('');
  }

  // ==========================================
  // EXCLUIR COMPROMISSO
  // ==========================================
  function excluirCompromisso(id) {
    setItens((itensAtuais) =>
      itensAtuais.filter(
        (item) => item.id !== id
      )
    );
  }

  // ==========================================
  // MARCAR/DESMARCAR COMO CONCLUÍDO
  // ==========================================
  function alternarConcluido(id) {
    setItens((itensAtuais) =>
      itensAtuais.map((item) =>
        item.id === id
          ? {
              ...item,
              concluido: !item.concluido,
            }
          : item
      )
    );
  }

  // ==========================================
  // INTERFACE DO APLICATIVO
  // ==========================================
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* CABEÇALHO */}
          <View style={styles.header}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
            />

            <Text style={styles.title}>
              {tituloApp}
            </Text>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.form}>
            <CompromissoInput
              value={texto}
              onChangeText={setTexto}
              onAdd={adicionarCompromisso}
              labels={{
                placeholderCompromisso,
                botaoAdicionar,
              }}
            />
          </View>

          {/* LISTA */}
          <View style={styles.list}>

            {/* CONTADOR DE PENDENTES */}
            <Text style={styles.counter}>
              {
                itens.filter(
                  (item) => !item.concluido
                ).length
              }{' '}
              pendente(s)
            </Text>

            <CompromissoList
              itens={itens}
              onDelete={excluirCompromisso}
              onToggleConcluido={alternarConcluido}
              tituloLista={tituloLista}
              listaVazia={listaVazia}
            />

          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ==========================================
// ESTILOS
// ==========================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 50,
    height: 50,
    marginRight: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  form: {
    width: '100%',
  },

  list: {
    flex: 1,
  },

  counter: {
    fontSize: 14,
    marginBottom: 8,
  },
});