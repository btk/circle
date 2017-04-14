const b1 = { id: 1, title: "Alice in Wonderland", author: "Charles Lutwidge Dodgson", page: 132, cover: require('./books/1/cover.jpg') };
const b2 = { id: 2, title: "20.000 Leagues Under Sea", author: "Jules Verne", page: 232, cover: require('./books/2/cover.jpg')  };
const b3 = { id: 3, title: "Beowulf", author: "Beowulf poet", page: 45, cover: require('./books/3/cover.jpg')  };
const b4 = { id: 4, title: "Jurney to the Center of the Earth", author: "Jules Verne", page: 321, cover: require('./books/4/cover.jpg')  };
const b5 = { id: 5, title: "Moby Dick", author: "Herman Melvile", page: 112, cover: require('./books/5/cover.jpg')  };
const b6 = { id: 6, title: "The Wonderful Wizard of Oz", author: "L. Frank Baum", page: 282, cover: require('./books/6/cover.jpg')  };
const b7 = { id: 7, title: "Crime and Punishment", author: "Dostoyevski", page: 221, cover: require('./books/7/cover.jpg')  };
const b8 = { id: 8, title: "Flatland", author: "Edwin Abbott Abbott", page: 295, cover: require('./books/8/cover.jpg')  };
const b9 = { id: 9, title: "Othello", author: "William Shakespeare", page: 123, cover: require('./books/9/cover.jpg')  };
const b10 = { id: 10, title: "Pride and Prejudice", author: "Jane Austen", page: 182, cover: require('./books/10/cover.jpg')  };
const b11 = { id: 11, title: "Romeo And Juliet", author: "William Shakespeare", page: 178, cover: require('./books/11/cover.jpg')  };
const b12 = { id: 12, title: "The Truth of the Screw", author: "Hanry James", page: 215, cover: require('./books/12/cover.jpg')  };
const b13 = { id: 13, title: "The Legend of Sleepy Hallow", author: "Washington Irving", page: 382, cover: require('./books/13/cover.jpg')  };
const b14 = { id: 14, title: "The Art of War", author: "Sun Tzu", page: 52, cover: require('./books/14/cover.jpg') };


export default class Api {
  constructor(){
    console.log("API object created!");
  }

  getAllBooks(){
    return new Promise((resolve) => {
      resolve([b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14]);
    }, 150);
  }

  getMyBooks(){
    return new Promise((resolve) => {
      resolve([b1, b7, b9, b12, b14]);
    }, 150);
  }

  getBookById(id){
    return new Promise((resolve) => {
        resolve(b1);
    }, 150);
  }
}
