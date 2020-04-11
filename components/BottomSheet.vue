<template>
  <v-bottom-navigation fixed bottom dark shift color="#14ffec">
    <v-btn to="/">
      <span>Tasks</span>
      <v-icon small>fas fa-tasks</v-icon>
    </v-btn>

    <v-btn to="/lists">
      <span>Lists</span>
      <v-icon small>fas fa-tag</v-icon>
    </v-btn>

    <v-btn to="/search">
      <span>Search</span>
      <v-icon small>fas fa-search</v-icon>
    </v-btn>

    <v-btn to="/profile">
      <span>Profile</span>
      <v-icon small>fas fa-user</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
