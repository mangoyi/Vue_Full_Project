<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">增加诊疗室信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/operateRoom'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室名称：</div>
                    <input type="text" v-model="name" class="form-control input-field" placeholder="请输入诊疗室名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">诊疗室简称：</div>
                    <input type="text" v-model="shortName" class="form-control" placeholder="请输入诊疗室简称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select size="large" v-model="status" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
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
import { DatePicker, Button } from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            name:'',
            shortName:'',
            status: '',
            statusOptions: [{
                value: '选项1',
                label: '使用中'
            }, {
                value: '选项2',
                label: '使用结束'
            }],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
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
