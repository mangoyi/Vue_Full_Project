<template>
    <div>
        <el-upload :disabled="useDisabled" action="https://jsonplaceholder.typicode.com/posts/" :on-success="handleSuccess" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <!-- <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="imageUrl" alt="">
        </el-dialog> -->
    </div>
</template>

<script>
import { Upload, Dialog } from 'element-ui'
export default {
    props:['imageUrl','useDisabled'], 
    data() {
        return {
            disabled:false,
            dialogVisible: false
        }
    },
    components: {
        "el-upload": Upload,
        "el-dialog": Dialog
    },
    methods: {
        handleSuccess(res,file){
            this.$emit('successFile',res)
        },
        handleRemove(file, fileList) {
            this.$emit('removeFile',file)
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.imageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>

<style>

</style>
