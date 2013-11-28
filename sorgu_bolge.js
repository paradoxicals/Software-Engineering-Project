
        var   Panel_bolge = new Ext.FormPanel({
        id:'Panel_bolge',
        header:false,
         items:[
            gridPanelbolge
        ]
    });    
		var sorgulama_bolgeWindow =  new Ext.Window({
        title:'Bölge Sorgulama Ekranı',
        width:800,
        height:600,
        frame:true,
		collapsible:true,
        closable:true,
        resizable:false,
        closeAction:'hide',
        layout:'border',
		items:[ 
            {
                region:'center',
                title:' ',
                margins:'3 3 3 3',
                frame:true,
                collapsible:false,
                items:[
                   Panel_bolge
				   
                ]
            }
        ]
		 }); 
		 
 // JavaScript Document