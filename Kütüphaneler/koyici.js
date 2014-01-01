
  var Secilen_koyici_id;
  
   var storeKoyler = new Ext.data.JsonStore({
     fields:['gid', 'adi'],
          //url:'php/genislikyolal.php',
         url:'php/Filtre/koyyerlesimfiltre.php',
		 method: 'POST',  
		root:'roots',
        autoLoad:true
    });
  
   var storeIlceler_koyici = new Ext.data.JsonStore({
     fields:['id', 'adi'],
          //url:'php/genislikyolal.php',
         url:'php/ilceal.php',
		 method: 'POST',  
		root:'roots',
        autoLoad:true
    });
  
  
  
   
			
  
     var storeKoyiciYollar = new GeoExt.data.FeatureStore({
          fields: [
            {name: "adi",  type: "string"},
			{name: "kkn",  type: "string"},
			{name: "ilceadi", type: "string"},
			{name: "koy",  type: "string"} 
			 
          ],
          proxy: new GeoExt.data.ProtocolProxy({
              protocol: new OpenLayers.Protocol.WFS({
           url: "/geoserver/ows",
				//version: "1.1.0",
//url:"http://localhost:8080/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:koyici",
				
				//featureType: "tr_iller2",//poligon
				featureType: "koyici",//yollar
				featureNS: "http://cvm",
				srsName: "EPSG:4326",
				//geometryName:"the_geom",//poligon
				geometryName:"geom" //yollar
              })          }),
          layer: layer_koyici,
          addFeatureFilter: function(feature) {
            return feature.state !== OpenLayers.State.DELETE;
          }
        });
		
		var toggleGroup = "measure controls";
		
	
		
		
		   var gridPanelkoyiciYollar = new Ext.grid.EditorGridPanel({
           // title: "koyici YOLLAR OZNITELIK TABLOSU",
			collapsible:true,
		   // collapsed:true, 
            header: true,
            hideHeaders: false,
            disableSelection: true,
            columnLines: true,
            enableColumnResize: true,
            frame: true,
            clickToEdit: 2,
           // stripRwfs: false,
			stripeRows: true,
            viewConfig: {forceEdit: true, scrollOffset: 10,forceFit:true},
          region: "south",
          height: 500,
          store: storeKoyiciYollar, 
		  plugins:[new Ext.ux.grid.GridFilters({
            encode:true,
			autoReload: false, 
			local: true,  
            onCheckChange:function () { 
		    store.lastOptions.params.start = 0;  
            },
            filters:[
              //  {type:'string', dataIndex:'objectid'},
				{type:'string', dataIndex:'adi'},
				{type:'string', dataIndex:'kkn'},
				{type:'string', dataIndex:'ilceadi'},
				{type:'string', dataIndex:'koy'} 
				
			 
            ]
        })], 
          listeners: { 
            afteredit: function(e) {
              var feature = e.record.get("feature");
              if (feature.state !== OpenLayers.State.INSERT) {
                feature.state = OpenLayers.State.UPDATE;
              }
            } 
            
          },
          sm: new GeoExt.grid.FeatureSelectionModel({
           // selectControl: modifyControl.selectControl,
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
               /*{ 
				id:'objectid',
                header:"objectid",
                dataIndex:'objectid', 
                tooltip:'objectid',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,*/
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
                header:"KKNO",
                dataIndex:'kkn', 
                tooltip:'kkn',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				{ 
				id:'ilceadi',
                header:"İLÇE LİSTESİ",
                dataIndex:'ilceadi',   
			    width: 120,
			    editor: new Ext.form.ComboBox({
				store: storeIlceler_koyici,  
			    displayField:'adi',
                valueField:'adi',
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				selectOnFocus:true
				}),
			    hidden: false
				},
					{ 
				id:'koy',
                header:"KÖY LİSTESİ",
                dataIndex:'koy',   
			    width: 120,
			    editor: new Ext.form.ComboBox({
				store: storeKoyler,  
			    displayField:'adi',
                valueField:'adi',
				typeAhead: true,
				mode: 'local',
				triggerAction: 'all',
				selectOnFocus:true
				}),
			    hidden: false
			}
  
				
				
			  ]
          }),tbar:[
		  
new Ext.PagingToolbar({
           
            store: storeKoyiciYollar,
            displayInfo: true
           //,plugins: new Ext.ux.SlidingPager()
        })
 
		  
		  
		  ],	 bbar: [
				  
		 	 {   text: 'Uzunluk',
				 icon:'Images/uzunluk_olcum.png',
   				 enableToggle: true, 
				 toggleGroup: toggleGroup,
   				 handler: function(toggled){
				if (toggled) { length.activate(); } 
				else
				 { length.deactivate(); }}} 
		        ,{
					text: 'Alan',
					icon:'Images/alan_olcum.png',
					enableToggle: true, 
					toggleGroup: toggleGroup,
					handler: function(toggled){
						if (toggled) {
						area.activate();
						} else {
							area.deactivate();
						}
					}
					}, 
		   
            new GeoExt.Action({
		
            control: drawControl_koyici, 
            text: "EKLE",
			icon:'Images/add.png', 
            enableToggle: true,
			 handler: function() {
			koyiciYollarWindow.collapse();
			}
          }),
		  
		  
          {
            text: "SIL",
			icon:'Images/remove.png',
            handler: function() {
				Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Silinecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
              gridPanelkoyiciYollar.getSelectionModel().each(function(rec) {
                var feature = rec.get("feature");
				
				alert(feature);
                modifyControl_koyici.unselectFeature(feature);
                gridPanelkoyiciYollar.store.remove(rec);
                if (feature.state !== OpenLayers.State.INSERT) {
                  feature.state = OpenLayers.State.DELETE;
                  layer_koyici.addFeatures([feature]);
                }
              })
            }
			  else{
     
	 
   }
 })  		 
}},
          {
            text: "KAYDET",
			icon:'Images/save.png',
            handler: function() {
				 Ext.MessageBox.confirm('UYARI', 'Yeni Bir Kayıt Eklenecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
			  storeKoyiciYollar.proxy.protocol.commit(
						layer_koyici.features, {
						    callback: function () {
  OpenLayers.ProxyHost = "proxy.php?url=";	
								var layers = app.mapPanel.map.layers;
								 
								for (var i=layers.length-1; i>=0; --i) {
									layers[i].redraw(true);
								}
								app.featureGrid.store.reload();
							}
						});
            }
			   else{
     
	 
   }
 }) 	  
   }}, 
       
          {
            text: "Kırılım Noktaları",
			icon:'Images/node.jpg',
            handler: function() {
               
			   new Ext.Window({
    title : "SECILEN NESNENIN KIRILIM NOKTALARI",
     
    items : [{
        xtype : "component",
        id    : 'iframe-win',  
        autoEl : {
            tag : "iframe",
            src : "php/wkt.php?objectid="+global_kaydedilecek_yolid+""
        }
    }]
}).show(); 
Ext.getDom('iframe-win').src = "php/wkt.php?objectid="+global_kaydedilecek_yolid+""; 
			  
            }},
          {
            text: "Uzunluk",
			icon:'Images/node.jpg',
            handler: function() {
               
			   new Ext.Window({
    title : "SECILEN YOLUN UZUNLUGU",
     
    items : [{
        xtype : "component",
        id    : 'iframe-win',  
        autoEl : {
            tag : "iframe",
            src : "php/uzunlukal.php?objectid="+global_kaydedilecek_yolid+""
        }
    }]
}).show(); 
Ext.getDom('iframe-win').src = "php/uzunlukal.php?objectid="+global_kaydedilecek_yolid+""; 
			  
            }},
			
						new Ext.Button({
             text:'Detay Ekle', 
			 width:150,
			icon:'Images/add.png',
            handler: function() {  
			 
  koyiciYollar_DetayWindow.show();
    }})
		 ]  
		  
        });
	
	
			 var exportButton_gridPanelkoyiciYollar = new Ext.ux.Exporter.Button({
          component: gridPanelkoyiciYollar,
          text     : "EXCEL" 
        });
		 gridPanelkoyiciYollar.getTopToolbar().add(exportButton_gridPanelkoyiciYollar);
	
	gridPanelkoyiciYollar.on('rowclick', function (g, rowIdx, r) {
		
alert("deneme");

alert(layer_koyici.features[rowIdx].geometry.getBounds());

alert(layer_koyici.features[rowIdx].geometry.data.gid);


    var sinir = layer_koyici.features[rowIdx].geometry.getBounds();
    var splittedBounds = sinir.toString().replace(")", "").replace("(", "").replace("left-bottom=", "").replace("right-top=", "").replace(")", "").replace("(", "").split(" ");
    var splittedBounds2 = splittedBounds.toString().split(","); 
    var bounds = new OpenLayers.Bounds();
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[0].replace(",", "."), splittedBounds2[1].replace(",", ".")));
    bounds.extend(new OpenLayers.LonLat(splittedBounds2[2].replace(",", "."), splittedBounds2[3].replace(",", "."))); 
    map.zoomToExtent(bounds);
    map.setCenter(mapPanel.map.getCenter(), 10);

});
		
		 
		 
		 
		 
	
		 
		  
   		
        var   PanelkoyiciYollar = new Ext.FormPanel({
        id:'PanelkoyiciYollar',
        header:false,
         items:[
            
			gridPanelkoyiciYollar
        ]
    });    
		var koyiciYollarWindow =  new Ext.Window({
      //  title:'koyici Karayolları',
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
                title:'Köyici Yol Öznitelikleri',
                margins:'3 3 3 3',
                frame:true,
                collapsible:false,
                items:[
                   PanelkoyiciYollar 
                ]
            }
        ]
		 }); 
		 
////////////////////////////////////////////////////////////////////////////////////////
 