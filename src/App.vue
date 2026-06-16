<template>
  <NavBar />
  <div class="main-container">
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import UFCPredictor from "./components/UFCPredictor.vue";
export default {
  name: "App",
  components: {
    NavBar,
    UFCPredictor,
  },
};
</script>

<style scoped>
.main-container {
  padding-top: 80px;
}
</style>
