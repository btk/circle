import RNFS from 'react-native-fs';

let debug = null;

class File {
  /*
    Check if there is /book in document directory
    - If there is not create
    - Create private book directory file and directory array variable.
  */
  constructor(){
    if(debug) console.log("# File object created!");
    this.dirPath = RNFS.DocumentDirectoryPath;
    this.serverPath = "http://46.101.180.166/book/";
    RNFS.readDir(this.dirPath).then((result) => {
        if(result.length == 0 || (result.length == 1 && result[0].name != 'book') || (result.length == 2 && result[0].name != 'book' && result[1].name != 'book')){
          this._createDirectory("/book/").then(dir => {
            if(debug) console.log("Book directory created for first time.");
          });
        }
    });
  }

  /*
    (Private)
    Download given external url into given file directory
  */
  _downloadFile(url, path){
    return new Promise((resolve) => {
      RNFS.downloadFile({fromUrl: url, toFile: path}).promise.then(res => {
        if(debug){ console.log("File downloaded", url.split("/")[url.split("/").length - 1]); }
        resolve(true);
      });
    });
  }

  /*
    (Private)
    Creates directory
    Returns created directory path.
  */
  _createDirectory(path){
    return new Promise((resolve) => {
      RNFS.mkdir(this.dirPath + path).then(res => {
        if(debug){ console.log("Directory created", path); }
        resolve(this.dirPath + path);
      });
    });
  }

  /*
    (Private)
    Removes directory
  */
  _removeDirectory(path){
    return new Promise((resolve) => {
      RNFS.unlink(this.dirPath + path).then(res => {
        if(debug){ console.log("Removed Directory", path); }
        resolve(true);
      });
    });
  }

  /*
    (Private)
    Removes directory
  */
  _checkDirectory(path){
    return new Promise((resolve) => {
      RNFS.exists(this.dirPath + path).then(res => {
        if(debug && res){ console.log("Existed path", path); }
        resolve(res);
      });
    });
  }

  /*
    (Private)
    Read file data
  */
  _readFile(path){
    return new Promise((resolve) => {
      RNFS.readFile(this.dirPath + path, 'utf8').then(res => {
        if(debug){ console.log("Reading file", path); }
        resolve(res);
      });
    });
  }

  /*
    (download) a book with that hash
  */
  downloadBook(hash){
    return new Promise((resolve) => {
      this._createDirectory("/book/" +hash+ "/").then((dir) => {
        this._downloadFile(this.serverPath + hash + "/cover.jpg", dir + "cover.jpg").then((status) => {
          if(status){
            this._downloadFile(this.serverPath + hash + "/content.txt", dir + "content.txt").then((status) => {
              if(status){
                this._downloadFile(this.serverPath + hash + "/manifest.json", dir + "manifest.json").then((status) => {
                  if(status){
                    resolve(status);
                  }
                });
              }
            });
          }
        });
      });
    });
  }

  /*
    (remove) a book with that hash
  */
  removeBook(hash){
    return new Promise((resolve) => {
      this._removeDirectory("/book/" +hash+ "/").then((status) => {
        resolve(status);
      });
    });
  }

  /*
    (check if) a book with that hash (is downloaded)
  */
  checkBook(hash){
    return new Promise((resolve) => {
      this._checkDirectory("/book/" +hash+ "/").then((status) => {
        resolve(status);
      });
    });
  }

  /*
    (get) a book cover image "uri" by its hash (if exists)
    (if not exits get) a book cover image "url"
  */
  getBookCover(hash){
    return new Promise((resolve) => {
      this.checkBook(hash).then(s => {
        if(s){
          resolve("file://" + this.dirPath + "/book/" + hash + "/cover.jpg");
        }else{
          resolve(this.serverPath + hash + "/cover.jpg");
        }
      });
    });
  }

  /*
    (get) a book content.txt by its hash (if exists)
    (if not exits) resolve false.
  */
  getBookContent(hash){
    return new Promise((resolve) => {
      this.checkBook(hash).then(s => {
        if(s){
          this._readFile("/book/" + hash + "/content.txt").then(content => {
            resolve(content);
          })
        }else{
          resolve(false);
        }
      });
    });
  }

  getBookManifest(hash){
    return new Promise((resolve) => {
      this.checkBook(hash).then(s => {
        if(s){
          this._readFile("/book/" + hash + "/manifest.json").then(content => {
            resolve(JSON.parse(content));
          })
        }else{
          fetch(this.serverPath+ 'book.php?hash=' +hash).then((resp) => {
            resolve(resp.json());
          });
        }
      });
    });
  }


  _flush(){
    this._removeDirectory("/book/").then((status) => {
      if(status || debug) console.log("X Directory is flushed!");
    });
  }
}


let _file = null;

export function store(debugStatus, flushStatus) {
  debug = debugStatus;
  _file = new File();
  if(flushStatus) _file._flush();
}

export function get() {
  return _file;
}
