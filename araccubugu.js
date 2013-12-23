	function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
	
	var yetki_duzeyi = readCookie('yetki');
	var giris_yapan_ad=readCookie('ad');
	var giris_yapan_soyad=readCookie('soyad');
	
	
	var arac_cubugu;
	
	if(yetki_duzeyi==1){
	  arac_cubugu= new Ext.Toolbar({
         style:'margin-top: 0px',//100
		 height:30,
	     region: "north",      
	    items:[
		{ 
                text:'Sorgulama İşlemleri',
                xtype:'splitbutton',
                icon:'Images/16/moduller.png',
                menu:[
				{
                        text:'Şehir İşlemleri',
						 handler:function () {
						sehirWindow.show();
                        }
						},
					
                  {
                        text:'Bölge İşlemleri',
						 handler:function () {
						bolgeWindow.show();
                        }
						
				} ,				 
					
            	{
                    text:'Seçmen İşlemleri',
                      
                        handler:function () {
							secmenWindow.show();  
						    
                        }
                },
					
						{
                        text:'Anket İşlemleri',
                        icon:'Images/16/maden.png',
                        handler:function () {
						anketWindow.show();
                        }
                    } 
            ]
            },
            
		{ 
                text:'Kullanıcı İşlemleri', 
			    xtype:'splitbutton',
                icon:'Images/16/yonetici.png',  
                menu:[
                    {
                        text:'Yönetici İşlemleri',
                        icon:'Images/16/users.png',
                        handler:function () {
						  window.location = 'KULLANICILAR.php'; 
						
                        }
                    }, 
					 {
                        text:'Anketör İşlemleri',
                        icon:'Images/16/stil.png',
                        handler:function () {
						labelWindow.show();
                        }
                    } 
                ]
            }, 
            
            
		 
			{
                text:'Raporlama İşlemleri',
                xtype:'splitbutton',
                icon:'Images/16/yonetici.png',
                menu:[
                     {
                        text:'Anket raporlama',
                        icon:'Images/resmikurum.png',
                        handler:function () {

                             anketWindow.show();
                        }
                    },
                   
                ]
            }, 
           
            {
                id:'HaritaTemizle',
                text:'Temizle',
                icon:'Images/clear.png',
                handler:function () {
                  
				     

	     
	   
               
				  
					
		 
          
		  
      