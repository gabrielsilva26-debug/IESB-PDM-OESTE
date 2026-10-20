import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DespesasProvider, useDespesas } from './src/context/DespesasContext';
import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const COR_PRIMARIA = '#3949ab';

// Injeta o salvarDespesa do contexto como callback "onSalvar" do formulário
function TelaGerenciarDespesa(props) {
  const { salvarDespesa } = useDespesas();

  const routeComCallback = {
    ...props.route,
    params: { ...(props.route.params || {}), onSalvar: salvarDespesa },
  };

  return <GerenciarDespesa {...props} route={routeComCallback} />;
}

function BotaoAdicionar({ navigation }) {
  return (
    <Pressable
      onPress={() => navigation.navigate('GerenciarDespesa')}
      style={styles.botaoAdicionar}
    >
      <Text style={styles.botaoAdicionarTexto}>+</Text>
    </Pressable>
  );
}

function AbasDespesas() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: COR_PRIMARIA },
        headerTintColor: '#ffffff',
        tabBarActiveTintColor: COR_PRIMARIA,
        tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold', paddingBottom: 4 },
        tabBarIconStyle: { display: 'none' },
        headerRight: () => <BotaoAdicionar navigation={navigation} />,
      })}
    >
      <Tabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{ title: 'Recentes', tabBarLabel: 'Recentes' }}
      />
      <Tabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{ title: 'Todas as Despesas', tabBarLabel: 'Todas' }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <DespesasProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AbasDespesas"
            component={AbasDespesas}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={TelaGerenciarDespesa}
            options={{
              title: 'Gerenciar Despesa',
              presentation: 'modal',
              headerStyle: { backgroundColor: COR_PRIMARIA },
              headerTintColor: '#ffffff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DespesasProvider>
  );
}

const styles = StyleSheet.create({
  botaoAdicionar: {
    marginRight: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoAdicionarTexto: {
    color: '#ffffff',
    fontSize: 22,
    lineHeight: 24,
    fontWeight: 'bold',
  },
});