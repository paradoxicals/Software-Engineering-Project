function secmenGuncelle(oGrid_event){
   Ext.Ajax.request({   
   url:'../veri/php/secmen_duzenle.php',//**
	 // method: 'POST', 
      params: {//**
	  
         secmen_recid: oGrid_event.record.data.secmen_recid,
         secmen_yasi: oGrid_event.record.data.secmen_yasi,
         secmen_cinsiyeti: oGrid_event.record.data.secmen_cinsiyeti,
         yasadıgı_bolge: oGrid_event.record.data.yasadıgı_bolge, 
         yasadıgı_il: oGrid_event.record.data.yasadıgı_il,
		 kullandıgı_oy: oGrid_event.record.data.kullandıgı_oy
      }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            storesecmen.commitChanges(); //**
            storesecmen.reload(); //**
            break;					
         default:
            Ext.MessageBox.alert('Uyarı...','Değişiklik Kaydedilemedi...');
            break;
         }
      },
      failure: function(response){
         var result=response.responseText;
         Ext.MessageBox.alert('error','could not connect to the database. retry later');		
      }									    
   });   
  } 


	 var storesecmen = new Ext.data.JsonStore({
     fields:['secmen_recid','secmen_yasi','secmen_cinsiyeti','yasadıgı_bolge','yasadıgı_il','kullandıgı_oy'], 
      url:'../veri/php/secmen_filtre.php',
      method: 'POST',  
      root:'roots',
      autoLoad:true
    });
 
    var sm_secmen = new Ext.grid.CheckboxSelectionModel({
        listeners:{
            selectionchange:function (selModel) { 
  }} 
});
 
	
	
	 var gridPanelsecmen = new Ext.grid.EditorGridPanel({
        id:"gridPanelsecmen",//**
	    selModel:sm_secmen,//**
        store:storesecmen,//**
        border:false,
        frame:true,
        columnLines:true, 
		title:"secmen",//**
		disableSelection:true,
		editable: true,
		enableColLock:false,
		clickToEdit: 2,
        viewConfig: {forceFit:true},
		
		plugins:[new Ext.ux.grid.GridFilters({
            encode:true,
			autoReload: false, 
			local: true,  
            onCheckChange:function () { 
		    store.lastOptions.params.start = 0;  
            },
            filters:[
         
				{type:'string', dataIndex:'secmen_recid'},
				{type:'string', dataIndex:'secmen_yasi'},
				{type:'string', dataIndex:'secmen_cinsiyeti'},
				{type:'string', dataIndex:'yasadıgı_bolge'},
				{type:'string', dataIndex:'yasadıgı_il'},
				{type:'string', dataIndex:'kullandıgı_oy'}
            ]
        })],
		
        columns:[
             new Ext.grid.RowNumberer(),
               { 
				id:'secmen_recid',
                header:"Secmen Id",
                dataIndex:'secmen_recid', 
                tooltip:'secmen_recid',
				sortable:true,
                editor:new Ext.form.TextField() 
				} , 
				{ 
				id:'secmen_yasi',
                header:"Secmen Yaşı",
                dataIndex:'secmen_yasi', 
                tooltip:'secmen_yasi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'secmen_cinsiyeti',
                header:"Secmen Cinsiyeti",
                dataIndex:'secmen_cinsiyeti', 
                tooltip:'secmen_cinsiyeti',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'yasadıgı_bolge',
                header:"Seçmenin Yaşadığı Bölge",
                dataIndex:'yasadıgı_bolge', 
                tooltip:'yasadıgı_bolge',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'yasadıgı_il',
                header:"Seçmenin Yaşadığı İl",
                dataIndex:'yasadıgı_il', 
                tooltip:'yasadıgı_il',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'kullandıgı_oy',
                header:"Seçmenin Kullandığı Oy",
                dataIndex:'kullandıgı_oy', 
                tooltip:'kullandıgı_oy',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ],
        title:'Secmen',//**
        height:250,
		tbar: [//**
      {
            text: "EKLE",
			icon:'images/add.png',
            handler: function() { 
				
				secmenWindow.show();//**
				
			}},
          {
            text: "SIL",
			icon:'images/remove.png',
            handler: function() { 
				
				var gridPanelsecmen_id = Ext.getCmp('gridPanelsecmen');
			var rec = gridPanelsecmen_id.getSelectionModel().getSelected();
			rec.get('secmen_recid'); 
	        
			Ext.Ajax.request({ 
              url: '../veri/php/secmen_sil.php', ////******
			  params:{
				  secmen_recid: rec.get('secmen_recid') //**
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object();  
				 storesecmen.load();////****
     
  } 
});
			}
			
			
			}] //**
    });
	  
	  gridPanelsecmen.on('afteredit', secmenGuncelle);	
	  
	   var  text_secmen_yasi=new Ext.form.TextField({
        id:'text_secmen_yasi',//****
        width:150,
        fieldLabel:'secmen yasi ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_secmen_cinsiyeti=new Ext.form.TextField({
        id:'text_secmen_cinsiyeti',//****
        width:150,
        fieldLabel:'secmen cinsiyeti ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_yasadıgı_bolge=new Ext.form.TextField({
        id:'text_yasadıgı_bolge',//****
        width:150,
        fieldLabel:'secmen yasadıgı bolge ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });
	var  text_yasadıgı_il=new Ext.form.TextField({
        id:'text_yasadıgı_il',//****
        width:150,
        fieldLabel:'secmen yasadıgı il ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });
	var  text_kullandıgı_oy=new Ext.form.TextField({
        id:'text_kullandıgı_oy',//****
        width:150,
        fieldLabel:'secmen kullandıgı oy ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });

var secmen_ustform = new Ext.FormPanel({//**
	     frame: true,
	     title: 'secmen BİLGİLERİ',//**
	     labelAlign: 'right',
	     labelStyle: 'font-weight:bold;',
	     labelWidth: 200,
	    // width: 950,
		  collapsible: true,
	     items: [{
	         layout: 'column',
	         items: [{ // column #1
	             columnWidth: .50,
	             layout: 'form',
	             items: [
	           text_secmen_yasi,
			   text_secmen_cinsiyeti,
			   text_yasadıgı_bolge,
			   text_yasadıgı_il,
			   text_kullandıgı_oy
			   //**
	             ] //column #1 sonu
	         }, {
	             columnWidth: .50,
	             layout: 'form',
	             items: [  
				 	new Ext.Button({ 
		text: "KAYDET",
		icon:'images/save.png',
		 	 width:150, 
            handler: function() { 
			  Ext.Ajax.request({ 
              url: '../veri/php/secmen_ekle.php', ////******
			  params:{
				  secmen_yasi: Ext.getCmp('text_secmen_yasi').getValue(),
				   secmen_cinsiyeti: Ext.getCmp('text_secmen_cinsiyeti').getValue(),
				   yasadıgı_bolge: Ext.getCmp('text_yasadıgı_bolge').getValue(),
				   yasadıgı_il: Ext.getCmp('text_yasadıgı_il').getValue(),
				   kullandıgı_oy: Ext.getCmp('text_kullandıgı_oy').getValue()
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object(); 
				 Ext.getCmp('text_secmen_yasi').setValue("");
				 Ext.getCmp('text_secmen_cinsiyeti').setValue("");
				 Ext.getCmp('text_yasadıgı_bolge').setValue("");
				 Ext.getCmp('text_yasadıgı_il').setValue("");
				 Ext.getCmp('text_kullandıgı_oy').setValue("");
				 //**
				 storesecmen.load();////****
     
  } 
});             
}})
				 ] // column #2 sonu
	         }]
	     }]
	 }); 
	
	
			var secmenWindow =  new Ext.Window({//**
        title:'	secmen İŞLEMLERİ',//**
        width:1000,
        height:600,
        frame:true,
        closable:true,
        resizable:false,
		collapsible:true,
        closeAction:'hide',
        layout:'border', 
		items:[ 
            {
                region:'center',
                 margins:'3 3 3 3',
                frame:true,
                collapsible:false,
                items:[
					secmen_ustform//**
                ]
            }
        ]});   