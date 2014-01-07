<? session_start();
$user=$_SESSION['user']; 
$ad=$_SESSION['ad']; 
$soyad=$_SESSION['soyad']; 
$yetki=$_SESSION['yetki']; 
setcookie("yetki",$yetki,time()+60,'http://localhost:2627/bilecik/GIRIS.php');
setcookie("ad",$ad,time()+60,'http://localhost:2627/bilecik/GIRIS.php');
setcookie("soyad",$soyad,time()+60,'http://localhost:2627/bilecik/GIRIS.php');
?>
<?  
ini_set("memory_limit","64M");
ini_set('display_errors','0'); error_reporting(0);
header("Content-Type:text/html; charset=utf8");  
 
 ///////////////////////////////////////////////////////////////////////////////

if(!isset($_SESSION['user'])){
if($_SESSION['user']==""){
header("location: GIRIS.php");}

}else{
	echo "Sisteme Giriş Yapılıyor. Lütfen Bekleyiniz...";
	
    echo "Hoşgeldiniz Sayın: " .$ad." ".$soyad ;   
} 
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//TR" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="refresh" content=;
<meta http-equiv="CONTENT-TYPE" content="text/html; charset=UTF-8" /> 
<title>Seçim Anket Sistemi</title>   
	
<script type="text/javascript"> var url="http://localhost:8080";</script>
<link rel="shortcut icon" href="" /> 

   <script type="text/javascript" src="http://svn.osgeo.org/metacrs/proj4js/trunk/lib/proj4js-compressed.js"></script>
  <script type="text/javascript" src="http://spatialreference.org/ref/epsg/3137/proj4js/"></script>
 <script type="text/javascript" src="http://spatialreference.org/ref/epsg/2320/proj4js/"></script>
 <script type="text/javascript" src="http://spatialreference.org/ref/epsg/2321/proj4js/"></script>
 <script type="text/javascript" src="http://spatialreference.org/ref/epsg/23035/proj4js/"></script>
 <script type="text/javascript" src="http://spatialreference.org/ref/epsg/23036/proj4js/"></script>
<!-- <script type="text/javascript" src="http://spatialreference.org/ref/epsg/3857/proj4js/"></script>-->
 <script type="text/javascript" src="http://spatialreference.org/ref/epsg/4230/proj4js/"></script>
 

<script src="http://maps.google.com/maps/api/js?v=3&amp;sensor=false"></script>
<script src="  http://openlayers.org/dev/examples/google-v3.js"></script>
    
 
<script type="text/javascript" src="CVM/Kutuphaneler/OpenLayers-2.13/OpenLayers.js"></script> 
<link rel="stylesheet" type="text/css" href="CVM/Kutuphaneler/OpenLayers-2.13/theme/default/style.css">
  
<script type="text/javascript" src="CVM/Kutuphaneler/ext-3.4.0/adapter/ext/ext-base.js"></script>
 
<script type="text/javascript" src="CVM/Kutuphaneler/ext-3.4.0/ext-all.js"></script>  
   
<script type="text/javascript" src="CVM/excel_export/Exporter-all.js"></script>
  
    
<link rel="stylesheet" type="text/css" href="CVM/Kutuphaneler/ext-3.4.0/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="CVM/Kutuphaneler/ext-3.4.0/resources/css/xtheme-access.css"/>
 
