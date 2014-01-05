<? ob_start();     ?> 
<? session_start();

$conn_string = "host=localhost port=5432 dbname=postgis20 user=postgres password=qaqaqa";
$dbconn = pg_connect($conn_string); 

session_start();
$user=$_SESSION['userid']; 
  
$label_bilecikyollardb_alan1;
$label_bilecikyollardb_alan2;
$label_bilecikyollardb_alan3; 

$result = pg_query($dbconn, "SELECT 
 alan1,alan2,alan3
FROM 
  public.label where layer='bilecikyollardb' AND userid='$user'");
 
$res = array();
while (($row =pg_fetch_assoc($result)) != null) {
    $res[] = $row;
	 
$label_bilecikyollardb_alan1=$row["alan1"]; 
$label_bilecikyollardb_alan2=$row["alan2"]; 
$label_bilecikyollardb_alan3=$row["alan3"]; 
} 
 
session_start();

$_SESSION['ses_alan1_bilecikyollardb']=$label_bilecikyollardb_alan1;
$_SESSION['ses_alan2_bilecikyollardb']=$label_bilecikyollardb_alan2;
$_SESSION['ses_alan3_bilecikyollardb']=$label_bilecikyollardb_alan3; 

pg_close($dbconn); 
?>
   
   
    var style_label_bilecikyollardb = new OpenLayers.Style();
      
        var rule_label_bilecikyollardb = new OpenLayers.Rule({
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
                 
			    label : "<? if(($_SESSION['ses_alan1_bilecikyollardb'])!="") {echo  $_SESSION['ses_alan1_bilecikyollardb'];}else{echo "";} ?><? if(($_SESSION['ses_alan1_bilecikyollardb'])!="") {echo  ':${'. $_SESSION['ses_alan1_bilecikyollardb'].'}';}else{echo "";} ?>\n\n<? if(($_SESSION['ses_alan2_bilecikyollardb'])!="") {echo  $_SESSION['ses_alan2_bilecikyollardb'];}else{echo "";} ?><? if(($_SESSION['ses_alan2_bilecikyollardb'])!="") {echo ':${'. $_SESSION['ses_alan2_bilecikyollardb'].'}';}else{echo "";} ?>\n\n<? if(($_SESSION['ses_alan3_bilecikyollardb'])!="") {echo  $_SESSION['ses_alan3_bilecikyollardb'];}else{echo "";} ?><? if(($_SESSION['ses_alan3_bilecikyollardb'])!="") {echo  ':${'.$_SESSION['ses_alan3_bilecikyollardb'].'}';}else{echo "";} ?>",
				labelOffsetX: "10",
				labelOffsetY: "-10",
				fontColor: "red",
				fontSize: 10,
				fontFamily: "Arial",
				fontWeight: "bold",
				labelAlign: "lt"
            } 
        });
		
		
		style_label_bilecikyollardb.addRules([rule_label_bilecikyollardb]);
		
		
	   var layer_label_bilecikyollardb = new OpenLayers.Layer.Vector("Bilecik Karayolları Etiket", {
                strategies: [new OpenLayers.Strategy.Fixed()],
				styleMap: style_label_bilecikyollardb,
                protocol: new OpenLayers.Protocol.WFS({
                url:  
                 		url+ "/geoserver/CVM/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=CVM:bilecikyollardb",
			        version: "1.1.0",
                    featureType: "bilecikyollardb",
                    featureNS: "http://cvm",
                    srsName: "EPSG:900913" 
                }),displayInLayerSwitcher: false
            }); 
 