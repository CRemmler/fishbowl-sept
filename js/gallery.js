Gallery = (function() {
  
  function createCanvas(data) {
    var canvasImg = new Image();
    canvasImg.id = data.id;
    canvasImg.src = data.src;
    canvasImg.userId = data.userId;
    canvasImg.onclick = data.onclick;
    if ($(".gbcc-gallery").length === 0) { 
      $(".netlogo-gallery-tab-content").append("<div class='gbcc-gallery'></div>"); 
    }
    $(".gbcc-gallery").append(canvasImg);
  }
  
  function updateCanvas(data) {
    $(data.id).attr("src", data.src);
  }
    
    
  return {
    createCanvas: createCanvas,
    updateCanvas: updateCanvas
  };

})();