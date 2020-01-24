<template>
  <div class="col-md-4">
    <div class="card roomcard">
      <div class="card-header">
        <h4>Room {{ name }}</h4>
      </div>
      <div class="card-body">
        <p>Players : {{ playercount }} / 2</p>
        <p>Status : {{ status }}</p>
      </div>
      <div class="card-footer">
        <button class="btn btn-info" @click="joinRoom" :disabled="disable">
          Join Rooms
          <i class="fas fa-sign-in-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import socket from '../socket'
export default {
  props: ['name', 'playercount', 'roomstatus'],
  data() {
    return {
      status: '',
      disable: false,
      btnClass: ''
    }
  },
  computed: {
    getUsername() {
      return this.$store.state.username
    }
  },
  watch: {
    roomstatus: {
      handler: function(val) {
        if (val === false) {
          this.status = 'Waiting'
        } else {
          this.status = 'Playing'
        }
      },
      immediate: true
    },
    playercount: {
      handler: function(val) {
        if (val >= 2) {
          this.disable = true
          this.btnClass = 'btn-warning'
        } else {
          this.disable = false
          this.btnClass = 'btn-secondary'
        }
      },
      immediate: true
    }
  },
  methods: {
    joinRoom() {
      socket.emit('join-room', {
        roomName: this.name,
        playerName: this.getUsername
      })
      this.$router.push('/area')
    },
    fetchRooms() {
      socket.on('fetch-rooms', dataRooms => {
        this.$store.commit('updaterooms', dataRooms)
      })
    }
  },
  mounted() {
    this.fetchRooms()
  }
}
</script>

<style>
.roomcard {
  margin-bottom: 35px;
}
.card-header h4 {
  margin-bottom: 0;
}
.card-body p {
  margin-bottom: 4px;
}
</style>
