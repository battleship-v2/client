<template>
  <div class="login-form p-4">
    <h5 class="form-title">Input Your Username</h5>
    <input
      type="text"
      name="username"
      class="form-username mb-3"
      autocomplete="off"
      placeholder="Username"
      v-model="username"
    />
    <button class="btn btn-success btn-find" @click="loginGame">
      Find Rooms
      <i class="fas fa-chess-rook"></i>
    </button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    loginGame() {
      if (this.username) {
        this.$store.commit('updateUsername', this.username)
        this.$router.push('rooms')
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Input Username to Join'
        })
      }
    }
  }
}
</script>

<style>
.login-form {
  align-self: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  background: rgba(228, 228, 228, 0.7);
  border-radius: 11px;
}
.form-username {
  height: 30px;
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 8px;
  font-size: 18px;
}
.form-title {
  margin-bottom: 15px;
}
.btn-find {
  width: 100%;
  margin-bottom: 5px;
}
</style>
