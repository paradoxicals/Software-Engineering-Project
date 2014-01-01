 
		    var storeMevcutkoyyerlesimler = new Ext.data.JsonStore({
        fields:['gid', 'objectid', 'adi'],
        url:'php/Filtre/koyyerlesimfiltre.php',
        root:'roots',
        autoLoad:true
    });
	 
   function bozukYolGuncelle(oGrid_event){
	    Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Güncellenecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
   Ext.Ajax.request({   
   url:'php/Duzenleme/koyyerlesimduzenle.php',
	 // method: 'POST', 
      params: {
         id: oGrid_event.record.data.gid,
         objectid: oGrid_event.record.data.objectid,
         adi: oGrid_event.record.data.adi
        
      }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            storeMevcutkoyyerlesimler.commitChanges(); 
            storeMevcutkoyyerlesimler.reload(); 
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
	    
    var sm_koyyerlesim = new Ext.grid.CheckboxSelectionModel({
        listeners:{
            selectionchange:function (selModel) {
                
					var secilenkoyyerlesimgid=selModel.selections.items[0].data.gid; 
					console.log(secilenkoyyerlesimgid);
	Ext.Ajax.request({
    loadMask: true,
    url: 'php/BOX2d/box2d_koyyerlesim.php',
	method: 'GET', 
    params: {yolid: secilenkoyyerlesimgid},
    success: function(response, callOptions) {
    var decodedResponse = Ext.decode(response.responseText); 
	console.log(decodedResponse);
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
	
	
		var secilen_koy_yerlesim_id="";
		
		 			 
		 
		 
		
		 
		   var gridPanelMevcutkoyyerlesimler = new Ext.grid.EditorGridPanel({
            title: "MEVCUT KOY YERLESIM OZNITELIK TABLOSU",
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
			
            viewConfig: {forceEdit: true, scrollOffset: 10},
          region: "south",
          height: 500,
          store: storeMevcutkoyyerlesimler, 
		  plugins:[new Ext.ux.grid.GridFilters({
            encode:true,
			autoReload: false, 
			local: true,  
            onCheckChange:function () { 
		    store.lastOptions.params.start = 0;  
            },
            filters:[ 
				    {type:'string', dataIndex:'gid'} ,
		
			    {type:'string', dataIndex:'objectid'} ,
		   {type:'string', dataIndex:'adi'} 
				 
            ]
        })], 
            selModel:sm_koyyerlesim,
           
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
				id:'gid',
                header:"SIRA NO",
                dataIndex:'gid', 
                tooltip:'gid',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
			     { 
				id:'objectid',
                header:"ID",
                dataIndex:'objectid', 
                tooltip:'objectid',
				sortable:true,
                editor:new Ext.form.TextField() 
				} ,
				 { 
				id:'adi',
                header:"KOY YERLESIM ADI",
                dataIndex:'adi', 
                tooltip:'adi',
				sortable:true,
                editor:new Ext.form.TextField() 
				} 
			  ]
          }) ,
		  tbar:[
		  
new Ext.PagingToolbar({
           
            store: storeMevcutkoyyerlesimler,
            displayInfo: true
           //,plugins: new Ext.ux.SlidingPager()
        })

		  
		  ],
		  bbar:[
		 /*  new GeoExt.Action({
		
            control: drawControl_koy_yerlesim, 
            text: "EKLE",
			icon:'Images/add.png', 
            enableToggle: true,
			 handler: function() {
			koyyerlesimWindow.collapse();
			}
          }),
          {
            text: "SIL",
			icon:'Images/remove.png',
            handler: function() {
           /*   gridPanelMevcutYollar.getSelectionModel().each(function(rec) {
                var feature = rec.get("feature");
                modifyControl.unselectFeature(feature);
                gridPanelMevcutYollar.store.remove(rec);
                if (feature.state !== OpenLayers.State.INSERT) {
                  feature.state = OpenLayers.State.DELETE;
                  layer.addFeatures([feature]);
                }
              })
            }},
          {
            text: "KAYDET",
			icon:'Images/save.png',
            handler: function() {
			  storeMevcutkoyyerlesimler.proxy.protocol.commit(
						koy_yerlesim_wfs.features, {
						    callback: function () {
  OpenLayers.ProxyHost = "proxy.php?url=";	
								var layers = app.mapPanel.map.layers;
								 
								for (var i=layers.length-1; i>=0; --i) {
									layers[i].redraw(true);
								}
								app.featureGrid.store.reload();
							}
						}); 
            }}, */
          {
            text: "Alan",
			icon:'Images/node.jpg',
            handler: function() {
               
			    gridPanelMevcutkoyyerlesimler.getSelectionModel().each(function(rec) {
                   secilen_koy_yerlesim_id = rec.get("objectid");
				     }) ;
			   
			   new Ext.Window({
    title : "SECILEN KOYUN ALANI",
     
    items : [{
        xtype : "component",
        id    : 'iframe-win',  
        autoEl : {
            tag : "iframe",
            src : "php/uzunlukal.php?objectid="+secilen_koy_yerlesim_id+""
        }
    }]
}).show(); 
Ext.getDom('iframe-win').src = "php/alanal.php?objectid="+secilen_koy_yerlesim_id+""; 
			  
            }},
          {
            text: "Çevre",
			icon:'Images/node.jpg',
            handler: function() {
               
			       gridPanelMevcutkoyyerlesimler.getSelectionModel().each(function(rec) {
                   secilen_koy_yerlesim_id = rec.get("objectid");
				     }) ;
		
			   
			   new Ext.Window({
    title : "SECILEN KOYUN CEVRESI",
     
    items : [{
        xtype : "component",
        id    : 'iframe-win',  
        autoEl : {
            tag : "iframe",
            src : "php/uzunlukal.php?objectid="+secilen_koy_yerlesim_id+""
        }
    }]
}).show(); 
Ext.getDom('iframe-win').src = "php/cevreal.php?objectid="+secilen_koy_yerlesim_id+""; 
			  
            }}
		  ]
        });
	

  gridPanelMevcutkoyyerlesimler.on('afteredit', bozukYolGuncelle);
  
		 var exportButton_gridPanelMevcutkoyyerlesimler = new Ext.ux.Exporter.Button({
          component: gridPanelMevcutkoyyerlesimler,
          text     : "EXCEL" 
        });
		 gridPanelMevcutkoyyerlesimler.getTopToolbar().add(exportButton_gridPanelMevcutkoyyerlesimler);
		 
   		
        var   PanelMevcutkoyyerlesimler = new Ext.FormPanel({
        id:'PanelMevcutkoyyerlesimler',
        header:false,
         items:[
            
			gridPanelMevcutkoyyerlesimler
        ]
    });    
		var koyyerlesimWindow =  new Ext.Window({
        title:'Mevcut Karakoyyerlesimlerı',
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
                title:'Mevcut Karakoyyerlesimlerı Öznitelikleri',
                margins:'3 3 3 3',
                frame:true,
                collapsible:false,
                items:[
                   PanelMevcutkoyyerlesimler
				   
                ]
            }
        ]
		 }); 
		 
////////////////////////////////////////////////////////////////////////////////////////
 