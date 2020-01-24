<template>
  <div class="home row mx-0">
    <div class="col-md-6"></div>
    <Login></Login>
  </div>
</template>

<script>
import Login from '../components/Login';
export default {
  name: 'home',
  components: {
    Login
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-image: url('https://wallpaperaccess.com/full/715.jpg');
  background-size: cover;
}
</style>
