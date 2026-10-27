import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function setupAndroidChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'CampusGo',
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

async function requestNotificationPermission() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;

  const asked = await Notifications.requestPermissionsAsync();
  return asked.granted;
}

export async function scheduleReminder(title, seconds) {
  await setupAndroidChannel();

  const allowed = await requestNotificationPermission();
  if (!allowed) return null;

  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'CampusGo',
      body: title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: 'default',
    },
  });

  return id;
}