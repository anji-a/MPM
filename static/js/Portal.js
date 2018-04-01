// Global variable declaration

var gEvent='';
var preEvent='';
var saveOpsEvent='';
var previewHtml='';
var previewEvent='';
//Functions declaration starts Here
//this Function used to debug
function showAlert() {
  alert("hello");
}

/*
//This function calls at drag
function drag(ev) {
    ev.dataTransfer.setData("control",ev.target.getAttribute("data-type"));
    //console.log("In Drag");
}

// this function start at drop
function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var controlType = ev.dataTransfer.getData("control");
    var tragetID=ev.target.id;
    console.log(ev.target+" ---- "+tragetID+"..."+controlType);
    if(controlType=="dButton"){
      addButton(ev);
    }else if (controlType=="dLayout") {
      generateLayout(ev);
    }else if (controlType=="dInput") {
      addInputControl(ev);
    }else if (controlType=="dMenu") {
      addMenuControl(ev,tragetID);
    }else if (controlType=="dLable") {
      addLableControl(ev,tragetID);
    }else if (controlType=="dParagraph") {
      addParagraphControl(ev);
    }else if (controlType=="dEColumn") {
      addEColumnControl(ev);
    }else if (controlType=="dHeader") {
      addHeaderControl(ev);
    }else{
      ev.preventDefault();
    }
}
*/
// this function used to display Header notification
function addHeaderControl(ev){
  $('#Header_popup').fadeIn().css('top',"100px");
  gEvent=ev;
}


// This function is used to dispaly layout notification
function getLayoutFormat(ev){
  $('#popup').fadeIn().css('top',"100px");
  gEvent=ev;
}
//This function will call on lick OK button from layout notification window

