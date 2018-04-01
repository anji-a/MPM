// Global fields

var preEvent='';

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
      addButtonControl(ev);
    }else if (controlType=="dLayout") {
      generateLayout(ev);
    }else if (controlType=="dInput") {
      addInputControl(ev);
    }else if (controlType=="dMenu") {
      addMenuControl(ev,tragetID);
    }else if (controlType=="dLable") {
      addLableControl(ev);
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


// Used this function to place the HTML

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
}

//This function used to add empty column
function addEColumnControl(ev){
    var html="<div id="+idGen('col')+" class='col-md-6' data-Controlset='{"+'"controlType"'+":"+'"emptycontol"'+"}' data-select='col' data-edit='regenerate'><div class='dcol'><span class='emptyCell'><div data-edit='remove'>Empty Cell</div></span></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
    placeHtml(ev,html);
}


//This function used to generate layout
function generateLayout(ev){
  //ev=gEvent;
  if($(ev.target).attr('id')=='MainDragLayout'){
        var beginhtml="<fieldset class='fldset' data-layout-type='Layout'  data-edit='merge'><legend class='fldset' data-edit='remove'><span id='lngTitle'>Layout</span></legend><div class='container-fluid' id='"+idGen("layout")+"' data-select='layout' data-Controlset='{"+'"controlType"'+":"+'"layout"'+","+'"layout_style"'+":"+'""'+","+'"layout_class"'+":"+'"container-fluid"'+"}' data-edit='regenerate'>";
        var middlehtml="<div class='dlayout' data-edit='merge'><div class='row' data-layout='row' id='"+idGen("row")+"'><div data-edit='merge'><div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div></div></div></div>";
        var fldset=document.createElement("fieldset");
        ev.target.appendChild(fldset);
        var endhtml="</div></fieldset>";
        fldset.outerHTML=beginhtml+middlehtml+endhtml;
    }else{
      var beginhtml="<div class='col-md-6' id='"+idGen("col")+"'><fieldset class='fldset' data-layout-type='Layout' data-edit='merge'><legend class='fldset' data-edit='remove'><span id='lngTitle'>Layout</span></legend><div data-select='layout' data-Controlset='{"+'"controlType"'+":"+'"layout"'+","+'"layout_style"'+":"+'""'+","+'"layout_class"'+":"+'"container-fluid"'+"}' class='container-fluid' id='"+idGen("layout")+"' data-edit='regenerate'>";
      var middlehtml="<div class='dlayout' data-edit='merge'><div class='row' data-layout='row' id='"+idGen("row")+"'><div data-edit='merge'><div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div></div></div></div>";
      //var fldset=document.createElement("fieldset");
      //ev.target.appendChild(fldset);
      var endhtml="</div></fieldset></div>";
      outerHTML=beginhtml+middlehtml+endhtml;
      $(ev.target).before(outerHTML);
      //$(ev.target).remove();

    }
}
//Used to add label control to target
function addLableControl(ev){
        html="<div id="+idGen('col')+" class='col-md-6' data-Controlset='{"+'"controlType"'+":"+'"label"'+"}' data-select='col' data-edit='regenerate'><div class='dcol' ><label> Text Field </label> </div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
    placeHtml(ev,html);
}

//Used to add Button control to target
function addButtonControl(ev){
    html="<div id="+idGen('col')+" class='col-md-6' data-Controlset='{"+'"controlType"'+":"+'"button"'+"}' data-select='col' data-edit='regenerate'><div class='dcol' ><input type='button' value='Button'></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
    placeHtml(ev,html);
}

//Used to add input control
function addInputControl(ev){
    html="<div id="+idGen('col')+" class='col-md-6' data-Controlset='{"+'"controlType"'+":"+'"input"'+"}' data-select='col' data-edit='regenerate'><div class='dcol' ><label for='InputText'> Input Text </label> <input name='InputText' ></div></div> <div class='col-md-6 dcol' data-draggable='true' data-edit='remove'>Drop Here</div>";
    placeHtml(ev,html);
}
//Control the Fields

