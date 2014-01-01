	 
function genislikblokGuncelle(oGrid_event){
	Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Güncellenecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
   Ext.Ajax.request({   
   url:'php/genislikblok_duzenle.php',//**
	 // method: 'POST', 
      params: {//**
         gid: oGrid_event.record.data.gid,
         anaobjeid: oGrid_event.record.data.anaobjeid,
         kmbaslangic: oGrid_event.record.data.kmbaslangic,
         kmbitis: oGrid_event.record.data.kmbitis, 
         yapimyili: oGrid_event.record.data.yapimyili,
		 genislik: oGrid_event.record.data.genislik,
        
         
		 
		 	 
		 
      }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            storegenislikblok.commitChanges(); //**
            storegenislikblok.reload(); //**
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
  else{
     
	 
   }
 })
  } 
 
	
	 var storegenislikblok = new Ext.data.JsonStore({
     fields:['gid', 'anaobjeid', 'kmbaslangic', 'kmbitis','yapimyili','genislik'],
          //url:'php/genislikyolal.php',
         url:'php/Filtre/genislikyolfiltre.php',
		                  method: 'POST', 
		
		root:'roots',
        autoLoad:true
    });
    var sm_genislikblok = new Ext.grid.CheckboxSelectionModel({
        listeners:{
            selectionchange:function (selModel) {
              
			     var secilengenislikyolgid=selModel.selections.items[0].data.gid; 
	Ext.Ajax.request({
    loadMask: true,
    url: 'php/BOX2d/box2d_genislikyol.php',
	method: 'GET', 
    params: {yolid: secilengenislikyolgid},
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

			  
			  
            }
        }
    });
	

	
    var gridPanelgenislikblok = new Ext.grid.GridPanel({
        id:"gridPanelgenislikblok",
	    selModel:sm_genislikblok,
        store:storegenislikblok,
        border:false,
        frame:true,
        columnLines:true, 
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
                tooltip:'yapimyili',
				sortable:true,
                editor:new Ext.form.NumberField() ,
                allowNegative: false, // hepsinde false
		allowBlank: false, // gerekli alanlar false, diğerleri true
		allowDecimals: true, // tam sayı girilecek alanlar true, ondalıklılar false
				}    ,
				 
				{ 
				id:'genislik',
                header:"YOL BLOK GENISLIGI",
                dataIndex:'genislik', 
                tooltip:'genislik',
				sortable:true,
                editor:new Ext.form.NumberField() ,
                allowNegative: false, // hepsinde false
		allowBlank: false, // gerekli alanlar false, diğerleri true
		allowDecimals: true, // tam sayı girilecek alanlar true, ondalıklılar false
				} 
        ],
		   tbar: [  
          {
            text: "KAYDET",
			icon:'Images/save.png',
            handler: function() {
				
		  	 Ext.MessageBox.confirm('UYARI', 'Yeni Bir Kayıt Eklenecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
		  var yolid_genislikblok="";
		  gridPanelgenislikblokMevcutgenislikyollar.getSelectionModel().each(function(rec) {
                  yolid_genislikblok = rec.get("objectid"); }) ;
				     
				  
			  var p_genislikblok = new OpenLayers.Protocol.HTTP({
 url: "php/Ekleme/genislikyol.php?baslangic="+textBaslangicKm_genislikyol.getValue()+"&bitis="+textBitisKm_genislikyol.getValue()+"&yolid="+yolid_genislikblok+"&yil="+comboYapimYili_genislikyol.getValue()+"&genislik="+textgenislik_genislikyol.getValue()+""});  
 
 		 storegenislikblok.baseParams = { 
   		anaobjeid: yolid_genislikblok
            	}; 
   		    storegenislikblok.reload();
p_genislikblok.read({
    callback: function(r) {   

	
    } 	
});  
   
   } else{
     
	 
   }
 }) 	  
   }},
          {
            text: "SIL",
			icon:'Images/remove.png',
            handler: function() {
				Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Silinecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
              gridPanelgenislikblok.getSelectionModel().each(function(rec) {
              /*  var genislikblok_bas = rec.get("kmbaslangic");
				var genislikblok_bit = rec.get("kmbitis"); 
			    var genislikblok_anaobje = rec.get("anaobjeid");
				var genislikblok_yil = rec.get("yapimyili");  */
				
				var genislikblok_gid= rec.get("objectid");   
				
	var p_genislikbloksil = new OpenLayers.Protocol.HTTP({
   // url: "http://localhost:2627/genislikyolsil.php?baslangic="+genislikblok_bas+"&bitis="+genislikblok_bit+"&ana="+global_kaydedilecek_yolid+"&yil="+genislikblok_yil+""}); 
	  url: "php/Silme/genislikyolsil.php?gid="+genislikblok_gid}); 
	
	p_genislikbloksil.read({
    callback: function(r) {
        console.log("received featured: " + r.features);
	  /*var refresh = new OpenLayers.Strategy.Refresh({force: true, active: true});  
	 layergenislikyolparca.refresh({force: true});  
		
		    gridPanelgenislikblok.store = storegenislikblok;
			storegenislikblok.load();
			gridPanelgenislikblok.getView().refresh();*/
			
				 storegenislikblok.baseParams = { 
   		          anaobjeid: global_kaydedilecek_yolid
            	}; 
   		    storegenislikblok.reload();
    }
});   
}) 
}
else{
     
	 
   }
 })  		 
}}] ,
        title:'YOL GENİŞLİKLERİ',
		bbar:[
new Ext.PagingToolbar({
           
            store: storegenislikblok,
            displayInfo: true
           //,plugins: new Ext.ux.SlidingPager()
        })
],
        height:250
    });
	
	
		 var exportButton_gridPanelgenislikblok = new Ext.ux.Exporter.Button({
          component: gridPanelgenislikblok,
          text     : "EXCEL" 
        });
		 gridPanelgenislikblok.getTopToolbar().add(exportButton_gridPanelgenislikblok);
		
	 
	///////////////////////////////////////// 
	
		     var storegenislikblokMevcutgenislikyollar = new GeoExt.data.FeatureStore({
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
				featureType: "bilecikyollardb",//genislikyollar
				featureNS: "http://cvm",
				srsName: "EPSG:900913",
				//geometryName:"the_geom",//poligon
				geometryName:"geom" //genislikyollar
              })
          }),
          layer: layer,
          addFeatureFilter: function(feature) {
            return feature.state !== OpenLayers.State.DELETE;
          }
        });
		
		
		   var gridPanelgenislikblokMevcutgenislikyollar = new Ext.grid.EditorGridPanel({
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
          store: storegenislikblokMevcutgenislikyollar, 
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
           
            store: storegenislikblokMevcutgenislikyollar,
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
			   storegenislikblok.baseParams = { 
   			anaobjeid: ""///TÜM KAYITLAR GÖSTERİLİYOR
            	}; 
   		    storegenislikblok.reload();
    }}]
        });
	
	
	gridPanelgenislikblokMevcutgenislikyollar.on('rowclick', function (g, rowIdx, r) {
  
   storegenislikblok.baseParams = { 
   		anaobjeid: layer.features[rowIdx].attributes.objectid
            	}; 
   		    storegenislikblok.reload();
  
/*  textgenislikyolUzunlugu.setValue(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:4326"))-10);
  textBitisKm_genislikyol.setValue(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:4326"))-10);*/ 
  textgenislikyolUzunlugu.setValue(Math.floor(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"))));
  textBitisKm_genislikyol.setValue(Math.floor(layer.features[rowIdx].geometry.getGeodesicLength(new OpenLayers.Projection("EPSG:900913"))));
  
   
  
	 //textgenislikyolUzunlugu.setValue(layer.features[rowIdx].geometry.getLength());
	 
   
   var sinir = layer.features[rowIdx].geometry.getBounds();
    var splittedBounds = sinir.toString().replace(")", "").replace("(", "").replace("left-bottom=", "").replace("right-top=", "").replace(")", "").replace("(", "").split(" ");
    var splittedBounds2 = splittedBounds.toString().split(","); 
    var bounds = new OpenLayers.Bounds();
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[0].replace(",", "."), splittedBounds2[1].replace(",", ".")));
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[2].replace(",", "."), splittedBounds2[3].replace(",", "."))); 
    map.zoomToExtent(bounds);
    map.setCenter(mapPanel.map.getCenter(), 10);
	

	
});

