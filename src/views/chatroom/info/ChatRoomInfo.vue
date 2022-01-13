<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-pie-chart"></i> 聊天室管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>聊天室详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="person-num-screen">
                <text class="person-num-text">实时人数：{{person_num}}</text>
            </div>
            <el-divider></el-divider>
<!--            <div class="plugins-tips">-->
<!--                vue-schart：vue.js封装sChart.js的图表组件。-->
<!--                访问地址：-->
<!--                <a-->
<!--                    href="https://github.com/lin-xin/vue-schart"-->
<!--                    target="_blank"-->
<!--                >vue-schart</a>-->
<!--            </div>-->
            <div class="schart-box">
                <el-date-picker
                    v-model="date"
                    placeholder="选择当前日期"
                    @change="getDataList()"
                ></el-date-picker>
                <div class="content-title">柱状图</div>
                <schart class="schart" canvasId="bar" :options="options1"></schart>
            </div>
            <div class="schart-box">
                <div class="content-title">折线图</div>
                <schart class="schart" canvasId="line" :options="options2"></schart>
            </div>
<!--            <div class="schart-box">-->
<!--                <div class="content-title">饼状图</div>-->
<!--                <schart class="schart" canvasId="pie" :options="options3"></schart>-->
<!--            </div>-->
<!--            <div class="schart-box">-->
<!--                <div class="content-title">环形图</div>-->
<!--                <schart class="schart" canvasId="ring" :options="options4"></schart>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import http from '@/api/chatroom'
export default {
    name: 'chatRoomInfo',
    components: {
        Schart
    },
    data() {
        return {
            date: null,
            timer: '',
            person_num: 0,
            options1: {
                type: 'bar',
                title: {
                    text: '今日聊天室人数变化图'
                },
                bgColor: '#fbfbfb',
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
                legend: {
                    display: false
                },
                datasets: [
                    {
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '今日聊天室人数变化图'
                },
                bgColor: '#fbfbfb',
                legend: {
                    display: false
                },
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
                    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
                datasets: [
                    {
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 0, 0]
                    },
                ]
            },
            options3: {
                type: 'pie',
                title: {
                    text: '服装品类销售饼状图'
                },
                legend: {
                    position: 'left'
                },
                bgColor: '#fbfbfb',
                labels: ['T恤', '牛仔裤', '连衣裙', '毛衣', '七分裤', '短裙', '羽绒服'],
                datasets: [
                    {
                        data: [334, 278, 190, 235, 260, 200, 141]
                    }
                ]
            },
            options4: {
                type: 'ring',
                title: {
                    text: '环形三等分'
                },
                showValue: false,
                legend: {
                    position: 'bottom',
                    bottom: 40
                },
                bgColor: '#fbfbfb',
                labels: ['vue', 'react', 'angular'],
                datasets: [
                    {
                        data: [500, 500, 500]
                    }
                ]
            }
        };
    },
    mounted() {
        this.date = this.formatDate(new Date())
        this.getData()
        this.getOnlineMembers()


    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    watch: {
        $route: {
            handler() {
                this.getData()
            },
            deep: true
        }
    },
    methods: {
        getDataList(){
            this.date = this.formatDate(this.date)
            console.log("this.date:")
            console.log(this.date)
            this.getData()
        },
        getData(){
            console.log("route.index"+this.$route.query.index)
            var index = this.$route.query.index
            let _this = this
            http.getUserCount(index, this.date).then(res => {
                if(res.code === 20000){
                    console.log(res)

                    _this.options1.labels = res.data.hours
                    _this.options1.datasets[0].data = res.data.cnts
                    _this.options2.labels = res.data.hours
                    _this.options2.datasets[0].data = res.data.cnts
                    console.log(this.options1)
                }else {
                    console.log('请求失败！')
                }
            })
        },
        getOnlineMembers : function() {
            //先调用一次，给onlineMembers赋值
            this.getCount();
            /* 每隔两分钟刷新在线人数
            第一个参数为要调用的函数（记得不要带括号）
                         第二个参数是定时的时间间隔（这里为两分钟 */
            this.timer = setInterval(this.getCount,1000 * 2);
        },
        getCount(){
            let _this = this
            var index = this.$route.query.index
            http.getUserCountReal(index).then(res => {
                if(res.code === 20000){
                    // console.log(res)
                    _this.person_num = res.data.cnt
                }else{
                    console.log("getCount -> getUserCountReal调用失败")
                }
            })
        },
        formatDate (date) {
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        }
    }
};
</script>

<style scoped>
.person-num-screen{
    width: 1000px;
    height: 50px;
    text-align: center;
    font-size: x-large;
}
.person-num-text{
    line-height: 50px;
}
.schart-box {
    display: inline-block;
    margin: 20px;
}
.schart {
    width: 1000px;
    height: 500px;
}
.content-title {
    clear: both;
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
</style>
