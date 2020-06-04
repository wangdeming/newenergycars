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
    import battery from './battery.vue'
    import elecmac from './elecmac.vue'
    import chafac from './chafac.vue'

    export default {
        components: {
            Footer,
            Header,
            Left,
            battery,
            chafac,
            elecmac,
        },
        data() {
			var tempTflag = typeof(this.$route.query.tflag)=="undefined"?'battery':this.$route.query.tflag;
            return {
                currentPageIndex:4,
                tflag: tempTflag,
                tabs: [{
                    title: "重要零部件",
                    iscurrent:tempTflag=="battery"||tempTflag=="elecmac"?true:false,
                    children: [{title: "电池运行情况", tflag: "battery",iscurrent:tempTflag=="battery"?true:false}, {title: "电机电控运行情况", tflag: "elecmac",iscurrent:tempTflag=="elecmac"?true:false}]
                }, {
                    title: "其他",
                    iscurrent:tempTflag=="chafac"?true:false,
                    children: [{title: "充电设施运行情况", tflag: "chafac",iscurrent:tempTflag=="chafac"?true:false}]
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
		margin-left: 15px;
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
    .chainbox{
        background: #F5F5F5;
        border-radius: 3px;
        padding: 20px 30px;
        font-size: 16px;
        color: #151515;
        letter-spacing: 0;
        line-height: 22px;
    }
    .titleft{
        position: absolute;
        width: 0px;
        height: 0px;
        line-height: 0px;
        border-bottom: 15px solid #A1C7C5;
        border-left: 12px solid #fff;
        top: 0px;
        left: -12px;
    }
    .titright{
        position: absolute;
        width: 0px;
        height: 0px;
        line-height: 0px;
        border-bottom: 15px solid #A1C7C5;
        border-right: 12px solid #fff;
        top: 0px;
        right: -12px;
    }
    .tit{
        position: relative;
        font-size: 20px;
        color: #FFFFFF;
        font-weight: 600;
        background: #38CAC1;
        border-radius: 0px 0px 3px 3px;
        width: 120px;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
        margin-top: -35px;
    }
    .timeright{
        font-size: 14px;
        color: #999999;
    }
    .chainbox b{
        line-height: 40px;
    }
</style>