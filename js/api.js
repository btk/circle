import * as FileManager from './file';
import * as StorageManager from './storage';

class Api {
  constructor(){
    console.log("API object created!");
    FileManager.store();
    this.file = FileManager.get();

    StorageManager.store();
    this.storage = StorageManager.get();

    this.serverPath = "http://46.101.180.166/book/";
    this.getBookByHash("58f8b5c9b654a").then(a => {
      console.log(a);
    });
  }

  getAllBooks(){
    return new Promise((resolve) => {
      fetch(this.serverPath+ 'book.php?hash=0').then((resp) => {
        resolve(resp.json());
      });
    });
  }

  getMyBooks(){
    return new Promise((resolve) => {
      this.file.getLibraryBooks().then(resp => {
        resolve(resp);
      });
    });
  }

  getBookByHash(hash){
    return new Promise((resolve) => {
      this.file.getBookManifest(hash).then(resp => {
        resolve(resp);
      });
    });
  }
}

let _api = null;

export function store() {
  _api = new Api();
}

export function get() {
  return _api;
}
