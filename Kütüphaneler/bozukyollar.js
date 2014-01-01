	 
//////////////////////////**************BOZUK YOLLAR//////////////////////////// 
		 var yapimyili =
[['2014'],['2013'],['2012'],['2011'],['2010'],['2009'],['2008'],['2007'],['2006'],['2005'],['2004'],['2003'],['2002'],['2001'],['2000'],['1999'],['1998'],['1997'],['1996'],['1995'],['1994'],['1993'],['1992'],['1991'],['1990'],['1989'],['1988'],['1987'],['1986'],['1985'],['1984'],['1983'],['1982'],['1981'],['1980'],['1979'],['1978'],['1977'],['1976'],['1975'],['1974'],['1973'],['1972'],['1971'],['1970'],['1969'],['1968'],['1967'],['1966'],['1965'],['1964'],['1963'],['1962'],['1961'],['1960'],['1959'],['1958'],['1957'],['1956'],['1955'],['1954'],['1953'],['1952'],['1951'],['1950']];

  		var yapimyilistore = new Ext.data.ArrayStore({
    	 fields: ['yapimyili'],
     	data : yapimyili  
		  });  




 
 
 
   function bozukYolGuncelle(oGrid_event){
  
  
  	 Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Güncellenecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
      
	     Ext.Ajax.request({   
   url:'php/Duzenleme/bozukyolduzenle.php',
	 // method: 'POST', 
      params: {
         id: oGrid_event.record.data.gid,
         baslangic: oGrid_event.record.data.kmbaslangic,
         bitis: oGrid_event.record.data.kmbitis,
         yolid: oGrid_event.record.data.anaobjeid, 
         yil: oGrid_event.record.data.yapimyili
      }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            storebozukblok.commitChanges(); 
            storebozukblok.reload(); 
            break;					
         default:
            Ext.MessageBox.alert('Uyarı...','Değişiklik Kaydedilemedi...');
            break;
         }
      },
      failure: function(response){
         var result=response.responseText;
         Ext.MessageBox.alert('HATA!','Veritabanı Bağlantısı Başarısız Oldu. Yeniden Deneyiniz...');		
      }									    
   }); 
	  
   }
   else{
     
	 
   }
 })
  } 
  

 
  
	 var storebozukblok = new Ext.data.JsonStore({
     fields:['gid', 'anaobjeid', 'kmbaslangic', 'kmbitis','yapimyili'], 
      url:'php/Filtre/bozukyolfiltre.php',
      method: 'POST',  
      root:'roots',
      autoLoad:true
    });
 
    var sm_bozukblok = new Ext.grid.CheckboxSelectionModel({
        listeners:{
            selectionchange:function (selModel) {
              
    var secilenbozukyolgid=selModel.selections.items[0].data.gid; 
	Ext.Ajax.request({
    loadMask: true,
    url: 'php/BOX2D/box2d_bozukyol.php',
	method: 'GET', 
    params: {yolid: secilenbozukyolgid},
    success: function(response, callOptions) {
    var decodedResponse = Ext.decode(response.responseText); 
    var splittedBounds=decodedResponse.toString().replace(")", "").replace("(", "").replace("BOX", "").replace(" ",",").replace(" ",","); 
	var splittedBounds2 = splittedBounds.toString().split(","); 
    var bounds = new OpenLayers.Bounds();
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[0].replace(",", "."), splittedBounds2[1].replace(",", ".")));
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[2].replace(",", "."), splittedBounds2[3].replace(",", "."))); 
    map.zoomToExtent(bounds);
    map.setCenter(mapPanel.map.getCenter(), 10); 
    } 
	}); 
  }} 
});
 
		 
	
	 var gridPanelbozukblok = new Ext.grid.EditorGridPanel({
        id:"gridPanelbozukblok",
	    selModel:sm_bozukblok,
        store:storebozukblok,
        border:false,
        frame:true,
        columnLines:true, 
		title:"Bozuk Yollar",
		disableSelection:true,
		editable: true,
		enableColLock:false,
		clickToEdit: 2,
        viewConfig: {forceFit:true}, 
		
        columns:[
             new Ext.grid.RowNumberer(),
               { 
				id:'gid',
                header:"SIRA NO",
                dataIndex:'gid', 
                tooltip:'gid',
				sortable:true,
                editor:new Ext.form.TextField() 
				} , 
				{ 
				id:'anaobjeid',
                header:"BAGLI OLDUGU YOL",
                dataIndex:'anaobjeid', 
                tooltip:'anaobjeid',
				sortable:true,
                editor:new Ext.form.NumberField() ,
                allowNegative: false, // hepsinde false
		allowBlank: false, // gerekli alanlar false, diğerleri true
		allowDecimals: true, // tam sayı girilecek alanlar true, ondalıklılar false
				} ,
				 
				{ 
				id:'kmbaslangic',
                header:"BASLANGIC METRESİ",
                dataIndex:'kmbaslangic', 
                tooltip:'kmbaslangic',
				sortable:true,
                editor:new Ext.form.NumberField() ,
                allowNegative: false, // hepsinde false
		allowBlank: false, // gerekli alanlar false, diğerleri true
		allowDecimals: true, // tam sayı girilecek alanlar true, ondalıklılar false
				} ,
				{ 
				id:'kmbitis',
                header:"BITIS METRESİ",
                dataIndex:'kmbitis', 
                tooltip:'kmbitis',
				sortable:true,
                editor:new Ext.form.NumberField() ,
                allowNegative: false, // hepsinde false
		allowBlank: false, // gerekli alanlar false, diğerleri true
		allowDecimals: true, // tam sayı girilecek alanlar true, ondalıklılar false
				} ,
				{ 
				id:'yapimyili',
				header:"YAPIM YILI",
				dataIndex:'yapimyili',   
			    width: 120,
			    editor: new Ext.form.ComboBox({
				store: yapimyilistore,  
				displayField:'yapimyili', 
				valueField:'yapimyili',
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				selectOnFocus:true
				}),
			  hidden: false
			}],
		   tbar: [
          {
			  
            text: "KAYDET",
			icon:'Images/save.png',
            handler: function() {
		  
		  	 Ext.MessageBox.confirm('UYARI', 'Yeni Bir Kayıt Eklenecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
      
	  
	  var yolid_bozukblok=""; 
	  
		  gridPanelbozukblokMevcutbozukyollar.getSelectionModel().each(function(rec) {
                  yolid_bozukblok = rec.get("objectid"); }) ; 
				  
				  Ext.Ajax.request({ 
              url: 'php/Ekleme/bozukyol.php', 
			  params:{

				   baslangic: Ext.getCmp('textBaslangicKm_bozukyol').getValue(),
				   bitis: Ext.getCmp('textBitisKm_bozukyol').getValue(),
				   yolid: yolid_bozukblok,
				   yil: Ext.getCmp('comboYapimYili_bozukyol').getValue() 
			 
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object(); 
				 Ext.getCmp('textBaslangicKm_bozukyol').setValue("");
				 Ext.getCmp('textBitisKm_bozukyol').setValue("");
				 Ext.getCmp('comboYapimYili_bozukyol').setValue(""); 
				 Ext.getCmp('textbozukyolUzunlugu').setValue(""); 
				 
				 
				 
		storebozukblok.baseParams = { 
   		anaobjeid: yolid_bozukblok
            	}; 
   		    storebozukblok.reload();
     
  } 
});     
   
   }
   else{
     
	 
   }
 })
		  
		  
   }} ,
          {
            text: "SIL",
			icon:'Images/remove.png',
            handler: function() {
             
				 Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Silinecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
       gridPanelbozukblok.getSelectionModel().each(function(rec) { 
	var bozukblok_gid= rec.get("gid");   
				
	var p_bozukbloksil = new OpenLayers.Protocol.HTTP({ 
	  url: "php/Silme/bozukyolsil.php?gid="+bozukblok_gid});  
	p_bozukbloksil.read({
    callback: function(r) {
        console.log("received featured: " + r.features);
	  /*var refresh = new OpenLayers.Strategy.Refresh({force: true, active: true});  
	 layerbozukyolparca.refresh({force: true});  
		
		    gridPanelbozukblok.store = storebozukblok;
			storebozukblok.load();
			gridPanelbozukblok.getView().refresh();*/
			
				 storebozukblok.baseParams = { 
   		          anaobjeid: ""
            	}; 
   		    storebozukblok.reload();
    }
});   
}) 
	  
	  
   }
   else{
     
	 
   }
 }) 
			 
			 
}}] ,
bbar:[
new Ext.PagingToolbar({
           
            store: storebozukblok,
            displayInfo: true
           //,plugins: new Ext.ux.SlidingPager()
        })
],
         
        height:250
    });
	 
	 
	 gridPanelbozukblok.on('afteredit',bozukYolGuncelle);
   
	 var exportButton_gridPanelbozukblok = new Ext.ux.Exporter.Button({
          component: gridPanelbozukblok,
          text     : "EXCEL" 
        });
		 gridPanelbozukblok.getTopToolbar().add(exportButton_gridPanelbozukblok);
		
  
	 
	///////////////////////////////////////// 
	
		     var storebozukblokMevcutbozukyollar = new GeoExt.data.FeatureStore({
          fields: [
             {name: "objectid",  type: "string"},
			{name: "adi",  type: "string"},
			{name: "kkn",  type: "string"},
			{name: "ilceadi",  type: "string"}
          ],
          proxy: new GeoExt.data.ProtocolProxy({
              protocol: new OpenLayers.Protocol.WFS({
          		url: "/geoserver/ows",
				version: "1.1.0",
				//featureType: "tr_iller2",//poligon
				featureType: "bilecikyollardb",//bozukyollar
				featureNS: "http://cvm",
				srsName: "EPSG:900913",
				//geometryName:"the_geom",//poligon
				geometryName:"geom" //bozukyollar
              })
          }),
          layer: layer,
          addFeatureFilter: function(feature) {
            return feature.state !== OpenLayers.State.DELETE;
          }
        });
		
		
		   var gridPanelbozukblokMevcutbozukyollar = new Ext.grid.EditorGridPanel({
            title: "MEVCUT  KARAYOLLARI OZNITELIK TABLOSU",
			collapsible:true,
		   // collapsed:true, 
            header: true,
            hideHeaders: false,
            disableSelection: true,
            columnLines: true,
            enableColumnResize: true,
            frame: true,
            clickToEdit: 2,
            stripRows: false,
			autoReload: true,
            viewConfig: {forceEdit: true, scrollOffset: 10},
           region: "south",
           height: 250,
           store: storebozukblokMevcutbozukyollar, 
		   plugins:[new Ext.ux.grid.GridFilters({
            encode:true,
			autoReload: false, 
			local: true,  
            onCheckChange:function () { 
		    store.lastOptions.params.start = 0;  
            },
            filters:[
                 {type:'string', dataIndex:'objectid'},
				{type:'string', dataIndex:'adi'},
				{type:'string', dataIndex:'kkn'},
				{type:'string', dataIndex:'ilceadi'}
            ]
        })],
		  bbar:[new Ext.PagingToolbar({
           
            store: storebozukblokMevcutbozukyollar,
            displayInfo: true,
            plugins: new Ext.ux.SlidingPager()
        }) ],
          listeners: { 
            afteredit: function(e) {
              var feature = e.record.get("feature");
              if (feature.state !== OpenLayers.State.INSERT) {
                feature.state = OpenLayers.State.UPDATE;
              }
            }
          },
          sm: new GeoExt.grid.FeatureSelectionModel({
            selectControl: modifyControl.selectControl,
            singleSelect: true
          }), 
          cm: new Ext.grid.ColumnModel({
              defaults: {
                  sortable: true,
                  editor: {
                      xtype: "textfield"
                  }
              }, 
              columns: 
			  [ new Ext.grid.RowNumberer(),
                { 
				id:'objectid',
                header:"SIRA NO",
                dataIndex:'objectid', 
                tooltip:'objectid',
				sortable:true,
                editor:new Ext.form.TextField() 
				} , 
				 { 
				id:'adi',
                header:"YOL ADI",
                dataIndex:'adi', 
                tooltip:'adi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				 { 
				id:'kkn',
                header:"KKN",
                dataIndex:'kkn', 
                tooltip:'kkn',
				sortable:true,
                editor:new Ext.form.TextField()
				} , { 
				id:'ilceadi',
                header:"ILCE",
                dataIndex:'ilceadi', 
                tooltip:'ilceadi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} 
			  ]
          }),	   bbar: [  {
            text: "Tüm  Kayıtları Göster",
			icon:'Images/16/listele.png',
            handler: function() { 
			   storebozukblok.baseParams = { 
   			anaobjeid: ""///TÜM KAYITLAR GÖSTERİLİYOR
            	}; 
   		    storebozukblok.reload();
    }}]
        });
	
	
	gridPanelbozukblokMevcutbozukyollar.on('rowclick', function (g, rowIdx, r) {
  
     storebozukblok.baseParams = { 
   		anaobjeid: layer.features[rowIdx].attributes.objectid
            	}; 
   		    storebozukblok.reload();
  
/*  textbozukyolUzunlugu.setValue(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:4326"))-10);
  textBitisKm_bozukyol.setValue(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:4326"))-10);*/ 
  textbozukyolUzunlugu.setValue(Math.floor(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"))));
  textBitisKm_bozukyol.setValue(Math.floor(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"))));
   
     
   var sinir = layer.features[rowIdx].geometry.getBounds();
    var splittedBounds = sinir.toString().replace(")", "").replace("(", "").replace("left-bottom=", "").replace("right-top=", "").replace(")", "").replace("(", "").split(" ");
    var splittedBounds2 = splittedBounds.toString().split(","); 
    var bounds = new OpenLayers.Bounds();
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[0].replace(",", "."), splittedBounds2[1].replace(",", ".")));
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[2].replace(",", "."), splittedBounds2[3].replace(",", "."))); 
    map.zoomToExtent(bounds);
    map.setCenter(mapPanel.map.getCenter(), 10); 
}); 	
	  	
	    var comboYapimYili_bozukyol=new Ext.form.ComboBox({
        id:'comboYapimYili_bozukyol',
		fieldLabel:'Kayıt Yılı ',
        labelStyle:'font-weight: bold',
        store:yapimyilistore,
        mode:'local',
        width:150,
        lazyRender:true,
        triggerAction:'all',
        displayField:'yapimyili',
        valueField:'yapimyili',
        disableKeyFilter:true,
        typeAhead:false,
        emptyText:'Kayıt Yılını Seçiniz ...',
        hideLabel:false 
    });
		
	 
	  var   textbozukyolUzunlugu=new Ext.form.TextField({
        id:'textbozukyolUzunlugu',
        width:150,
        fieldLabel:'Yol Uzunluğu ',
        labelStyle:'font-weight: bold',
		allowNegative: false, // hepsinde false
		allowBlank: false, // gerekli alanlar false, diğerleri true
		allowDecimals: true, // tam sayı girilecek alanlar true, ondalıklılar false
        readOnly:true
    });
	 
   var   textBaslangicKm_bozukyol=new Ext.form.NumberField({
        id:'textBaslangicKm_bozukyol',
        width:150,
        fieldLabel:'Başlangıç Metresi ',
        labelStyle:'font-weight: bold',
		allowNegative: false,
		allowBlank: false,
		allowDecimals: false,
        readOnly:false
    });

  var  textBitisKm_bozukyol=new Ext.form.NumberField({
        id:'textBitisKm_bozukyol',
        width:150,
        fieldLabel:'Bitiş Metresi ',
        labelStyle:'font-weight: bold',
		allowNegative: false,
		allowBlank: false,
		allowDecimals: false,
        readOnly:false
    });  
     
	
	var bozukyol_ustform = new Ext.FormPanel({
	     frame: true,
	     title: 'YOL BOZUKLUK BİLGİLERİ',
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
	                textbozukyolUzunlugu,
			comboYapimYili_bozukyol
	             ] //column #1 sonu
	         }, {
	             columnWidth: .50,
	             layout: 'form',
	             items: [  
				textBaslangicKm_bozukyol,
            textBitisKm_bozukyol,  
				 ] // column #2 sonu
	         }]
	     }]
	 }); 
	
		  
	
	
	
		var bozukyolWindow =  new Ext.Window({
        title:'YOL BOZUKLUK İŞLEMLERİ',
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
					   gridPanelbozukblokMevcutbozukyollar,
					   bozukyol_ustform,
					   gridPanelbozukblok
                ]
            }
        ] 
		
		});  