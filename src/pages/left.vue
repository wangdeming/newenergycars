<template>
    <div class="left bg-white"  id="leftbar">

            <div class="first-level" v-for="(tab,index) in tabs">
                <a href="#" v-bind:class="{ boleft:tab.iscurrent }"  @click="showsec(tab.iscurrent,index)">{{tab.title}}</a>
                <div class="second-level" v-bind:class="{ showsec:tab.iscurrent }" >
                    <a  href="#" v-bind:class="{ active:child.iscurrent }"  v-on:click="showtflag(child.tflag)" v-for="(child,index) in tab.children">{{child.title}}</a>
                </div>
            </div>

    </div>
</template>

<script>
    export default {
        props: {
            tabs: Array,
        },
        data() {
            return {
                cwidth:document.body.clientWidth,
            }
        },
        mounted () {

            this.handresize();
            window.addEventListener('resize', this.handresize)
            window.addEventListener('scroll', this.handleScroll)
        },
        methods:{
            showtflag:function(tflag){
                var tabs=this.tabs;
                tabs.forEach(tab=>{
                    tab.iscurrent=false;
                    tab.children.forEach(c=>{
                        c.iscurrent=false;
                    })
                });
                tabs.forEach(tab=>{
                    tab.children.forEach(c=>{
                        if(tflag==c.tflag){
                            c.iscurrent=true;
                            tab.iscurrent=true;
                        }
                    })
                });

                this.$emit('transferTflag',tflag);
            },
            showsec:function (tabiscurrent,ind) {
                this.tabs.forEach(tab=>{
                    tab.iscurrent=false;
                });
                this.tabs[ind].iscurrent=true;
            },
            handresize:function(){
                this.cwidth=document.body.clientWidth;
                var leftbt=0;
                if(this.cwidth-1200>0){
                    leftbt=(this.cwidth-1200)/2;
                }
				if(document.querySelector('#leftbar') != null){
					document.querySelector('#leftbar').style.left=leftbt+"px";
				}                
            },
            handleScroll () { //改变元素#searchBar的top值
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                var offsetTop = document.querySelector('#leftbar').offsetTop;

                if(scrollTop<100){
                    document.querySelector('#leftbar').style.top = '130px';
                }else{
                    document.querySelector('#leftbar').style.top = '10px';
                }
            },
        },
        destroyed () {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style scoped>
    .left{
        line-height: 50px;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
        width: 220px;
        position: fixed;
        top: 130px;
        left: 0;
        z-index: 2;

    }

    .boleft{
        border-left: 4px solid #38CAC1;
    }
    .first-level{
        padding-left: -30px;
        width: 100%;
    }
    .first-level a{
        display: block;
        font-size: 16px;
        color:  #666666;;
        padding-left: 30px;
    }
    .second-level a{
        color: #999999;
    }
    .second-level{
        padding-left: 30px;
        display: none;
    }
    .showsec{
        display: block;
    }
    a.active{
        background: rgb(242,242,242);
        color: #38CAC1;
        margin-left: -30px;
        padding-left: 60px;
    }
</style>