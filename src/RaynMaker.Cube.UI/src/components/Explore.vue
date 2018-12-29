<template>
  <div>
    <h1>Explore</h1>

    <form id="filter">
      <label>Filter: </label>
      <input name="query" v-model="filter">
    </form>

    <pie-chart :width="500" :height="500" :data="diversification.data" :labels="diversification.labels"></pie-chart>
  </div>
</template>

<script>
  import * as my from '../assets/js/site.js'
  import PieChart from '@/components/PieChart'

  export default {
    name: 'Explore',
    data () {
      return {
        filter: '',
        diversification: {
          data: null,
          labels: null
        }
      }
    },
    components: {
      'pie-chart': PieChart
    },
    created: function () {
      this.get(this, '/api/Explore', {}, function (that, response) {
        that.diversification.data = response.data
        that.diversification.labels = response.labels
      })
    },
    mixins: [ my.webApi ]
  }
</script>

