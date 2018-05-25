<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增接种疫苗信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/Vaccination'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入地点" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="time" type="date" placeholder="选择时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">名称：</div>
                    <input type="text" v-model="name" class="form-control input-field" placeholder="请输入名称" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">预防疾病：</div>
                    <input type="text" v-model="preventDisease" class="form-control input-field" placeholder="请输入预防疾病" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处理人：</div>
                    <input type="text" v-model="dealPeople" class="form-control input-field" placeholder="请输入马的处理人" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">疫苗编号：</div>
                    <input type="text" v-model="vaccineNum" class="form-control input-field" placeholder="请输入疫苗编号" />
                </div>
            </div>

        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>

<script>
import { DatePicker, Button, Select } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            address: '',
            name: '',
            time: '',
            dealPeople: '',
            preventDisease: '',
            vaccineNum: '',
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        "el-select": Select
    },
    methods: {
        open() {
            this.$message.success('修改成功')
        },
    }
}
</script>

<style lang="scss" scoped>

</style>
