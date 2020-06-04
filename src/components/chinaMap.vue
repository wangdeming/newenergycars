<template>
	<!--<chart ref="myChart" class="mapDiv" :options="mapOption" :auto-resize="true" @click="onClick" @mouseover="onMousover" @mouseout="onMouseout"></chart>-->
	<div class="chinamap">
       <chart ref="myChart" class="mapDiv" :options="mapOption" :auto-resize="true"></chart>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mapOption: {
					title: {
						text: '',
						left: 'center',
						top: 54,
						textStyle: {
							color: '#1a1b4e',
							fontStyle: 'normal',
							fontWeight: 'bold',
							fontSize: 24,
						}
					},
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove',
						backgroundColor: 'rgba(0,0,0,.8)',
						borderColor: '#3574c8',
						borderWidth: '2',
						extraCssText: 'padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
						show: true,
						formatter: function(params) {
							var res;
							if(params.value > 0) {
								res = params.data.value2 + '<br/>';
								res += params.data.value3;
							} else {
								res = '';
							}
							return res;
						}

					},
					visualMap: {
						min: 0,
						max: 7,
						left: 'left',
						top: 'bottom',
						text: ['高', '低'],
						calculable: true,
						show: false,
						inRange: {
							color: ['rgba(147, 235, 248, .2)']
						}
						//北京：1      四川：2    河南：3     内蒙：4     安徽：5    新疆：6     福建：7 
					},
					geo: {
						map: 'china',
						zoom: 1.2,
						label: {
							normal: {
								show: true,
								textStyle: {
									color: '#fff'
								}
							},
							emphasis: {
								textStyle: {
									color: '#fff'
								}
							}
						},
						itemStyle: {
							normal: {
								borderColor: 'rgba(147, 235, 248, 1)',
								borderWidth: 1,
								areaColor: {
									type: 'radial',
									x: 0.5,
									y: 0.5,
									r: 0.8,
									colorStops: [{
										offset: 0,
										color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								},
								shadowColor: 'rgba(128, 217, 248, 1)',
								// shadowColor: 'rgba(255, 255, 255, 1)',
								shadowOffsetX: -2,
								shadowOffsetY: 2,
								shadowBlur: 10
							},
							emphasis: {
								areaColor: '#389BB7',
								borderWidth: 0
							}
						},
					},
					series: [{
						type: 'map',
						mapType: 'china',
						geoIndex: 0,
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						data: [{
							name: '北京',
							value: 1,
							value2: '京津冀地区',
							value3: '包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。'
						}, {
							name: '天津',
							value: 1,
							value2: '京津冀地区',
							value3: '包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。'
						}, {
							name: '河北',
							value: 1,
							value2: '京津冀地区',
							value3: '包括北京、天津、河北（环京津部分）。<br />选择自然条件较为优越、年均降水量在 600 毫米左右的适宜区域，<br />发展杨树、刺槐、榆树、柳树等乡土树种用材林和落叶松、<br />樟子松、油松、侧柏等珍稀树种和大径级用材林。'
						}, {
							name: '重庆',
							value: 2,
							value2: '西南适宜地区',
							value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
						}, {
							name: '云南',
							value: 2,
							value2: '西南适宜地区',
							value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
						}, {
							name: '贵州',
							value: 2,
							value2: '西南适宜地区',
							value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
						}, {
							name: '四川',
							value: 2,
							value2: '西南适宜地区',
							value3: '自然条件较为优越，年均降水量在 800 毫米以上。<br />在适宜地区培育桢楠、红椿、降香黄檀、铁刀木<br />等珍稀树种和大径级用材林。'
						}, {
							name: '河南',
							value: 3,
							value2: '黄淮海地区',
							value3: '自然条件较为优越，年均降水量多在 600-800 毫米<br />之间。主要培育适宜该区域生长的毛白杨、欧美杨<br />等浆纸和人造板工业原料林，发展栎类、榉树等珍稀树种和<br />大径级用材林。'
						}, {
							name: '山东',
							value: 3,
							value2: '黄淮海地区',
							value3: '自然条件较为优越，年均降水量多在 600-800 毫米<br />之间。主要培育适宜该区域生长的毛白杨、欧美杨<br />等浆纸和人造板工业原料林，发展栎类、榉树等珍稀树种和<br />大径级用材林。'
						}, {
							name: '辽宁',
							value: 4,
							value2: '东北地区',
							value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '黑龙江',
							value: 4,
							value2: '东北地区',
							value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '内蒙古',
							value: 4,
							value2: '东北地区',
							value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '吉林',
							value: 4,
							value2: '东北地区',
							value3: '选择自然条件较为优越、年均降水量在 400-600 毫米<br />的适宜区域，发展杨树、樟子松、落叶松等中短周期用材林<br />和红松、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '湖南',
							value: 5,
							value2: '长江中下游地区',
							value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
						}, {
							name: '安徽',
							value: 5,
							value2: '长江中下游地区',
							value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
						}, {
							name: '浙江',
							value: 5,
							value2: '长江中下游地区',
							value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
						}, {
							name: '江西',
							value: 5,
							value2: '长江中下游地区',
							value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
						}, {
							name: '湖北',
							value: 5,
							value2: '长江中下游地区',
							value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
						}, {
							name: '江苏',
							value: 5,
							value2: '长江中下游地区',
							value3: '自然条件优越，年均降水量在 1000 毫米以上。<br />主要培育欧美杨和松类、杉类、竹类为主的中短周期用材林，<br />适地适树发展周期较长的楠木、红豆杉、红椿、樟树等<br />珍稀树种和大径级用材林。'
						}, {
							name: '新疆',
							value: 6,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '甘肃',
							value: 6,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '山西',
							value: 6,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '青海',
							value: 6,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '陕西',
							value: 6,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '宁夏',
							value: 6,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '广西',
							value: 7,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '福建',
							value: 7,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '广东',
							value: 7,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '海南',
							value: 7,
							value2: '西北地区',
							value3: '选择自然条件较为优越、年均降水量在 200-600毫米<br />或具有灌溉基础的绿洲适宜区域，发展杨树、榆树、落叶松、夏橡等<br />中短周期用材林，云杉、水曲柳等珍稀树种和大径级用材林。'
						}, {
							name: '上海',
							value: 0
						}, {
							name: '西藏',
							value: 0
						}, {
							name: '台湾',
							value: 0
						}, {
							name: '香港',
							value: 0
						}, {
							name: '澳门',
							value: 0
						}, {
							name: '南海诸岛',
							value: 0
						}]
					}]
				}
			}
		},
		 created () {
		  	      var myChart = this.$refs.myChart;
		  			  var ag=['江西','广东','西藏','湖南','河南','河北','北京','天津','陕西','甘肃','上海','重庆','青海','宁夏','新疆','黑龙江','吉林','辽宁','内蒙古'];
					var i=0;										
					setInterval(function() {
					                  // console.log(opt.data);
					            myChart.dispatchAction({
					                type: 'highlight',
					                name:ag[i]
					            });
					            setTimeout(function() {
					             myChart.dispatchAction({
					                type: 'downplay',
					                name:ag[i]
					            });
					             i++;
					             if(i>18){
					                 i=0
					             }
					            }, 1000);
					           
					        }, 2000); 
		  },
	}
</script>

<style scoped>
  .china-map .echarts{
		width: 100%;
		height: 520px;
		margin-left: -2%;
		margin-top: 2%;
	}
</style>