const debug = true;

class Storage {
  constructor(){
    if(debug) console.log("Created storage api");
  }

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      if(debug) console.error("Error with getting storage: ", error);
    }
  }

  async setItem(key, data) {
    try {
      const value = await AsyncStorage.setItem(key, data);
      return value;
    } catch (error) {
      if(debug) console.error("Error with setting storage: ", error);
    }
  }
}


let _storage = null;

export function store() {
  _storage = new Storage();
}

export function get() {
  return _storage;
}
