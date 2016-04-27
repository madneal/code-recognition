var rec = require('./rec.js');
var url = 'http://msict.nbport.com.cn/webapp/jsp/randcode1.jsp';
var imgName = 'image/test.tif';
var imageNameProcessed = 'image/test1.tif';

var text;
rec.downloadImg(url,imgName,text, a);
//console.log('the final result is '+text);
console.log(a());
function a () {
	var test = text;
	console.log('the final result is '+test);
	return test;
}