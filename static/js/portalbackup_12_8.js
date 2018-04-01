// Global variable declaration

var gEvent='';

//Functions declaration starts Here
//this Function used to debug
function showAlert() {
  alert("hello");
}


//This function calls at drag
function drag(ev) {
    //ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("control",ev.target.id);
    //ev.dataTransfer.setData("isAccessable","true");
    console.log("In Drag");
}

// this function start at drop
function allowDrop(ev) {
    ev.preventDefault();
    //getLayoutFormat(ev);
}

function drop(ev) {
  ev.preventDefault();
    var data = ev.dataTransfer.getData("control");
    //var isAccessable= ev.dataTransfer.getData("isAccessable");
    var isdroppable=ev.target.id;
    console.log(ev.target+" ---- "+isdroppable+"..."+data);
    if(data=="Button" && (isdroppable=="MainDragLayout" || isdroppable=="Div")){
      var buttonElement=document.createElement("button")
      buttonElement.name="button"
      var textnode = document.createTextNode("Button");
      buttonElement.appendChild(textnode)
      ev.target.appendChild(buttonElement);
      ev.preventDefault();
      //ev.dataTransfer.setData("isAccessable","false");
    }
    else if (data=="Layout" && (isdroppable=="MainDragLayout" || isdroppable=="Div")) {
      //console.log("Layout");
      getLayoutFormat(ev);
      /*var fldset=document.createElement("fieldset");
      fldset.setAttribute("class","fldset");
      var lng=document.createElement("legend");
      lng.setAttribute("class","legend");
      var txtNode=document.createTextNode("Layout");
      lng.appendChild(txtNode);
      var divnode=document.createElement("div");
      divnode.setAttribute("id","Div");
      var divtext=document.createTextNode("Drag Fileds");
      divnode.appendChild(divtext);
      //divnode.setAttribute("ondrop","drop(event)");
      //divnode.setAttribute("ondragover","allowDrop(event)");
      fldset.append(lng,divnode);
      ev.target.appendChild(fldset);*/
      ev.preventDefault();
    }
    else{
      ev.preventDefault();
    }
    //ev.dataTransfer.setData("text/html", "<p>Example paragraph</p>");
    /*ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.setData("text/html", "<p>Example paragraph</p>");
    ev.dataTransfer.setData("text/uri-list", "http://developer.mozilla.org");*/
    //alert(document.getElementById(data));
}

//This function starts at drop the component


/*$(document).ready( function() {

    $("#about-btn").click( function(event) {
        alert("You clicked the button using JQuery!");
    });
});*/
//console.log("Portal.js");

// This function is used to dispaly layout notification
function getLayoutFormat(ev){
  //console.log("getLayoutFormat");
  $('#popup').fadeIn().css('top',"100px");
  gEvent=ev;
}
//This function will call on lick OK button from layout notification window

$(document).ready(function(){
  $('#ok').click(function(){
    //console.log("OK Funtion");
    $('#popup').fadeOut();
    var layType=$('#layoutOption').val();
    //console.log($('#layoutOption').val());
    if(layType=="single"){
      singleLayout();
    }else if (layType=="double") {
      doubleLayout();
    }else{
      tripleLayout();
    }
  });
});

function singleLayout(){
  ev=gEvent;
  var fldset=document.createElement("fieldset");
  fldset.setAttribute("class","fldset");
  var lng=document.createElement("legend");
  lng.setAttribute("class","fldset");
  //var txtNode=document.createTextNode("Layout");
  //lng.appendChild(txtNode);
  var divnode=document.createElement("div");
  divnode.setAttribute("id","Div");
  //var divtext=document.createTextNode("Drag Fileds");
  var htmltext="<div id='Div'><h1> Hello World.....<h1></div>";
  var lnghtml="<legend class='fldset'><span id='lngTitle'>Layout</span></legend>";
  //divnode.appendChild(divtext);
  fldset.append(lng,divnode);
  ev.target.appendChild(fldset);
  lng.outerHTML=lnghtml;
  divnode.outerHTML=htmltext;
  //console.log($('#div'));
  //$('#div').html(htmltext);
}

function doubleLayout(){

}

function tripleLayout(){

}
