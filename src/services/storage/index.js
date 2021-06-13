import AsyncStorage from '@react-native-community/async-storage';

export default class Storage {
  constructor(type) {
    this.type = type;
  }

  delete = async () => AsyncStorage.removeItem(`CalendarOnline-${this.type}`);

  get = async () => {
    const item = await AsyncStorage.getItem(`CalendarOnline-${this.type}`);

    return JSON.parse(item);
  };

  save = async item =>
    AsyncStorage.setItem(`CalendarOnline-${this.type}`, JSON.stringify(item));
}
