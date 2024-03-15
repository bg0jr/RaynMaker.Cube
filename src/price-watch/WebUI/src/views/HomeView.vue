<script setup>
import axios from 'axios'
import { ref } from 'vue'

const prices = ref([])

const api = axios.create({
    baseURL: 'http://localhost:8001'
  })

async function fetch() {
  let response = await api.get('/api/crypto')
  response.data.forEach(x => prices.value.push(x))
  response = await api.get('/api/stocks')
  response.data.forEach(x => prices.value.push(x))
}
</script>

<template>
  <main>
    <a href="#" @click="fetch">Fetch</a>
    <div>
      <div v-for="item in prices">{{ item }}</div>
    </div>
  </main>
</template>
