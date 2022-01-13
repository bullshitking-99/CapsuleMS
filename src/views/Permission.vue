<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-warn"></i> 权限测试
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>管理员权限页面</h1>
            <p>只有用 admin 账号登录的才拥有管理员权限，才能进到这个页面，其他账号想进来都会跳到403页面，重新用管理员账号登录才有权限。</p>
            <p>
                想尝试一下，请
                <router-link to="/login" class="logout">退出登录</router-link>，换个账号，再进来试试看。
            </p>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column prop="name" label="管理员姓名"></el-table-column>
            <el-table-column prop="password" label="管理员密码"></el-table-column>
            <el-table-column prop="accessfield" label="区域权限"></el-table-column>
            <el-table-column prop="email" label="管理员邮箱"></el-table-column>
            <el-table-column prop="operation" label="">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">区域分配</el-button>
                </template>
            </el-table-column>


        </el-table>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加权限范围" v-model="editVisible" width="30%">
            <el-table
                :data="form.locations"
                style="width: 100%">
                <el-table-column prop="field" label="区域ID"></el-table-column>
                <el-table-column prop="location" label="区域名称"></el-table-column>
                <el-table-column prop="operation" label="">
                    <template #default="scope">
                        <el-button @click="deleteField(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--            <el-form ref="form" :model="form" label-width="120px">-->
<!--                <el-form-item label="选择区域" prop="location">-->
                    <el-select v-model="form.location" value-key="field" placeholder="请选择聊天室区域" style="width: 80%">
                        <el-option
                            v-for="item in locations"
                            :key="item.field"
                            :value="item"
                            :label="item.location">
                        </el-option>
                    </el-select>
                    <el-button @click="addField" type="text" size="small">新增区域</el-button>
<!--                </el-form-item>-->
<!--            </el-form>-->

<!--确定和取消 -->
<!--            <template #footer>-->
<!--                <span class="dialog-footer">-->
<!--                    <el-button @click="editVisible = false">取 消</el-button>-->
<!--                    <el-button type="primary" @click="saveEdit">确 定</el-button>-->
<!--                </span>-->
<!--            </template>-->
        </el-dialog>
    </div>
</template>

<script>
import http from '@/api/admin'
import httpRoom from '@/api/chatroom'
export default {
    name: "permission",
    data() {
        return {
            tableData: [
                {
                    name: "www",
                    password: "11111111",
                    accessId: "1",
                    email: "2222@qq.com"
                },
                {
                    name: "admin1",
                    password: "123456",
                    accessId: "1,2",
                    email: "admin@qq.com"
                },
                {
                    name: "wxbcs",
                    password: "wxbcs",
                    accessId: "2",
                    email: "111@qq.com"
                },
            ],
            form: {
                id: 0,  //该商户id
                locations: [], // 该商户已有权限的区域
                location: {}    // 暂时记录选择的区域，即将新增
            },
            locations: [],  //记录所有区域
            editVisible: false,
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData(){
            http.getUser().then(res => {
                if(res.code === 20000){
                    this.tableData = res.data.shopperList
                    // "id": 7,
                    // "name": "dadada",
                    // "password": "111111",
                    // "description": null,
                    // "email": "11111111@111.com",
                    // "accessfield": "1"
                }else{
                    window.alert("网络异常！")
                }
            })

            httpRoom.getAllLocation().then(res => {
                if(res.code === 20000){
                    this.locations = res.data.locationToFieldList
                }else{
                    window.alert("server error!")
                }
            })
        },
        // 点击“区域分配”按钮
        handleEdit(index, row) {
            // console.log("index:" + index)
            console.log(row)
            this.idx = index;
            this.form.id = row.id
            this.form.locations = row.locations
            httpRoom.getLocation(row.id).then(res => {
                if(res.code === 20000){
                    this.form.locations = res.data.shopperList
                }
            })

            this.editVisible = true;
        },
        // saveEdit(){
        //     this.editVisible = false;
        // },
        deleteField(index, row){
            // console.log(this.form.locations)
            // console.log(row)
            http.deleteField(row.managerId, parseInt(row.field)).then(res => {
                if(res.code === 20000){
                    this.$message.success('删除成功')
                }
            })
        },
        // 点击新增
        addField(){
            console.log(this.form.location)
            if(this.form.location === null || JSON.stringify(this.form.location) == "{}"){
                window.alert("请先选择区域")
            }else{
                let param = {
                    field: this.form.location.field,
                    location: this.form.location.location,
                    managerId: this.form.id
                }
                http.addField(param).then(res => {
                    if(res.code === 20000){
                        this.$message.success('提交成功！')
                        this.form.location = null
                    }else{
                        this.$message.error('提交失败！')
                    }
                })
            }
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 30px 0;
}
p {
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout {
    color: #409eff;
}
</style>
