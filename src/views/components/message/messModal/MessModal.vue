<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">短信模板</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label" style="left:0px;">模板名称：</div>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="doSearch">搜索</button>
                </div>
                <div class="col-md-1 search-field search-field_controls">
                    <!-- <router-link class="btn btn-success" :to="'/hospital/addAppoint'"> -->
                    <router-link class="btn btn-success" :to="'/message/addModal'">
                        新增
                    </router-link>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>模板ID</th>
                                <th>模板名称</th>
                                <th>签名</th>
                                <th>短信内容</th>
                                <th>申请时间</th>
                                <th>审核时间</th>
                                <th>审核状态</th>
                                <th>审核备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartList" :key="item.id">
                                <td>{{item.productId}}</td>
                                <td>{{item.productName}}</td>
                                <td>{{item.productImg}}</td>
                                <td>{{item.productPrice}}</td>
                                <td>2018/2/1 9:13:06</td>
                                <td>2018/2/1 9:13:50</td>
                                <td>审核通过</td>
                                <td>admin进行审核</td>
                                <td>
                                    <router-link :to="{path: '/horse/updateTreatment',       
                                                 query: { disable: 1,}}"> 查看</router-link>
                                    <router-link :to="'/message/updateModal'">
                                        修改
                                    </router-link>
                                    <a @click="centerDialogVisible=true">删除</a>
                                </td>
                            </tr>                                          
                        </tbody>
                    </table>
                    <div class="page">
                        <el-pagination 
                            background 
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="10"
                            layout="total, prev, pager, next"
                            :total="1000"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input} from "element-ui";
import axios from 'axios';
/* eslint-disable */
export default {
    data() {
        return {
            value1:'',
            centerDialogVisible: false,
            currentPage: 1,
            pageSize: 10,
            input: '',
            addressId: "",
            cartList: [
                {
                "productId":"100001",
                "productName":"音响",
                "productPrice":2499,
                "productImg": "1.jpg"
                },
                {
                "productId":"100001",
                "productName":"小米6",
                "productPrice":2499,
                "productImg":"2.jpg"
                },
                {
                "productId":"100001",
                "productName":"小米6",
                "productPrice":2499,
                "productImg":"3.jpg"
                },
                                {
                "productId":"100001",
                "productName":"音响",
                "productPrice":2499,
                "productImg": "1.jpg"
                },
                {
                "productId":"100001",
                "productName":"小米6",
                "productPrice":2499,
                "productImg":"2.jpg"
                },
                {
                "productId":"100001",
                "productName":"小米6",
                "productPrice":2499,
                "productImg":"3.jpg"
                },
                                {
                "productId":"100001",
                "productName":"音响",
                "productPrice":2499,
                "productImg": "1.jpg"
                },
                {
                "productId":"100001",
                "productName":"小米6",
                "productPrice":2499,
                "productImg":"2.jpg"
                },
                {
                "productId":"100001",
                "productName":"小米6",
                "productPrice":2499,
                "productImg":"3.jpg"
                },
                                {
                "productId":"100001",
                "productName":"音响",
                "productPrice":2499,
                "productImg": "1.jpg"
                }
            ]
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        doSearch() {
            let searchContent = this.input;
            if (searchContent == "") {
                alert("请输入内容");
                return;
            } 
            alert(this.input + "搜索成功");
            /*
            axios.post("/users/setDefault", {
                addressId: addressId
            }).then((response) => {
                let res = response.data;
                if( res.status == '0') {         // 表示默认地址设置成功
                    console.log("setDefault success");
                    this.init();
                }
            });
            */
        },
        handleCurrentChange(val) {
            alert("当前页:"+`${val}`+", 当前页个数:"+this.pageSize )
            let currentPage = `${val}`;
            let pageSize = this.pageSize;
            this.init(currentPage, pageSize);           
        },
        init(currentPage, pageSize) {
            /*
            axios.get("/user/init", {
                params: {
                    currentPage: currentPage == undefined ? 1 : currentPage,
                    pageSize: pageSize == undefined ? 1 : pageSize
                }
            }).then(function(response) {
                let res = response.data;
                this.cartList = res.result;    // 将数组赋值给cartList全局变量
            }).catch(function(error) {
                alert(error);
            });
            */
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