$(document).ready(function(){

  $('#ok').click(function(){
    //console.log("OK Funtion");
    $('#popup').fadeOut();
    var layType=$("input:radio[name=optradio]:checked").val();
    generateLayout(layType);
  });

  $('#testbutton').click(function(){
    var catid;

    //catid = $(this).attr("data-catid");
    $.ajax(
    {
        type:"POST",
        url: "/Portal/standardFunc/",
        data:{
                 post_id: 'How are you',
                 fun_name:$(event.target).attr('data-fun'),
                 csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()
        },
        success: function( data )
        {
            //$( '#like'+ catid ).remove();
            //$( '#message' ).text(data);
            console.log(data.hello);
        }
     })
    });
  $('#likebutton').click(function(){
    var catid;
    //catid = $(this).attr("data-catid");
    $.ajax(
    {
        type:"POST",
        url: "/Portal/standardFunc/",
        data:{
                 post_id: 'How are you',
                 fun_name:'startSchedulerUtil',
                 csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()
        },
        success: function( data )
        {
            //$( '#like'+ catid ).remove();
            //$( '#message' ).text(data);
            console.log(data.hello);
        }
     })
    });
  $('#Header_ok').click(function() {
    $('#Header_popup').fadeOut();
    var headerType=$("input:radio[name=optradio]:checked").val();
    generateHeader(headerType);
  });
  /*$(document).on('click','#TopFieldSetID',function(e){
  //$('#TopFieldSetID').click(function(e){
    $(preEvent).css({border:'',display:''});
    //console.log($(e.target));
    if($(e.target).attr('data-layout')=='row_layout-remove' || $(e.target).attr('data-layout')=='col' || $(e.target).attr('data-layout')=='container_layout'){
      $(e.target).css({display:'flow-root',border:'2px solid blue'});
      preEvent=$(e.target);
      OptionsIDHtml='';
      var idGenAcc=idGen($(e.target).parent().prop('id'));
      var idGenAccA=idGen($(e.target).parent().prop('id'));
      addOptionSection($(e.target).parent(),idGenAcc,idGenAccA);
      recursiveEachOps($(e.target).parent(),"AddSec");
      //OptionsIDHtml= OptionsIDHtml +"<p class='alignCenter'><input id='saveSideOptionSettings' type='button' name='' value='Save'/></p>";
      //console.log(OptionsIDHtml);
      //console.log($(this).parent());
      $('#OptionsID').html(OptionsIDHtml);
      //console.log($(e.target).children());
    }else{
      $(e.target).parents().each(function(){
        //console.log($(this));
        if($(this).attr('data-layout')=='row_layout-remove' || $(this).attr('data-layout')=='col' || $(this).attr('data-layout')=='container_layout'){
            $(this).css({display:'flow-root',border:'2px solid blue'});
            preEvent=$(this);
            //console.log($(this).prop('tagName'));
            OptionsIDHtml='';
            var idGenAcc=idGen($(this).parent().prop('id'));
            var idGenAccA=idGen($(this).parent().prop('id'));
            addOptionSection($(this).parent(),idGenAcc,idGenAccA);
            recursiveEachOps($(this).parent(),"AddSec");
            //OptionsIDHtml= OptionsIDHtml +"<p class='alignCenter'><input id='saveSideOptionSettings' type='button' name='' value='Save' /></p>";
            //console.log(OptionsIDHtml);
            //console.log($(this).parent());
            $('#OptionsID').html(OptionsIDHtml);
          return false;
        }
      });
    }


    /*if($(e.target).attr('data-select')){
      //console.log($(e.target).parent());
      //console.log($(e.target).parent().height());
      var position=$(e.target).offset();
      $('#divHighlight').attr("style","display: block; top:"+(position.top-60)+"px; left: "+(position.left-275)+"px; width: "+($(e.target).width()+30) +"px; height: "+($(e.target).height()+12)+"px; border: 3px solid rgb(0, 131, 253); z-index: 20; opacity: 0.35; position: absolute; background-color: transparent; font-size: 1pt;");
      //$('#control').removeClass("in active");
      //$('#options').addClass("in active");
      $('#options').click();
      $('#classID').val($(e.target).attr('class'));
      $('#nameID').val($(e.target).attr('name'));
      $('#valueID').val($(e.target).text());
      $('#styleID').val($(e.target).attr('style'));
    }*/
    //preEvent=e;
    //$(e.target).css("border","1px solid blue");
  //});
var OptionsIDHtml='';


function addOptionSection($currentElement,idGenAcc,idGenAccA) {
  OptionsIDHtml= OptionsIDHtml + "<div id='"+idGenAcc+"' data-linkid='"+$currentElement.attr('id')+"' class='panel panel-default'><div class='panel-heading' ><h4 class='panel-title'><a data-toggle='collapse' href='#"+idGenAccA+"' data-parent='#OptionsID' >"+ $currentElement.attr('data-Odisplay')+"   </a></h4></div><div id='"+idGenAccA+"' class='panel-collapse collapse' data-parent='#"+idGenAcc+"'><div class='card-body'>"
  console.info($currentElement);
  OptionsIDHtml= OptionsIDHtml + "<label for='nameID'> Name <input class='width100' id='nameID' type='text' name='' value='"+ (($currentElement.attr('name')==undefined)?"":$currentElement.attr('name')) + "'></input> </label>";
  OptionsIDHtml= OptionsIDHtml + "<label for='valueID'> Value <input class='width100' id='valueID' type='text' name='' value='"+ ($currentElement.attr('value')==undefined?"":$currentElement.attr('value')) + "'> </input></label>";
  OptionsIDHtml= OptionsIDHtml + "<label for='classID'> Class <input class='width100' id='classID' type='text' name='' value='"+ (($currentElement.attr('class')==undefined)?"":$currentElement.attr('class')) + "'></input> </label>";
  OptionsIDHtml= OptionsIDHtml + "<label for='styleID'> Style <textarea class='width100' id='styleID' type='text' name='' >"+ (($currentElement.attr('style')==undefined)?"":$currentElement.attr('style')) + "</textarea> </label>";
  OptionsIDHtml= OptionsIDHtml + "<label for='textID'> Text Value <textarea class='width100' id='textID' type='text' name='' >"+ (($currentElement.text()==undefined)?"":$currentElement.text()) + "</textarea> </label>";
  OptionsIDHtml= OptionsIDHtml +" </div></div></div>"
}

function recursiveEachOps($element,action){
  //console.log($element);
  $element.children().each(function () {

        var $currentElement = $(this);
        //console.info($currentElement);
        //console.log($currentElement);
        if(action=='AddSec'){
          if($currentElement.attr('data-meta')=='options'){

              var idGenAcc=idGen($(this).prop('id'));
              var idGenAccA=idGen($(this).prop('id'));
              addOptionSection($currentElement,idGenAcc,idGenAccA);

        }
          //console.log(OptionsIDHtml);
        }else if (action=='preview') {
          var divtag=document.createElement("div");
          if($(this).attr('data-generate')=='true'){
              //$(ev.target).before(btnHtml);
              //console.log($(this));
              copyAttributes($(this),$(divtag));

              //previewHtml=previewHtml+$(this).html();
              /*var btn=document.createElement("input");
              var btnHtml="<div class='field div'><input data-select='true' class='field div input' type='Button' name='BUTTON' value='Button'/></div>";
              $(ev.target.childNodes).remove();
              //ev.target.removeChild(ev.target.childNodes[0]);
              ev.target.appendChild(btn);
              btn.outerHTML=btnHtml;*/
              //var btn=document.createElement("input");

              //divtag.append($(this));
              //console.log($(divtag));
          }
        }
        //////////// Show element

        //////////// Show events handlers of current element
        //console.info($currentElement.data('events'));
        //////////// Loop her children
        recursiveEachOps($currentElement,action);
    });
}

function copyAttributes(from, to)
{
  $($(from)[0].attributes).
    each(function(){$(to).attr(this.nodeName, this.nodeValue);});

  return $(to);
};

open = function(verb, url, data, target) {
  var form = document.createElement("form");
  form.action = url;
  form.method = verb;
  form.target = target || "_self";
  if (data) {
    for (var key in data) {
      var input = document.createElement("textarea");
      input.name = key;
      input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
      form.appendChild(input);
    }
  }
  form.style.display = 'none';
  document.body.appendChild(form);
  form.submit();
};
/*
   $(document).on('click','#UIpreview',function(){
  //$('#preview').click(function(event){
    //$('#tempPreview').attr('data-preview',"<P>Hello World</P>");
    //var genHtml=genPreviewHtml();
    //$('#tempPreview').attr('data-preview',genHtml);
    //var myWindow = window.open("UIPreview?id='sample'", "Preview", "width=400,height=400");
    //open('POST', 'fileServer.jsp', {request: {key:"42", cols:[2, 3, 34]}});
    //open('POST', someURL, someArgs, 'newwin');
    //open('POST', someURL, someArgs, '_blank');
    alert("sdfsd");
    open('POST', 'UIPreview', {filename:'samplePreview' },'newwin');
  });
*/
  $('#saveSideOptionSettings').click(function(event){
      //target=$(preEvent).parent().parent();
      //saveOpsEvent=event.target;
      //recursiveEachOps(saveOpsEvent,'save');
      //console.log($('#OptionsID').children());
      $('#OptionsID').children().each(function () {
        //console.log($(this).attr('data-odisplay'));
        var linkhtmlid='#'+$(this).attr('data-linkid');
        //var id=linkhtmlid;
        //console.log(linkhtmlid);
        $('#'+$(this).attr('data-linkid')).attr({'style':$(this).find('#styleID').val(),'name':$(this).find('#nameID').val(),'class':$(this).find('#classID').val(),'value':$(this).find('#valueID').val()});
        //$('#'+$(this).attr('data-linkid')).text($(this).find('#valueID').val());
        if (linkhtmlid.indexOf('lbl') != -1 || linkhtmlid.indexOf('headerIdx') != -1 || linkhtmlid.indexOf('ParagraphIdx')!=-1){
            $('#'+$(this).attr('data-linkid')).text($(this).find('#textID').val());
            //$('#'+$(this).attr('data-linkid')).attr({'style':$(this).find('#styleID').val(),'name':$(this).find('#nameID').val(),'class':$(this).find('#classID').val()});
        }/*else{
            $('#'+$(this).attr('data-linkid')).attr({'style':$(this).find('#styleID').val(),'name':$(this).find('#nameID').val(),'class':$(this).find('#classID').val(),'value':$(this).find('#valueID').val()});
        }*/

      });


      /*target.children().each(function () {
        console.log($(this));
        if($(this).attr('data-meta')=='options'){
          //console.log($(this));
          //console.log(OptionsIDHtml);
        }

      });
      /*alert("Hello");
      console.log(target);
      var value=$('#valueID').val();
      $(target).text(value)
       $(target).attr({'style':$('#styleID').val(),'name':$('#nameID').val(),'class':$('#classID').val(),'value':$('#valueID').val()})*/
  });
  //sample scripts
  $( "#iv" ).click(function() {
    var color = $( this ).css( "background-color" );
    $( "#result" ).html( "That div is <span style='color:" +
      color + ";'>" + color + "</span>." );
  });

});

