<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改角色</div>
            <div class="title" v-if="useDisabled">查看角色</div>
            <router-link class="btn btn-info back" :to="'/system/role'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">角色名称：</div>
                    <input type="text" v-model="roleName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">角色标示：</div>
                    <input type="text" v-model="roleMark" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" :disabled="useDisabled" class="form-control input-field" />

                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">状态：</div>
                    <el-select ref="selectStatus" size="large" :disabled="useDisabled" v-model="status" class="el-field-input">
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
            useDisabled: false,
            status: '',
            note: '',
            roleName: '',
            roleMark: '',
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
        this.useDisabled = !!this.$route.query.disable
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
