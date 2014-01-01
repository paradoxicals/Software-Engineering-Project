var refresh = new OpenLayers.Strategy.Refresh({force: true, active: true});
		//  Proj4js.defs["EPSG:4326"] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
  
   
  var osm = new OpenLayers.Layer.OSM("OSM Yol İsimli");
      
		  
      var apiKey = "AuNpZ6IDqemD_KCOBIqmf2rDP9rXgDmN-9vnm3IHpm84Qx5GMUTKLKt0qkubWTmg";
      var resolutions = OpenLayers.Layer.Bing.prototype.serverResolutions.slice(1, 18);          
  
		  
      var a = new OpenLayers.Layer.Bing({key: apiKey, type: "Road",
        name: "Bing Yol",culture: "tr", resolutions: resolutions});
       
    var b = new OpenLayers.Layer.Bing({key: apiKey,type: "Aerial",
        name: "Bing Uydu",culture: "tr",resolutions: resolutions});
 
        
    var c = new OpenLayers.Layer.Bing({key: apiKey,type: "AerialWithLabels",
        name: "Bing Uydu İsimli",culture: "tr", resolutions: resolutions});
  
    
    var d = new OpenLayers.Layer.Google("Google Yol", { projection: "EPSG:900913",
                      type: google.maps.MapTypeId.ROADMAP, minZoomLevel: 1, maxZoomLevel: 18 });
             
        
    var e = new OpenLayers.Layer.Google("Google Uydu", { projection: "EPSG:900913",
                      type: google.maps.MapTypeId.SATELLITE, minZoomLevel: 1, maxZoomLevel: 18 });
      
  
    var f = new OpenLayers.Layer.Google("Google Uydu İsimli", { projection: "EPSG:900913",
                     type: google.maps.MapTypeId.HYBRID, minZoomLevel: 1, maxZoomLevel: 18 });  
		 
		 
 
             
			 
			 
   
  
     	 var layer_wms = new OpenLayers.Layer.WMS(
    "Bilecik Karayolları Wms", url+"/geoserver/wms",
    { layers: 'bilecikyollardb',
      format: 'image/png',
      srs:'EPSG:900913',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false }); 
  
  
  	   
	   var layer = new OpenLayers.Layer.Vector("Bilecik Karayolları", {
			  strategies: [new OpenLayers.Strategy.Fixed()],
			  protocol: new OpenLayers.Protocol.WFS({
				  version: "1.1.0",	 
				    projection: new OpenLayers.Projection("EPSG:4326"), 
        
	 	//url: url+"/geoserver/ows", 
		url: url+"/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:bilecikyollardb",
		  	featureType: "bilecikyollardb", 
				featureNS: "http://cvm",
				  srsName: "EPSG:900913", 
				geometryName:"geom"  
				
			  })
			});
		 
		 
	    var layer_koyici = new OpenLayers.Layer.Vector("Köy içi yollar", {
			  strategies: [new OpenLayers.Strategy.Fixed()],
			  protocol: new OpenLayers.Protocol.WFS({
				 version: "1.1.0",	 
				    projection: new OpenLayers.Projection("EPSG:4326"), 
        
	 	//url: url+"/geoserver/ows", 
		url: url+"/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:koyici",
		  	featureType: "koyici", 
				featureNS: "http://cvm",
				  srsName: "EPSG:900913", 
				geometryName:"geom"  
				
			  })
			});
			
			
	 var modifyControl = new OpenLayers.Control.ModifyFeature(layer);
	
	 var modifyControl_koyici = new OpenLayers.Control.ModifyFeature(layer_koyici);
	
	
	 var drawControl = new OpenLayers.Control.DrawFeature(
        //layer, OpenLayers.Handler.Polygon, {
         layer, OpenLayers.Handler.Path, { 
		  handlerOptions: {
          multi: true
          }
		 
        }); 
		
		 var drawControl_koyici = new OpenLayers.Control.DrawFeature(
        //layer, OpenLayers.Handler.Polygon, {
         layer_koyici, OpenLayers.Handler.Path, { 
		  handlerOptions: {
          multi: true
          }
		 
        }); 
			
			var layeryolparca = new OpenLayers.Layer.Vector("Bilecik Karayol Zemin Blokları WFS", {
			  strategies: [new OpenLayers.Strategy.Fixed()],
			  protocol: new OpenLayers.Protocol.WFS({
			 	//url: url+"/geoserver/ows",
			 	 	url: url+"/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:yolparcadb",
		   projection: new OpenLayers.Projection("EPSG:4326"), 
        
			 	version: "1.1.0",
				//version: "2.0.0",
				//featureType: "tr_iller2",//poligon
				featureType: "yolparcadb",//yollar
				featureNS: "http://cvm",
				srsName: "EPSG:4326",
				//geometryName:"the_geom",//poligon
				geometryName:"geom" //yollar
			  })
			});
			
				 var layeryolparca_wms = new OpenLayers.Layer.WMS(
    "Bilecik Karayol Zemin Blokları", url+"/geoserver/wms",
    { layers: 'yolparcadb',
      format: 'image/png',
      srs:'EPSG:4326',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false }); 
			
			 
			
				   var layer_tampon = new OpenLayers.Layer.Vector("Tampon", {
			  strategies: [new OpenLayers.Strategy.Fixed()],
			  protocol: new OpenLayers.Protocol.WFS({
				 	url: url+"/geoserver/ows",
				version: "1.1.0",
				projection: new OpenLayers.Projection("EPSG:4326"), 
				featureType: "tampon",//yollar
				featureNS: "http://cvm",
				  srsName: "EPSG:4326", 
				geometryName:"geom" //yollar
				
			  })
			});
			

			
			
			var sld = '<?xml version="1.0" encoding="ISO-8859-1"?>';
