var http = require("http");
var path = require("path");
var fs = require("fs");
var file = "http://www.dbmeinv.com//";
//var file = "https://www.taobao.com/";
http.get(file,function(res){
    var data ="";

    res.on("data",function(chunk){
        //获得网站所有数据
        data += chunk;

    })
    res.on("end",function(){
        //找到只是src的数据
        var imgs = [];
        var p1 = /src="(http:\/\/[a-zA-Z0-9/%_.]+)"\s*\/>/g;
       // var reg = /src="(http:\/\/[a-zA-Z0-9/.]+)"\s*\/>/g;
        var temp;
        while( temp = p1.exec(data) ) {
            imgs.push(temp[1]);
        }
        imgs.forEach(function(item){
            console.log(item);
            downpic(item);
        })
    });
})

function downpic(file){
    var filename = path.basename(file);
    var p = "./images/"+filename;
    http.get(file,function(res){
        var data = "";
        res.setEncoding("binary");
        res.on("data",function(chunk){
            data += chunk;
        });
        res.on("end",function(){
            fs.writeFileSync(p,data,"binary");
        });
    })
}