$(document).on('click','#TopFieldSetID',function(e){
    if($(preEvent).attr('data-select')=='layout'){
        $(preEvent).find('.dlayout').css({border:'',display:''});
    }else{
        $(preEvent).find('.dcol').css({border:'',display:''});
    }
    var exitloop = false;
    console.log($(e.target))
    $(e.target).parents().each(function(){
        if($(this).attr('data-select')=='layout'){
            exitloop = true;
            preEvent=$(this);
            $(this).find('.dlayout').css({display:'flow-root',border:'2px solid blue'});
            var controlData = JSON.parse($(this).attr('data-Controlset'));
            if(controlData.controlType=='layout'){
                controlData.UIElement="MM/UI_Settings_layout.html";
            }
            if(controlData.controlType=='layout_column'){
                controlData.UIElement="MM/UI_Settings_layoutcolumn.html";
            }
            controlData.id=$(this).attr('id');
                controlData.layout_class=$(this).attr('class');
                controlData.layout_style=$(this).attr('style')
                //controlData.UIElement="MM/UI_Settings_label.html";

                var controlDataString=JSON.stringify(controlData);
                $(this).attr('data-Controlset',controlDataString);
                //console.log(controlData);
                $.ajax({
                    type: "POST",
                    url: '/UIInclude',
                    data:controlData,
                    success: function(data){
                      console.log(data);
                      $("#OptionsID").html(data.html);
                    },
                     error: function (request, status, error) {
                     console.log(error);
                      }
                  });
        }
        if($(this).attr('data-select')=='col'){
            exitloop = true
            $(this).find('.dcol').css({display:'flow-root',border:'2px solid blue'});
            preEvent=$(this);
            var controlData = JSON.parse($(this).attr('data-Controlset'));
            if(controlData.controlType=='label'){
                controlData.UIElement="MM/UI_Settings_label.html";
            }
             if(controlData.controlType=='button'){
                controlData.UIElement="MM/UI_Settings_Button.html";
            }
            if(controlData.controlType=='input'){
                controlData.UIElement="MM/UI_Settings_input.html";
            }
            if(controlData.controlType=='emptycontol'){
                controlData.UIElement="MM/UI_Settings_column.html";
            }


                controlData.id=$(this).attr('id');
                controlData.column_class=$(this).attr('class');
                controlData.column_style=$(this).attr('style')
                //controlData.UIElement="MM/UI_Settings_label.html";

                var controlDataString=JSON.stringify(controlData);
                $(this).attr('data-Controlset',controlDataString);
                //console.log(controlData);
                $.ajax({
                    type: "POST",
                    url: '/UIInclude',
                    data:controlData,
                    success: function(data){
                      console.log(data);
                      $("#OptionsID").html(data.html);
                    },
                     error: function (request, status, error) {
                     console.log(error);
                      }
                  });
                //$('#OptionsID').load('/UIInclude',controlData);
                //OptionsIDHtml='<div><label >Property: <input type="text" data-type="Propery"></label><input type="button" value="Save"></div>';
                //$('#OptionsID').html(OptionsIDHtml);
            //}
            //console.log(controlData);
        }

        if(exitloop){
            console.log(exitloop);
            return false;
        }
    });
});

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

$(document).on('submit','#label_settings_form',function(e){
    event.preventDefault();
    //data = $(this).serializeObject();
       $.ajax({ data: $(this).serialize(),
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                success: function(response) {
                    var controlData = JSON.parse(response.responseData.response);
                     console.log(controlData);
                     $("#label_settings_form").html(response.html);
                     //console.log(response.responseData.controlType);
                     $("#"+controlData.id).attr('data-controlset',response.responseData.response);
                     $("#"+controlData.id).attr('class',controlData.column_class);
                     $("#"+controlData.id).attr('style',controlData.column_style);
                     if(controlData.controlType=='button'){
                        //console.log($("#"+controlData.id).find('input'))
                        $("#"+controlData.id).find('input').attr('value',controlData.button_property_value);
                     }
                     if(controlData.controlType=='label'){
                        $("#"+controlData.id).find('label').text(controlData.label_property_property);
                     }
                     if(controlData.controlType=='input'){
                        $("#"+controlData.id).find('label').text(controlData.input_property_label);
                        $("#"+controlData.id).find('label').attr('for',controlData.input_property_property);
                        $("#"+controlData.id).find('input').attr('name',controlData.input_property_property);
                        $("#"+controlData.id).find('input').attr('class',controlData.property_property_class);
                        $("#"+controlData.id).find('input').attr('style',controlData.property_property_style);
                        $("#"+controlData.id).find('label').attr('class',controlData.label_property_class);
                        $("#"+controlData.id).find('label').attr('style',controlData.label_property_style);
                     }
                     if(controlData.controlType=='layout'){
                        $("#"+controlData.id).attr('class',controlData.layout_class);
                        $("#"+controlData.id).attr('style',controlData.layout_style);
                     }
                     if(response['success']) {
                         //$("#label_settings_form").html("Hello World");
                         //$("#feedbackform").addClass("hidden");
                     }
                     if(response['error']) {
                         /*$("#feedbackmessage").html("<div class='alert alert-danger'>" +
			                   response['error']['comment'] +"</div>");*/
                     }
                },
                error: function (request, status, error) {
                     console.log(request.responseText);
                }
       });
});


$(document).on('submit','#new_form',function(e){
    event.preventDefault();
    //data = $(this).serializeObject();
       $.ajax({ data: $(this).serialize(),
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                success: function(response) {
                    //var controlData = JSON.parse(response);
                     controlData=response.response;
                     //console.log(response.response);
                     //$("#label_settings_form").html(response.html);
                     //console.log(controlData.responseData.datalocation);
                     addDynamicTab(controlData);



                     if(response['success']) {
                         //$("#label_settings_form").html("Hello World");
                         //$("#feedbackform").addClass("hidden");
                     }
                     if(response['error']) {
                         /*$("#feedbackmessage").html("<div class='alert alert-danger'>" +
			                   response['error']['comment'] +"</div>");*/
                     }
                },
                error: function (request, status, error) {
                     console.log(request.responseText);
                }
       });
});