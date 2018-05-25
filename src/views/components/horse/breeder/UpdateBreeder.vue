<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改饲养员信息</div>
            <div class="title" v-if="useDisabled">查看饲养员信息</div>
            <router-link class="back btn btn-info" :to="'/horse/breeder'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" v-model="name" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
                    <el-select ref="selectInput" size="large" v-model="gender" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">技能描述：</div>
                    <input type="text" v-model="skill" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">匹配马匹：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="matchHorse" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in matchHorseOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">入职时间：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="workTime" type="date">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">身份证照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" :imageUrl="idCardImg">
                    </upload-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, Select, ButtonSelect } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/UploadImg.vue'
/* eslint-disable */
export default {
    data() {
        return {
            workTime: '',
            matchHorse: '',
            skill: '',
            name: '',
            matchHorse: '',
            idCardImg: '',
            useDisabled: false,
            gender: '',
            files: {},
            matchHorseOptions: [
                {
                    value: "选项1",
                    label: "马匹1"
                },
                {
                    value: "选项2",
                    label: "马匹2"
                }
            ],
            genderOptions: [
                {
                    value: "1",
                    label: "男"
                },
                {
                    value: "2",
                    label: "女"
                }
            ]
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        "el-select": Select,
        'upload-img': UploadImg,
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
        this.$el.addEventListener('animationend', this.resizeSelect)
    },
    methods: {
        resizeSelect() {
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

</style>
