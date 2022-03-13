{
  'use strict';
  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      book: '.book',
      filters: '.filters',
    },
    innerBook: {
      header: '.book__header',
      basePrising: '.product__base-price',
      bookImage: '.book__image',
      bookRating: '.book__rating',
    },
  };

  const names = {
    bookImage: 'book__image',
    favorite: 'favorite',
    dataId: 'data-id',
    hidden: 'hidden',
  };

  const favoriteBooks = [];
  const filters = []; 

  const templates = {
    bookList: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };



  class Book{
    constructor(data){
      const thisBook = this;
      thisBook.data = data;
      console.log(thisBook.data.id);
      thisBook.renderBooks();
    }

    renderBooks(){
      const thisBook = this;
      
      const changedData = thisBook.data;
      const ratingWidth = thisBook.data.rating * 10;
      const ratingBgc = thisBook.calculateRatingBgc();
      // add two new keys to book data memory
      changedData.ratingWidth = ratingWidth;
      changedData.ratingBgc = ratingBgc;

      const generatedHTML = templates.bookList(changedData);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.bookList);
      bookContainer.appendChild(thisBook.element);
    }

    calculateRatingBgc(){
      const thisBook = this;

      if(thisBook.data.rating < 6) return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      else if(thisBook.data.rating <= 8) return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      else if(thisBook.data.rating <= 9) return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      else return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    
  }


  const app = {
    initBooks: function(){
      const thisApp = this;

      for(let bookData of thisApp.data.books){
        new Book(bookData);
      }
    },

    initData: function(){
      const thisApp = this;
  
      thisApp.data = dataSource;
    },

    initActions: function(){
      const thisApp = this;
      document.querySelector(select.containerOf.bookList).addEventListener('dblclick', function(event){
        const clickedImage = event.target.offsetParent;

        if(clickedImage.classList.contains(names.bookImage)){
          const id = clickedImage.getAttribute(names.dataId);
          if(clickedImage.classList.contains(names.favorite)){
            clickedImage.classList.remove(names.favorite);
            favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
          } else {
            clickedImage.classList.add(names.favorite);
            if (!favoriteBooks.includes({id: id})) favoriteBooks.push({id: id});
          }
          console.log(favoriteBooks);
        }
      });

      document.querySelector(select.containerOf.filters).addEventListener('click', function(event){
        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log(event.target.value);
          const filterValue = event.target.value;
          if(event.target.checked) filters.push(filterValue);
          else filters.splice(filters.indexOf(filterValue), 1);
        }
      });

      document.querySelector(select.containerOf.filters).addEventListener('change', function(){
        for(let bookData of thisApp.data.books){
          let shouldBeHidden = false;
          for (const filter of filters){
            if(!bookData.details[filter]){
              shouldBeHidden = true;
              break;
            }
          }
          const currentBook = document.querySelector(`[${names.dataId}='${bookData.id}']`);

          if(shouldBeHidden) currentBook.classList.add(names.hidden);
          else currentBook.classList.remove(names.hidden);
        }

      });
    },

    init: function(){
      const thisApp = this;
        
      thisApp.initData();
      thisApp.initBooks();
      thisApp.initActions();
    }
  
  };
  app.init();
}