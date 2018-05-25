<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增部门信息</div>
            <router-link class="btn btn-info back" :to="'/system/department'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">部门名称</div>
                    <input type="text" v-model="departName" class="form-control input-field" placeholder="请输入部门名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">部门简称：</div>
                    <input type="text" v-model="departShortName" class="form-control input-field" placeholder="请输入部门简称" />
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
import { DatePicker, Button} from 'element-ui'
/* eslint-disable */
export default {
    data() {
        return {
            departName:'',
            departShortName:'',
            status: '',
            statusOptions: [{
                value: '选项1',
                label: '假数据1'
            }, {
                value: '选项2',
                label: '假数据2'
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
