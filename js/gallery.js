Gallery = (function() {
  
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
  if ((is_chrome)&&(is_safari)) { is_safari = false; }
  if ((is_chrome)&&(is_opera)) { is_chrome = false; }
  
  function createCanvas(data) {
    var canvasImg = new Image();
    canvasImg.id = data.id;
    canvasImg.src = data.src;
    canvasImg.userId = data.userId;
    canvasImg.onclick = function() { socket.emit("request user data", {userId: canvasImg.userId}) };
    if ($(".gbcc-gallery").length === 0) { 
      $(".netlogo-gallery-tab-content").append("<div class='gbcc-gallery'></div>"); 
    }
    $(".gbcc-gallery").append(canvasImg);
  }
  
  function updateCanvas(data) {
    $(data.id).attr("src", data.src);
  }
  
  function broadcastToGallery(key, value) {
    var args = [ key, value ]
    var miniCanvasId, miniCanvas, miniCtx, message;
    var canvasLength, canvasWidth, imageQuality;
    var svgData, img;
    var plotWidth, plotHeight, ratio, max, width, length;
    var plotName, matchingPlots;
    for (var i=0; i<args.length; i++) {
      if (is_safari) {  
        miniCanvasId = "miniSafariCanvas";
        canvasLength = 200; canvasWidth = 200;
        imageQuality = 0.5;
      } else {
        miniCanvasId = "miniCanvas";
        canvasLength = 500; canvasWidth = 500;
        imageQuality = 0.75;
      }
      if ((typeof args[i] === "string") && (args[i] === "view")) {
        miniCanvas = document.getElementById(miniCanvasId);
        miniCtx = miniCanvas.getContext('2d');            
        miniCtx.drawImage(document.getElementsByClassName("netlogo-canvas")[0], 0, 0, canvasLength, canvasWidth);
        message = document.getElementById(miniCanvasId).toDataURL("image/jpeg", imageQuality); 
        socket.emit("send reporter", {
          hubnetMessageSource: "all-users", 
          hubnetMessageTag: "canvas", 
          hubnetMessage: message
        }); 
      }
      if ((typeof args[i] === "object") && (args[i][0] === "plot")) {
        if (args[i][1] && typeof args[i][1] === "string") {
          plotName = args[i][1];
          matchingPlots =  $("svg").filter(function() {
            if ($(".highcharts-title tspan", this).text()){ return this; } 
          });
          plotWidth = $(matchingPlots[0]).width();
          plotHeight = $(matchingPlots[0]).height();
          ratio = plotWidth / plotHeight;
          max = canvasWidth;
          width = max;
          height = max;
          (plotWidth > plotHeight) ? height = width / ratio : width = height * ratio;
          if (matchingPlots.length > 0) {
            miniCanvas = document.getElementById(miniCanvasId);
            miniCtx = miniCanvas.getContext('2d');      
            img = document.createElement("img");
            svgData = new XMLSerializer().serializeToString(matchingPlots[0]);
            img.setAttribute("src","data:image/svg+xml;base64,"+btoa(unescape(encodeURIComponent(svgData))));
            img.onload = function () {
              miniCtx.fillStyle="#FFFFFF";
              miniCtx.fillRect(0,0,max,max);
              miniCtx.fillStyle="#000000";
              miniCtx.fillRect(0,0,width,height + 2);
              miniCtx.drawImage(img, 1, 1, width - 2, height);
              message = document.getElementById(miniCanvasId).toDataURL("image/jpeg", imageQuality);  
              socket.emit("send reporter", {
                hubnetMessageSource: "all-users", 
                hubnetMessageTag: "canvas", 
                hubnetMessage: message
              });
            }
          }                      
        }
      }
    }

  }
    
  return {
    createCanvas: createCanvas,
    updateCanvas: updateCanvas,
    broadcastToGallery: broadcastToGallery
  };

})();