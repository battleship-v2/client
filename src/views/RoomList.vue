<template>
  <div class="roomlist container p-4">
    <div class="d-flex justify-content-end">
      <button class="btn btn-primary mb-4">Create New Room</button>
    </div>
    <div class="row">
      <RoomCard
        v-for="(room,i) in roomlist"
        :key="i"
        :name="room.name"
        :playercount="room.players.length"
        :roomstatus="room.isPlaying"
      ></RoomCard>
    </div>
  </div>
</template>

<script>
import RoomCard from '../components/RoomCard'
export default {
  components: {
    RoomCard
  },
  data() {
    return {}
  },
  computed: {
    roomlist() {
      return this.$store.state.roomlist
    }
  }
}
</script>

<style>
</style>
