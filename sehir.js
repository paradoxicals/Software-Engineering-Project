function sehirGuncelle(oGrid_event){
   Ext.Ajax.request({   
   url:'../veri/php/sehir_duzenle.php',//**
	 // method: 'POST', 
      params: {//**
	  
         sehir_id: oGrid_event.record.data.sehir_id,
         sehir_adi: oGrid_event.record.data.sehir_adi,
         bulundugu_bolge: oGrid_event.record.data.bulundugu_bolge,
         sahip_oldugu_ilceler: oGrid_event.record.data.sahip_oldugu_ilceler, 
         
      }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            storesehir.commitChanges(); //**
            storesehir.reload(); //**
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


	 var storesehir = new Ext.data.JsonStore({
     fields:['sehir_id','sehir_adi','bulundugu_bolge','sahip_oldugu_ilceler'], 
      url:'../veri/php/sehir_filtre.php',
      method: 'POST',  
      root:'roots',
      autoLoad:true
    });
 
    var sm_sehir = new Ext.grid.CheckboxSelectionModel({
        listeners:{
            selectionchange:function (selModel) { 
  }} 
});
 
	
	
	 var gridPanelsehir = new Ext.grid.EditorGridPanel({
        id:"gridPanelsehir",//**
	    selModel:sm_sehir,//**
        store:storesehir,//**
        border:false,
        frame:true,
        columnLines:true, 
		title:"sehir",//**
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
         
				{type:'string', dataIndex:'sehir_id'},
				{type:'string', dataIndex:'sehir_adi'},
				{type:'string', dataIndex:'bulundugu_bolge'},
				{type:'string', dataIndex:'sahip_oldugu_ilceler'},
            ]
        })],
		
        columns:[
             new Ext.grid.RowNumberer(),
               { 
				id:'id',
                header:"id",
                dataIndex:'sehir_id', 
                tooltip:'id',
				sortable:true,
                editor:new Ext.form.TextField() 
				} , 
				{ 
				id:'adi',
                header:"Şehir Adı",
                dataIndex:'sehir_adi', 
                tooltip:'adi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'bulundugu_bolge',
                header:"Bulunduğu Bölge",
                dataIndex:'bulundugu_bolge', 
                tooltip:'bulundugu_bolge',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'sahip_oldugu_ilceler',
                header:"Sahip Olduğu İlçeler",
                dataIndex:'sahip_oldugu_ilceler', 
                tooltip:'sahip_oldugu_ilceler',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ],
        title:'Şehir',//**
        height:250,
		tbar: [//**
      {
            text: "EKLE",
			icon:'images/add.png',
            handler: function() { 
				
				sehirWindow.show();//**
				
			}},
          {
            text: "SIL",
			icon:'images/remove.png',
            handler: function() { 
				
				var gridPanelsehir_id = Ext.getCmp('gridPanelsehir');
			var rec = gridPanelsehir_id.getSelectionModel().getSelected();
			rec.get('sehir_id'); 
	        
			Ext.Ajax.request({ 
              url: '../veri/php/sehir_sil.php', ////******
			  params:{
				  sehir_id: rec.get('sehir_id') //**
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object();  
				 storesehir.load();////****
     
  } 
});
			}
			
			
			}] //**
    });
	  
	  gridPanelsehir.on('afteredit', sehirGuncelle);	
	  
	   var  text_sehir_adi=new Ext.form.TextField({
        id:'text_sehir_adi',//****
        width:150,
        fieldLabel:'Şehir Adi ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_bulundugu_bolge=new Ext.form.TextField({
        id:'text_bulundugu_bolge',//****
        width:150,
        fieldLabel:'Bulunduğu Bölge ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_sahip_oldugu_ilceler=new Ext.form.TextField({
        id:'text_sahip_oldugu_ilceler',//****
        width:150,
        fieldLabel:'Sahip Olduğu İlçeler ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });


var sehir_ustform = new Ext.FormPanel({//**
	     frame: true,
	     title: 'sehir BİLGİLERİ',//**
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
	           text_sehir_adi,
			   text_bulundugu_bolge,
			   text_sahip_oldugu_ilceler,
			   
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
              url: '../veri/php/sehir_ekle.php', ////******
			  params:{
				  sehir_adi: Ext.getCmp('text_sehir_adi').getValue(),
				   bulundugu_bolge: Ext.getCmp('text_bulundugu_bolge').getValue(),
				   sahip_oldugu_ilceler: Ext.getCmp('text_sahip_oldugu_ilceler').getValue(),
				  
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object(); 
				 Ext.getCmp('text_sehir_adi').setValue("");
				 Ext.getCmp('text_bulundugu_bolge').setValue("");
				 Ext.getCmp('text_sahip_oldugu_ilceler').setValue("");
				 
				 //**
				 storesehir.load();////****
     
  } 
});             
}})
				 ] // column #2 sonu
	         }]
	     }]
	 }); 
	
	
			var sehirWindow =  new Ext.Window({//**
        title:'Şehir Bilgileri',//**
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
					sehir_ustform//**
                ]
            }
        ]});   