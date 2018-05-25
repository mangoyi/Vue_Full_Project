<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增角色</div>
            <router-link class="btn btn-info back" :to="'/system/role'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">角色名称：</div>
                    <input type="text" v-model="roleName" class="form-control input-field" placeholder="请输入角色名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色标示：</div>
                    <input type="text" v-model="roleMark" class="form-control input-field" placeholder="请输入角色唯一标示" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" class="form-control input-field" placeholder="请输入用户备注" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select ref="selectStatus" size="large" v-model="status" class="el-field-input" placeholder="请选择">
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
            roleName: '',
            roleMark: '',
            note: '',
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
    mounted() {
        this.$el.addEventListener('animationend', this.resizeStatus)
    },
    methods: {
        resizeStatus() {
            this.$refs.selectStatus.resetInputWidth()
        },
        open() {
            this.$message.success('修改成功')
        },

    }
}
</script>

<style lang="scss" scoped>

</style>
