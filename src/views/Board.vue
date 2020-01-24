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
          <h2>{{ roomdetail.players[0].name }}</h2>
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
          <h2>
            {{
              roomdetail.players[1].name
                ? roomdetail.players[1].name
                : 'Waiting for Player'
            }}
          </h2>
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
import Shot from '../assets/sniper.wav';
import Forest from '../assets/forest.mp3';

import socket from '../socket/index';
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
      winner: null,
      roomdetail: {}
    };
  },
  methods: {
    fetchRooms() {
      socket.on('fetch-rooms', dataRooms => {
        this.$store.commit('updaterooms', dataRooms);
      });
    },
    userShoot(e) {
      if (this.isGameStarted && this.whoseTurn !== null) {
        const hasilBuruan = this.myBoard.peekCell(e.offsetX, e.offsetY);
        const audio = new Audio(Shot);
        audio.play();
        console.log(hasilBuruan);
        this.listBuruan[this.whoseTurn].push(hasilBuruan);
      }
    },
    startTimer() {
      this.myBoard = BoardManipulator();
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
    const forest = new Audio(Forest);
    forest.play();
  },
  computed: {
    roomlist() {
      return this.$store.state.roomlist;
    }
  },
  watch: {
    roomlist: {
      handler: function(val) {
        this.roomdetail = val.find(room => {
          return room.name === this.$route.params.roomName;
        });
      },
      immediate: true
    }
  },
  created() {
    this.fetchRooms();
  }
};
</script>

<style>
#board {
  width: 100vw;
  height: 100vh;
  background-image: url('https://siboneycubancuisine.com/image/152798-full_download-jungle-background-hd-high-quality-wallpaper-for.jpg');
  background-size: cover;
}
</style>
