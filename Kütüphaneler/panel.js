  var legendpanel = new GeoExt.LegendPanel({ 
            region: "east",
			xtype: "gx_wmslegend",
            width: 300,
			height:200,
            autoScroll: true,
            padding: 5, 
			collapsible:true,
		  collapsed:true ,
		  title: 'Lejant Panel',
		  defaults: {
        style: 'padding:5px',
      /*  baseParams: {
            FORMAT: 'image/png',
            LEGEND_OPTIONS: 'forceLabels:on'
        },*/
		useScaleParameter:true
    }
        }); 
	
		
			 var ustlogo= new Ext.BoxComponent({
			style:'margin-top: 0px',
		    height:80, 
	        region: "north" , 
			autoEl: {tag: 'img', src:''}  
			}); 
			
			
		 
    var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());
        
 
    var treeConfig = [ {
        nodeType: "gx_overlaylayercontainer",
		text: "Tabakalar",
        expanded: true, 
        loader: {
            baseAttrs: {
                radioGroup: "foo",
                uiProvider: "layernodeui"
            }
        }
    },{
        nodeType: "gx_baselayercontainer",
		text: "Altlıklar"
    }];
 
    treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);

       tree = new Ext.tree.TreePanel({
        border: true,
        region: "west",
        title: "Tabakalar",
        width: 200,
        split: true,
        collapsible: true,
        collapseMode: "mini",
        autoScroll: true,
		
        plugins: [
            new GeoExt.plugins.TreeNodeRadioButton({
                listeners: {
                    "radiochange": function(node) {
                       // alert(node.text + " is now the active layer.");
						Ext.getCmp('mapPanel').setTitle("Secilen Tabaka: "+ node.layer.name); 
						
                    }
                }
            })
        ],
        loader: new Ext.tree.TreeLoader({ 
            applyLoader: false,
            uiProviders: {
                "layernodeui": LayerNodeUI
            }
        }),
        root: {
            nodeType: "async",
                children: Ext.decode(treeConfig)
              
        },
        listeners: {
            "radiochange": function(node){
            	Ext.getCmp('mapPanel').setTitle("Secilen Tabaka: "+ node.layer.name); 
					
            }
        },
        rootVisible: false,
        lines: false ,
	 
            bbar: [{
                text: "HARITADAN KALDIR",
				icon:'Images/remove.png',
                handler: function () {
                    var node = tree.getSelectionModel().getSelectedNode();
                    if (node || node.layer instanceof OpenLayers.Layer.WMS) {
                        map.removeLayer(node.layer);
                    }
                }
            },
					{
               
				icon:'Images/16/stil.png',
                handler: function () {
                 
					stilWindow.show();
					
                }
            },
			{
               // text: "ETİKET AÇ",
				icon:'Images/16/label_goster.png',
                handler: function () {
                    var node = tree.getSelectionModel().getSelectedNode();
                    if (node || node.layer instanceof OpenLayers.Layer.WMS) {
                       
					   
					   if(node.layer.name=="Bilecik Karayolları")
					   { 
					    map.addLayer(layer_label_bilecikyollardb); 
					   }
                       
                     else  if(node.layer.name=="Bozuk Yollar")
					   { 
					    map.addLayer(layer_label_bozukyol_900913);
					   }
					  else  if(node.layer.name=="Yol Genişlik Bilgileri")
					   { 
					    map.addLayer(layer_label_genislikyol_900913);
					   }
					  else  if(node.layer.name=="Yol Eğim Bilgileri")
					   { 
					    map.addLayer(layer_label_egimyol_900913);
					   }
					  
					}  
                }
            },
			{
               // text: "ETİKET KAPAT",
				icon:'Images/16/label_gosterme.png',
                handler: function () {
                    var node = tree.getSelectionModel().getSelectedNode();
                    if (node || node.layer instanceof OpenLayers.Layer.WMS) {
                        if(node.layer.name=="Bilecik Karayolları")
					   { 
					    map.removeLayer(layer_label_bilecikyollardb);
					   }
                     
					     else  if(node.layer.name=="Bozuk Yollar")
					   { 
					    map.removeLayer(layer_label_bozukyol_900913);
					   }
					     else  if(node.layer.name=="Yol Genişlik Bilgileri")
					   { 
					    map.removeLayer(layer_label_genislikyol_900913);
					   }
					   else  if(node.layer.name=="Yol Eğim Bilgileri")
					   { 
					    map.removeLayer(layer_label_egimyol_900913);
					   }
					  
                    }   
                }
            }] 
    });  