import { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '../../services/media';

const PHOTO_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    async function loadPhoto() {
      try {
        const saved = await AsyncStorage.getItem(PHOTO_KEY);
        if (saved) setPhotoUri(saved);
      } catch (error) {
        console.log('Erro ao ler a foto', error);
      }
    }
    loadPhoto();
  }, []);

  async function savePhoto(uri) {
    if (!uri) return;
    setPhotoUri(uri);
    try {
      await AsyncStorage.setItem(PHOTO_KEY, uri);
    } catch (error) {
      console.log('Erro ao salvar a foto', error);
    }
  }

  async function handlePickImage() {
    const uri = await pickImage();
    await savePhoto(uri);
  }

  async function handleTakePhoto() {
    const uri = await takePhoto();
    await savePhoto(uri);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePickImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Ionicons name="person" size={64} color="#9ca3af" />
          </View>
        )}
      </Pressable>

      <Text style={styles.hint}>Toque na foto para escolher da galeria</Text>

      <Pressable style={styles.button} onPress={handleTakePhoto}>
        <Text style={styles.buttonText}>Tirar foto com a câmera</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  placeholder: {
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: { color: '#6b7280' },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});