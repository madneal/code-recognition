var fs = require('fs');
var tesseract = require('node-tesseract');
var gm = require('gm').subClass({imageMagick:true});
var imgName = 'image/1.jpg';
var imageNameProcessed = 'image/2.jpg';
processImg(imgName,imageNameProcessed)
		.then(recognizer)
		.then(text => {
        console.log(`识别结果:${text}`);
    })
    .catch((err)=> {
        console.error(`识别失败:${err}`);
    });


function processImg(imgName,imageNameProcessed)
{
	return new Promise((resolve,reject) => {
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
			{
				return reject(err);
			}
			fs.writeFile('1.txt',text);
			resolve(text);
		})
	})
}