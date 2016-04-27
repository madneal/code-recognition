var fs = require('fs');
var tesseract = require('node-tesseract');
var gm = require('gm').subClass({imageMagick:true});
var http = require('http');

var url = 'http://msict.nbport.com.cn/webapp/jsp/randcode1.jsp';
var imgName = 'image/test.tif';
var imageNameProcessed = 'image/test1.tif';
var text2;
var result1;
result1 = downloadImg(url,imgName,result);
console.log('the final result is'+result1);


var result = function downloadImg(url,filename)
{
	http.get(url,function(res){
		var img = "";
		res.setEncoding("binary");
		res.on("data",function(chunk){
			img += chunk;
		});

		res.on("end",function(){
			fs.writeFile(filename,img,"binary",function(err){
				if (err)
				{
					console.log(err);
				}
				else
				{
					return;
				}
			});
		});
		processImg(filename,imageNameProcessed);	
	});

}

exports.downloadImg = downloadImg;

function processImg(imgName,imgNameProcessed)
{
				gm(imgName)
			.colorspace('gray')
			.normalize()
			.threshold('50%')
			.write(imageNameProcessed,function(err){
				if (err)
				{
					console.log(err);
				}
				else
				{
					return imageNameProcessed;
				}
			});
			recognizer(imageNameProcessed);
}

function recognizer(img)
{
	options = {psm:7};
	tesseract.process(img,options,function(err,text){
		if (err)
		{
			console.log(err);
		}
		else
		{
			return text;
		}
	});
}

