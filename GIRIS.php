<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>SİSTEME GİRİŞ</title>

<script type="text/javascript" src="MST/Kutuphaneler/ext-3.4.0/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="MST/Kutuphaneler/ext-3.4.0/ext-all.js"></script>
<link rel="stylesheet" type="text/css" href="MST/Kutuphaneler/ext-3.4.0/resources/css/ext-all.css"/>

       <link rel="stylesheet" type="text/css" href="MST/Kutuphaneler/ext-3.4.0/resources/css/xtheme-access.css"/>


 
	  <script type="text/javascript">  
      Ext.BLANK_IMAGE_URL = ""; 
	  Ext.onReady(function(){
    Ext.QuickTips.init();
   
    var login = new Ext.FormPanel({ 
        labelWidth:120,
        url:'login.php', 
        frame:true, 
        title:'GİRİŞ EKRANI', 
        defaultType:'textfield',
	monitorValid:true,
	fullscreen:true,
       
	      items:[{ 
                fieldLabel:'Kullanıcı Adı ', 
                name:'loginUsername',  
                allowBlank:false 
            },{ 
                fieldLabel:'Şifre ',  
                name:'loginPassword', 
                inputType:'password', 
                allowBlank:false 
            }],
 
	      buttons:[{ 
                text:'Devam',
                formBind: true,	 
                 handler:function(){ 
                    login.getForm().submit({ 
                        method:'POST', 
                        waitTitle:'Sisteme Bağlanıyor', 
                        waitMsg:'Kullanıcı Yetkisi Kontrol Ediliyor...',
  
 
                        success:function(){ 
                        	  var redirect = 'ANASAYFA.php'; 
		                        window.location = redirect;
							
							
                        },
   
                        failure:function(form, action){ 
                            if(action.failureType == 'server'){ 
                                obj = Ext.util.JSON.decode(action.response.responseText); 
                                Ext.Msg.alert('Giriş Başarısız!', obj.errors.reason); 
                            }else{ 
                                Ext.Msg.alert('GİRİŞ BAŞARISIZ!', 'Anket Sistemi Sunucusuna Erişim Sağlanamıyor. Lütfen Kullanıcı Adı ve Şifrenizi Kontrol ediniz! '); 
								// + action.response.responseText
                            } 
                            login.getForm().reset(); 
                        } 
                    }); 
                } 
            },{ 
                text:'Kayıt Ol',
                //formBind: true,	 
                 handler:function(){ 
                      var redirect = 'KULLANICIKAYIT.php'; 
		                        window.location = redirect; 
                        	 }}] ,  html:'<div align="left" style="background-color:transparent;" ><img src="Images/kayit_ekran_logo_128" ></div>',
       
    });
        
    var win = new Ext.Window({
        layout:'fit',
        width:360,
        height:340,
        closable: false,
        resizable: false,
        plain: true,
        border: true,
        items: [login]
	});
	win.show();
}); 
 
</script>
</head>

<body bgcolor="#6699FF">
<div id="LoginForm"></div>
</body>
</html>
