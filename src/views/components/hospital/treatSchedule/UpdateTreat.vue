<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改门诊治疗</div>
            <div class="title" v-if="useDisabled">查看门诊治疗</div>
            <router-link class="btn btn-info back" :to="'/hospital/treatSchedule'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">门诊方式：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="treatWay" class="el-field-input">
                        <el-option v-for="item in treatWayOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field" v-if="treatWay==1">
                    <div class="label">预约号：</div>
                    <input type="text" v-model="appointNum" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">开始日期：</div>
                    <el-date-picker :disabled="useDisabled" size="large" v-model="beginDate" type="date" format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">开始时间：</div>
                    <el-time-select :disabled="useDisabled" size="large" v-model="beginTime" :picker-options="{
                                                            start: '00:00',
                                                            step: '01:00',
                                                            end: '24:00'
                                                          }">
                    </el-time-select>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">结束日期：</div>
                    <el-date-picker :disabled="useDisabled" size="large" v-model="endDate" type="date" format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">结束时间：</div>
                    <el-time-select :disabled="useDisabled" size="large" v-model="endTime" :picker-options="{
                                                            start: '00:00',
                                                            step: '01:00',
                                                            end: '24:00'
                                                          }">
                    </el-time-select>
                </div>

            </div>
            <div class="row list-search">

                <div class="col-md-4 search-field">
                    <div class="label">马匹类型：</div>
                    <el-select size="large" v-model="horseType" :disabled="useDisabled" class="el-field-input">
                        <el-option v-for="item in horseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" v-model="horseName" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗时间：</div>
                    <el-date-picker class="el-field-input" :disabled="useDisabled" format="yyyy-MM-dd HH:mm:ss" size="large" v-model="treatDate" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" v-model="treatName" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗概述：</div>
                    <input type="text" v-model="treatDesc" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>   
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">手术室使用：</div>
                    <el-select size="large" :disabled="useDisabled" v-model="useRoom" class="el-field-input">
                        <el-option v-for="item in useRoomOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">设备使用：</div>
                    <add-dialog :assets="equipment" :useDisabled="useDisabled"></add-dialog>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">消耗品使用：</div>
                    <add-dialog :useDisabled="useDisabled" :assets="consume"></add-dialog>

                </div>
            </div>
            <div class="baseInfo-title">
                <div class="title">增加病历</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker :disabled="useDisabled" size="large" v-model="illTime" type="datetime">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">处方用药：</div>
                    <add-dialog :assets="medicine" :useDisabled="useDisabled"></add-dialog>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">初诊：</div>
                    <el-input type="textarea" :disabled="useDisabled" :rows="2" v-model="firstTreat">
                    </el-input>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">临诊：</div>
                    <el-input type="textarea" :disabled="useDisabled" :rows="2" v-model="secondTreat">
                    </el-input>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">医嘱：</div>
                    <el-input type="textarea" :disabled="useDisabled" :rows="2" v-model="advice">
                    </el-input>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">标题标签：</div>
                    <input type="text" v-model="titleTag" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">x光照片：</div>
                    <multiple-img v-on:successFile="successFile" :useDisabled="useDisabled" v-on:removeFile="removeFile" :imageUrl="xRayImg">
                    </multiple-img>
                </div>
            </div>
                 <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">数据照片：</div>
                    <multiple-img v-on:successFile="successFile" :useDisabled="useDisabled" v-on:removeFile="removeFile" :imageUrl="dataImg">
                    </multiple-img>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button, TimeSelect, Input } from "element-ui";
import MultipleImg from '../../../../components/uploadImg/MultipleImg.vue'
import AddDialog from '../../../../components/addDialog/AddDialog.vue'
/* eslint-disable */
export default {
    data() {
        return {
               note:'',
            titleTag:'',
            address:'',
            horseName:'',
            treatName:'',
            treatDesc:'',
            appointNum:'',
            useDisabled:false,
            treatDate: '',
            select: '',
            useConsume: [],
            checked: true,
            firstTreat: '',
            secondTreat: '',
            advice: '',
            treatWay:'',
            beginDate:'',
            beginTime:'',
            endDate:'',
            endTime:'',
            horseType:'',
            useRoom:'',
            xRayImg: '',
            dataImg: '',
            illTime:'',
            useRoomOptions: [
                {
                    value: "选项1",
                    label: "数据1"
                },
                {
                    value: "选项2",
                    label: "数据2"
                }
            ],
            treatWayOptions: [
                {
                    value: "1",
                    label: "预约"
                },
                {
                    value: "2",
                    label: "普通"
                }
            ],
            horseTypeOptions: [
                {
                    value: "1",
                    label: "中心"
                },
                {
                    value: "2",
                    label: "外来"
                }
            ],
            consume: [
                { name: "阿莫西林", number: "123", value: "0", checked: false },
                { name: "阿司匹林", number: "123", value: "0", checked: false },
                { name: "阿门", number: "123", value: "0", checked: false }
            ],
            equipment: [
                { name: "手术室1", number: "123", value: "0", checked: false },
                { name: "手术室2", number: "123", value: "0", checked: false },
                { name: "手术室3", number: "123", value: "0", checked: false }
            ],
            medicine: [
                { name: "阿莫西林", number: "123", value: "0", checked: false },
                { name: "阿司匹林", number: "123", value: "0", checked: false },
                { name: "阿门", number: "123", value: "0", checked: false }
            ],
        };
    },
    components: {
        "el-date-picker": DatePicker,
        "el-button": Button,
        "el-time-select": TimeSelect,
        "el-input": Input,
        'multiple-img': MultipleImg,
        'add-dialog': AddDialog
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable
    },
    methods: {
        uploadFun(file) {
            this.files[file.name] = file.file
        },
        successFile(res) {
            //上传成功后，接口返回的值，点击确定把这个值再传过去
            console.log(res)
        },
        removeFile(file) {
            console.log(file)
        },
        open() {
            this.$message.success('修改成功')
        },

    }
};
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
