<template>
    <div>
        <div class="toptxt">
            <p class="titi text-center">我国新能源汽车产业迈向稳定成长期</p>
            <p class="text-center subtit">
                从2009年开始实施“十城千辆”以来，我国持续、大力的推动新能源汽车行业的发展，大致经历了产业导入期、快速增长期，开始进入稳定增长期
            </p>
            <div class="mycell">
                <div class="myc my1">
                    <p class="myctit ct1">产业导入期<br/>（2009-2013年）</p>
                    <p class="myccon bg1">
                        这一阶段，新能源汽车刚开始在国内发展，产销数据比较低，在“十城千辆”等示范城市的推动下，新能源汽车并没有出现爆发式增长。
                    </p>
                </div>
                <div class="myc my2">
                    <p class="myctit  ct2">快速增长期<br/>（2014-2015年）</p>
                    <p class="myccon  bg2">
                        2014年是我国新能源汽车大规模发展的元年，这次快速发展是由多重因素共同促进的结果。
                    </p>
                </div>
                <div class="myc  my3">
                    <p class="myctit  ct3">稳定增长期<br/>（2016-2020年）</p>
                    <p class="myccon bg3">
                        2016年上半年，财政部、发改委等开始全国范围内对新能源汽车骗补事件进行调查，并开始着手对新能源汽车补贴政策进行调整。骗补事件的推进，以及新能源补贴政策不确定性导致2016年成为了新能源汽车行业调整的一年。
                    </p>
                </div>
            </div>
            <p class="titi text-center mt60">国家补贴政策退坡明显，呈现“低退高补”态势</p>
            <p class="text-center subtit">
                自2016年大量的新能源汽车骗补事件曝光后，导致国家补助政策的趋严和退坡。除了补贴退坡，2018年6月取消新能源汽车外资股比限制。
            </p>
        </div>

        <div class="timeline" id="timeline">

            <div class="titem" v-for="(item, index) in titiems" @click="activeitem(index)"  :class="{titemactive:item.act}">
                <em></em><span class="p1">{{item.year}}</span><span>{{item.season}}&nbsp;</span>
                <div class="timcon" :class="posclass(index,item.act)"   v-html="proContent(item.content)"></div>
            </div>


        </div>
    </div>
</template>
<script>
    import api from '@/api'
    export default {

        data() {
            return {
                titiems:[

                ]
            }
        },
        created() {
            this._domesticPolicylist();
        },
        methods:{
            posclass:function(index,act){
                var titemactive='';
                if(act){
                    titemactive='titemactive';
                }
                if(index<=this.titiems.length/2){
                    return "leftpos "+titemactive;
                }
                return "rightpos "+titemactive;
            },
            activeitem:function (ind) {
                this.titiems.forEach(function (item) {
                    item.act=false;
                });
                this.titiems[ind].act=true;
            },
            proContent:function (content) {
                return ' <span class="trangle"></span>'+content;
            },
            _domesticPolicylist () {

                api.get_domesticPolicylist({
                    nodeNum:12,
                }).then(data => {
                    var items=data.data;
                    items.forEach(function (item) {
                        item.act=false;
                        item.season=item.season?item.season:'';
                    });
                    items[0]['act']=true;
                    this.titiems =items;
                    console.info(this.titiems)
                })
            },
        },

    }
</script>
<style>
    .leftpos .trangle{
        left: 50px;
    }
    .trangle{
        position: absolute;
        width: 0px;
        height: 0px;
        line-height: 0px;/*为了防止ie下出现题型*/
        border-bottom: 10px solid #F5F5F5;
        border-left: 10px solid #fff;
        border-right: 10px solid #fff;
        right: 50px;
        top: -10px;
    }
    .p1{
        margin-top: 15px;
        margin-bottom: 20px;
    }
    .leftpos{
        left:-50px;
    }
    .rightpos{
        right:10px;
    }
    .titem .timcon{
        /*white-space: nowrap;*/
        display: none;
        font-size: 12px;
        line-height:16px;
        padding: 20px;
        position: absolute;
        top: 70px;
        min-width:520px;
        border-radius: 15px;
        line-height: 27px;
        background: #F5F5F5;
        font-size: 14px;
        color: #333333 !important;
    }
    .titemactive span{
        color: #38CAC1 !important;
    }
    .titemactive .timcon{
        display: block;
    }
    .titemactive em{
        background-color:#38CAC1 !important;
    }
    .titem:last-child{
        border:none;
    }
    .titem{
        display: inline-block;
        border-top: 2px solid #cccccc;
        line-height: 0px;
        min-width: 80px;
        margin-left: -5px;
        text-align: left;
        position: relative;
    }
    .titem em{
        display: inline-block;
        width:12px;
        height:12px;
        background-color:#cccccc;
        border-radius:12px;
        margin-top: -15px;
        cursor: pointer;
    }

    .timeline span{
        display: block;
        margin-left: -10px;
        cursor: pointer;
        font-size: 14px;
        color: #999999;
        margin-left: -10px;
    }
    .timeline{
        width: 100%;
        margin: 0 auto;
        min-height: 400px;
        margin-top: 80px;
        margin-left: 30px;
        text-align: center;
    }
    .my1{
        left: 0;
    }
    .my2{
        left: 220px;
    }
    .my3{
        left: 440px;
    }
    .myc{
        width: 220px;
        float: left;
        position: absolute;
        bottom:0px;
    }
    .myctit{
        font-size: 16px;
        text-align: center;
    }
    .myccon{
        font-size: 14px;
        color: #FFFFFF;
        display: block;
        border-radius: 8px 8px 0px 0px;
    }
    .mycell{
        height: 350px;
        position: relative;
    }

    .toptxt{
        width: 660px;
        margin: 0 auto;
        margin-top:45px;
    }
    .titi{
        font-family: PingFang-SC-Medium;
        font-size: 20px;
        color: #333333;
    }
    .subtit{
        font-size: 14px;
        color: #666666;
        text-align: center;
    }
    .ct1{
        color: #00B6CE;
    }
    .ct2{
        color: #009ACB;
    }
    .ct3{
        color: #1F81D9;
    }
    .bg1{
        background: #00B6CE;
        padding: 30px 25px;
    }
    .bg2{
        background: #009ACB;
        padding: 65px 25px;
    }
    .bg3{
        background: #1F81D9;
        padding: 45px 25px;
    }
</style>