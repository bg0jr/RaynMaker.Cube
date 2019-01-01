<template>
  <div>
    <h1>Explore</h1>

    <form>
      <label>Select a case: </label>
      <select v-model="selectedCase">
        <option disabled value="">Please select one</option>
        <option v-for="c in cases" v-bind:value="c.isin">
          {{ c.name }}
        </option>
      </select>
    </form>

    <bar-chart v-for="c in charts" :key="c.title" :width="300" :height="300" :data="c.data" :labels="c.labels" :title="c.title"></bar-chart>
  </div>
</template>

<script>
  import * as my from '../assets/js/site.js'
  import BarChart from '@/components/BarChart'

  export default {
    name: 'Explore',
    data () {
      return {
        selectedCase: '',
        cases: null,
        charts: null
      }
    },
    components: {
      'bar-chart': BarChart
    },
    created: function () {
      this.get(this, '/api/Explore', null, function (that, response) {
        that.cases = response
      })
    },
    watch: {
      selectedCase: function (val) {
        this.get(this, '/api/Case', { 'isin': val }, function (that, response) {
          that.charts = response
        })
      }
    },
    mixins: [ my.webApi ]
  }
</script>

