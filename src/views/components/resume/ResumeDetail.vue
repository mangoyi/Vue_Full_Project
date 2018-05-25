<template>
    <div class="content_page">
        <div class="content-title">
            <div class="title">马匹简历          
                <div class="pre-next">
                    <button class="btn btn-primary">上一条</button>
                    <button class=" btn btn-primary">下一条</button>
                </div>
            </div>
            <router-link class="btn btn-info back-on" :to="'/resume/horseResume'">
                返回
            </router-link>
        </div>
        <div class="content-show">
               <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">基本信息</div>
                </div>

            </div>
            <div class="row list-search resume-bottom mb-2">
                <div class="col-md-3">               
                    <img class="img-show" src="/static/img/horse.png">
                    <div class="horse-name">小大马</div>
                </div>
                <div class="col-md-7 mb-3">
                    <table id="tab1" class="table table-striped">
                        <tbody>
                            <tr>
                                <th>姓名</th>
                                <th>护照号码</th>
                                <th>马名</th>
                                <th>变更马名</th>
                                <th>身高</th>
                                <th>性别</th>
                                <th>出生国家</th>
                                <th>父亲</th>
                            </tr>
                            <tr>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>

                            </tr>
                        </tbody>
                    </table>
                    <table id="tab2" class="table table-striped">
                        <tbody>
                            <tr>
                                 <th>皮下微型条码</th>
                                <th>外祖父</th>
                                <th>头部描述</th>
                                <th>左前肢描述</th>
                                <th>右前肢描述</th>
                                <th>左后肢描述</th>
                                <th>右后肢描述</th>
                                <th>体躯描述</th>
                            </tr>
                            <tr>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="resume-more-baseInfo col-md-2">
                    <router-link :to="{path: '/horse/updateBaseInfo',       
                                         query: { disable: 1,}}"> 更多</router-link>
                    <i class="fa fa-angle-right fa-lg"></i>
                </div>
            </div>

            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">马主信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">饲养员信息</div>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-5">
                    <ul class="resume-ul">
                        <li>陈子卿</li>
                        <li>男</li>
                        <li>高级Java工程师</li>
                        <li>110</li>
                        <li>上海市徐汇区</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/updateMaster',       
                                              query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <ul class="resume-ul">
                        <li>陈子卿</li>
                        <li>男</li>
                        <li>会喂养各种马</li>
                        <li>小马</li>
                        <li>2016年12月</li>
                        <li>陈医生</li>
                        <li>忌辛辣</li>
                        <li>健康一般</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/updateBreeder',       
                                                                query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>

            </div>

            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">病历信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">获奖信息</div>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-5">
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>临诊</li>
                        <li>初诊</li>
                        <li>阿莫西林</li>
                        <li>陈医生</li>
                        <li>忌辛辣</li>
                        <li>健康一般</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>临诊</li>
                        <li>初诊</li>
                        <li>阿莫西林</li>
                        <li>陈医生</li>
                        <li>忌辛辣</li>
                        <li>健康一般</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>临诊</li>
                        <li>初诊</li>
                        <li>阿莫西林</li>
                        <li>陈医生</li>
                        <li>忌辛辣</li>
                        <li>健康一般</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>临诊</li>
                        <li>初诊</li>
                        <li>阿莫西林</li>
                        <li>陈医生</li>
                        <li>忌辛辣</li>
                        <li>健康一般</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/updateDisease',       
                                                                    query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5">
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>上海市赛马</li>
                        <li>金山区</li>
                        <li>一等奖</li>
                        <li>跑出场外</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>上海市赛马</li>
                        <li>金山区</li>
                        <li>一等奖</li>
                        <li>跑出场外</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>上海市赛马</li>
                        <li>金山区</li>
                        <li>一等奖</li>
                        <li>跑出场外</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>上海市赛马</li>
                        <li>金山区</li>
                        <li>一等奖</li>
                        <li>跑出场外</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/updateAwards',       
                                                                           query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">接种疫苗信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">治疗信息</div>
                </div>
            </div>
            <div class="row list-search">
                <div class="col-md-5" >
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>上海市赛马</li>
                        <li>狂犬病</li>
                        <li>陈医生</li>
                        <li>123456</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>上海市赛马</li>
                        <li>狂犬病</li>
                        <li>陈医生</li>
                        <li>123456</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>上海市赛马</li>
                        <li>狂犬病</li>
                        <li>陈医生</li>
                        <li>123456</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>金山区</li>
                        <li>上海市赛马</li>
                        <li>狂犬病</li>
                        <li>陈医生</li>
                        <li>123456</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/updateVaccine',       
                                                                 query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5  col-md-offset-1">
                    <ul class="resume-ul">
                        <li>2017-11-09 12:12:12</li>
                        <li>阑尾炎</li>
                        <li>肚子疼</li>
                        <li>1号</li>
                        <li>1号</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2017-11-09 12:12:12</li>
                        <li>阑尾炎</li>
                        <li>肚子疼</li>
                        <li>1号</li>
                        <li>1号</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2017-11-09 12:12:12</li>
                        <li>阑尾炎</li>
                        <li>肚子疼</li>
                        <li>1号</li>
                        <li>1号</li>
                    </ul>
                    <ul class="resume-ul">
                        <li>2017-11-09 12:12:12</li>
                        <li>阑尾炎</li>
                        <li>肚子疼</li>
                        <li>1号</li>
                        <li>1号</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/horse/updateTreatment',       
                                                                      query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>

            </div>
            <div class="row list-search">
                <div class="col-md-6 resume-title">
                    <div class="title">钉甲信息</div>
                </div>
                <div class="col-md-6 resume-title">
                    <div class="title">挫牙信息</div>
                </div>
            </div>
               <div class="row list-search">
                <div class="col-md-5" >
                    <ul class="resume-ul">
                        <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                    <ul class="resume-ul">
                          <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                    <ul class="resume-ul">
                           <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                    <ul class="resume-ul">
                           <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/hospital/updateNail',       
                                                                 query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>
                <div class="col-md-1"></div>
                <div class="col-md-5  col-md-offset-1">
                    <ul class="resume-ul">
                          <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                   <ul class="resume-ul">
                         <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                    <ul class="resume-ul">
                         <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                    <ul class="resume-ul">
                           <li>2016年11月</li>
                        <li>大马</li>
                        <li>陈医生</li>
                    </ul>
                    <div class="resume-more">
                        <router-link :to="{path: '/hospital/updateTeeth',       
                                                                      query: { disable: 1,}}"> 更多</router-link>
                        <i class="fa fa-angle-right fa-lg"></i>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { Button } from "element-ui";
/* eslint-disable */
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    "el-button": Button
  },
  methods: {
    open() {
      this.$message.success("修改成功");
    }
  }
};
</script>

<style lang="scss" scoped>
.back-on{
float: right;;
}
#tab1 {
  line-height: 20px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

#tab2 {
  line-height: 20px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

.resume-more-baseInfo {
  cursor: pointer;
  text-align: center;
  position: relative;
  bottom: -80px;
  color: #409eff;
}

.img-show {
  width: 100%;
  height: 200px;
}

.resume-bottom {
  border-bottom: 1px solid #ddd;
}

.resume-more {
  cursor: pointer;
  color: #409eff;
  float: right;
}

.resume-ul {
  height: 36px;
  list-style: none;
  font-size: 16px;
  li {
    padding-left: 12px;
    float: left;
  }
}

.resume-title {
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

.pre-next {
  display: inline-block;
  margin-left: 42px;
}

.horse-name {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  width: 250px;
  padding: 10px 0;
}

.resume-detail {
  position: relative;
  top: 10px;
  left: 41%;
  height: 60px;
}

.content-footer {
  position: relative;
  left: 20%;
  top: 20px;
}

.makesure {
  margin-left: 130px;
}
</style>
