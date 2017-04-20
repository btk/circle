import * as FileManager from './file';
import * as StorageManager from './storage';

const debug = true;
const flush = false;

class Api {
  constructor(){
    if(debug) console.log("# API object created!");
    FileManager.store(debug, flush);
    this.file = FileManager.get();

    StorageManager.store(debug, flush);
    this.storage = StorageManager.get();

    this.serverPath = this.file.serverPath;
    this.allBooksCache = null;
  }

  addToLibrary(hash){
    this.file.downloadBook(hash).then(status => {
      if(status){
        this.getCurrentLibraryArray().then(library => {
          library.push(hash);
          this.storage.setItem("library", library);
          if(debug) console.log("New book added to library");
        });
      }
    });
  }

  getCurrentLibraryArray(){
    return this.storage.getItem("library");
  }

  getAllBooks(forceLoad){
    return new Promise((resolve) => {
      if(this.allBooksCache && !forceLoad){
        resolve(this.allBooksCache);
      }else{
        fetch(this.serverPath+ 'book.php?hash=0').then((resp) => {
          this.allBooksCache = resp.json();
          resolve(this.allBooksCache);
        });
      }
    });
  }

  getMyBooks(){
    return new Promise((resolve) => {
      this.getCurrentLibraryArray().then(library => {
        if(library){
          let bookObjArray = [];
          let i = 0;
          console.log(library);
          for (let bookHash of library) {
            this.getBookByHash(bookHash).then(book => {
              bookObjArray.push(book);
              i++;
              if(i == library.length){
                resolve(bookObjArray);
              }
            });
          };
        }
      });
    });
  }

  async getBookByHash(hash){
      let bookObj = await this.file.getBookManifest(hash);
      bookObj.uniqid = hash;
      return bookObj;
  }

  getBookCover(hash){
    return new Promise((resolve) => {
      this.file.getBookCover(hash).then(resp => {
        resolve(resp);
      });
    });
  }

  getBookContent(hash){
    return new Promise((resolve) => {
      this.file.getBookContent(hash).then(resp => {
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
