
// Konstruktory dla Furry'ego i monety- położenie na obu osiach
// kierunek poruszania się Furry'ego startuje w prawo
function Furry(){
    this.x = 0;
    this.y = 0;
    this.direction = "right";
}
//losowa pozycja monet
function Coin(){
    this.x = Math.floor(Math.random()*10);
    this.y = Math.floor(Math.random()*10);
}
// konstruktor zarządzający grą: przechowuje furryego, monete,
// plansze i wynik gracza
function Game(){
    this.furry = new Furry();
    this.coin = new Coin();
    this.board = document.querySelectorAll("#board>div");
    this.score = 0;

    // Oblicznie pozycji na planszy furrego i monety
    this.index = function(x,y) {
        return x + (y * 10);
    }
    // wyświetlenie furrego i monety na planszy poprzez nadanie
    // im odpowiednich klas
    this.showFurry = function(){
        this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
    }
    this.showCoin = function(){
        this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
    }

    //8.sterowanie kierunkiem furrego
    var self = this;
    this.moveFurry = function(){
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction === "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.hideVisibleFurry();
        if(this.gameOver()){
            return;
        }
        this.showFurry();
    }
    // START
    this.startGame = function(){
        return setInterval(function(){
            self.moveFurry();
            self.checkCoinCollision();
        }, 250);
    }
    // Usunięcie niepotrzebnych klas - wyczyszczenie planszy
    this.hideVisibleFurry = function(){
        document.querySelector(".furry").classList.remove("furry");
    }
    this.turnFurry = function(){

        switch(event.which){
            case 37:
                this.furry.direction = "left";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 40:
                this.furry.direction = "down";
                break;

        }
    }
    var score = document.querySelector("#score strong");

    //Kolizja
    this.checkCoinCollision = function(){
        if(this.furry.x == this.coin.x && this.furry.y == this.coin.y){
            document.querySelector(".coin").classList.remove("coin");
            score.innerText = Number(score.innerText) + 1;
            this.coin = new Coin();
            this.showCoin();
        }
    }
    this.gameOver = function(){
        if(this.furry.x < 0 || this.furry.x > 9
            || this.furry.y < 0 || this.furry.y > 9){
            score.parentElement.innerHTML = "GAME OVER <br><strong>Score: " + score.innerText + "<strong>";
            window.clearInterval(intervalID);
            console.log("game over");

            return true;
        }
        else{
            return false;
        }
    }
}

var game = new Game();
game.showFurry();
game.showCoin();
var intervalID = game.startGame();
document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});