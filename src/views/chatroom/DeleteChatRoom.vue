<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 聊天室管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>管理聊天室</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
                    <el-option key="1" label="软件楼" value="软件楼"></el-option>
                    <el-option key="2" label="四教" value="四教"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="聊天室ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                row-key="id"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                lazy
                :load="load"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="110" align="center"></el-table-column>
                <el-table-column prop="name" label="聊天室名称"></el-table-column>
                <el-table-column prop="location" label="聊天室位置"></el-table-column>
                <el-table-column prop="start_TIME" label="开始时间"></el-table-column>
                <el-table-column prop="end_TIME" label="结束时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            @click="handleInfo(scope.$index, scope.row)"
                        >进入聊天室</el-button>
                        <div v-if="scope.row.parent === 0">
                            <el-button
                                type="text"
                                icon="el-icon-circle-plus-outline"
                                style="color: #ffc300"
                                @click="handleAdd(scope.$index, scope.row)"
                            >新增主题</el-button>
                        </div>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="聊天室名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="聊天室位置">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker
                        v-model="form.start_TIME"
                        type="datetime"
                        placeholder="选择开始时间"
                        style="width: 100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="form.end_TIME"
                        type="datetime"
                        placeholder="选择开始时间"
                        style="width: 100%">
                    </el-date-picker>

                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 新增主题弹出框 -->
        <el-dialog title="添加主题" v-model="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="主题名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
<!--                <el-form-item label="聊天室位置">-->
<!--                    <el-input v-model="form.location"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="开始时间">

                    <el-date-picker
                        v-model="form.start_TIME"
                        type="datetime"
                        placeholder="选择开始时间"
                        style="width: 100%">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker
                        v-model="form.end_TIME"
                        type="datetime"
                        placeholder="选择开始时间"
                        style="width: 100%">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import http from '@/api/chatroom'
export default {
    name: "deleteChatRoom",
    data() {
        return {
            query: {
                address: "",
                name: "",
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [

                {
                    id: 69,
                    name: "软件楼411",
                    location: "软件楼411",
                    end_TIME: "2021-09-24 00:00:00"
                },
                // {
                // creator: 1
                // end_TIME: "2021-09-28 12:00:00"
                // field: "12"
                // id: 69
                // location: "软件楼412"
                // name: "软件楼41222"
                // parent: 0
                // path: "/-781994368"
                // reserve: 2
                // start_TIME: "2019-11-04 00:00:00"
                // },
            ],
            multipleSelection: [],
            delList: [],
            addVisible: false,
            editVisible: false,
            pageTotal: 0,
            form: {
                start_TIME: "",
                reserve: -1,
                end_TIME: "2100-01-01 00:00:00"
            },
            idx: -1,
            id: -1,
            emptyTemplate: [
                {
                    creator: 0,
                    end_TIME: "",
                    field: "",
                    id: "",
                    location: "",
                    name: "",
                    parent: "",
                    path: "",
                    reserve: "",
                    start_TIME: ""
                }
            ]
        };
    },
    created() {
        this.getData();
    },
    methods: {
        load(tree, treeNode, resolve) {
            let pid = tree.id;
            http.getSubRoom(pid).then(res => {
                if(res.code === 20000){
                    // console.log("res.data.roomList")
                    // console.log(res.data.subRoom)
                    if(res.data.subRoom.length > 0){
                        resolve(res.data.subRoom)
                    }else {
                        resolve(this.emptyTemplate)
                    }

                }
            })
        },
        getData() {
            let user = window.localStorage.getItem("user")
            // console.log()
            let userId = JSON.parse(user).id
            http.search(userId).then(res => {
                // console.log(res.data)
                let tableData = res.data.roomList

                for(let i in tableData){
                    tableData[i].hasChildren = true;
                }

                this.tableData = tableData
                // console.log(tableData)
                this.pageTotal = this.tableData.length
                /**
                 end_TIME: "2021-09-24 00:00:00"
                 field: "10"
                 id: 69
                 location: "软件楼411"
                 name: "软件楼411"
                 path: "/1259520063"
                 reserve: 0
                 start_TIME: "2019-11-04 15:49:46"
                 */
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, "pageIndex", 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            console.log(index)
            console.log(row)
            // 二次确认删除
            this.$confirm("确定要删除吗？", "提示", {
                type: "warning"
            })
                .then(() => {
                    http.deleteChatRoom(row.id).then(() => {
                        this.getData()
                    })
                })
                .catch(() => {});
        },
        // 进入聊天室详情页
        handleInfo(index, row){
            this.$router.push({path: '/ChatRoomInfo',query:{index: row.id}})
        },
        // 新增主题
        handleAdd(index, row){
            this.idx = index
            console.log(row)
            this.form = {
                location: row.location,
                field: row.field,
                creator: row.creator,
                start_TIME: row.start_TIME,
                end_TIME: row.end_TIME,
                parent: row.id
            }
            this.addVisible = true

        },
        // 新增主题提交btn
        saveAdd(){
            // let user = this.$store.state.user
            // let userId = user.id
            let params = {
                name: this.form.name,
                field: this.form.field,
                location: this.form.location,
                s_time: this.changeTimeStyle(this.form.start_TIME),
                e_time: this.changeTimeStyle(this.form.end_TIME),
                RESERVE: 0,
                parent: this.form.parent,
                creator: this.form.creator
            }
            http.addChatRoom(params).then(res => {
                if(res.code === 20000){
                    this.$message.success('提交成功！')
                    this.addVisible = false;
                }else {
                    this.$message.error('提交失败！')
                }
            })
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = "";
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + " ";
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            console.log("index:" + index)
            console.log(row)
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            // this.$set(this.tableData, this.idx, this.form);
            console.log(this.form)
            let modifyInfo = {
                "id": this.form.id,
                "name": this.form.name,
                "field": this.form.field,
                "s_time": this.form.start_TIME,
                "e_time": this.form.end_TIME,
                "location": this.form.location,
                "reserve": this.form.reserve,
            }

            http.updateChatRoom(modifyInfo).then(res => {
                if(res.code === 20000){
                    this.editVisible = false;
                    this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    // this.$set(this.tableData, this.idx, this.form);
                }else{
                    this.$message.error('修改失败，请检查')
                }
            })
        },

        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, "pageIndex", val);
            // this.getData();
        },

        changeTimeStyle(oldTime) {
            // 时间转换
            let datejson = new Date(oldTime).toJSON();
            let date = new Date( + new Date(datejson)
                + 8*3600*1000).toISOString().
            replace(/T/g,' ').
            replace(/\.[\d]{3}Z/,'')
            return date;
        },
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
