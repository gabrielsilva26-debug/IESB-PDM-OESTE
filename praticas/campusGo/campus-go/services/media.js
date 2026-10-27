import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

export async function pickImage() {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return null;
    return result.assets[0].uri;
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    return null;
  }
}

export async function takePhoto() {
  try {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Precisamos da câmera para tirar sua foto de perfil.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
        ]
      );
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (result.canceled) return null;
    return result.assets[0].uri;
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    return null;
  }
}