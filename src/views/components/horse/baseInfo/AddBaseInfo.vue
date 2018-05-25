<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增马匹基本信息</div>
            <router-link class="btn btn-info back" :to="'/horse/baseInfo'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="baseInfo-title">
                <div class="title">基本信息</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">护照号码：</div>
                    <input type="text" v-model="passport" class="form-control input-field" placeholder="请输入护照号码" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" v-model="horseName" class="form-control input-field" placeholder="请输入马的名字" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更马名：</div>
                    <input type="text" v-model="changeName" class="form-control input-field" placeholder="请输入变更马名" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">出生国家：</div>
                    <input type="text" v-model="bornCountry" class="form-control input-field" placeholder="请输入马的出生国家" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">变更日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="changeDate" type="date" placeholder="选择变更日期">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">出生日期：</div>
                    <el-date-picker class="el-field-input" size="large" v-model="birthDate" type="date" placeholder="选择出生日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">身高(公分)：</div>
                    <input type="text" v-model="height" class="form-control input-field" placeholder="请输入马的身高" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">性别：</div>
                    <el-select ref="selectInput" size="large" v-model="gender" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">皮下条码：</div>
                    <input type="text" v-model="barcode" class="form-control input-field" placeholder="请输入马的皮下条码" />
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">毛色：</div>
                    <input type="text" v-model="color" class="form-control input-field" placeholder="请输入马的毛色" />
                </div>
            </div>
            <div class="baseInfo-title">
                <div class="title">描述</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">头部：</div>
                    <input type="text" v-model="head" class="form-control input-field" placeholder="请输入马的头部描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左前肢：</div>
                    <input type="text" v-model="leftFore" class="form-control input-field" placeholder="请输入马的左前肢描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右前肢：</div>
                    <input type="text" v-model="rightFore" class="form-control input-field" placeholder="请输入马的右前肢描述" />
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">左后肢：</div>
                    <input type="text" v-model="leftHind" class="form-control input-field" placeholder="请输入马的左后肢描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">右后肢：</div>
                    <input type="text" v-model="rightHind" class="form-control input-field" placeholder="请输入马的右后肢描述" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">体躯：</div>
                    <input type="text" v-model="body" class="form-control input-field" placeholder="请输入马的体躯描述" />
                </div>
            </div>
            <div class="baseInfo-title">
                <div class="title">轮廓图解</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">右侧：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="rightImg" :imageUrl="rightImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">左侧：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="leftImg" :imageUrl="leftImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">上眼线：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="upLineImg" :imageUrl="upLineImg">
                    </upload-img>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">前肢-后视：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="foreImg" :imageUrl="foreImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">颈部仰视：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="neckImg" :imageUrl="neckImg">
                    </upload-img>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">后肢-后视：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="backImg" :imageUrl="backImg">
                    </upload-img>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">唇：</div>
                    <upload-img v-on:uploadFun="uploadFun" name="lipImg" :imageUrl="lipImg">
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
            passport: '',
            horseName: '',
            changeName: '',
            bornCountry: '',
            height:'',
            barcode:'',
            color:'',
            head:'',
            leftFore:'',
            rightFore:'',
            leftHind:'',
            rightHind:'',
            body:'',
            rightImg: '',
            leftImg: '',
            upLineImg: '',
            foreImg: '',
            neckImg: '',
            backImg: '',
            lipImg: '',
            gender: '',
            changeDate: '',
            birthDate: '',
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
        'el-select': Select,
        'upload-img': UploadImg
    },
    mounted() {
        this.$el.addEventListener('animationend', this.resizeSelect);
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth();
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
            this.$router.push('/horse/baseInfo')
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
