document.addEventListener('DOMContentLoaded', function() {
    // here we will put the code of our application
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
          
        }
        return str;
    }
    function backgroundColor () {
      var color = ['rgb(63,81,181,)','rgb(13,71,161)','rgb(213,0,249)','rgb(211,47,47)'];
      return color[Math.floor(Math.random()*4)];
    }
    function generateTemplate(name, data, style, basicElement) {
        var template = document.getElementById(name).innerHTML;
        var element = document.createElement(basicElement || 'div');
        console.log(style);
  
        Mustache.parse(template);
        element.innerHTML = Mustache.render(template, data, style, basicElement);
        console.log(element.innerHTML);
        if( name === 'card-template' ) {
          element.childNodes[1].style.backgroundColor = backgroundColor();
        }
        return element;
    }
        
    
    function Column(name) {
      var self = this;
      var columnContainer = document.querySelector('.column-container');
      this.id = randomString();
      this.name = name;
      this.element = generateTemplate('column-template', { name: this.name,id: this.id });
      this.element.querySelector('.column').addEventListener('click', function (event) {
          if (event.target.classList.contains('btn-delete1')) {
            self.removeColumn();
          }
        
          if (event.target.classList.contains('add-card')) {
            self.addCard(new Card(prompt("Enter the name of the card")));
          }
        
        });
    };
       Column.prototype = {
        addCard: function(card) {
          this.element.querySelector('ul').appendChild(card.element);
        },
        removeColumn: function() {
          this.element.parentNode.removeChild(this.element);
        }
        
    };
        
    function Card(description) {
        var self = this;
        var style = "style=background-color:" + backgroundColor();
        console.log(style);
        this.id = randomString();
        this.description = description;
        this.element = generateTemplate('card-template', { description: this.description}, style, 'li');
        this.element.querySelector('.card').addEventListener('click', function (event) {
            event.stopPropagation();
          
            if (event.target.classList.contains('btn-delete2')) {
              self.removeCard();
            }
          });
        console.log(this);
      }
      Card.prototype = {
        removeCard: function() {
          this.element.parentNode.removeChild(this.element);
          }
      }
      var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
          this.element.appendChild(column.element);
          console.log(column.id);
          initSortable(column.id); //About this feature we will tell later
        },
        element: document.querySelector('#board .column-container')
    };
    function initSortable(id) {
      var el = document.getElementById(id);
      console.log(el);
      var sortable = Sortable.create(el, {
        group: 'kanban',
        sort: true
      });
    } 
    document.querySelector('#board .create-column').addEventListener('click', function() {
      var name = prompt('Enter a column name');
      var column = new Column(name);
      board.addColumn(column);
    });
});
