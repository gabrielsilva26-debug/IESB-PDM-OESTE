import { Platform } from 'react-native';

export const colors = {
  light: {
    background: '#F4F5F7',
    card: '#FFFFFF',
    text: '#1F2933',
    textSecondary: '#6B7280',
    border: '#D1D5DB',
    primary: '#2563EB',
    danger: '#DC2626',
    overlay: 'rgba(0,0,0,0.4)',
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#F3F4F6',
    textSecondary: '#9CA3AF',
    border: '#3F3F46',
    primary: '#60A5FA',
    danger: '#F87171',
    overlay: 'rgba(0,0,0,0.6)',
  },
};

export function getColors(scheme) {
  return scheme === 'dark' ? colors.dark : colors.light;
}

// Sombra por plataforma (iOS: shadow*, Android: elevation, web: boxShadow)
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  android: { elevation: 3 },
  web: { boxShadow: '0px 2px 6px rgba(0,0,0,0.2)' },
});