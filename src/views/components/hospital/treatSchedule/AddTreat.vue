<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title">新增治疗日程</div>
            <router-link class="btn btn-info back" :to="'/hospital/treatSchedule'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">门诊方式：</div>
                    <el-select size="large" v-model="treatWay" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in treatWayOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field" v-if="treatWay==1">
                    <div class="label">预约号：</div>
                    <input type="text" v-model="appointNum" class="form-control input-field" placeholder="请输入预约号称" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">开始日期：</div>
                    <el-date-picker size="large" v-model="beginDate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">开始时间：</div>
                    <el-time-select size="large" v-model="beginTime" :picker-options="{
                                                      start: '00:00',
                                                       step: '01:00',
                                                         end: '24:00'
                                                        }" placeholder="选择时间">
                    </el-time-select>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">结束日期：</div>
                    <el-date-picker size="large" v-model="endDate" type="date" format="yyyy-MM-dd" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">结束时间：</div>
                    <el-time-select size="large" v-model="endTime" :picker-options="{
                                                            start: '00:00',
                                                             step: '01:00',
                                                            end: '24:00'
                                                             }" placeholder="选择时间">
                    </el-time-select>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹类型：</div>
                    <el-select size="large" v-model="horseType" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in horseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">马匹名称：</div>
                    <input type="text" v-model="horseName" class="form-control input-field" placeholder="请输入马匹名称" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗时间：</div>
                    <el-date-picker class="el-field-input" format="yyyy-MM-dd HH:mm:ss" size="large" v-model="treatDate" type="date" placeholder="选择获奖时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" v-model="treatName" class="form-control input-field" placeholder="请输入治疗名称" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗概述：</div>
                    <input type="text" v-model="treatDesc" class="form-control input-field" placeholder="请输入治疗概述" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">手术室使用：</div>
                    <el-select size="large" v-model="useRoom" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in useRoomOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">设备使用：</div>
                    <add-dialog :assets="equipment"></add-dialog>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">消耗品使用：</div>
                    <add-dialog :assets="consume"></add-dialog>
                </div>
            </div>

            <div class="baseInfo-title">
                <div class="title">新增病历</div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">时间：</div>
                    <el-date-picker size="large" v-model="illTime" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">地点：</div>
                    <input type="text" v-model="address" class="form-control input-field" placeholder="请输入地点" />
                </div>

                <div class="col-md-4 search-field">
                    <div class="label">处方用药：</div>
                    <add-dialog :assets="medicine"></add-dialog>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">初诊：</div>
                    <el-input type="textarea" :rows="2" placeholder="请输入初诊" v-model="firstTreat">
                    </el-input>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">临诊：</div>
                    <el-input type="textarea" :rows="2" placeholder="请输入临诊" v-model="secondTreat">
                    </el-input>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">医嘱：</div>
                    <el-input type="textarea" :rows="2" placeholder="请输入医嘱" v-model="advice">
                    </el-input>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">标题标签：</div>
                    <input type="text" v-model="titleTag" class="form-control input-field" placeholder="请输入标题标签" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">备注：</div>
                    <input type="text" v-model="note" class="form-control input-field" placeholder="请输入备注" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">x光照片：</div>
                    <multiple-img v-on:successFile="successFile" v-on:removeFile="removeFile" :imageUrl="xRayImg">
                    </multiple-img>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">数据照片：</div>
                    <multiple-img v-on:successFile="successFile" v-on:removeFile="removeFile" :imageUrl="dataImg">
                    </multiple-img>
                </div>
            </div>
        </div>
        <div class="content-footer row">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>

    </div>
</template>
<script>
import { DatePicker, Button, Input, TimeSelect, Upload } from "element-ui";
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

    methods: {

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
.el-select-dropdown__list {
    height: 139px !important;
    overflow-y: scroll !important;
}
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
