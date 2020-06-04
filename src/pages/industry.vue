<template>
    <div>
        <Header  v-bind:currentPageIndex="currentPageIndex"></Header>
        <div class="mycontainer mt60 text-left clearfix">
                <Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
                <div class="bg-white right">
                    <component :is="tflag"></component>
                </div>

        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from './footer.vue'
    import Header from './header.vue'
    import Left from './left.vue'
    import internal from './internal.vue'
    import outside from './outside.vue'
    import csummary from './csummary.vue'
    import profile from './profile.vue'

    export default {
        components: {
            Footer,
            Header,
            Left,
            internal,
            profile,
            outside,
            csummary,
        },
        data() {
            return {
				currentPageIndex:1,
                tflag:'profile',
                tabs: [{
                    title: "概况",
                    iscurrent:true,
                    children: [{title: "新能源汽车简介", tflag: "profile",iscurrent:true}, {title: "产业链概述", tflag: "csummary",iscurrent:false}]
                }, {
                    title: "发展情况",
                    iscurrent:false,
                    children: [{title: "国内", tflag: "internal",iscurrent:false}, {title: "国外", tflag: "outside",iscurrent:false}]
                }],
            }
        },

        methods:{
            getTflag(tflag){

                this.tflag=tflag;
            }
        }

    }
</script>

<style>

    .mycontainer {
         width: 1200px;
        margin: 0 auto;
     }

    body{background: rgb(242,242,242);font-family: PingFangSC-Regular;}
    a:hover{text-decoration: none;}
    .mt60{margin-top: 60px;}

    .right{
        width: 960px;
        float: right;
        padding: 30px 50px;
        font-size: 16px;
        color: #333333;
        margin-bottom: 50px;
        margin-left: 20px;
    }
    .rcon{
        padding-left:7%;
        padding-top: 30px;
        text-indent:25px
    }
    .con{
        text-indent:25px;
        margin-top: 20px
    }
    .mytitle{
        font-size: 20px;
        color: #333333;
        border-bottom: 8px solid #DBF6F4;
        display: block;
        line-height:16px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .linertit{
        background: -webkit-linear-gradient(left, #00E292 , #2BA0B8); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #00E292 , #2BA0B8); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right,  #00E292 , #2BA0B8); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right,  #00E292 , #2BA0B8); /* 标准的语法 */
        -webkit-background-clip: text;
        color: transparent;
        font-size: 20px;
        font-weight: 800;
    }
    .mybox{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.10);
        border-radius: 8px;
        padding: 10% 8%;
        color: #999999;
        font-size: 14px;
        height: 260px;
    }
    .table{
        border-left: 1px solid #dee2e6;
        border-right: 1px solid #dee2e6;
        border-bottom: 1px solid #dee2e6;
        font-size: 14px;
    }
    .table thead{
        background: #F5F5F5;
        color: #666666;
        font-size: 16px;
    }
    .table thead td{
        width: 20%;
    }
</style>