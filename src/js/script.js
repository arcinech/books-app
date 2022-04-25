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

  class BookList{
    constructor(){

      this.initData();
      this.renderBooks();
      this.getElements();

      this.initActions();

    }

    initData(){
      this.data = dataSource;
    }
    getElements(){
      this.dom = {};
      this.dom.bookList = document.querySelector(select.containerOf.bookList);
      this.dom.filters = document.querySelector(select.containerOf.filters);
    }

    renderBooks(){
      for(const bookData of this.data.books){
        const thisBook = this;
      
        const changedData = bookData;
        const ratingWidth = bookData.rating * 10;
        const ratingBgc = thisBook.calculateRatingBgc(bookData.rating);
        // add two new keys to book data memory
        changedData.ratingWidth = ratingWidth;
        changedData.ratingBgc = ratingBgc;

        const generatedHTML = templates.bookList(changedData);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);

        const bookContainer = document.querySelector(select.containerOf.bookList);
        bookContainer.appendChild(thisBook.element);
      }
    }

    calculateRatingBgc(rating){
      if(rating < 6) return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      else if(rating <= 8) return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      else if(rating <= 9) return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      else return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }

    initActions(){
      const thisBooks = this;
      thisBooks.dom.bookList.addEventListener('dblclick', function(event){
        thisBooks.favoriteBooks(event);
      });

      thisBooks.dom.filters.addEventListener('click', function(event){
        thisBooks.checkboxEvent(event);
      });

      this.dom.filters.addEventListener('change', function(){
        thisBooks.filterBooks();
      });

    }

    favoriteBooks(event){
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
      }
    }

    filterBooks(){
      for(let bookData of this.data.books){
        const currentBook = document.querySelector(`[${names.dataId}='${bookData.id}']`);
        let shouldBeHidden = false;

        for (const filter of filters){
          if(!bookData.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }

        if(shouldBeHidden) currentBook.classList.add(names.hidden);
        else currentBook.classList.remove(names.hidden);
      }
    }

    checkboxEvent(event){
      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log(event.target.value);
        const filterValue = event.target.value;
        if(event.target.checked) filters.push(filterValue);
        else filters.splice(filters.indexOf(filterValue), 1);
      }
    }
  }


  const app = {
    initBooks: function(){
      new BookList();
    },

    init: function(){
      const thisApp = this;

      thisApp.initBooks();
    },
  };

  app.init();
}