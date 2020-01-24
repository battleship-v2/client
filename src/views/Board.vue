<template>
  <div id="board">
    <canvas
      @click="userShoot"
      id="awesomeBoard"
      width="500"
      height="500"
    ></canvas>
    <br />

    <div class="time">
      <b-button v-show="!isGameStarted" @click="startTimer">START</b-button>
      <div v-show="isGameStarted">{{ message }}</div>
      <div v-show="isGameStarted">Waktu: {{ currTime }}</div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm">
          <h2>User 1</h2>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(buruan, index) in listBuruan.user1"
              :key="index"
            >
              {{ buruan === null ? 'tangan kosong' : buruan }}
            </li>
          </ul>
        </div>
        <div class="col-sm">
          <h2>User 2</h2>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(buruan, index) in listBuruan.user2"
              :key="index"
            >
              {{ buruan === null ? 'tangan kosong' : buruan }}
            </li>
          </ul>
        </div>
      </div>

      <div v-show="winner" class="row">
        <h1 v-show="winner !== 'tie'">The winner is {{ winner }}</h1>
        <h1 v-show="winner === 'tie'">TIE!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import BoardManipulator from '../helpers/boardManipulator';

export default {
  data() {
    return {
      myBoard: null,
      listBuruan: {
        user1: [],
        user2: []
      },
      isGameStarted: false,
      message: null,
      currTime: null,
      whoseTurn: null,
      winner: null
    };
  },
  methods: {
    userShoot(e) {
      if (this.isGameStarted && this.whoseTurn !== null) {
        const hasilBuruan = this.myBoard.peekCell(e.offsetX, e.offsetY);
        console.log(hasilBuruan);
        this.listBuruan[this.whoseTurn].push(hasilBuruan);
      }
    },
    startTimer() {
      const conversion = time => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return { minutes, seconds };
      };

      const pad = number => {
        if (number < 10) {
          return '0' + number;
        }

        return number;
      };

      const timer = (time, cb) => {
        const myTimer = () => {
          let { minutes, seconds } = conversion(time);
          this.currTime = `${pad(minutes)} : ${pad(seconds)}`;
          console.log(`${pad(minutes)} : ${pad(seconds)}`);
          time--;

          if (time < 0) {
            this.isGameStarted = false;
            this.currTime = null;
            this.message = null;
            clearInterval(myVar);
            cb();
          }
        };

        let myVar = setInterval(myTimer, 1000);
      };

      this.whoseTurn = null;
      this.message = `Player 1 GET READY`;
      this.isGameStarted = true;
      timer(5, () => {
        this.whoseTurn = 'user1';
        this.message = `Player 1 TURNS`;
        this.isGameStarted = true;
        timer(15, () => {
          this.whoseTurn = null;
          this.message = `Player 2 GET READY`;
          this.isGameStarted = true;
          timer(5, () => {
            this.whoseTurn = 'user2';
            this.message = `Player 2 TURNS`;
            this.isGameStarted = true;
            timer(15, () => {
              this.whoseTurn = null;
              this.isGameStarted = false;

              const scoreUser1 = this.listBuruan.user1.filter(
                buruan => buruan !== null
              ).length;
              const scoreUser2 = this.listBuruan.user2.filter(
                buruan => buruan !== null
              ).length;
              console.log(scoreUser1, scoreUser2);
              if (scoreUser1 > scoreUser2) {
                this.winner = 'User 1';
              } else if (scoreUser1 < scoreUser2) {
                this.winner = 'User 2';
              } else {
                this.winner = 'tie';
              }
            });
          });
        });
      });
    }
  },
  mounted() {
    this.myBoard = BoardManipulator();
  }
};
</script>

<style></style>