sld += '<StyledLayerDescriptor version="1.0.0" ';
sld += ' xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" ';
sld += ' xmlns="http://www.opengis.net/sld" ';
sld += ' xmlns:ogc="http://www.opengis.net/ogc" ';
sld += ' xmlns:xlink="http://www.w3.org/1999/xlink" ';
sld += ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">'; 
sld += '  <NamedLayer>';
sld += '    <Name>default_point22</Name>';
sld += '    <UserStyle>'; 
sld += '      <Title>Default Point</Title>';
sld += '      <Abstract>A sample style that draws a point</Abstract>'; 
sld += '      <FeatureTypeStyle>';
sld += '        <Rule>';
sld += '          <Name>rule1</Name>';
sld += '          <Title>Red Square</Title>';
sld += '          <Abstract>A 6 pixel square with a red fill and no stroke</Abstract>';
sld += '            <PointSymbolizer>';
sld += '              <Graphic>';
sld += '                <Mark>';
sld += '                  <WellKnownName>square</WellKnownName>';
sld += '                  <Fill>';
sld += '                    <CssParameter name="fill">#00FF00</CssParameter>';
sld += '                  </Fill>';
sld += '                </Mark>';
sld += '              <Size>66</Size>';
 sld += '           </Graphic>';
 sld += '         </PointSymbolizer>';
 sld += '       </Rule>';
