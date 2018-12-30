<template>
  <div>
    <h1>Explore</h1>

    <form>
      <label>Select a case: </label>
      <select v-model="selectedCase">
        <option disabled value="">Please select one</option>
        <option v-for="c in cases" v-bind:value="c.id">
          {{ c.name }}
        </option>
      </select>
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
        selectedCase: '',
        cases: null,
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
      this.get(this, '/api/Explore', null, function (that, response) {
        that.cases = response
      })
    },
    watch: {
      selectedCase: function (val) {
        this.get(this, '/api/Case', { 'id': val }, function (that, response) {
          that.dividend.data = response.data
          that.dividend.labels = response.labels
        })
      }
    },
    mixins: [ my.webApi ]
  }
</script>

