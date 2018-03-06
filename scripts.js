$(document).ready(function(){
    function randomString() {
        let chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        let str = '';
        let i = 0;
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    function Column(name) {
        var self = this; 
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            let $column = $('<div>').addClass('column');
            let $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            let $columnCardList = $('<ul>').addClass('column-card-list');
            let $columnDelete = $('<button>').addClass('btn-delete').text('x');
            let $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
            
            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function() {
                self.addCard(new Card(prompt("Wpisz nazwę karty")));
            });
            
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            
            return $column;
        }
        
    }
    
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };
    
     
    function Card(description) {
        let self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard(); //

        function createCard() {
            let $card = $('<li>').addClass('card');
            let $cardDescription = $('<p>').addClass('card-description').text(self.description);
            let $cardDelete = $('<button>').addClass('btn-delete').text('x');
            
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            $card.append($cardDelete)
	           .append($cardDescription);
            
            return $card;
        }
    }
    
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };
    
  
    let board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    
    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    $('.create-column').click(function(){
	       var name = prompt('Wpisz nazwę kolumny');
	       var column = new Column(name);
    	   board.addColumn(column);
        });
    
    
    // TWORZENIE KOLUMN
    let todoColumn = new Column('Do zrobienia');
    let doingColumn = new Column('W trakcie');
    let doneColumn = new Column('Skończone');

    // DODAWANIE KOLUMN DO TABLICY
    board.addColumn(todoColumn);
    board.addColumn(doingColumn);
    board.addColumn(doneColumn);

    // TWORZENIE NOWYCH EGZEMPLARZY KART
    let card1 = new Card('Nowe zadanie');
    let card2 = new Card('Stworzyć tablice kanban');
    let card3 = new Card('Udało się')

    // DODAWANIE KART DO KOLUMN
    todoColumn.addCard(card1);
    doingColumn.addCard(card2);
    doneColumn.addCard(card3);
});