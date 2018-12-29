
<script>
  import { Pie } from 'vue-chartjs'

  export default {
    extends: Pie,
    name: 'pie-chart',
    props: {
      data: Array,
      labels: Array
    },
    mounted () {
      this.render()
    },
    computed: {
      chartData () {
        return this.data
      }
    },
    watch: {
      data () {
        this.render()
      }
    },
    methods: {
      render () {
        this.renderChart({
          labels: this.labels,
          datasets: [{
            data: this.chartData,
            backgroundColor: [ 'blue' ]
          }]
        }, { responsive: false, maintainAspectRatio: false })
      }
    }
  }
</script>
