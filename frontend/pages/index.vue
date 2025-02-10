<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn color="primary" @click="sayHello">Vuetify 버튼3</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  const sayHello = () => {
    alert('Vuetify 버튼이 클릭되었습니다!')
  }
  </script>
  