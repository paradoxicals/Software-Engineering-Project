
        var   Panel_sehir = new Ext.FormPanel({
        id:'Panel_sehir',
        header:false,
         items:[
            gridPanelsehir
        ]
    });    
		var sorgulama_sehirWindow =  new Ext.Window({
        title:'Sehir Sorgulama Ekranı',
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
                   Panel_sehir
				   
                ]
            }
        ]
		 }); 
		 
 