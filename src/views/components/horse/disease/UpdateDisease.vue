<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改病历信息</div>
            <div class="title" v-if="useDisabled">查看病历信息</div>
            <router-link class="btn btn-info back" :to="'/horse/disease'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker :disabled="useDisabled" class="el-field-input" size="large" v-model="value" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">医生：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">临诊：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">初诊：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处方用药：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">医嘱：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field">
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">标题标签：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>

            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="selectValue" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">x光照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" :imageUrl="xRayImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">数据照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :useDisabled="useDisabled" :imageUrl="dataImg">
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
import UploadImg from '../../../../components/uploadImg/UploadImg.vue'
/* eslint-disable */
export default {
    data() {
        return {
            xRayImg: '',
            dataImg: '',
            selectValue: '',
            useDisabled: false,
            value: '',
            value1: '',
            files: {},
            options: [{
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
    },
    methods: {
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
