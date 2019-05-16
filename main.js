var yyy = document.getElementById('xxx'); //获取一个画布赋予yyy
var context = yyy.getContext('2d'); //获取yyy二次元上下文
var lineWidth = 5   //默认线宽为5px；

autoSetCanvasSize(yyy);

listenToUser(yyy);

/*新人做法
var eraserEnabled = false; //默认不启用橡皮擦
eraser.onclick = function() {
  eraserEnabled=!eraserEnabled  //点击一下启用，反之不启用
*/

//老司机做法
var eraserEnabled = false; //默认不启用橡皮擦
pen.onclick = function(){
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height);
}

download.onclick = function(){
  var url = yyy.toDataURL("image/png")
  //console.log(url)
  var a =document.createElement('a')//生成a标签
  document.body.appendChild(a)//把a放到页面里面
  a.href = url //href用于外部自由的引用
  a.download = '我的画儿'//a标签加个download
  a.target = '_blank'//开一个新页面
  a.click()//调用a的click，a被点击一下 
}

black.onclick = function(){
  context.fillstyle = 'black'
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  yellow.classList.remove('active')
}

red.onclick = function(){
  context.fillstyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  green.classList.remove('active')
  yellow.classList.remove('active')
}
green.onclick = function(){
  context.fillstyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
}
yellow.onclick = function(){
  context.fillstyle = 'yellow'
  context.strokeStyle = 'yellow'
  yellow.classList.add('active')
  black.classList.remove('active')
  red.classList.remove('active')
  green.classList.remove('active')
}

thin.onclick = function(){
  lineWidth=5;
}
thick.onclick = function(){
  lineWidth=10;
}

/*********/
function drawLine(x1, y1, x2, y2) { //旧点与新点连线
  context.beginPath();
  context.moveTo(x1, y1); //起点坐标
  context.lineWidth = lineWidth;
  context.lineTo(x2, y2); //终点坐标
  context.stroke();
  context.closePath();
}

////////
function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = function() { //用户调整窗口宽高
    setCanvasSize();
  };

  function setCanvasSize() { //实时获取页面的宽高
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

function listenToUser(canvas) {
  var using = false;
  var lastPoint = { //获取旧点坐标
    x: undefined,
    y: undefined
  };
//特性检测
if(document.body.ontouchstart !== undefined){
  //触屏设备
  canvas.ontouchstart=function(aaa){
    var x = aaa.touches[0].clientX;
    var y = aaa.touches[0].clientY;
    using = true;
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10); //开始擦
    } else {
      lastPoint = {//开始画
        "x": x,
        "y": y
      };
    }
  }
  canvas.ontouchmove=function(aaa){
    var x = aaa.touches[0].clientX;
    var y = aaa.touches[0].clientY;
    if(!using){return;}
    if (eraserEnabled) { //启动橡皮擦
        context.clearRect(x - 5, y - 5, 10, 10); //开始擦
    } else { //未启动橡皮擦，开始画
        var newPoint = { //获取新点坐标
          "x": x,
          "y": y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint; //实时更新
      }
  }
  canvas.ontouchend=function(aaa){
    using = false;
  }
}else{
  //非触屏设备
  canvas.onmousedown = function(aaa) { //按下鼠标
    var x = aaa.clientX;
    var y = aaa.clientY;
    using = true;
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10); //开始擦
    } else {
      lastPoint = {//开始画
        "x": x,
        "y": y
      };
    }
  };
  canvas.onmousemove = function(aaa) { //移动鼠标
    var x = aaa.clientX;
    var y = aaa.clientY;
    if(!using){return;}
    if (eraserEnabled) { //启动橡皮擦
        context.clearRect(x - 5, y - 5, 10, 10); //开始擦
    } else { //未启动橡皮擦，开始画
        var newPoint = { //获取新点坐标
          "x": x,
          "y": y
        };
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint; //实时更新
      }
    };
  canvas.onmouseup = function(aaa){//松开鼠标
    using = false;
  };
}
}
