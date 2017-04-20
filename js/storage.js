import { AsyncStorage } from 'react-native';

let debug = null;

class Storage {
  constructor(){
    if(debug) console.log("# Storage object created!");
    this.getItem("library").then(library => {
      if(!library){
        this.setItem("library", []);
        if(debug) console.log("Setted an empty lib array!");
      }
    });
  }

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if(value){
        if(value.includes("[") || value.includes("{")){
          return JSON.parse(value);
        }else{
          return value;
        }
      }
    } catch (error) {
      if(debug) console.error("Error with getting storage: ", error);
    }
  }

  async setItem(key, data) {
    try {
      if(["array", "object"].includes(typeof(data))){
        data = JSON.stringify(data);
      }
      const value = await AsyncStorage.setItem(key, data);
    } catch (error) {
      if(debug) console.error("Error with setting storage: ", error);
    }
  }

  _flush(keys){
    AsyncStorage.multiRemove(keys).then(resp => {
      if(resp || debug) console.log("X Storage is Flushed!");
    })
  }
}


let _storage = null;

export function store(debugStatus, flushStatus) {
  debug = debugStatus;
  _storage = new Storage();
  if(flushStatus) _storage._flush(["library"]);
}

export function get() {
  return _storage;
}
