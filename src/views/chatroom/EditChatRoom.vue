<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 聊天室管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>编辑聊天室</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="聊天室选择">
                        <el-select v-model="form.loc" placeholder="Choose Room">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-divider></el-divider>
                    <el-form-item label="聊天室名称">
                        <el-input v-model="form.name" placeholder="请输入聊天室名称"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="聊天室区域">
                        <el-input v-model="form.region" placeholder="请输入聊天室区域"></el-input>
                    </el-form-item>
                    <el-form-item label="聊天室位置">
                        <el-input v-model="form.location" placeholder="请输入聊天室位置"></el-input>
                    </el-form-item>
                    <el-form-item label="取号功能">
                        <el-select v-model="form.number" placeholder="选择取号功能">
                            <el-option key="1" label="按桌型叫号" value="按桌型叫号"></el-option>
                            <el-option key="2" label="标准" value="标准"></el-option>
                            <el-option key="3" label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="选择开始时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="form.time1"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="选择截至时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date2"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="form.time2"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'editChatRoom',
    data() {
        return {
            form: {
                name: '',
                loc: '',
                region: '',
                location: '',
                number: '',
                date1: '',
                time1: '',
                date2: '',
                time2: '',
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！')
            console.log(this.form)
        },
        onReset() {
            this.form = [];
            console.log(this.form)
        }
    }
};
</script>
<style scoped>

</style>