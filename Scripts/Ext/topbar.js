var HaritaToolBar = {
	
	  arac_cubugu: new Ext.Toolbar({
         style:'margin-top: 100px',
		 height:30,
	  region: "north" ,
                               
	    items:[ 
            {
                icon:'Images/home.png',
                text:'Anasayfa',
                handler:function () {
                    window.location = 'Anasayfa.aspx';
                }
            },
            ' ',
			{ 
                text:'Modüller',
                xtype:'splitbutton',
                icon:'Images/16/moduller.jpg',
                menu:[
                    {
                        text:'Mevcut Yollar',
                        icon:'Images/16/mevcut_yollar.jpg',
                        handler:function () {
						//////////////////
                        }
                    },
                    {
                        text:'Kara Yolları Yatırımları',
                        icon:'Images/16/karayollari_yatirimlari.jpg',
                        handler:function () {
                          ///////////////
                        }
                    },
                    {
                        text:'Kara Yolları Zemin Blokları',
                        icon:'Images/16/karayollari_zemin_bloklari.jpg',
                        handler:function () {
                           
                            //////////////////////// 
                        }
                    },
                    {
                        text:'Mevcut Sanat Yapıları',
                        icon:'Images/16/sanat_yapilari.jpg',
                        handler:function () {
                            ///////////////////////
                        }
                    }
					,
                    {
                        text:'Sanat Yapısı Yatırımları',
                        icon:'Images/16/sanat_yapi_yatirim.jpg',
                        handler:function () {
                            ///////////////////////
                        }
                    },
                    {
                        text:'Trafik İşaretleri',
                        icon:'Images/16/trafik_isaretleri.jpg',
                        handler:function () {
                            ///////////////////////
                        }
                    }
                ]
            },
            ' ',
		 
			{
                text:'Yönetici İşlemleri',
                xtype:'splitbutton',
                icon:'Images/16/yonetici.jpg',
                menu:[
                    {
                        text:'Kullanıcı İşlemleri',
                        icon:'Images/16/users.jpg',
                        handler:function () {
						//////////////////
                        }
                    },
                    {
                        text:'Yatırım Karar Destek',
                        icon:'Images/16/karardestek.jpg',
                        handler:function () {
                          ///////////////
                        }
                    } 
                ]
            },
            ' ',
            {
                text:'Harita',
                icon:'Images/map.png',
                handler:function () {
                    window.location = 'Harita.aspx';
                }
            } 
			,
            '-',
            {
                text:'Sorgulamalar',
                xtype:'splitbutton',
                icon:'Images/sorgulama.png',
                menu:[
                    {
                        text:'Özel Sorgulama',
                        icon:'Images/private.png',
                        handler:function () {
                            HaritaWindow.ozelSorgulama.show();
                        },
                        menu:[
                            {
                                text:'<img src="Images/buz_.jpg" style="width:16px; height:16px" /> Büz',
                                xtype:'menucheckitem',
                                hideOnClick:false,
                                listeners:{
                                    checkchange:function (item, checked) {

                                        if (checked) {
                                            if (HaritaWindow.ozelSorgulama.isVisible()) {
                                                HaritaStore.privatePoiStore.load({
                                                    params:{ param:'eczane' },
                                                    add:true
                                                });
                                            } else {
                                                HaritaStore.privatePoiStore.load({
                                                    params:{ param:'eczane' },
                                                    add:true
                                                });
                                                HaritaWindow.ozelSorgulama.show();
                                            }
                                        } else {
                                            HaritaStore.privatePoiStore.remove(HaritaStore.privatePoiStore.query('KATEGORI', 'ECZANE').items);
                                        }
                                    }
                                }
                            },
                            {
                                text:'<img src="Images/kopru_.jpg" style="width:16px; height:16px" /> Köprü',
                                xtype:'menucheckitem',
                                hideOnClick:false,
                                listeners:{
                                    checkchange:function (item, checked) {

                                        if (checked) {
                                            if (HaritaWindow.ozelSorgulama.isVisible()) {
                                                HaritaStore.privatePoiStore.load({
                                                    params:{ param:'hastane' },
                                                    add:true
                                                });
                                            } else {
                                                HaritaStore.privatePoiStore.load({
                                                    params:{ param:'hastane' },
                                                    add:true
                                                });
                                                HaritaWindow.ozelSorgulama.show();
                                            }
                                        } else {
                                            HaritaStore.privatePoiStore.remove(HaritaStore.privatePoiStore.query('KATEGORI', 'HASTANE').items);
                                        }
                                    }
                                }
                            },
                            {
                                text:'<img src="Images/menfez_.jpg" style="width:16px; height:16px" /> Menfez',
                                xtype:'menucheckitem',
                                hideOnClick:false,
                                listeners:{
                                    checkchange:function (item, checked) {
                                        if (checked) {
                                            if (HaritaWindow.ozelSorgulama.isVisible()) {
                                                HaritaStore.privatePoiStore.load({
                                                    params:{ param:'okul' },
                                                    add:true
                                                });
                                            } else {
                                                HaritaStore.privatePoiStore.load({
                                                    params:{ param:'okul' },
                                                    add:true
                                                });
                                                HaritaWindow.ozelSorgulama.show();
                                            }
                                        } else {
                                            HaritaStore.privatePoiStore.remove(HaritaStore.privatePoiStore.query('KATEGORI', 'OKUL').items);
                                        }
                                    }
                                }
                                 
                            }
                        ]
                    },
                    {
                        text:'Genel Sorgulama',
                        icon:'Images/genel.png',
                        handler:function () {
                            HaritaWindow.genelSorgulama.show();
                        }
                    }
                ]
            },
            ' ',
            {
                text:'Analizler',
                xtype:'splitbutton',
                icon:'Images/analyze.png',
                menu:[
                    {
                        text:'Tampon Bölge Analizi',
                        icon:'Images/buffer.png',
                        handler:function () {

                            if (OpenLayersLib.infoControl.active) {
                                OpenLayersLib.infoControl.deactivate();
                                Ext.getCmp('Info').toggle();
                            }

                            if (OpenLayersLib.drawPointControl.active) {
                                OpenLayersLib.drawPointControl.deactivate();
                            }
                            else {
                                OpenLayersLib.drawPointControl.activate();
                            }
                        }
                    },
                    {
                        text:'Tematik Harita',
                        icon:'Images/16/tematik.jpg',
                        handler:function () {
                            HaritaWindow.RiskJeolojiAnalizi.show();
                        }
                    } 
                ]
            },
            ' ',
            {
                id:'Info',
                text:'Bilgi Al',
                enableToggle:true,
                icon:'Images/info.png',
                handler:function () {

                    if (OpenLayersLib.drawPointControl.active) {
                        OpenLayersLib.drawPointControl.deactivate();
                    }

                    if (OpenLayersLib.infoControl.active) {
                        OpenLayersLib.infoControl.deactivate();
                    }
                    else {
                        OpenLayersLib.infoControl.activate();
                    }
                }
            },
            ' ',
            {
                id:'KatmanKontrol',
                text:'Katman Kontrolü',
                icon:'Images/katman.png',
                handler:function () {
                    HaritaWindow.katmanKontrol.show();
                }
            },
            {
                id:'HaritaTemizle',
                text:'Temizle',
                icon:'Images/clear.png',
                handler:function () {
                    Ext.Ajax.request({
                    	url: 'Handlers/Harita.ashx?COMMAND=TEMIZLE',
                        method:'GET',
                        success:function () {
                            OpenLayersLib.cosmeticLayer.destroyFeatures();
                            Ext.get('Lejant').setStyle('display', 'none');
                            OpenLayersLib.clearMarker();
                            OpenLayersLib.refreshMap();
                        },
                        failure:function () {
                            Ext.MessageBox.show({ title:'HATA', msg:'Temizleme İşlemi Başarısız!', icon:Ext.MessageBox.ERROR });
                        }
                    });
                }
            },
            '->',
            {
                id:'SafeExit',
                text:'Güvenli Çıkış',
                icon:'Images/safeExit.png',
                handler:function () {
                    Ext.Ajax.request({
                    	url: 'Handlers/LoginHandler.ashx?COMMAND=EXIT',
                        method:'GET',
                        success:function () {
                            window.location = 'Login.aspx';
                        },
                        failure:function () {
                            Ext.MessageBox.show({ title:'HATA', msg:'Çıkış İşleminde Bir Hata Oluştu, Lütfen Tekrar Deneyiniz!', icon:Ext.MessageBox.ERROR });
                        }
                    });
                }
            }
        ]
    })  
	}