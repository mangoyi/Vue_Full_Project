<template>
    <div>
        <textarea type="text" rows="2" :disabled="useDisabled" v-model="useConsume" class="form-control addborder" @click="addItemDialog=true" placeholder="点击添加"></textarea>
        <el-dialog title="增加条目" :modal-append-to-body="false" :visible.sync="addItemDialog" width="52%" center>
            <div class="row mb-3" v-for="(item,index) in assets" :key="item">
                <div class="col-md-1">
                    <el-checkbox v-model="item.checked" @change="selectItem"></el-checkbox>
                </div>
                <div class="col-md-4">
                    <input type="text" v-model="item.name" class="form-control input-field" placeholder="药品名" />
                </div>
                <div class="col-md-3">
                    <input type="text" v-model="item.number" class="form-control input-field" placeholder="库存" />
                </div>
                <div class="col-md-3">
                    <div class="Spinner">
                        <a class="Decrease" @click="decrease(index,item.value)">
                            <i class="fa fa-sort-desc"></i>
                        </a>
                        <input class="Amount" v-model="item.value" autocomplete="off">
                        <a class="Increase" @click="increase(index,item.value)">
                            <i class="fa fa-sort-asc"></i>
                        </a>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="add-delete">
                        <a @click="addData">
                            <i class="fa fa-plus-circle"></i>
                        </a>
                        <a @click="confirmDialog=true">
                            <i class="fa fa-minus-circle"></i>
                        </a>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addItemDialog = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="confirmDialog" width="25%" center>
            <div class="text-center">
                <span>确定要删除这一条数据吗？</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteData(index)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:['assets','useDisabled'],
    data() {
        return {
            disabled:false,
            confirmDialog: false,
            select: '',
            useConsume: [],
            checked: true,
            addItemDialog: false,
        }
    },
    methods: {
        confirm() {
            let useConsume = []
            let len = this.select.length
            for (let i = 0; i < len; i++) {
                let value = this.select[i].name + ' : ' + this.assets[i].value + ' '
                useConsume.push(value)
            }
            this.useConsume = useConsume
            this.addItemDialog = false
        },
        selectItem() {
            let len = this.assets.length
            this.select = []
            for (let i = 0; i < len; i++) {
                if (this.assets[i].checked == true) {
                    if (this.assets[i].value == 0) {
                        this.assets[i].value = 1
                    }
                    this.select.push({
                        name: this.assets[i].name,
                        value: this.assets[i].value
                    })
                }
            }
            return this.select
        },
        deleteData(index) {
            this.assets.splice(index, 1)
            this.confirmDialog = false
        },
        addData() {
            this.assets.push({
                id: "",
                name: "",
                value: 0
            });
        },
        //增加
        increase(index, value) {
            return this.assets[index].value++;
        },
        //减少
        decrease(index, value) {
            this.index = index
            if (value <= 0) {
                return 0;
            } else {
                return this.assets[index].value--;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.addborder{
    border-radius: 5px;
}
.add-delete a {
    margin-left: 5px;
    cursor: pointer;
}

.add-delete {
    color: #409eff;
    margin-left: -40px;
    float: left;
    font-size: 40px;
    display: inline-flex;
}

.input-field {
    border-radius: 5px;
    height: 40px;
}

.Spinner {
    display: block;
    overflow: hidden;
    width: 160px;
    margin-top: 3px;
}

.Spinner a {
    display: inline-block;
    width: 35px;
    height: 35px;
    border: 1px solid #d9d9d9;
    background-color: #f7f7f7;
    float: left;
    cursor: pointer;
    outline: 0;
}

.Spinner .Amount {
    width: 50px;
    height: 35px;
    border-width: 1px 0;
    border-style: solid;
    border-color: #d9d9d9;
    float: left;
    text-align: center;
    color: #565656;
    outline: 0;
}

.Decrease i {
    padding-left: 10px;
    font-size: 20px;
    color: #409eff;
}

.Increase i {
    padding-left: 10px;
    position: relative;
    top: 8px;
    font-size: 22px;
    color: #409eff;
}
</style>
