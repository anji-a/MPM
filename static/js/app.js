$( function() {
    // used to get list of element types
   $('#AppList').click(function(){
       $.ajax(
    {
        type:"POST",
        url: "/standardFunc",
        data:{
                    fun_name:'getElementTypes',
                 //csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()
        },
        success: function( data )
        {
            //$( '#like'+ catid ).remove();
            //$( '#message' ).text(data);
            //console.log(data.hello);
            //console.log(data['item']);
            var appPanel=$('#appPanel')
            var menu = [{
                    name: 'create',
                    //img: 'images/create.png',
                    title: 'create button',
                    fun: function () {
                        alert('i am add button')
                    }
                }, {
                    name: 'update',
                    //img: 'images/update.png',
                    title: 'update button',
                    fun: function () {
                        alert('i am update button')
                    }
                }, {
                    name: 'delete',
                    //img: 'images/delete.png',
                    title: 'delete button',
                    fun: function () {
                        alert('i am delete button')
                    }
                }];

            $.each(data['response'], function(i,v){
                //console.log(v)
                if(appPanel.find('a').text().search(v)>=0){
                }else{
                    appPanel.append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#appPanel" href="#'+v+'" data-level="div">'+v+'</a></h4></div><div id="'+v+'" class="panel-collapse collapse"> <ul class="list-group"><li class="list-group-item">Loading</li></ul></div></div>');
                    generateContextmenu("appPanel a",menu)
                }

                //appPanel.find('.panel-title').append('<a data-toggle="collapse" data-parent="#appPanel" href="#'+v+'">'+v+'</a>')
                //appPanel.find('.panel-default').append('<div id="'+v+'" class="panel-collapse collapse"><ul class="list-group"><li class="list-group-item">Hello<li></ul></div>')
            });
            //console.log(appPanel.find('a').text());
            //$(":contains(text)")
        }
     })
   });

$('#AppList').ready(function(){
   $.ajax(
    {
        type:"POST",
        url: "/standardFunc",
        data:{
                    fun_name:'getElementTypes',
                 //csrfmiddlewaretoken: jQuery("[name=csrfmiddlewaretoken]").val()
        },
        success: function( data )
        {
            //$( '#like'+ catid ).remove();
            //$( '#message' ).text(data);
            //console.log(data.hello);
            //console.log(data['item']);
            var appPanel=$('#appPanel')
            var menu = [{
                    name: 'create',
                    //img: 'images/create.png',
                    title: 'create button',
                    fun: function () {
                        alert('i am add button')
                    }
                }, {
                    name: 'update',
                    //img: 'images/update.png',
                    title: 'update button',
                    fun: function () {
                        alert('i am update button')
                    }
                }, {
                    name: 'delete',
                    //img: 'images/delete.png',
                    title: 'delete button',
                    fun: function () {
                        alert('i am delete button')
                    }
                }];

            $.each(data['response'], function(i,v){
                //console.log(v)
                if(appPanel.find('a').text().search(v)>=0){
                }else{
                    appPanel.append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#appPanel" href="#'+v+'" data-level="div">'+v+'</a></h4></div><div id="'+v+'" class="panel-collapse collapse"> <ul class="list-group"><li class="list-group-item">Loading</li></ul></div></div>');
                    generateContextmenu("appPanel a",menu)
                }

                //appPanel.find('.panel-title').append('<a data-toggle="collapse" data-parent="#appPanel" href="#'+v+'">'+v+'</a>')
                //appPanel.find('.panel-default').append('<div id="'+v+'" class="panel-collapse collapse"><ul class="list-group"><li class="list-group-item">Hello<li></ul></div>')
            });
            //console.log(appPanel.find('a').text());
            //$(":contains(text)")
        }
     })
});

// Used to get list of elements based on type
   $(document).on('click','#appPanel a',function(){
    ele=$(event.target);
     if(ele.attr('data-level')=='div'){
        requestData = {
            type:"POST",
            url: "/standardFunc",
            element_type:ele.text(),
            fun_name:'getListofElementsbasedonType'
        }
        var responseData = processAjaxRequest(requestData);
        //console.log(responseData);
        accListItam=$('#'+ele.text());
        accListItam.find('ul').remove();
        accListItam.append('<ul class="list-group"></ul>');
        $.each(responseData['response'], function(i,v){
           accListItam.find('ul').append('<li class="list-group-item"><a data-level="li" data-location="workTabs">'+v+'</a></li>');

        });

     }else if(ele.attr('data-level')=='li'){
         requestData = {
                type:"POST",
                url: "/standardFunc",
                element_type:ele.text(),
                fun_name:'getElementData'
            }

        var responseData = processAjaxRequest(requestData);
        addTab(event,responseData.response[0]);
        //addTab(event);
     }


   });

});

