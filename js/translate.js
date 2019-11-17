var importJquery = document.createElement('script');
importJquery.src = 'http://apps.bdimg.com/libs/jquery/1.9.1/jquery.min.js';
var importTranslate = document.createElement('script');
importTranslate.src = 'js/md5.js';
document.head.appendChild(importJquery);
document.head.appendChild(importTranslate);


const appid = '20191116000357758';
const key = '2mZ8scTfz7MTMqpSKUje';
const salt = (new Date).getTime();
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
const from = 'jp';
const to = 'zh';
function translate(query, handleData){
	var str1 = appid + query + salt + key;
	console.log("str1:"+str1);
	var sign = MD5(str1);
	$.ajax({
		url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
		type: 'get',
		dataType: 'jsonp',
		data: {
			q: query,
			appid: appid,
			salt: salt,
			from: from,
			to: to,
			sign: sign
		},
		success: function (data) {
			console.log("translated: "+ data.trans_result[0].dst);
			handleData(data.trans_result[0].dst); 
		} 
	});
}