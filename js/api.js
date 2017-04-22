import * as FileManager from './file';
import * as StorageManager from './storage';

const debug = true;
const flush = false;
const _theme = "white";
// white
// black
// sepia

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
    this.storage.getItem("library").then(libArray => {
      if(!libArray.includes(hash)){
        this.file.downloadBook(hash).then(status => {
          if(status){
            this.getCurrentLibraryArray().then(library => {
              library.push(hash);
              this.storage.setItem("library", library);
              if(debug) console.log("New book added to library");
            });
          }
        });
      }else{
        if(debug) console.log(".. This Book is already in library!")
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
        }, (error) => {
          resolve(503);
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
export function theme(){
  return _theme;
}

export function themify(white, black, sepia){
  if(_theme == "white") return white;
  if(_theme == "black") return black;
  if(_theme == "sepia") return sepia;
}

export function themeColor(type){
  if(type == "tone1"){
    if(_theme == "white") return "#ffffff";
    if(_theme == "black") return "#222222";
    if(_theme == "sepia") return "#ececd4";
  } else if(type == "tone2"){
    if(_theme == "white") return "#f6f8f9";
    if(_theme == "black") return "#2f2f2f";
    if(_theme == "sepia") return "#e4e4d1";
  } else if(type == "tone3"){
    if(_theme == "white") return "rgba(0,0,0,0.04)";
    if(_theme == "black") return "rgba(255,255,255,0.05)";
    if(_theme == "sepia") return "rgba(0,0,0,0.04)";
  } else if(type == "border1"){
    if(_theme == "white") return "#f3f4f5";
    if(_theme == "black") return "#1f1f1f";
    if(_theme == "sepia") return "#e4ddcb";
  } else if(type == "text1"){
    if(_theme == "white") return "#000000";
    if(_theme == "black") return "#ffffff";
    if(_theme == "sepia") return "#5a4b34";
  } else if(type == "text2"){
    if(_theme == "white") return "#444444";
    if(_theme == "black") return "#eeeeee";
    if(_theme == "sepia") return "#9c948a";
  } else if(type == "text3"){
    if(_theme == "white") return "#777777";
    if(_theme == "black") return "#aaaaaa";
    if(_theme == "sepia") return "#9c9489";
  }
}
