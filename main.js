var yyy = document.getElementById('xxx'); //获取一个画布赋予yyy
var context = yyy.getContext('2d'); //获取yyy二次元上下文

autoSetCanvasSize(yyy);

listenToMouse(yyy);

/*新人做法
var eraserEnabled = false; //默认不启用橡皮擦
eraser.onclick = function() {
  eraserEnabled=!eraserEnabled  //点击一下启用，反之不启用
*/

//老司机做法
var eraserEnabled = false; //默认不启用橡皮擦
eraser.onclick = function() {
  eraserEnabled=true;     //橡皮擦启用
  actions.className='actions x';
};
brush.onclick=function(){
  eraserEnabled=false;     //画笔启用
  actions.className='actions';
};

/*********/
function drawLine(x1, y1, x2, y2) { //旧点与新点连线
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x1, y1); //起点坐标
  context.lineWidth = 5;
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

function listenToMouse(canvas) {
  var using = false;
  var lastPoint = { //获取旧点坐标
    x: undefined,
    y: undefined
  };

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
  canvas.onmouseup = function(aaa) { //松开鼠标
    using = false;
  };
}