function idGen(prefix='PD'){

  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return prefix + '_' + Math.random().toString(36).substr(2, 9);

}

// this function is used to generate headerhtml

function generateHeader(headerType) {
  var beginHeaderHtml="<div class='col-md-6' data-meta='options' data-Odisplay='Column Field' id='"+idGen("col")+"' data-generate='true' ><div class='dcol' data-layout='col' data-edit='merge'>";
  var endHeaderHtml="</div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
  var middleHeaderhtml="<"+headerType+" id='"+idGen("headerIdx")+"'data-Odisplay='Header Field' data-meta='options' data-select='true' data-generate='true'>Header "+headerType+"</"+headerType+">";
  placeHtml(gEvent,beginHeaderHtml+middleHeaderhtml+endHeaderHtml);
}
/*
function placeHtml(ev,placehtml) {
  $(ev.target).parents().each(function(){
    if($(this).attr('data-layout')=='row'){
      if(ev.target.getAttribute('data-draggable')=='true' && ev.target.id!='MainDragLayout' ){
        $(ev.target).before(placehtml);
        $(ev.target).remove();
      }
      return false;
    }
  });
}*/
// this function  used to add Paragraph html

function addParagraphControl(ev) {
  var beginPaHtml="<div class='col-md-6' data-meta='options' data-Odisplay='Column Field' id='"+idGen("col")+"' data-generate='true' ><div class='dcol' data-layout='col' data-edit='merge'>";
  var endPaHtml="</div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
  var middlePahtml="<p id='"+idGen("ParagraphIdx")+"'data-Odisplay='Paragraph Field' data-meta='options' data-select='true' data-generate='true'>Paragraph Element </p>";
  placeHtml(ev,beginPaHtml+middlePahtml+endPaHtml);
}

