import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View,TextInput } from 'react-native';
import { titulo } from './util';
import titulo_padrao from './util';
import {
rotulo_input_meta, 
rotulo_btn_cadastro_meta,
rotulo_lista_metas
} from './mensagens';
export default function App() {
  return (
    <View style={styles.container}>
      <Text>{titulo}</Text>
      <Text style={{margin: 20}}>{titulo_padrao}</Text>
      <Text style={styles.Text}>AAA</Text>
      <Button title='Adicionar' />
      <Text>{rotulo_lista_metas}</Text>
      <Button title={rotulo_btn_cadastro_meta} />
      <TextInput style={styles.primari1} placeholder={rotulo_input_meta}/>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text:{
    margin: 20,
  },
  primari1:{
    margin: 30,
    borderWidth: 2,
    borderColor: '#1f2472',
    backgroundColor: 'rgb(205, 205, 233)'
  }
}); 