function processAjaxRequest(request){
    var returnValue;
    $.ajax(
    {
        type:request.type,
        url: request.url,
        data:request,
        async: false,

        success: function( data )
        {
            //console.log(data);
            returnValue = data;
        }

    })
    return returnValue;
}
// used to save the UI data
/*$(document).on('click','#UISave', function(){
    console.log($(this.target).find('label').text())
    genHtml=genPreviewHtml();
    alert("Save");
    requestData = {
            data: $(this).find('label').text(),
            type:"POST",
            url: "/standardFunc",
            element_name:"Hello",
            element_type:'Section',
            element_dev_stream:$('#MainDragLayout').html(),
            element_stream:genHtml,
            fun_name:'UISave'
        }
        var responseData = processAjaxRequest(requestData);

});
*/
/*
$(document).on('submit','#work_form',function(e){
    event.preventDefault();
    var input = $(e.currentTarget);
  var which_button = e.currentTarget.value;
  //var data = input.parents("form")[0].data.value;
//  var which_button = '?';       // <-- this is what I want to know
  alert( ' button: ' + which_button );
    alert($(this).val());
    var data={};
    data=$(this).serializeArray();
    alert($(e.target))

    console.log(getserializeData(data,'element_name'));
    //data.push({name:'element_stream',value:$('#'+getserializeData(data,'element_name')+' #MainDragLayout').html()});
    data.push({name:'element_stream',value:$('#'+getserializeData(data,'element_name')).prop('outerHTML')});
    console.log(data);

    $.ajax({ data: data,
            type: "POST",
            url: "/standardFunc",
            element_dev_stream:$('#MainDragLayout').html(),
            element_stream:$('#MainDragLayout').html(),
                success: function(response) {
                    console.log(response);
                },
                error: function (request, status, error) {
                     console.log(request.responseText);
                }
    });
});
*/

$(document).on('click','#ElementSave',function(e){
    event.preventDefault();

    var data={};
    data=$(this).closest("form").serializeArray();
    //alert($(e.target))

    //console.log(getserializeData(data,'element_name'));
    //data.push({name:'element_stream',value:$('#'+getserializeData(data,'element_name')+' #MainDragLayout').html()});
    data.push({name:'element_stream',value:$('#'+getserializeData(data,'element_name')).prop('outerHTML')});
    data.push({name:'fun_name',value:$(this).attr('data-fun')});
    //console.log(data);

    $.ajax({ data: data,
            type: $(this).closest("form").attr("method"),
            url: $(this).closest("form").attr("action"),
               success: function(response) {
                    console.log(response);
                },
                error: function (request, status, error) {
                     console.log(request.responseText);
                }
    });
});


$(document).on('click','#UIPreview',function(e){
    event.preventDefault();
    //alert($(this).closest("form"));
    var data={};
    data=$(this).closest("form").serializeArray();
    //console.log(getserializeData(data,'element_name'));
    //data.push({name:'element_stream',value:$('#'+getserializeData(data,'element_name')+' #MainDragLayout').html()});
    data.push({name:'element_stream',value:$('#'+getserializeData(data,'element_name')).prop('outerHTML')});
    data.push({name:'fun_name',value:$(this).attr('data-fun')});
    //console.log(data);

    $.ajax({ data: data,
             type: $(this).closest("form").attr("method"),
             url: $(this).closest("form").attr("action"),
                success: function(response) {
                    console.log(response);
                   open('POST', 'UIPreview', {filename:response.response },'newwin');

                },
                error: function (request, status, error) {
                     console.log(request.responseText);
                }
    });
});


function genPreviewHtml() {
  /*$('#MainDragLayout').children().each(function() {
    if($(this).attr('data-generate')=='true'){
        console.log($(this));
        previewHtml=previewHtml+$(this).html();
    }

  })*/
  var fragment=document.createElement("div");
  previewEvent=$('#MainDragLayout');
  $(fragment).html(previewEvent.html());
  $(fragment).attr('id','PreviewTest');


  $(fragment).find("[data-edit='remove']").each(function(){

      /*var cnt = $(this).contents();
       $(this).replaceWith("");*/
      $(this).remove();

       //console.log(1);
   });
   $(fragment).find("[data-edit='merge']").each(function(){

       var cnt = $(this).contents();
        $(this).replaceWith(cnt);
       //$(this).remove();

        //console.log(1);
    });
   //console.log($(fragment));
   previewHtml=$(fragment).html();
  /*$(".dcol").each(function(){
       var cnt = $(this).contents();
       $(this).replaceWith(cnt);
   });
  //var cnt = $(".dcol").contents();
  //$(".dcol").replaceWith(cnt);
  //recursiveEachOps($('#MainDragLayout'),"preview");*/
  return previewHtml;
}



function getserializeData(x,element){
        var returnValue=false;
        $.each(x, function(i, field){
        //$("#results").append(field.name + ":" + field.value + " ");
        //console.log(field);

        if(field.name == element){
            //console.log(i)

            returnValue=field.value;
        }

    });
    return returnValue;
}