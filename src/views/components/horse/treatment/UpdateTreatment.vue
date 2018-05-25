<template>
    <div class="content_page animated zoomIn">
        <div class="content-title">
            <div class="title" v-if="!useDisabled">修改治疗信息</div>
            <div class="title" v-if="useDisabled">查看治疗信息</div>
            <router-link class="btn btn-info back" :to="'/horse/treatment'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">治疗时间：</div>
                    <el-date-picker class="el-field-input" :disabled="useDisabled" format="yyyy-MM-dd HH:mm:ss" size="large" v-model="value" type="date">
                    </el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗名称：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">治疗概述：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">手术室使用：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label" style="left: -14px;">固定资产使用：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
                <div class="col-md-4 search-field">
                    <div class="label">消耗品使用：</div>
                    <input type="text" :disabled="useDisabled" class="form-control input-field" />
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-4 search-field">
                    <div class="label">马匹：</div>
                    <el-select ref="selectInput" size="large" :disabled="useDisabled" v-model="selectValue" class="el-field-input" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="content-footer row" v-show="!useDisabled">
            <el-button class="col-md-1 btn btn-primary makesure" :plain="true" @click="open">确定</el-button>
        </div>
    </div>
</template>
<script>
import { DatePicker, Button } from "element-ui";
/* eslint-disable */
export default {
    data() {
        return {
            value: "",
            useDisabled: false,
            selectValue: "",
            options: [
                {
                    value: "选项1",
                    label: "马匹1"
                },
                {
                    value: "选项2",
                    label: "马匹2"
                }
            ]
        };
    },
    components: {
        "el-date-picker": DatePicker,
        "el-button": Button
    },
    mounted() {
        this.useDisabled = !!this.$route.query.disable;
        this.$el.addEventListener('animationend', this.resizeSelect)
    },
    methods: {
        resizeSelect() {
            this.$refs.selectInput.resetInputWidth()
        },
        open() {
            this.$message.success("修改成功");
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
