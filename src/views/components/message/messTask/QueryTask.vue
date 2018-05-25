<template>
    <div class="content_page">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改模板信息</div>
            <div class="title" v-if="useDisabled">查看任务信息</div>
            <router-link class="btn btn-info back" :to="'/message/MessTask'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="baseInfo-title">
                <div class="title">模板内容</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">提交时间：</div>
                    <input type="text" v-model="passport" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">提交状态：</div>
                    <input type="text" v-model="head" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-8 search-field">
                    <div class="label">发送内容：</div>
                    <input type="text" v-model="leftHind" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">发送时间：</div>
                    <input type="text" v-model="passport" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">发送状态：</div>
                    <input type="text" v-model="head" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>

<script>
import { DatePicker, Button, Upload, Select } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/UploadImg.vue'/* eslint-disable */
export default {
    data() {
        return {
            passport: '',
            horseName: '',
            changeName: '',
            bornCountry: '',
            height: '',
            barcode: '',
            color: '',
            head: '',
            leftFore: '',
            rightFore: '',
            leftHind: '',
            rightHind: '',
            body: '',
            imageUrl: '',
            rightImg: '',
            leftImg: '',
            upLineImg: '',
            foreImg: '',
            neckImg: '',
            backImg: '',
            lipImg: '',
            changeDate: '',
            birthDate: "",
            useDisabled: false,
            gender: '',
            files: {},
            genderOptions: [{
                value: '1',
                label: '男'
            }, {
                value: '2',
                label: '女'
            }],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'upload-img': UploadImg,
        'el-select': Select
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend',this.resizeSelect)
    },
    methods: {
        resizeSelect(){
            this.$refs.selectInput.resetInputWidth()
        },
        uploadFun(file) {
            this.files[file.name] = file.file
        },
        open() {
            var formData = new FormData()
            for (let key in this.files) {
                formData.append(key, this.files[key])
            }
            //上传的是formData,content-Type要修改为formData
            console.log(formData)
            this.$message.success('修改成功')
        },
    }
}
</script>

<style lang="scss" scoped>
.baseInfo-title {
    height: 30px;
    line-height: 30px;
    border-left: 2px solid #2db7f5;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 12px;
    .title {
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
    }
}
</style>
