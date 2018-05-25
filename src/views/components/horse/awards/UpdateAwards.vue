<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改获奖信息</div>
            <div class="title" v-if="useDisabled">查看获奖信息</div>
            <router-link class="btn btn-info back" :to="'/horse/awards'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">比赛名称：</div>
                    <input type="text" v-model="gameName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">获奖时间：</div>
                    <el-date-picker v-model="awardsTime" :disabled="useDisabled" class="el-field-input" size="large" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">奖项：</div>
                    <input type="text" v-model="awards" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">罚分项：</div>
                    <input type="text" v-model="penalty" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">颁奖方：</div>
                    <input type="text" v-model="awardParty" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select ref="selectInput" size="large" :disabled="useDisabled" v-model="horse" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in horseOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" :imageUrl="horseImg">
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
import { DatePicker, Button, Upload, Select } from 'element-ui'
import UploadImg from '../../../../components/uploadImg/UploadImg.vue'/* eslint-disable */
export default {
    data() {
        return {
            awardParty: '',
            penalty: '',
            awards: '',
            gameName: '',
            awardsTime: '',
            address: '',
            horseImg: '',
            useDisabled: false,
            files: {},
            horse: '',
            horseOptions: [{
                value: '1',
                label: '马匹1'
            }, {
                value: '2',
                label: '马匹2'
            }],
        }
    },
    components: {
        'el-date-picker': DatePicker,
        'el-button': Button,
        'upload-img': UploadImg,
        "el-select": Select
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
