<template>
  <nav class="navbar">
    <h1 class="name">Altabla Star</h1>
    <ul class="nav-list">
      <li class="nav-item">Football Scout</li>
      <li class="nav-item">MMA Analysis</li>
    </ul>
  </nav>
</template>

<script setup></script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 80px;
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.538);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8svw;
  top: 0;
  left: 0;
}

h1 {
  color: #fff;
}

ul {
  display: flex;
  list-style: none;
  gap: 16px;

  color: #fff;
}
</style>
