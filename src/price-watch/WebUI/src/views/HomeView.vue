<script setup>
import axios from 'axios'
import { ref } from 'vue'

const prices = ref([])

const api = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? window.location.origin : 'http://localhost:8001'
})

async function fetch() {
  prices.value = []
  let response = await api.get('/api/crypto')
  response.data.forEach((x) => prices.value.push(x))
  response = await api.get('/api/stocks')
  response.data.forEach((x) => prices.value.push(x))
}
</script>

<template>
  <main>
    <a href="#" @click="fetch">Fetch</a>
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        <tr v-for="item in prices">
          <td>{{ item.name }}</td>
          <td class="value">{{ item.value ?? item.error }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<style scoped>
th {
  font-weight: bold;
}
td {
  padding-left: 10px;
}
.value{
  text-align: right;
}
</style>