<link rel="stylesheet" type="text/css" href="Scripts/gridfilters/css/GridFilters.css">
<link rel="stylesheet" type="text/css" href="Scripts/gridfilters/css/RangeMenu.css">
    
    
<link rel="stylesheet" type="text/css" href="CVM/Kutuphaneler/GeoExt-1.1/GeoExt/resources/css/popup.css"/>
 
    
     <script type="text/javascript" src="CVM/Kutuphaneler/jquery-1.7.2.min.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/GeoExt-1.1/GeoExt/lib/GeoExt.js"></script> 
     
     <script type="text/javascript" src="CVM/Kutuphaneler/date.js"></script>
     <script type="text/javascript" src="Scripts/gridfilters/menu/ListMenu.js"></script>
	 <script type="text/javascript" src="Scripts/gridfilters/menu/RangeMenu.js"></script>
     <script type="text/javascript" src="Scripts/gridfilters/GridFilters.js"></script>
     <script type="text/javascript" src="Scripts/gridfilters/filter/Filter.js"></script> 
     <script type="text/javascript" src="Scripts/gridfilters/filter/StringFilter.js"></script>
     <script type="text/javascript" src="Scripts/gridfilters/filter/NumericFilter.js"></script>   
       
     <script type="text/javascript" src="CVM/Kutuphaneler/ext-lang-tr.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/ext-3.4.0/examples/ux/SlidingPager.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/ext-3.4.0/examples/ux/SearchField.js"></script> 
        
	 <script type="text/javascript" src="CVM/Kutuphaneler/katmanlar.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/store.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/gridpanel.js"></script>
     
     <script type="text/javascript" src="CVM/Kutuphaneler/araccubugu.js"></script>
      
    
     <script type="text/javascript" src="CVM/Kutuphaneler/panel.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/haritaaraclari.js"></script> 
       
       <script type="text/javascript" src="CVM/Kutuphaneler/Globals.js"></script> 
       
  
     
     <script type="text/javascript" src="CVM/Kutuphaneler/egimyollar.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/genislikyollar.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/karayollariyatirimlari.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/mevcutyollar.js"></script>
     
     <script type="text/javascript" src="CVM/Kutuphaneler/makineparki.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/koyici.js"></script>  
     <script type="text/javascript" src="CVM/Kutuphaneler/koyici_detay.js"></script> 
     <script type="text/javascript" src="CVM/Kutuphaneler/trafikisaretleri.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/sanatyapi.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/mevcutsanatyapilari.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/karardestek.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/koyyerlesim.js"></script>
      <script type="text/javascript" src="secmen.js"></script>
     <script type="text/javascript" src="bolge.js"></script>
     <script type="text/javascript" src="anket.js"></script>
     <script type="text/javascript" src="sehir.js"></script>
      <script type="text/javascript" src="CVM/Kutuphaneler/label.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/stil.js"></script>
     <script type="text/javascript" src="CVM/Kutuphaneler/yolgecisonizinbelgesi.js"></script>
    
     
     
     <script type="text/javascript" src="CVM/Kutuphaneler/genelsorgulama.js"></script> 
     
       
 
    
    <script type="text/javascript">  
   //    Ext.BLANK_IMAGE_URL = "http://extjs.cachefly.net/ext-3.2.1/resources/images/default/s.gif";
     // OpenLayers.ImgPath = "http://dev.openlayers.org/releases/OpenLayers-2.9.1/img/";  
  
  
//FİLTRELEME İÇİN KULLANILAN DEĞŞKENLER
 var global_secilen_yol_ilce;
 var global_secilen_yol_adi;
 var global_secilen_yol_kkn;
 var global_secilen_yolid;
 
 //SEÇİLEN YOLUN ÖZELLİKLERİ VE KAYDEDİLECEK FORMLARDA KULLANILAN DEĞİŞKENLER
 var global_kaydedilecek_yol_ilce;
 var global_kaydedilecek_yol_adi;
 var global_kaydedilecek_yol_kkn;
 var global_kaydedilecek_yolid;
  
///////////////////////*************LABEL
	
	
	<? include("php/label/bilecikyollardb.php");?>
	
	<? include("php/label/bozukyol_900913.php");?>	
	<? include("php/label/genislikyol_900913.php");?>	
	<? include("php/label/egimyol_900913.php");?>			 	
	<? include("php/label/trafikisaretdb.php");?>			
		
		
		
/////////////**********************
	
	
/////////////////KATMAN STİLLERİ/////////////////////////////////
		
	<? include("php/stil/bilecikyollardb.php");?>	
	<? include("php/stil/bozukyol_900913.php");?>	
	<? include("php/stil/egimyol_900913.php");?>	
	<? include("php/stil/genislikyol_900913.php");?>	
	<? include("php/stil/yolparca2.php");?>	
	
	<? include("php/stil/koyyerlesim.php");?>	
		 			   
			
