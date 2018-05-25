<template>
    <el-upload class="avatar-uploader" :disabled="useDisabled" action="" :auto-upload="false" :on-change="submitFile" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import { Upload } from 'element-ui'
export default {
    props:['imageUrl','useDisabled', 'name'], 
    data() {
        return {
            disabled:false
        }
    },
    components:{
        "el-upload":Upload
    },
    methods:{
          preview(file) {
            var fr = new FileReader()
            fr.onloadend = () => {
                this.imageUrl = fr.result;
            }
            fr.readAsDataURL(file.raw)
        },
        submitFile(file) {
            console.log(file)
            // var formData = new FormData(); //调用接口上传data:formData
            // formData.append('file', file.raw);
            this.preview(file);
            this.$emit('uploadFun', {
                name: this.name, 
                file
            })
            // console.log(formData)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }

}
</script>

<style>

</style>
