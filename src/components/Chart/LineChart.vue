<template>
    <div class="container">
        <div :id="id" class="chart_line" :data="data" />
    </div>
</template>

<script>
const echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')			// 柱状图
require('echarts/lib/chart/line')			// 折线图
// 下面的是需要的提示框
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid') // 必须有，否则无法显示
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
    name: '',
    props: ['id', 'data'], // id必须找到dom的节点，data就是option图标核心数据
    data() {
        return {
            ChartLineGraph: null
        }
    },
    watch: {
        data: {
            handler(newvalue, oldvalue) {
                this.drawLineGraph(this.id, newvalue)
            },
            deep: true
        }
    },
    mounted() {
        this.drawLineGraph(this.id, this.data)
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
        if (this.ChartLineGraph) {
            this.ChartLineGraph.clear()
        }
    },
    methods: {
        drawLineGraph(id, data) {
            const _this = this
            const myChart = document.getElementById(id)
            this.ChartLineGraph = echarts.init(myChart) // 初始化实例
            this.ChartLineGraph.setOption(data, true)// 开启重绘
            window.addEventListener('resize', function() {
                _this.ChartLineGraph.resize() // 浏览器缩放eachrts自适应
            })
        }
    }
}
</script>

<style  scoped>
.chart_line {
    height: 100%;
    width: 100%;
}
</style>
