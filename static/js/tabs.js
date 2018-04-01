$( function() {

    $(document).on('click','#HtmlWorkSpace',function(){
        var data = {
            MPM_name : 'New',
            //MPM_stream :  "<div >{% include 'MM/NewHTMLWorkArea.html' %}</div>"
            MPM_URL : "/UIInclude",
            MPM_stream : { UIElement:'MM/NewHTMLWorkArea.html' }
        }
        addTab(event,data);
    });
    $(document).on('click','#createNew',function(){
        var data = {
            MPM_name : 'New',
            //MPM_stream :  "<div >{% include 'MM/NewHTMLWorkArea.html' %}</div>"
            MPM_URL : "/UIInclude",
            MPM_stream : { UIElement:'MM/UI_New_MPM.html' }
        }
        addTab(event,data);
    });


    $(document).on('click','#close-tab',function(){

        //var tabs=$(event.target).tabs();
        //console.log(tabs);
        tabsLocation=$(event.target).attr('data-location');
        //console.log($(event.target));
        var tabs=$('#'+tabsLocation).tabs();
        var panelId = $( this ).closest( "li" ).attr( "aria-controls" );
        //console.log($( this ));
        //console.log(panelId)
        var tabIndex=id2Index('#'+tabsLocation,'#'+panelId)
        //console.log(id2Index('#'+tabsLocation,'#'+panelId));
        //$("#"+panelId).prev().attr('aria-hidden','true')
        $( this ).closest( "li" ).remove();
        $( "#" + panelId ).remove();
        //$("#"+panelId).prev().addClass("ui-tabs-active ui-state-active");
        //tabs.tabs( "option", "active", 0 );
        tabs.tabs("refresh");
        //var tabCount=$('#'+tabsLocation).find(".ui-icon-close").length;
        $('#'+tabsLocation).tabs("option","active",tabIndex-1);
    });

});


    // Actual addTab function: adds new tab using the input from the form above
/*    function addTab(event) {
      var tabs=$('#'+$(event.target).attr('data-location')).tabs();
      console.log(tabs);
      var label = idGen("Tab"),
        id = label,
        li = "<li><a href='#"+id+"'>"+label+"</a> <span class='ui-icon ui-icon-close' id= 'close-tab' role='presentation'>Remove Tab</span></li>",
        tabContentHtml = '<button id="add_tab" data-location="workTabs" id="AddTab">Add Tab</button><p>Hello World</p>';

      tabs.find( ".ui-tabs-nav" ).append( li );
      tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
      tabs.tabs( "refresh" );

    }*/

   // Actual addTab function: adds new tab using the input from the form above
    function addTab(event,data) {
      var tabs=$('#'+$(event.target).attr('data-location')).tabs();
      console.log(tabs);
      console.log(data);

      var label = data.MPM_name,
        id = label,
        li = "<li><a href='#"+id+"'>"+label+"</a> <span data-location='"+$(event.target).attr('data-location')+"' class='ui-icon ui-icon-close' id= 'close-tab' role='presentation'>Remove Tab</span></li>",
        tabContentHtml = data.MPM_stream;
        //html = $.parseHTML( tabContentHtml );
       if($("#"+label).length==0){
            tabs.find( ".ui-tabs-nav" ).append( li );
            tabs.append( "<div id='" + id + "'></div>" );
            //tabs.append(tabContentHtml);
            $('#'+id).load(data.MPM_URL, data.MPM_stream);
            $('#'+id).addClass('fit100');
            //includeHTML();

            tabs.tabs("refresh");
            //$('#'+$(event.target).attr('data-location')).tabs("option","active",1);
            tabs.tabs("option","active",id2Index('#'+$(event.target).attr('data-location'),'#'+id));
       }


    }
    // This function is used to Add new tab based on dynamic HTML
    function addDynamicTab(controldata){

        var tabs=$('#'+controlData.responseData.datalocation).tabs();
                     var label = controlData.responseData.uiElementName,
                    id = label+"_element",
                    li = "<li><a href='#"+id+"'>"+label+"</a> <span data-location='"+controlData.responseData.datalocation+"' class='ui-icon ui-icon-close' id= 'close-tab' role='presentation'>Remove Tab</span></li>",
                    tabContentHtml = "<div id='" + id + "'>"+controlData.html+"</div>" ;
                    //html = $.parseHTML( tabContentHtml );
                   if($("#"+label).length==0){
                        tabs.find( ".ui-tabs-nav" ).append( li );
                        //tabs.append( "<div id='" + id + "'></div>" );
                        tabs.append(tabContentHtml);
                        //tabs.tabs( "option", "show", { effect: "blind", duration: 800 } );
                        //$('#'+id).load(data.MPM_URL, data.MPM_stream);
                        $('#'+id).addClass('fit100');
                        //includeHTML();
                        //tabs.tabs( "enable","#"+id );
                        //console.log(tabs.tabs("option"));
                        //tabs.tabs({"active":1});
                        //console.log(tabs);
                        //var active = $( ".selector" ).tabs( "option", "active" );
                        //var panelId = $(this).closest( "li" ).remove().attr( "aria-controls" );
                        //console.log(tabs.tabs('option', 'selected'));
                        closeActiveTab(controlData.responseData.datalocation);
                        tabs.tabs("refresh");
                        //console.log($('#'+controlData.responseData.datalocation).find('li[aria-selected=true]').attr('aria-controls'));
                        //console.log(id2Index('#'+controlData.responseData.datalocation,'#'+id));
                        //tabs.tabs("option","active",id2Index('#'+controlData.responseData.datalocation,'#'+id));
                        //var TabId = $(e.target.parentElement).attr('id');
                        //var TabId = $('#'+controlData.responseData.datalocation).find('li[aria-selected=true]').attr('aria-controls');
                        //var liele = $('#'+controlData.responseData.datalocation).find("aria-controls:contains("+panelId+")")
                        //var liele = $("li[aria-controls="+TabId+"]").remove();
                        //console.log(liele)

                        //console.log(tabs.closest("li"));
                        //$("#"+panelId).prev().attr('aria-hidden','true')

                        //$( "#" + TabId ).remove();
                        tabs.tabs("option","active",id2Index('#'+controlData.responseData.datalocation,'#'+id));
                        //tabs.tabs("refresh");
                    }
    }

//tabsId Id of the div containing the tab code.
//srcId Id of the tab whose id you are looking for
function id2Index(tabsId, srcId)
{
	var index=-1;
	var i = 0, tbH = $(tabsId).find("li a");
	var lntb=tbH.length;
	if(lntb>0){
		for(i=0;i<lntb;i++){
			o=tbH[i];
			if(o.href.search(srcId)>0){
				index=i;
			}
		}
	}
	return index;
}

// Used to close the tab

function closeActiveTab(Panal){
    var TabId = $('#'+Panal).find('li[aria-selected=true]').attr('aria-controls');
                        //var liele = $('#'+controlData.responseData.datalocation).find("aria-controls:contains("+panelId+")")
    var liele = $("li[aria-controls="+TabId+"]").remove();
    console.log(liele)

    //console.log(tabs.closest("li"));
    //$("#"+panelId).prev().attr('aria-hidden','true')

    $( "#" + TabId ).remove();

}