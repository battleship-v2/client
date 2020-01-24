<template>
  <div class="roomlist container p-4">
    <div class="d-flex justify-content-between">
      <h2>Room List</h2>
      <div>
        <button
          class="btn btn-primary mb-4"
          @click="$bvModal.show('bv-modal-addRoom')"
        >
          <i class="fas fa-plus-square"></i> Create New Room
        </button>
        <b-button class=" ml-2 mb-4" variant="danger" :to="'/'">
          Exit
          <i class="fas fa-times-circle"></i>
        </b-button>
      </div>
    </div>
    <div class="row">
      <RoomCard
        v-for="(room, i) in roomlist"
        :key="i"
        :name="room.name"
        :playercount="room.players.length"
        :roomstatus="room.isPlaying"
      ></RoomCard>
    </div>
    <b-modal id="bv-modal-addRoom" centered hide-footer>
      <template v-slot:modal-title>Create New Room</template>
      <div class="d-block text-center">
        <h3>Enter Rooms Name :</h3>
        <input
          type="text"
          placeholder="Room Name"
          class="room-name"
          v-model="roomName"
        />
      </div>
      <b-button class="mt-3" block variant="info" @click="createRoom"
        >Create Room</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import socket from '../socket'
import RoomCard from '../components/RoomCard'
export default {
  components: {
    RoomCard
  },
  data() {
    return {
      roomName: ''
    }
  },
  computed: {
    roomlist() {
      return this.$store.state.roomlist
    }
  },
  methods: {
    createRoom() {
      socket.emit('create-room', this.roomName)
      this.$bvModal.hide('bv-modal-addRoom')
      this.roomName = ''
    }
  }
}
</script>

<style>
.room-name {
  padding: 8px;
  border: none;
  border-bottom: 1px solid #8f8f8f;
  width: 70%;
  margin-bottom: 3px;
  margin-top: 12px;
  text-align: center;
  outline: none;
}
</style>
