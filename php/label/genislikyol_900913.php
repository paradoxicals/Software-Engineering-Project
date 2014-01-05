<? ob_start();     ?> 
<? session_start();

$conn_string = "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa";
$dbconn = pg_connect($conn_string); 

  
$label_genislikyol_900913_alan1;
$label_genislikyol_900913_alan2;
$label_genislikyol_900913_alan3; 

$result = pg_query($dbconn, "SELECT 
 alan1,alan2,alan3
FROM 
  public.label where layer='genislikyol_900913' AND userid='$user'");
 
$res = array();
while (($row =pg_fetch_assoc($result)) != null) {
    $res[] = $row;
	 
$label_genislikyol_900913_alan1=$row["alan1"]; 
$label_genislikyol_900913_alan2=$row["alan2"]; 
$label_genislikyol_900913_alan3=$row["alan3"]; 
} 
 
session_start();

$_SESSION['ses_alan1_genislikyol_900913']=$label_genislikyol_900913_alan1;
$_SESSION['ses_alan2_genislikyol_900913']=$label_genislikyol_900913_alan2;
$_SESSION['ses_alan3_genislikyol_900913']=$label_genislikyol_900913_alan3; 

pg_close($dbconn); 
?>
   
   
    var style_label_genislikyol_900913 = new OpenLayers.Style();
      
        var rule_label_genislikyol_900913 = new OpenLayers.Rule({
            symbolizer: {
                fillColor: "#ff9a9a",
                fillOpacity: 0.5,
                strokeColor: "#000000",
                strokeWidth: 1,
                strokeDashstyle: "dash",
                labelAlign: "cc",
                fontColor: "#333333",
                fontOpacity: 0.9,
                fontFamily: "Arial",
                fontSize: 14,
                 
			    label : "<? if(($_SESSION['ses_alan1_genislikyol_900913'])!="") {echo  $_SESSION['ses_alan1_genislikyol_900913'];}else{echo "";} ?><? if(($_SESSION['ses_alan1_genislikyol_900913'])!="") {echo  ':${'. $_SESSION['ses_alan1_genislikyol_900913'].'}';}else{echo "";} ?>\n\n<? if(($_SESSION['ses_alan2_genislikyol_900913'])!="") {echo  $_SESSION['ses_alan2_genislikyol_900913'];}else{echo "";} ?><? if(($_SESSION['ses_alan2_genislikyol_900913'])!="") {echo ':${'. $_SESSION['ses_alan2_genislikyol_900913'].'}';}else{echo "";} ?>\n\n<? if(($_SESSION['ses_alan3_genislikyol_900913'])!="") {echo  $_SESSION['ses_alan3_genislikyol_900913'];}else{echo "";} ?><? if(($_SESSION['ses_alan3_genislikyol_900913'])!="") {echo  ':${'.$_SESSION['ses_alan3_genislikyol_900913'].'}';}else{echo "";} ?>",
				labelOffsetX: "10",
				labelOffsetY: "-10",
				fontColor: "red",
				fontSize: 10,
				fontFamily: "Arial",
				fontWeight: "bold",
				labelAlign: "lt"
            } 
        });
		
		
		style_label_genislikyol_900913.addRules([rule_label_genislikyol_900913]);
		
		
	   var layer_label_genislikyol_900913 = new OpenLayers.Layer.Vector("Bozukyol Etiket", {
                strategies: [new OpenLayers.Strategy.Fixed()],
				styleMap: style_label_genislikyol_900913,
                protocol: new OpenLayers.Protocol.WFS({
                 		url:url+ "/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:genislikyol_900913",
		  		       version: "1.1.0",
                    featureType: "genislikyol_900913",
                    featureNS: "http://cvm",
                    srsName: "EPSG:900913" 
                }),displayInLayerSwitcher: false
            }); 
 