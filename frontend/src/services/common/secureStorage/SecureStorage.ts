import { Platform } from "react-native";
import * as ExpoSecureStore from "expo-secure-store";

export class SecureStorage {
  private defaultKeychainAccessible = ExpoSecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY;

  public async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return localStorage.getItem(key);
      }

      return await ExpoSecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  }

  public async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      return localStorage.setItem(key, value);
    }

    return await ExpoSecureStore.setItemAsync(key, value, {
      keychainAccessible: this.defaultKeychainAccessible
    });
  }

  public async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      return localStorage.removeItem(key);
    }

    return await ExpoSecureStore.deleteItemAsync(key, {
      keychainAccessible: this.defaultKeychainAccessible
    });
  }
}
