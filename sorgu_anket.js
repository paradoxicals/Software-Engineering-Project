
        var   Panel_anket = new Ext.FormPanel({
        id:'Panel_anket',
        header:false,
         items:[
            gridPanelanket
        ]
    });    
		var sorgulama_anketWindow =  new Ext.Window({
        title:'Anket Sorgulama Ekranı',
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
                   Panel_anket
				   
                ]
            }
        ]
		 }); 
		 
 // JavaScript Document