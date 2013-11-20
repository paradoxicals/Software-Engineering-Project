function bolgeGuncelle(oGrid_event){
   Ext.Ajax.request({   
   url:'../veri/php/bolge_duzenle.php',//**
	 // method: 'POST', 
      params: {//**
	  
         bolge_id: oGrid_event.record.data.bolge_id,
         bolge_adi: oGrid_event.record.data.bolge_adi,
         bolgedeki_ilceler: oGrid_event.record.data.bolgedeki_ilceler,
        
      }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            storebolge.commitChanges(); //**
            storebolge.reload(); //**
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


	 var storebolge = new Ext.data.JsonStore({
     fields:['bolge_id','bolge_adi','bolgedeki_ilceler','bolge_adres','bolge_telefon','bolge_ilceid'], 
      url:'../veri/php/bolge_filtre.php',
      method: 'POST',  
      root:'roots',
      autoLoad:true
    });
 
    var sm_bolge = new Ext.grid.CheckboxSelectionModel({
        listeners:{
            selectionchange:function (selModel) { 
  }} 
});
 
	
	
	 var gridPanelbolge = new Ext.grid.EditorGridPanel({
        id:"gridPanelbolge",//**
	    selModel:sm_bolge,//**
        store:storebolge,//**
        border:false,
        frame:true,
        columnLines:true, 
		title:"bolge",//**
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
         
				{type:'string', dataIndex:'bolge_id'},
				{type:'string', dataIndex:'bolge_adi'},
				{type:'string', dataIndex:'bolgedeki_ilceler'},
				
            ]
        })],
		
        columns:[
             new Ext.grid.RowNumberer(),
               { 
				id:'id',
                header:"Bölge id",
                dataIndex:'bolge_id', 
                tooltip:'id',
				sortable:true,
                editor:new Ext.form.TextField() 
				} , 
				{ 
				id:'adi',
                header:"Bölge Adı",
                dataIndex:'bolge_adi', 
                tooltip:'adi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'sahibi',
                header:"Bölgedeki İlçeler",
                dataIndex:'bolgedeki_ilceler', 
                tooltip:'sahibi',
				sortable:true,
                editor:new Ext.form.TextField() 
				}],
        title:'Bölge',//**
        height:250,
		tbar: [//**
      {
            text: "EKLE",
			icon:'images/add.png',
            handler: function() { 
				
				bolgeWindow.show();//**
				
			}},
          {
            text: "SIL",
			icon:'images/remove.png',
            handler: function() { 
				
				var gridPanelbolge_id = Ext.getCmp('gridPanelbolge');
			var rec = gridPanelbolge_id.getSelectionModel().getSelected();
			rec.get('bolge_id'); 
	        
			Ext.Ajax.request({ 
              url: '../veri/php/bolge_sil.php', ////******
			  params:{
				  bolge_id: rec.get('bolge_id') //**
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object();  
				 storebolge.load();////****
     
  } 
});
			}
			
			
			}] //**
    });
	  
	  gridPanelbolge.on('afteredit', bolgeGuncelle);	
	  
	   var  text_bolge_adi=new Ext.form.TextField({
        id:'text_bolge_adi',//****
        width:150,
        fieldLabel:'bolge Adi ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_bolgedeki_ilceler=new Ext.form.TextField({
        id:'text_bolgedeki_ilceler',//****
        width:150,
        fieldLabel:'bolge Sahibi ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_bolge_adres=new Ext.form.TextField({
        id:'text_bolge_adres',//****
        width:150,
        fieldLabel:'bolge Adres ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });
	

var bolge_ustform = new Ext.FormPanel({//**
	     frame: true,
	     title: 'Bölge Bilgileri',//**
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
	           text_bolge_adi,
			   text_bolgedeki_ilceler,
			  
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
              url: '../veri/php/bolge_ekle.php', ////******
			  params:{
				  bolge_adi: Ext.getCmp('text_bolge_adi').getValue(),
				   bolgedeki_ilceler: Ext.getCmp('text_bolgedeki_ilceler').getValue(),
				  
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object(); 
				 Ext.getCmp('text_bolge_adi').setValue("");
				 Ext.getCmp('text_bolgedeki_ilceler').setValue("");
				
				 //**
				 storebolge.load();////****
     
  } 
});             
}})
				 ] // column #2 sonu
	         }]
	     }]
	 }); 
	
	
			var bolgeWindow =  new Ext.Window({//**
        title:'	Bölge Bilgileri',//**
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
					bolge_ustform//**
                ]
            }
        ]});   