/////////////////KATMAN STİLLERİ BİTİŞ/////////////////////////////////	
 	
	
	var global_secilenKoordinatSistemi="EPSG:4326";
	
	 var KoordinatListesi = [
		 ['3137', 'ITRF96 3° (30° D.O.M)'],
		 ['2320', 'ED50 3° (30° D.O.M)'],
		 ['2321', 'ED50 3° (33° D.O.M)'],
		 ['23035', 'ED50 6° (27° D.O.M)'],
		 ['23036', 'ED50 6° (33° D.O.M)'],
		 ['900913', 'Google Earth'],
		 ['3857', 'Bing'],
		 ['4230', 'Coğrafi - ED50'],
		 ['4326', 'Coğrafi - WGS84'] 
		 ];
		 var storeKoordinatListesi = new Ext.data.ArrayStore({
    	 fields: ['epsg', 'adi'],
     	 data : KoordinatListesi  
		  }); 
	var comboKoordinatListesi=new Ext.form.ComboBox({
        id:'comboKoordinatListesi',
        store:storeKoordinatListesi,
        mode:'local',
        width:150,
        lazyRender:true,
        triggerAction:'all',
        displayField:'adi',
        valueField:'epsg',
        disableKeyFilter:true,
        typeAhead:false,
        emptyText:'Koordinat Sistemi Seçiniz ...',
        hideLabel:false ,
		listeners: {
    select: function(combo, record, index) {
    global_secilenKoordinatSistemi="EPSG:"+combo.getValue() ;
 	  text_gosterilen_epsg.setValue(global_secilenKoordinatSistemi);
	  
    }
  }
    });
	
	
	   var   text_gosterilen_koordinater=new Ext.form.TextField({
        id:'text_gosterilen_koordinater',
        width:300,
       // fieldLabel:'Personel Ad Soyad',
        labelStyle:'font-weight: bold',
        readOnly:true
    });
		
		
		   var   text_gosterilen_epsg=new Ext.form.TextField({
        id:'text_gosterilen_epsg',
		value:'EPSG:4326',
        width:75,
       // fieldLabel:'Personel Ad Soyad',
        labelStyle:'font-weight: bold',
        readOnly:false
    });
	
    var tiklananX="";
	var tiklananY="";
	var info;
	var popup;
	
	
	  OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },
				  
                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                }, 

                trigger: function(e) {
			 //	var toProjection = new OpenLayers.Projection("EPSG:4326");
var toProjection = new OpenLayers.Projection(global_secilenKoordinatSistemi);
			  
var lonlat = map.getLonLatFromPixel(e.xy).transform(map.getProjectionObject(), toProjection);
var lonlatPopup = map.getLonLatFromPixel(e.xy).transform(map.getProjectionObject(), toProjection);
			 
			   
			 tiklananY=lonlat.lat;
			 tiklananX=  lonlat.lon;
			 
			 textTamponXkoord.setValue(tiklananX),
	         textTamponYkoord.setValue(tiklananY) 
	}

            });
			 
   Ext.BLANK_IMAGE_URL = 'CVM/Kutuphaneler/ext-3.4.0/resources/images/default/s.gif';
  
      Ext.onReady(function() {
      Ext.QuickTips.init(); //Sayfa elemanlarının üstüne gelince info gösterimini sağlıyor.   
      OpenLayers.ProxyHost = "proxy.php?url=";		  
   	  var saveStrategy = new OpenLayers.Strategy.Save(); 
	  
	  
	
				map = new OpenLayers.Map({
        div: "map",
                projection: new OpenLayers.Projection("EPSG:900913"),
                displayProjection: new OpenLayers.Projection("EPSG:4326"),
                units: 'm',
  
        controls: [
                        new OpenLayers.Control.Navigation({ dragPanOptions: { enableKinetic: true, kineticInterval: 20} }),
						new OpenLayers.Control.MousePosition( {
                prefix: '<div style=\"color: green; font-size: 20px;font-weight: bold;  width: 300px; text-align:left;\">Koordinatlar : ',
                    suffix: "</div>",
                    separator: ' | ',
                    numDigits: 2,
					emptyString:''  
							}),
                        new OpenLayers.Control.PanZoom(),
                        new OpenLayers.Control.Attribution(),
                        new OpenLayers.Control.ScaleLine({units: 'km'}),   
                        new OpenLayers.Control.OverviewMap(),
                        new OpenLayers.Control.KeyboardDefaults(),
                        new OpenLayers.Control.Permalink('permalink')
                    ] 
    });  
 
		
	 ///////////////////************HARİTA ARAÇLARI*******************/////////////////////// 
	
		map.events.register("mousemove", map, function(e) { 
    var position = this.events.getMousePosition(e);
	 
	
	var toProjection = new OpenLayers.Projection(global_secilenKoordinatSistemi);
			   var fromProjection = new OpenLayers.Projection("EPSG:900913");   // Transform from WGS 1984
            
			  
			  
var lonlat = map.getLonLatFromPixel(e.xy).transform(fromProjection, toProjection);
 			 
		 

	text_gosterilen_koordinater.setValue(lonlat.lon+"-"+lonlat.lat);

 
});
		
		
		
	var scaleStore = new GeoExt.data.ScaleStore({map: map});
    var zoomSelector = new Ext.form.ComboBox({
        store: scaleStore, 
        emptyText: "Zoom Level",
        tpl: '<tpl for="."><div class="x-combo-list-item">1 : {[parseInt(values.scale)]}</div></tpl>',
        editable: false,
        triggerAction: 'all',  
        mode: 'local'  
    });

    zoomSelector.on('select', 
        function(combo, record, index) {
            map.zoomTo(record.data.level);
        },
        this
    );   
	 
	    map.events.register('zoomend', this, function() {
			
			//Zoom Selectorün seçili oldugu item a göre haritayı zoomluyor
        var scale = scaleStore.queryBy(function(record){
            return this.map.getZoom() == record.data.level;
        });

        if (scale.length > 0) {
            scale = scale.items[0];
            zoomSelector.setValue("1 : " + parseInt(scale.data.scale));
        } else {
            if (!zoomSelector.rendered) return;
            zoomSelector.clearValue();
        }
    });
	
	
	
	  var ctrl, toolbarItems = [], action, actions = {}; 
	 
        action = new GeoExt.Action({ 
        control: new OpenLayers.Control.ZoomBox({alwaysZoom:false}),
        map: map, 
		icon:'Images/box-on.png', 
        toggleGroup: "tools",
        allowDepress: true,
        tooltip: "YAKLAS"
       
	});
    toolbarItems.push(action);
	toolbarItems.push("-");
	
	 action = new GeoExt.Action({ 
        control: new OpenLayers.Control.ZoomBox({out:true}),
        map: map, 
		icon:'Images/box-off.png', 
        toggleGroup: "tools",
        allowDepress: true,
        tooltip: "UZAKLAS"
       
	});
    toolbarItems.push(action);
	toolbarItems.push("-");
	 
	action = new GeoExt.Action({
        control: new OpenLayers.Control.ZoomToMaxExtent(),
        map: map, 
		icon:'Images/arrow_inout.png', 
        tooltip: "TUM HARITAYI GOR"
    });
    actions["max_extent"] = action;
    toolbarItems.push(action);
    toolbarItems.push("-");
    
        action = new GeoExt.Action({ 
	  	icon:'Images/16/nav.png',
        control: new OpenLayers.Control.Navigation(),
        map: map, 
        toggleGroup: "draw",
        allowDepress: false,
        pressed: true,
        tooltip: "SERBEST DOLASIM", 
        group: "draw",
        checked: true
    });
    actions["nav"] = action;
    toolbarItems.push(action);  
    action = new GeoExt.Action({ 
	   	icon:'Images/16/secim.png',
        control: new OpenLayers.Control.SelectFeature(layer, {
            type: OpenLayers.Control.TYPE_TOGGLE,
            hover: true 
        }),
        map: map, 
        enableToggle: true,
        tooltip: "OBJE SECIMI"
    });
    actions["select"] = action;
    toolbarItems.push(action);
    toolbarItems.push("-"); 
	
    ctrl = new OpenLayers.Control.NavigationHistory();
    map.addControl(ctrl); 
 
    action = new GeoExt.Action({ 
        control: ctrl.previous,
        disabled: true,
		icon:'Images/arrow_left.png',
        tooltip: "ONCEKI GORUNUMLERE GIT"
    });
    actions["previous"] = action;
    toolbarItems.push(action);

    action = new GeoExt.Action({ 
        control: ctrl.next,
        disabled: true,
		icon:'Images/arrow_right.png',
        tooltip: "SONRAKI GORUNUMLERE GIT"
    });
    actions["next"] = action;
    toolbarItems.push(action);
    toolbarItems.push("->");
	
	///////////////////////HARİTA ARAÇLARI BİTİŞ//////////////////////// 
  
   
   
   
   
        var mapPanel = new GeoExt.MapPanel({
			id:"mapPanel",
			style:'margin-top: 0px,',
          autoWidth: true,
		  title: ' ',  
          region: "center",
          layers: [layer],
		  zoom: 4,
          map: map, 
		    items: [{
            xtype: "gx_opacityslider",
            layer: b,
            complementaryLayer: osm,
            changeVisibility: true,
            aggressive: true,
            vertical: true,
            height: 150,
            x: 10,
            y: 300,
            plugins: new GeoExt.LayerOpacitySliderTip()
        }],
		 
           extent: new OpenLayers.Bounds( 29.7088306982899,39.6487986620049,30.6500206463587,40.5427029057817),
				 tbar: arac_cubugu,
				 bbar: [
	 
				 {text: 'Uzunluk Olcum',
				 icon:'Images/uzunluk_olcum.png',
   				 enableToggle: true, 
				 toggleGroup: "olcum",
   				 handler: function(toggled){
				if (toggled) { length.activate();
				  } 
				else
				 { length.deactivate(); }}} 
		        ,{
					text: 'Alan Olcum',
					icon:'Images/alan_olcum.png',
					enableToggle: true, 
					toggleGroup: "olcum",
					handler: function(toggled){
						if (toggled) {
						area.activate();
						 
						} else {
							area.deactivate();
						}
					},
					},
					{text: 'Ölçümü İptal Et',
					 icon:'Images/16/olcum_iptal.png',
						handler: function(){
							length.deactivate();
							area.deactivate();
							  info.deactivate();
						 }
						
						},
				 
						{text: 'Koordinat\'a Git',
						 icon:'Images/16/marker.png',
						handler: function(){
							 
						coordWindow.show();}
						
						}, ' ',
				 {   text: 'Bilgi Al',
				 icon:'Images/info.png',
   				 enableToggle: true, 
				toggleGroup: "olcum",
   				 handler: function(toggled){
				if (toggled) { 
				length.deactivate();
							area.deactivate();
				info.activate();
				
				 } 
				else
				 {length.deactivate();
							area.deactivate();
					 
					  info.deactivate();
					  
					   }}} ,
				'Olcek: ', zoomSelector,  toolbarItems ,text_gosterilen_epsg,text_gosterilen_koordinater,comboKoordinatListesi
				 
				 
				 
		]   
        });
		
		
		 
              info = new OpenLayers.Control.WMSGetFeatureInfo({
                 url: 'http://localhost:8080/geoserver/wms', 
			   drillDown:true,
                layers: [ layerkarayolyatirim,
		   layersanatyapiyatirim,
		   ilcesinir_wms,
		   layeryolparca_wms,
		   koy_yerlesim_wms,
		   layersanatyapi_wms,
		   bozukyol_wms,
		   egim_wms,
		   genislik_wms,
		   maden_wms],
            });
        //    mapPanel.map.addControl(info);
           // info.activate();
 
            info.events.on({
                getfeatureinfo: function(event) { 
                    if (popup) {
                        popup.destroy();
                    }
                    popup = new GeoExt.Popup({
                        title: "Bilgilendirme Penceresi",
                        map:  mapPanel.map,
						 
 lonlat: mapPanel.map.getLonLatFromPixel(event.xy),
						
                          width: 250,
                        autoScroll: true,
                        collapsible: true,
                        bodyStyle: {padding: 5},
                        html: event.text
                    });
                    popup.show();
                }
            });
	 
	   mapPanel.map.addControl(info);
        info.activate();  
		
		
		
		
		
    var	 formPanelCoord = new GeoExt.form.FormPanel({
    border: true,
    layout: 'anchor',
    bodyStyle:'padding: 20px',
        items: [{
        xtype: "textfield",
        width: 100,
        fieldLabel: "X",
        name: "search_lc",
        value: "",
        emptyText:'X',
        allowblank: false
    },

{
        xtype: "textfield",
        width: 100,
        fieldLabel: "Y",
        name: "search_lc",
        value: "",
        emptyText:'Y',
        allowblank: false
    }], 
    listeners: {
       actioncomplete: function(form, action) { 
        features = action.response.features;
        console.log(features.length)
     }}
	 });


formPanelCoord.addButton({
        text:"Koordinat\'a Odaklan",
        handler:function() {
        console.log(formPanelCoord);
            //alert(formPanelCoord.items.items[0].getValue());
            //alert(formPanelCoord.items.items[1].getValue());
            formPanelCoord.items.items[0].getValue();
            formPanelCoord.items.items[1].getValue();
                       //function recentreMap (form) {
				   var epsg4326 = new OpenLayers.Projection('EPSG:4326');
                   var epsg900913 = new OpenLayers.Projection('EPSG:900913');
                   var easting = formPanelCoord.items.items[0].getValue(); 
				   var northing = formPanelCoord.items.items[1].getValue();  
			  

    var lonlat = new OpenLayers.LonLat(easting, northing);
    lonlat.transform(map.displayProjection, map.baseLayer.projection);
    map.setCenter(lonlat, 15);
	
formPanelCoord.addButton({
        text:"Go to Coord",
		
        handler:function() {
	  this.search(); 
     },
     scope:formPanelCoord
});


            //this.search();
     },
     scope:formPanelCoord
});
		 
		 	var coordWindow =  new Ext.Window({
        title:'Koordinat',
        width:300,
        height:300,
        frame:true,
		collapsible:true,
        closable:true,
        resizable:false,
        closeAction:'hide',
        layout:'border',
		items:[ 
            {
                region:'center',
                 
                margins:'3 3 3 3',
                frame:true,
                collapsible:false,
                items:[
                   formPanelCoord
				   
                ]
            }
        ]
		 }); 
		
		
        map.addControl(modifyControl);
        mapPanel.map.addControl(modifyControl);
        modifyControl.activate(); 
        mapPanel.map.addControl(drawControl); 
		
		
		map.addControl(modifyControl_koyici);
        mapPanel.map.addControl(modifyControl_koyici);
        modifyControl_koyici.activate(); 
        mapPanel.map.addControl(drawControl_koyici); 
		
		
		
OpenLayers.Event.observe(document, "keydown", function(evt) {
    var handled = false;
    switch (evt.keyCode) {
        case 90: // z
            if (evt.metaKey || evt.ctrlKey) {
				if(drawControl.activate){
               // alert("geri");
				drawControl.undo();
				
				}
                handled = true;
            }
            break;
        case 89: // y
            if (evt.metaKey || evt.ctrlKey) {
                drawControl.redo();
                handled = true;
            }
            break;
        case 27: // esc
            drawControl.cancel();
            handled = true;
            break;
    }
    if (handled) {
        OpenLayers.Event.stop(evt);
    }
});
		
		
	/*	map.addControl(modifyControl_koy_yerlesim);
        mapPanel.map.addControl(modifyControl_koy_yerlesim);
        modifyControl_koy_yerlesim.activate(); 
        mapPanel.map.addControl(drawControl_koy_yerlesim); 
		*/
	  	
	  
	   
  	  
	   
    
	  
		mapPanel.map.addControl(length);
		mapPanel.map.addControl(area);  
      //  layer.events.register('loadend', layer, function(evt){mapPanel.map.zoomToExtent(layer.getDataExtent())});
	
	
	
	     map.addLayer(osm);
         map.setBaseLayer(osm); 
         map.setLayerIndex(osm, 99); 
		 
		 	
          map.addLayers([a]);
		  map.addLayers([b]);
		  map.addLayers([c]);
		 
		  map.addLayers([d]);
		  map.addLayers([e]); 
		  map.addLayers([f]);   
		 
		 
		 
		 
		  var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
            renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
           
		   // create the layer styleMap by giving the default style a context
            var colors = ["red", "green", "blue"];
            var context = {
                getColor: function() {
                     return "green";
                },
                getSize: function() {
                    return 111;
                }
            };
            var template = {
                pointRadius: "${getSize}", // using context.getSize(feature)
                fillColor: "${getColor}" // using context.getColor(feature)
            };
            var style = new OpenLayers.Style(template, {context: context});
            
			 
			 		
					
	////TIKLANAN YERDEN X,Y ALSIN
	    var click = new OpenLayers.Control.Click();
                map.addControl(click);
                click.activate();
		/////////////////////////////		
		
		
		//////////STİL KATMANLARI
		    map.addLayer(stil_bilecikyollardb_layer);
			map.addLayer(stil_bozukyol_900913_layer);
			map.addLayer(stil_egimyol_900913_layer);
			map.addLayer(stil_genislikyol_900913_layer);
			map.addLayer(stil_yolparca2_layer);
			//map.addLayer(stil_yolparcadb_layer);
			map.addLayer(stil_sanatyapi_layer);
			
		//map.addLayer(stil_koy_yerlesim_layer);
			/////////////////////
			
			
			
			
			
			 /*  map.addLayers([layertrafikisaret_wms]);
		      
		  	   map.addLayer(layersanatyapi_wms);
		       map.addLayers([layerkarayolyatirim]);  
		       map.addLayers([layersanatyapiyatirim]); 
			   map.addLayer(layeryolparca_wms);  
		       map.addLayer(bozukyol_wms); 
	 		   map.addLayer(egim_wms); 
		       map.addLayer(genislik_wms);  
		       map.addLayer(maden_wms);*/
			    map.addLayers([layer_koyici]);
			   map.addLayer(koy_yerlesim_wms); 
		 	   map.addLayers([ilsinir_wms]); 
		       map.addLayers([ilcesinir_wms]); 
		 
	
	  
	 	 	 
   
    var ddBounds = new OpenLayers.Bounds(
      
	    29.7088306982899,39.6487986620049,30.6500206463587,40.5427029057817 
    );
    map.zoomToExtent(
        ddBounds.transform(map.displayProjection, map.getProjectionObject())
    );  
	  layer.events.register('loadend', layer, function(evt){mapPanel.map.zoomToExtent(layer.getDataExtent())}); // 	sayfa yüklendikten sonra yol katmanının sınırına genişletiyor...
	
  
	 
	 
new Ext.Viewport({
		    renderTo: "map-id",
			id : 'viewport', 
		    layout : "border", 
			hideBorders : false, 
			items :[ 
               {
				 region:'center',
				layout : "border", 
				deferredRender : false,
			 // items: [mapPanel, arac_cubugu,ustlogo,{
              items: [mapPanel, arac_cubugu,{
               
			    region:'west',
                id:'westP',
                title:'KATMAN KONTROLU VE LEJANT PANELI',
                layout:'accordion',
                layoutConfig:{
                    animate:true
                },
                width:300,
                frame:true,
                collapsed:true,
                collapsible:true,
				 collapseMode: "mini",
                items:[ tree, legendpanel]
            }]  
	}]
	}); 	
	
	});//end Ext.onReady
    
	   Ext.EventManager.onDocumentReady(function () 
	   { 
			Ext.Ajax.on('beforerequest',    function () { Ext.getBody().mask('Lutfen Bekleyiniz...'); }, Ext.getBody());
			Ext.Ajax.on('requestcomplete',  function () { Ext.getBody().unmask(); }, Ext.getBody());
			Ext.Ajax.on('requestexception', function () { Ext.getBody().unmask(); }, Ext.getBody()); 
		});  
    </script> 
  </head> 
  
  <body class="recipe-body" bgcolor="1fdad7">
   
  <div id="map-id"></div> 
 
 </body> 
</html>