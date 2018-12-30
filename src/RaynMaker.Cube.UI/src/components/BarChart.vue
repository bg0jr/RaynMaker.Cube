
<script>
  import { Bar } from 'vue-chartjs'

  export default {
    extends: Bar,
    name: 'bar-chart',
    props: {
      data: Array,
      labels: Array,
      title: String
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
            backgroundColor: 'green'
          }]
        }, {
          title: {
            text: this.title,
            display: true
          },
          legend: {
            display: false
          },
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        })
      }
    }
  }
</script>
