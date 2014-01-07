var HaritaToolBar = {

    toolBar:new Ext.Toolbar({
        style:'margin-top: 0px',
		 height:30,
	  region: "north",
	  
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
                text:'Harita',
                icon:'Images/map.png',
                handler:function () {
                    window.location = 'Harita.aspx';
                }
            }
			/*,
            {
                text:'Önemli Telefonlar',
                icon:'Images/phone.png',
                handler:function () {
                    window.location = 'OnemliTelefonlar.aspx';
                }
            },
            {
                text:'Elektrik Kesintileri',
                icon:'Images/kesinti.png',
                handler:function () {
                    window.location = 'Kesinti.aspx';
                }
            },
            {
                text:'Meteoroloji',
                icon:'Images/weather.png',
                handler:function () {
                    window.location = 'Meteoroloji.aspx';
                }
            }*/
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
                        text:'Yol Proje Durumu',
                        icon:'Images/jeoloji.png',
                        handler:function () {
                            HaritaWindow.RiskJeolojiAnalizi.show();
                        }
                    },
                    {
                        text:'Yol Tipi',
                        icon:'Images/deprem.gif',
                        handler:function () {
                            Ext.Ajax.request({
                            	//url: 'Handlers/Harita.ashx?COMMAND=DEPREM',
                               // method:'GET',
                                success:function (res) {
                                    OpenLayersLib.refreshMap();
                                    if (res.responseText == '1') {
                                        Harita.lejantDepremAnaliziEkle();
                                    } else {
                                        Harita.lejantDepremAnaliziCikar();
                                    }
                                },
                                failure:function () {
                                    Ext.MessageBox.show({ title:'HATA', msg:'Deprem İşlemi Başarısız!', icon:Ext.MessageBox.ERROR });
                                }
                            });
                        }
                    },
                    {
                        text:'Yol Yardımcı Yapılar',
                        icon:'Images/fayhattı.png',
                        handler:function () {
                            Ext.Ajax.request({
                            	//url: 'Handlers/Harita.ashx?COMMAND=FAYHATTI',
                                //method:'GET',
                                success:function (res) {
                                    OpenLayersLib.refreshMap();
                                    if (res.responseText == '1') {
                                        Harita.lejantFayAnaliziEkle();
                                    } else {
                                        Harita.lejantFayAnaliziCikar();
                                    }
                                },
                                failure:function () {
                                    Ext.MessageBox.show({ title:'HATA', msg:'Fay Hattı İşlemi Başarısız!', icon:Ext.MessageBox.ERROR });
                                }
                            });
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
    }),

    renderToolBar:function (divId) {
        this.toolBar.render(divId);
    }

}