var fs = require('fs');
var tesseract = require('node-tesseract');
var gm = require('gm').subClass({imageMagick:true});
var http = require('http');

var url = 'http://msict.nbport.com.cn/webapp/jsp/randcode1.jsp';
var imgName = 'image/test.tif';
var imageNameProcessed = 'image/test1.tif';

downloadImg(url,imgName)
	.then(recognizer)
	.then(text => {
		console.log('the result of the detection is '+text);
	})
	.catch((err) => {
		console.err('fail to detect:${err}');
	})

function downloadImg(url,imgName)
{
	return new Promise((resolve,reject) => {
		http.get(url,function(res){
			var img = "";
			res.setEncoding("binary");
			res.on("data",function(chunk){
				img += chunk;
			});

			res.on("end",function(){
				fs.writeFile(imgName,img,"binary",function(err)
				{
					if (err)
						return reject(err);
					resolve(imgName);
				});
			});
		});
	});
}

function processImg(imgName,imageNameProcessed)
{
	return new Promise((resolver,reject) => {
		gm(imgName)
		.colorspace('gray')
		.normalize()
		.threshold('50%')
		.write(imageNameProcessed,function(err)
		{
			if (err)
				return reject(err);
			resolve(imageNameProcessed);
		});
	});
}

function recognizer(imageNameProcessed)
{
	return new Promise((resolve,reject) => {
		options = {psm:7};
		tesseract.process(imageNameProcessed,options,function(err,text)
		{
			if (err)
				return reject(err);
			resolve(text);
		})
	})
}