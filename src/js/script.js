{
  'use strict';
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    innerBook: {
        header: '.book__header',
        basePrising: '.product__base-price',
        bookImage: '.book_image',
        bookRating: '.book__rating',
    },
  };

  const favoriteBooks = [];

  const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML)
  };



  class Book{
    constructor(data){
      const thisBook = this;
      thisBook.data = data;

      console.log(thisBook.data);

      thisBook.renderBooks();
    }

    renderBooks(){
      const thisBook = this;
      const generatedHTML = templates.bookList(thisBook.data);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.containerOf.bookList);
      
      bookContainer.appendChild(thisBook.element);
    }

  }


  const app = {
    initBooks: function(){
      const thisApp = this;

      for(let bookData of thisApp.data.books){
        console.log(thisApp.data.books);
        new Book(bookData);
      }
    },

    initData: function(){
      const thisApp = this;
  
      thisApp.data = dataSource;
      console.log(thisApp.data);
    },

    init: function(){
      const thisApp = this;
        
      thisApp.initData();
      thisApp.initBooks();
    }
  
  };
  app.init();
}