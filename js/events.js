jQuery(document).ready(function() {
  
  // highlight all output areas on click
  $(".netlogo-output").click(function() { 
    var sel, range;
    var el = $(this)[0];
    if (window.getSelection && document.createRange) { //Browser compatibility
      sel = window.getSelection();
      if(sel.toString() == ''){ //no text selection
         window.setTimeout(function(){
            range = document.createRange(); //range object
            range.selectNodeContents(el); //sets Range
            sel.removeAllRanges(); //remove all ranges from selection
            sel.addRange(range);//add Range to a Selection.
        },1);
      }
    }else if (document.selection) { //older ie
        sel = document.selection.createRange();
        if(sel.text == ''){ //no text selection
            range = document.body.createTextRange();//Creates TextRange object
            range.moveToElementText(el);//sets Range
            range.select(); //make selection.
        }
    }
  });
  
  // add show/hide client view
  //$(".netlogo-view-container").append("<span class='teacherOnly hubnetOnly' style='float:right'><input id='shareClientView' checked type='checkbox'>Share</span>");
  //$(".netlogo-view-container").append("<span class='teacherOnly' style='float:right'><input id='shareGallery' checked type='checkbox'>Enable Gallery<input id='shareClientView' checked type='checkbox'>Enable view</span>");
  //$(".netlogo-view-container").append("<span class='studentOnly' style='float:right'><input id='myView' checked type='radio'>My View<input id='ourView' checked type='radio'>Our View</span>");
  
  $(".netlogo-view-container").css("width", $(".netlogo-view-container canvas").css("width"));
  $("#shareClientView").click(function() {
    ($(this).prop("checked")) ? socket.emit('display view', {'display':true}) : socket.emit('display view', {'display':false});
  });
  
  // add GbCC link
  $(".netlogo-powered-by").append("<span style='font-size: 16px;'> & <a href='http://remmler.org/gbcc'>GbCC</a></span>");
  
  // add export
  $(".netlogo-export-wrapper").css("display","none");
  /*
  
  var exportWrapperString = "<div class='netlogo-export-wrapper'><span style='margin-right: 4px;'>"+
    "Export:</span><button class='netlogo-ugly-button' on-click='exportnlogo'>NetLogo</button>"+
    "<form action='exportGbccWorld' method='post' enctype='multipart/form-data' style='display: inline-block'>"+
    "<input type='text' name='roomname' class='roomNameInput' style='display:none'>"+
    "<button class='netlogo-ugly-button' type='submit'>World</button> </form></div>"; 
  $(".netlogo-export-wrapper").html(exportWrapperString);
  */
  // add gallery tab
  //var galleryTabString = "<div class='netlogo-gallery-tab'>"+
  //"<span class='netlogo-tab-text'>Gallery</span></div>"+
  //"<div class='netlogo-gallery-tab-content'></div>"
  //$(".netlogo-tab-area label:nth-child(2)").after(galleryTabString);
  
});