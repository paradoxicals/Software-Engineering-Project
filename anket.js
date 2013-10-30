function anketGuncelle(oGrid_event){
   Ext.Ajax.request({   
   url:'../veri/php/anket_duzenle.php',//**
	 // method: 'POST', 
      params: {//**
	  
         anket_id: oGrid_event.record.data.anket_id,
         anket_tarihi: oGrid_event.record.data.anket_tarihi,
         anket_cesidi: oGrid_event.record.data.anket_cesidi,
         anket_yapilanbolge: oGrid_event.record.data.anket_yapilanbolge, 
         anket_yapilanil: oGrid_event.record.data.anket_yapilanil,
		 anket_sonuclari: oGrid_event.record.data.anket_sonuclari
      }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            storeanket.commitChanges(); //**
            storeanket.reload(); //**
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


	 var storeanket = new Ext.data.JsonStore({
     fields:['anket_id','anket_tarihi','anket_cesidi','anket_yapilanbolge','anket_yapilanil','anket_sonuclari'], 
      url:'../veri/php/anket_filtre.php',
      method: 'POST',  
      root:'roots',
      autoLoad:true
    });
 
    var sm_anket = new Ext.grid.CheckboxSelectionModel({
        listeners:{
            selectionchange:function (selModel) { 
  }} 
});
 
	
	
	 var gridPanelanket = new Ext.grid.EditorGridPanel({
        id:"gridPanelanket",//**
	    selModel:sm_anket,//**
        store:storeanket,//**
        border:false,
        frame:true,
        columnLines:true, 
		title:"anket",//**
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
         
				{type:'string', dataIndex:'anket_id'},
				{type:'string', dataIndex:'anket_tarihi'},
				{type:'string', dataIndex:'anket_cesidi'},
				{type:'string', dataIndex:'anket_yapilanbolge'},
				{type:'string', dataIndex:'anket_yapilanil'},
				{type:'string', dataIndex:'anket_sonuclari'}
            ]
        })],
		
        columns:[
             new Ext.grid.RowNumberer(),
               { 
				id:'anket_id',
                header:"anket id",
                dataIndex:'anket_id', 
                tooltip:'anket_id',
				sortable:true,
                editor:new Ext.form.TextField() 
				} , 
				{ 
				id:'anket_tarihi',
                header:"anket tarihi",
                dataIndex:'anket_tarihi', 
                tooltip:'adi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'anket_cesidi',
                header:"anket cesidi",
                dataIndex:'anket_cesidi', 
                tooltip:'sahibi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'anket_yapilanbolge',
                header:"anket yapilan bolge",
                dataIndex:'anket_yapilanbolge', 
                tooltip:'adres',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'anket_yapilanil',
                header:"anket yapilan il",
                dataIndex:'anket_yapilanil', 
                tooltip:'anket_yapilanil',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'anket_sonuclari',
                header:"anket_sonuclari",
                dataIndex:'anket_sonuclari', 
                tooltip:'anket_sonuclari',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ],
        title:'Anket',//**
        height:250,
		tbar: [//**
      {
            text: "EKLE",
			icon:'images/add.png',
            handler: function() { 
				
				anketWindow.show();//**
				
			}},
          {
            text: "SIL",
			icon:'images/remove.png',
            handler: function() { 
				
				var gridPanelanket_id = Ext.getCmp('gridPanelanket');
			var rec = gridPanelanket_id.getSelectionModel().getSelected();
			rec.get('anket_id'); 
	        
			Ext.Ajax.request({ 
              url: '../veri/php/anket_sil.php', ////******
			  params:{
				  anket_id: rec.get('anket_id') //**
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object();  
				 storeanket.load();////****
     
  } 
});
			}
			
			
			}] //**
    });
	  
	  gridPanelanket.on('afteredit', anketGuncelle);	
	  
	   var  text_anket_tarihi=new Ext.form.TextField({
        id:'text_anket_tarihi',//****
        width:150,
        fieldLabel:'anket tarihi ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_anket_cesidi=new Ext.form.TextField({
        id:'text_anket_cesidi',//****
        width:150,
        fieldLabel:'anket çeşidi ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    }); 
	
	var  text_anket_yapilanbolge=new Ext.form.TextField({
        id:'text_anket_yapilanbolge',//****
        width:150,
        fieldLabel:'anket yapılan adres ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });
	var  text_anket_yapilanil=new Ext.form.TextField({
        id:'text_anket_yapilanil',//****
        width:150,
        fieldLabel:'anket yapılan il ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });
	var  text_anket_sonuclari=new Ext.form.TextField({
        id:'text_anket_sonuclari',//****
        width:150,
        fieldLabel:'anket sonuçları ',///***
        labelStyle:'font-weight: bold',
        readOnly:false
    });

var anket_ustform = new Ext.FormPanel({//**
	     frame: true,
	     title: 'Anket Bilgileri',//**
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
	           text_anket_tarihi,
			   text_anket_cesidi,
			   text_anket_yapilanbolge,
			   text_anket_yapilanil,
			   text_anket_sonuclari
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
              url: '../veri/php/anket_ekle.php', ////******
			  params:{
				  anket_tarihi: Ext.getCmp('text_anket_tarihi').getValue(),
				   anket_cesidi: Ext.getCmp('text_anket_cesidi').getValue(),
				   anket_yapilanbolge: Ext.getCmp('text_anket_yapilanbolge').getValue(),
				   anket_yapilanil: Ext.getCmp('text_anket_yapilanil').getValue(),
				   anket_sonuclari: Ext.getCmp('text_anket_sonuclari').getValue()
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object(); 
				 Ext.getCmp('text_anket_tarihi').setValue("");
				 Ext.getCmp('text_anket_cesidi').setValue("");
				 Ext.getCmp('text_anket_yapilanbolge').setValue("");
				 Ext.getCmp('text_anket_yapilanil').setValue("");
				 Ext.getCmp('text_anket_sonuclari').setValue("");
				 //**
				 storeanket.load();////****
     
  } 
});             
}})
				 ] // column #2 sonu
	         }]
	     }]
	 }); 
	
	
			var anketWindow =  new Ext.Window({//**
        title:'	Anket İşlemleri',//**
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
					anket_ustform//**
                ]
            }
        ]});   