<template>
  <v-bottom-navigation
    scroll-target="#scroll-area-1"
    grow
    app
    fixed
    bottom
    shift
    color="#FFCA28"
  >
    <v-btn height="inherit" to="/">
      <span>Tasks</span>
      <v-icon small>fas fa-tasks</v-icon>
    </v-btn>

    <v-btn height="inherit" to="/lists">
      <span>Lists</span>
      <v-icon small>fas fa-tag</v-icon>
    </v-btn>

    <!-- <v-btn height="inherit" to="/search">
      <span>Search</span>
      <v-icon small>fas fa-search</v-icon>
    </v-btn> -->

    <v-btn height="inherit" to="/profile">
      <span>Profile</span>
      <v-icon small>fas fa-user</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
