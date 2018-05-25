<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增钉甲</div>
            <router-link class="btn btn-info back" :to="'/hospital/nail'">
                返回
            </router-link>
        </div>
        <div class="content-show">

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="nailTime" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select size="large" v-model="horse" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in horseOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">操作人：</div>
                    <el-select size="large" v-model="operation" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
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
            nailTime: '',
            horse:'',
            operation:'',
            horseOptions: [{
                value: '选项1',
                label: '马匹1'
            }, {
                value: '选项2',
                label: '马匹2'
            }],
            options: [{
                value: '选项1',
                label: '张三'
            }, {
                value: '选项2',
                label: '李四'
            }],
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
