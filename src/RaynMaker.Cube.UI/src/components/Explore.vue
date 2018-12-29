<template>
  <div>
    <h1>Explore</h1>

    <form id="filter">
      <label>Filter: </label>
      <input name="query" v-model="filter">
    </form>

    <bar-chart :width="400" :height="400" :data="dividend.data" :labels="dividend.labels"></bar-chart>
  </div>
</template>

<script>
  import * as my from '../assets/js/site.js'
  import BarChart from '@/components/BarChart'

  export default {
    name: 'Explore',
    data () {
      return {
        filter: '',
        dividend: {
          data: null,
          labels: null
        }
      }
    },
    components: {
      'bar-chart': BarChart
    },
    created: function () {
      this.get(this, '/api/Explore', {}, function (that, response) {
        that.dividend.data = response.data
        that.dividend.labels = response.labels
      })
    },
    mixins: [ my.webApi ]
  }
</script>

