import * as FileManager from './js/file';

export default class Api {
  constructor(){
    console.log("API object created!");
    FileManager.storeFile();
    this.file = FileManager.getFile();
  }

  getAllBooks(){
    return new Promise((resolve) => {
      fetch('http://46.101.180.166/book/post.php?hash=0').then((resp) => {
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

  getBookById(id){
    return new Promise((resolve) => {
        resolve(b1);
    }, 150);
  }
}