sld += '      </FeatureTypeStyle>';
sld += '    </UserStyle>';
sld += '  </NamedLayer>';
sld += '</StyledLayerDescriptor>';


		 	
		  	
					 var layersanatyapi_wms = new OpenLayers.Layer.WMS(
    "Karayolları Sanat Yapıları", url+"/geoserver/wms",
    { layers: 'sanatyapidb',
      format: 'image/jpeg',
      srs:'EPSG:4326',
      transparent:'true', 
	 // sld_body: sld,
      zoomOffset: 11
   },
   {isBaseLayer: false,
    unsupportedBrowsers: []
	   }); 
			  
	
			
			 var layertrafikisaret_wms = new OpenLayers.Layer.WMS(
    "Karayolları Trafik İşaretleri", url+"/geoserver/wms",
    { layers: 'trafikisaretdb',
      format: 'image/png',
      srs:'EPSG:4326',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false }); 
			
			 
				 var layerkarayolyatirim = new OpenLayers.Layer.WMS(
    "Karayolları Yatırım Bilgileri ", url+"/geoserver/wms",
    { layers: 'karayolyatirimdb',
      format: 'image/png',
      srs:'EPSG:4326',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.4}); 
		
		/*	  var layersanatyapiyatirim = new OpenLayers.Layer.Vector("Sanat Yapı Yatırım Bilgileri ", {
			  strategies: [new OpenLayers.Strategy.Fixed()],
			  protocol: new OpenLayers.Protocol.WFS({
					 	url: url+"/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:sanatyapiyatirimdb",
			version: "1.1.0",
				//version: "2.0.0",
				//featureType: "tr_iller2",//poligon
				featureType: "sanatyapiyatirimdb",//yollar
				featureNS: "http://cvm",
				srsName: "EPSG:4326",
				visibility:false,
				displayInLayerSwitcher :false,
				//geometryName:"the_geom",//poligon
				geometryName:"geom" //yollar
			  })
			}); */
				 
			
			 var layersanatyapiyatirim = new OpenLayers.Layer.WMS(
    "Sanat Yapı Yatırım Bilgileri ", url+"/geoserver/wms",
    { layers: 'sanatyapiyatirimdb',
      format: 'image/png',
      srs:'EPSG:4326',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.4}); 
			
				
					 var ilsinir_wms = new OpenLayers.Layer.WMS(
    "Bilecik İl Sınırları", url+"/geoserver/wms",
    { layers: 'ilsnr',
      format: 'image/png',
      srs:'EPSG:900913',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.1 }); 
   
   
   	 var ilcesinir_wms = new OpenLayers.Layer.WMS(
    "Bilecik İlçe Sınırları", url+"/geoserver/wms",
    { layers: 'ililcesnr',
      format: 'image/png',
      srs:'EPSG:900913',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.1 }); 
   
   	 var koy_yerlesim_wms = new OpenLayers.Layer.WMS(
    "Bilecik Koy Yerlesim", url+"/geoserver/wms",
    { layers: 'koy_yerlesim',
      format: 'image/png',
      srs:'EPSG:900913',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false,opacity: 0.2  }); 
   
 /*
			
		 var koy_yerlesim_wfs = new OpenLayers.Layer.Vector("Köy Yerleşim WFS", {
		  strategies: [new OpenLayers.Strategy.Fixed()],
			  protocol: new OpenLayers.Protocol.WFS({
				  version: "1.1.0",	 
			 	url: url+"/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:koy_yerlesim",
		  projection: new OpenLayers.Projection("EPSG:4326"), 
         	featureType: "koy_yerlesim", 
				featureNS: "http://cvm",
				  srsName: "EPSG:900913", 
				geometryName:"geom"  
				
			  })
			});
			
			
			 var modifyControl_koy_yerlesim = new OpenLayers.Control.ModifyFeature(koy_yerlesim_wfs);
	
	 var drawControl_koy_yerlesim = new OpenLayers.Control.DrawFeature(
        koy_yerlesim_wfs, OpenLayers.Handler.Polygon, {
        // layer, OpenLayers.Handler.Path, { 
		  handlerOptions: {
          multi: true
          }
		 
        }); */
  
      
   		/*  var maden_wfs = new OpenLayers.Layer.Vector("Maden Sahaları ", {
			  strategies: [new OpenLayers.Strategy.Fixed()],
			  protocol: new OpenLayers.Protocol.WFS({
				//url: "/geoserver/ows",
				
				url: url+"/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:maden_900913",
		  		version: "1.1.0", 
				featureType: "maden_900913",//yollar
				featureNS: "http://cvm",
				srsName: "EPSG:900913", 
				geometryName:"geom" //yollar
			  })
			}); */
			
			   	 var maden_wms = new OpenLayers.Layer.WMS(
    "Maden Sahaları", url+"/geoserver/wms",
    { layers: 'maden_4326',
      format: 'image/png',
      srs:'EPSG:4326',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.3 }); 
   
     	 var bozukyol_wms = new OpenLayers.Layer.WMS(
    "Bozuk Yollar", url+"/geoserver/wms",
    { layers: 'bozukyol_900913',
      format: 'image/png',
      srs:'EPSG:900913',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.3 }); 
   
       	 var egim_wms = new OpenLayers.Layer.WMS(
    "Yol Eğim Bilgileri", url+"/geoserver/wms",
    { layers: 'egimyol_900913',
      format: 'image/png',
      srs:'EPSG:900913',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.3 }); 
   
       	 var genislik_wms = new OpenLayers.Layer.WMS(
    "Yol Genişlik Bilgileri", url+"/geoserver/wms",
    { layers: 'genislikyol_900913',
      format: 'image/png',
      srs:'EPSG:900913',
      transparent:'true',
      zoomOffset: 11, 
   },
   {isBaseLayer: false, opacity: 0.3 }); 
			
				
				
	 	 var layer2= new OpenLayers.Layer.WMS(
            "Global Imagery",
            "http://maps.opengeo.org/geowebcache/service/wms",
            {layers: "bluemarble"}
        ); 
		// map.setBaseLayer(layer2);
		