//This function used to add button to the layout
function addButton(ev){
  var btnHtml="<div class='col-md-6' data-meta='options' data-Odisplay='Column Field' id='"+idGen("col")+"' data-generate='true' ><div class='dcol' data-layout='col' data-edit='merge'><input id='"+idGen("btn")+"' data-meta='options' data-Odisplay='Button Field' type='Button' name='BUTTON' value='Button' data-generate='true' /></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
  placeHtml(ev,btnHtml);
  /*$(ev.target).parents().each(function(){

    if($(this).attr('data-layout')=='row'){
        if(ev.target.getAttribute('data-draggable')=='true' && targetid!='MainDragLayout' ){
          var btnHtml="<div class='col-md-6' data-meta='options' data-Odisplay='Column Field' id='"+idGen("col")+"' data-generate='true' ><div class='dcol' data-layout='col' data-edit='merge'><input id='"+idGen("btn")+"' data-meta='options' data-Odisplay='Button Field' type='Button' name='BUTTON' value='Button' data-generate='true' /></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
          $(ev.target).before(btnHtml);
          $(ev.target).remove();
    }
      //console.log($(this));
      return false;
    }

  });

  /*if(ev.target.getAttribute('data-draggable')=='true' && targetid!='MainDragLayout' ){
    var btn=document.createElement("input");
    var btnHtml="<div class='field div'><input data-select='true' class='field div input' type='Button' name='BUTTON' value='Button'/></div>";
    $(ev.target.childNodes).remove();
    //ev.target.removeChild(ev.target.childNodes[0]);
    ev.target.appendChild(btn);
    btn.outerHTML=btnHtml;
    //ev.target.setAttribute('data-draggable','false');
  }*/
}

//This function used to add input control to LayoutType

function addInputControl(ev){
    var lableHtml="<div class='col-md-6' data-meta='options' data-generate='true' data-Odisplay='Column Field' id='"+idGen("col")+"'><div class='dcol' data-layout='col' data-edit='merge'><label for='InputText' id='"+idGen("lbl")+"'data-Odisplay='Label Field' data-meta='options' class='field div lable' data-select='true' data-generate='true'> Input Text </label> <div class='field div' ><input id='"+idGen("txt")+"' data-Odisplay='Text Field' data-meta='options' class='field div input' data-select='true' type='text' id='InputText' name='InputText' data-generate='true'/></div></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
    placeHtml(ev,lableHtml);
    /*
  $(ev.target).parents().each(function(){

    if($(this).attr('data-layout')=='row'){

      if (ev.target.getAttribute('data-draggable')=='true' && targetid!='MainDragLayout') {

        //var lable=document.createElement("lable");
        var lableHtml="<div class='col-md-6' data-meta='options' data-generate='true' data-Odisplay='Column Field' id='"+idGen("col")+"'><div class='dcol' data-layout='col' data-edit='merge'><label for='InputText' id='"+idGen("lbl")+"'data-Odisplay='Label Field' data-meta='options' class='field div lable' data-select='true' data-generate='true'> Input Text </label> <div class='field div' ><input id='"+idGen("txt")+"' data-Odisplay='Text Field' data-meta='options' class='field div input' data-select='true' type='text' id='InputText' name='InputText' data-generate='true'/></div></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";

        $(ev.target).before(lableHtml);
        $(ev.target).remove();
        //ev.target.removeChild(ev.target.childNodes[0]);
        //$(ev.target.childNodes).remove();
        //ev.target.appendChild(lable);
        //lable.outerHTML=lableHtml;
        //ev.target.setAttribute('data-draggable','false');
      }
      return false;
    }

  });*/
}

