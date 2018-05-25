<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改接种疫苗信息</div>
            <div class="title" v-if="useDisabled">查看接种疫苗信息</div>
            <router-link class="btn btn-info back" :to="'/hospital/Vaccination'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="time" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">名称：</div>
                    <input type="text" v-model="name" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">预防疾病：</div>
                    <input type="text" v-model="preventDisease" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处理人：</div>
                    <input type="text" v-model="dealPeople" :disabled="useDisabled" class="form-control input-field" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">疫苗编号：</div>
                    <input type="text" v-model="vaccineNum" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>

        </div>
        <div class="content-footer row" v-show="!useDisabled">
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
    },
    mounted() {
        this.useDisabled = this.$route.query.disable
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