/* 
gridPanelgenislikblok.on('rowclick', function (g, rowIdx, r) {
    var sinir = layergenislikyolparca.features[rowIdx].geometry.getBounds();
    var splittedBounds = sinir.toString().replace(")", "").replace("(", "").replace("left-bottom=", "").replace("right-top=", "").replace(")", "").replace("(", "").split(" ");
    var splittedBounds2 = splittedBounds.toString().split(","); 
    var bounds = new OpenLayers.Bounds();
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[0].replace(",", "."), splittedBounds2[1].replace(",", ".")));
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[2].replace(",", "."), splittedBounds2[3].replace(",", "."))); 
    map.zoomToExtent(bounds);
    map.setCenter(mapPanel.map.getCenter(), 10);
	


});
*/
   
		
		 var global_kaydedilecek_yolid=""; 
		 var yapimyili =
[['2014'],['2013'],['2012'],['2011'],['2010'],['2009'],['2008'],['2007'],['2006'],['2005'],['2004'],['2003'],['2002'],['2001'],[  	'2000'],['1999'],['1998'],['1997'],['1996'],['1995'],['1994'],['1993'],['1992'],['1991'],['1990'],['1989'],['1988'],['1987'],['1986'],['1985'],['1984'],['1983'],['1982'],['1981'],['1980'],['1979'],['1978'],['1977'],['1976'],['1975'],['1974'],['1973'],['1972'],['1971'],['1970'],['1969'],['1968'],['1967'],['1966'],['1965'],['1964'],['1963'],['1962'],['1961'],['1960'],['1959'],['1958'],['1957'],['1956'],['1955'],['1954'],['1953'],['1952'],['1951'],['1950']];

  		var yapimyilistore = new Ext.data.ArrayStore({
    	 fields: ['yapimyili'],
     	data : yapimyili  
		  });  
		   
		
	    var comboYapimYili_genislikyol=new Ext.form.ComboBox({
        id:'comboYapimYili_genislikyol',
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
		
	 
	  var   textgenislikyolUzunlugu=new Ext.form.NumberField({
        id:'textgenislikyolUzunlugu',
        width:150,
        fieldLabel:'Yol Uzunluğu ',
        labelStyle:'font-weight: bold',
        readOnly:true
    });
	 
   var   textBaslangicKm_genislikyol=new Ext.form.NumberField({
        id:'textBaslangicKm_genislikyol',
        width:150,
        fieldLabel:'Başlangıç Metresi ',
        labelStyle:'font-weight: bold',
        readOnly:false,
		allowNegative: false,
		allowBlank: false,
		allowDecimals: false
    });

  var  textBitisKm_genislikyol=new Ext.form.NumberField({
        id:'textBitisKm_genislikyol',
        width:150,
        fieldLabel:'Bitiş Metresi ',
        labelStyle:'font-weight: bold',
        readOnly:false,
		allowNegative: false,
		allowBlank: false,
		allowDecimals: false
    });  
	  var  textgenislik_genislikyol=new Ext.form.NumberField({
        id:'textgenislik_genislikyol',
        width:150,
        fieldLabel:'Yol Blok Genişliği ',
        labelStyle:'font-weight: bold',
        readOnly:false,
		allowNegative: false,
		allowBlank: false,
		allowDecimals: false
    });  
     
	
	var genislikyol_ustform = new Ext.FormPanel({
	     frame: true,
	     title: 'YOL GENİŞLİK BİLGİLERİ',
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
	                textgenislikyolUzunlugu,
			comboYapimYili_genislikyol,
			textgenislik_genislikyol
	             ] //column #1 sonu
	         }, {
	             columnWidth: .50,
	             layout: 'form',
	             items: [  
				textBaslangicKm_genislikyol,
            textBitisKm_genislikyol,  
				 ] // column #2 sonu
	         }]
	     }]
	 }); 
	
	
		var genislikyolWindow =  new Ext.Window({
        title:'YOL GENİŞLİK İŞLEMLERİ',
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
					   gridPanelgenislikblokMevcutgenislikyollar,
					   genislikyol_ustform,
					   gridPanelgenislikblok
                ]
            }
        ]});  