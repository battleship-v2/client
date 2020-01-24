<template>
  <div class="home row mx-0">
    <div class="col-md-6"></div>
    <Login></Login>
  </div>
</template>

<script>
<<<<<<< HEAD
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

=======
import Login from "../components/Login";
>>>>>>> Create Landing Page, Create Room List
export default {
  name: 'home',
  components: {
    Login
  }
};
</script>

<style>
.home {
  width: 100vw;
  height: 100vh;
}
</style>