function addEColumnControl(ev) {
  var emptycolhtml="<div class='col-md-6' data-meta='options' data-generate='true' data-Odisplay='Column Field' id='"+idGen("col")+"'><div class='dcol' data-layout='col' data-edit='merge'><span id='"+idGen("empidx")+"'data-Odisplay='Empty Field' data-meta='options' data-select='true' data-generate='true' style='' class='emptyCell'><div data-edit='remove'>Empty Cell</div></span></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
  placeHtml(ev,emptycolhtml);
}

//This function used to generate layout
function generateLayout(ev){
  //ev=gEvent;
  if($(ev.target).attr('id')=='MainDragLayout'){
        var beginhtml="<fieldset class='fldset' data-layout-type='Layout'  data-edit='merge'><legend class='fldset' data-edit='remove'><span id='lngTitle'>Layout</span></legend><div class='container-fluid' id='"+idGen("layout")+"' data-html='0' data-Odisplay='Row Field' data-generate='true'>"
        var middlehtml="<div data-layout='container_layout' data-edit='merge' id='"+idGen("con")+"'><div class='row' data-layout='row' data-generate='true' data-Odisplay='Row Field' id='"+idGen("row")+"'><div data-layout='row_layout' data-edit='merge'><div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div></div></div></div>"
        var fldset=document.createElement("fieldset");
        ev.target.appendChild(fldset);
        var endhtml="</div></fieldset>"
        fldset.outerHTML=beginhtml+middlehtml+endhtml;
    }else{
      var beginhtml="<div class='col-md-6' data-meta='options' data-Odisplay='Column Field' id='"+idGen("col")+"' data-generate='true'><fieldset class='fldset' data-layout-type='Layout' data-edit='merge'><legend class='fldset' data-edit='remove'><span id='lngTitle'>Layout</span></legend><div class='container-fluid' id='"+idGen("layout")+"' data-html='0' data-generate='true'>"
      var middlehtml="<div data-layout='container_layout' data-edit='merge' id='"+idGen("con")+"'><div class='row' data-layout='row' data-generate='true' data-Odisplay='Row Field' id='"+idGen("row")+"'><div data-layout='row_layout' data-edit='merge'><div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div></div></div></div>"
      //var fldset=document.createElement("fieldset");
      //ev.target.appendChild(fldset);
      var endhtml="</div></fieldset></div>"
      outerHTML=beginhtml+middlehtml+endhtml;
      $(ev.target).before(outerHTML);
      //$(ev.target).remove();

    }


  //var fldset=document.createElement("fieldset");
  /*if(ev.target.id!='MainDragLayout'){
    //ev.target.removeChild(ev.target.childNodes[0]);
    console.log($(ev.target.childNodes));
    $(ev.target.childNodes).remove();
  }*/
  //ev.target.appendChild(fldset);
  //var beginhtml="<fieldset class='fldset' data-layout-type='"+LayoutType+"'><legend class='fldset'><span id='lngTitle'>Layout</span></legend><div class='container layout' data-html='0'>"
  //if(LayoutType=="single"){
    //var middlehtml="<div><div class='row' data-layout='row'><div class='col-md-6 dcol' data-draggable='true'>Drop Here</div></div></div>"
  /*}else if (LayoutType=="double") {
    var middlehtml="<div class='row' data-layout='6'><div class='col-md-6 dcol'><i data-draggable='true'>Drop Here</i></div></div>"
  }else{
    var middlehtml="<div class='row' data-layout='4'><div class='col-md-4 dcol' data-select='true'><i data-draggable='true'>Drop Here</i></div><div class='col-md-4 dcol' data-select='true'><i data-draggable='true'>Drop Here</i></div><div class='col-md-4 dcol' data-select='true'><i data-draggable='true'>Drop Here</i></div></div>"
  }*/
  //var endhtml="</div></div></fieldset>"
  //fldset.outerHTML=beginhtml+middlehtml+endhtml;
}
