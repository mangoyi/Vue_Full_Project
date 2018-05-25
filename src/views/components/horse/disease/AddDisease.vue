<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增病历信息</div>
            <router-link class="btn btn-info back" :to="'/horse/disease'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入地点" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="value" type="date" placeholder="选择时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">医生：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入医生" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">临诊：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马的临诊信息" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">初诊：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入马的初诊信息" />

                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处方用药：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入处方用药" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">医嘱：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入医嘱">
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">标题标签：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入标题标签" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入备注" />
                </div>

            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select size="large" v-model="selectValue" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">x光照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :imageUrl="xRayImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">数据照片：</div>
                    <upload-img v-on:uploadFun="uploadFun" :imageUrl="dataImg">
                    </upload-img>
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
import UploadImg from '../../../../components/uploadImg/UploadImg.vue'
/* eslint-disable */
export default {
    data() {
        return {
            xRayImg: '',
            dataImg: '',
            selectValue: '',
            value: '',
            value1: '',
            imageUrl: '',
            files: {},
            options: [{
                value: '选项1',
                label: '马匹1'
            }, {
                value: '选项2',
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
