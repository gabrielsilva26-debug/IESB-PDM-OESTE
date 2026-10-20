import { Appearance, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BotaoTema({ color }) {
  const scheme = useColorScheme();

  function alternar() {
    Appearance.setColorScheme(scheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Pressable onPress={alternar} style={{ marginLeft: 16 }}>
      <Ionicons
        name={scheme === 'dark' ? 'sunny-outline' : 'moon-outline'}
        size={24}
        color={color}
      />
    </Pressable>
  );
}