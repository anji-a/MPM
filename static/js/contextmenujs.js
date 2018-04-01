$(function(){

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

    generateContextmenu("AppList",menu);

    /*$('#appPanel').contextmenu({
        selector: 'a',
        callback: function(key, options) {
            var m = "clicked: " + key + " on " + $(this).text();
            window.console && console.log(m) || alert(m);
        },
        items: {
            "edit": {name: "New", icon: "new"},
            "edit": {name: "Edit", icon: "edit"},
            "cut": {name: "Cut", icon: "cut"},
            "copy": {name: "Copy", icon: "copy"},
            "paste": {name: "Paste", icon: "paste"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function($element, key, item){ return 'context-menu-icon context-menu-icon-quit'; }}
        }
        //alert( "Hello World!" );
    });*/
/*
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

    var contextMenuSettings={
	method:'menu',
	option:{
			triggerOn: 'click',
			displayAround: 'cursor',
			mouseClick: 'right',
			verAdjust: 0,
			horAdjust: 0,
			top:'auto',
			left:'auto',
			sizeStyle:'auto',
			position: 'auto',
			containment:window
		}
	}


    $('#Property').contextMenu('open',menu,contextMenuSettings.option);*/
});

function generateContextmenu(id, menu){
    var contextMenuSettings={
	method:'menu',
	option:{
			triggerOn: 'click',
			displayAround: 'cursor',
			mouseClick: 'right',
			verAdjust: 0,
			horAdjust: 0,
			top:'auto',
			left:'auto',
			sizeStyle:'auto',
			position: 'auto',
			containment:window
		}
	}


    $('#'+id).contextMenu('open',menu,contextMenuSettings.option);
}