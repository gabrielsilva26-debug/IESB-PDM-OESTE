import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    return null;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const { latitude, longitude } = position.coords;

  let label = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (results.length > 0) {
      const p = results[0];
      const parts = [p.street, p.district || p.subregion, p.city].filter(Boolean);
      if (parts.length > 0) label = parts.join(', ');
    }
  } catch (error) {
    // se o endereço não vier, mantém as coordenadas como label
  }

  return { latitude, longitude, label };
}