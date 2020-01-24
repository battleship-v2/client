module.exports = (function() {
  class Board {
    constructor(selector = 'awesomeBoard') {
      // untuk manipulasi canvas
      this.ctx = document.getElementById(selector).getContext('2d');
      this.sisiKotak = 50; // ukuran kotak 50 px * 50 px
      this.sizeBoard = 10; // ukuran board 10 ktk * 10 ktk
      this.totalHewan = 20;
      this.boardStatus = new Array(this.sizeBoard);

      this.kumpulanHewan = [
        'badak',
        'beruang',
        'buaya',
        'dinosaur',
        'lion',
        'monkey',
        'rabbit',
        'rusa',
        'totoro',
        'zebra'
      ];

      this.drawEmptyBoard();

      // inisialisasi board
      for (let i = 0; i < this.totalHewan; i++) {
        this.boardStatus[i] = new Array(this.totalHewan);

        for (let j = 0; j < this.totalHewan; j++) {
          this.boardStatus[i][j] = {
            value: null,
            revealed: false
          };
        }
      }

      // randomize hewan buruan
      for (let i = 0; i < this.totalHewan; i++) {
        let x = Math.floor(Math.random() * this.sizeBoard);
        let y = Math.floor(Math.random() * this.sizeBoard);

        do {
          x = Math.floor(Math.random() * this.sizeBoard);
          y = Math.floor(Math.random() * this.sizeBoard);
        } while (this.boardStatus[x][y].value !== null);

        this.boardStatus[x][y].value = i % 10;
      }

      // this.revealAllCell();
    }

    static BoardFactory(selector) {
      return new Board(selector);
    }

    paintCell(i, j, color) {
      this.ctx.translate(i * this.sisiKotak, j * this.sisiKotak);
      this.ctx.fillStyle = color;
      this.ctx.fillRect(0, 0, this.sisiKotak, this.sisiKotak);
      this.ctx.strokeRect(0, 0, this.sisiKotak, this.sisiKotak);
      this.ctx.fillStyle = 'black';
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    drawEmptyBoard() {
      for (let i = 0; i < this.sizeBoard; i++) {
        for (let j = 0; j < this.sizeBoard; j++) {
          this.paintCell(i, j, 'green');
        }
      }
    }

    insertImage(i, j, ixHewan) {
      const img = new Image();
      img.src = require(`@/assets/${this.kumpulanHewan[ixHewan]}.jpg`);
      img.onload = () => {
        this.ctx.drawImage(img, i * this.sisiKotak, j * this.sisiKotak, 50, 50);
      };
    }

    revealAllCell() {
      for (let i = 1; i < this.sizeBoard; i++) {
        for (let j = 1; j < this.sizeBoard; j++) {
          this.revealCell(i, j);
        }
      }
    }

    revealCell(i, j) {
      if (this.boardStatus[i][j].value !== null) {
        this.insertImage(i, j, this.boardStatus[i][j].value);
      }
    }

    peekCell(mouseX, mouseY) {
      const posX = Math.floor(mouseX / this.sisiKotak);
      const posY = Math.floor(mouseY / this.sisiKotak);

      if (this.boardStatus[posX][posY].value === null) {
        this.paintCell(posX, posY, 'red');

        return null;
      } else {
        this.insertImage(posX, posY, this.boardStatus[posX][posY].value);

        return this.kumpulanHewan[this.boardStatus[posX][posY].value];
      }

      // return ;
    }
  }

  return Board.BoardFactory;
})();
