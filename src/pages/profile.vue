<template>
    <div>
    <div class="row">
        <div class="my-col-lg-5">
            <img src="../assets/pic2.png" class="img-fluid"/>
        </div>
        <div class="my-col-lg-7">
            <div class="rcon">
                <p>新能源汽车是指采用新型动力系统，完全或主要依靠新型能源驱动的汽车。</p>
                <p>简单来说即采用非传统燃油作为动力源的汽车。
                    新能源汽车的发展旨在通过技术创新，重点在能源消耗、环境污染等方面，改善汽车相关性能。因此，其在排放与能源消耗方面，较传统内燃机汽车具有更大的优势。加快培育发展新能源汽车产业，是有效缓解能源和环境压力、促进可持续发展的内在要求，是促进汽车产业技术进步和优化升级、构建竞争新优势的有效途径。
                </p>
            </div>
        </div>
    </div>
    <div class="row mt60">
        <p class="mytitle">类别及特点</p>
    </div>
    <div class="row">
        <div class="my-col-lg-4">
            <div class="mybox text-center">
                <p><span class="linertit">混合动力汽车</span></p>
                <p>混合动力汽车是指那些采用传统燃料的，同时配以电动机/发动机来改善低速动力输出和燃油消耗的车型。按照燃料种类的不同，主要又可分为汽油混合动力和柴油混合动力两种。</p>
            </div>
        </div>
        <div class="my-col-lg-4">
            <div class="mybox text-center">
                <p><span class="linertit">纯电动汽车</span></p>
                <p>纯电动汽车，顾名思义就是由车载可充电蓄电池或其他能量储存装置提供电能、由电机驱动的汽车。纯电动汽车完全采用可充电式电池驱动，关键部件在于电动发电机与蓄电池，而纯电动汽车的应用受限的难点在于电力储存技术。</p>
            </div>
        </div>
        <div class="my-col-lg-4">
            <div class="mybox text-center">
                <p><span class="linertit">燃料电池汽车</span></p>
                <p>燃料电池汽车是指以氢气、甲醇等为燃料，通过化学反应产生电流，依靠电机驱动的汽车。</p>
            </div>
        </div>
    </div>
    <div class="row mt60">
        <p class="mytitle">新能源汽车对比</p>
    </div>
    <div class="row">
                            <table class="table ">
                                <thead>
                                <tr>
                                    <td>分类</td>
                                    <td>特点</td>
                                    <td>优点</td>
                                    <td>缺点</td>
                                    <td>发展现状</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>纯电动汽车</td>
                                    <td>完全可充电电池提供动力源</td>
                                    <td><ol><li>使用成本低</li><li>技术成熟</li><li>启动和加速性能好</li><li>安静程度也好很多</li></ol></td>
                                    <td><ol><li>续航里程普遍不高</li><li>充电时间较长</li><li>充电设施建设不完善</li><li>蓄电池价格高，寿命短</li></ol></td>
                                    <td>目前在大型客车和小型乘用车方面有应用，代表了新能源汽车未来的主流发展方向。</td>
                                </tr>
                                <tr>
                                    <td>混合动力汽车</td>
                                    <td>同时装备两种动力来源-热动力源（由传统的汽油机或柴油机产生）与点动力源（电池与电动机）</td>
                                    <td><ol><li>省油</li><li>降低排放</li><li>增强动力</li><li>减低噪音</li></ol></td>
                                    <td><ol><li>系统结构相对复杂</li><li>长距离行驶省油效果不明显</li></ol></td>
                                    <td>具备商业化条件，是当前国内外发展的主流新能源车型。</td>
                                </tr>
                                <tr>
                                    <td>燃料电动汽车</td>
                                    <td>以氢气、甲醇等为燃料，通过化学反应产生电能作为主要动力源驱动</td>
                                    <td><ol><li>污染少，零排放或近似零排放</li><li>提高燃油经济性</li><li>提高发动机燃烧效率</li><li>运行平稳，无噪声</li></ol></td>
                                    <td><ol><li>氢气的产量和存储难度大</li><li>成本较高，建设加氢站的成本远高于加油站和充电站</li><li>高压存储的氢气，安全性不能保证。</li></ol></td>
                                    <td>技术不成熟，成本高，是未来新能源汽车技术的代表</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return{

            }
        },
    }
</script>

<style>
    .my-col-lg-5{
        width:41.66%;
    }
    .my-col-lg-7{
        width:58.34%;
    }
    .my-col-lg-4{
        width: 33.33%;
    }
    .my-col-lg-5,.my-col-lg-4,.my-col-lg-7{
        padding-right: 15px;
        padding-left: 15px;
    }
    .table ol{
        margin: 0;
        padding: .75rem;
    }
    .mt60{margin-top: 60px;}

    .rcon{
        padding-left:7%;
        padding-top: 30px;
        text-indent:25px
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