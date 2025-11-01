import { StoreKeyTypes } from '@/src/types';
import Astorage from '@react-native-async-storage/async-storage';

export class storage {
    static async getItem (key: StoreKeyTypes) {
        try {
          return await Astorage.getItem(key) 
        } catch (error) {
            console.log(error);
        }
    }
    static async setItem (key: StoreKeyTypes, data:string) {
        try {
            return await Astorage.setItem(key, data) 
        } catch (error) {
            console.log(error);
        }
    }
    static async removeItem (key:StoreKeyTypes) {
         try {
            return await Astorage.removeItem(key) 
        } catch (error) {
            console.log(error);
        }
    }
}