 
Ext.onReady(function () {
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    function successNotice(form, action) { // 10
        
		 Ext.Msg.show({
            title:'Uyarı',
            msg:'Kayıt başarılı!',
            buttons:Ext.Msg.OK,
            icon:Ext.MessageBox.OK,
            width:275
        });
		 window.location = 'GIRIS.php';
    }

    function failureNotice(form, action) { // 11
        Ext.Msg.show({
            title:'Uyarı',
            msg:'Bilinmeyen bir hata oluştu!',
            buttons:Ext.Msg.OK,
            icon:Ext.MessageBox.ERROR,
            width:275
        });
    } 
   
   var durum;
   
    var viewport = new Ext.Viewport({ 
      layout: 'fit',
      items:[ 
            {
                region:'center',
                margins:'5 5 5 5',
                layout:'column',
                autoScroll:true,
                items:[
                    { region:'center',
                        columnWidth:.35,
                        baseCls:'x-plain',
                        frame:true,
                        bodyStyle:'padding:5px 0 5px 5px',
                        items:[
                            new Ext.FormPanel({
                                method:'get',
                                labelWidth:100,
                                frame:true,
                                title:'Kullanıcı Kayıt',
                                bodyStyle:'padding:5px 5px 0',
                                width:'auto',
                                defaultType:'textfield',
								  html:'<div align="center" style="background-color:transparent;" ></div>',
                                items:[
                                    {
                                        fieldLabel:'Kullanıcı Adı',
                                        width:310,
                                        name:'kullaniciadi',
                                        allowBlank:false
                                    },
									  {
                                        fieldLabel:'Şifre',
                                        width:310,
                                        name:'sifre',
                                        allowBlank:false
                                    },
									  {
                                        fieldLabel:'Ad',
                                        width:310,
                                        name:'ad',
                                        allowBlank:false
                                    },
									  {
                                        fieldLabel:'Soyad',
                                        width:310,
                                        name:'soyad',
                                        allowBlank:false
                                    },
									  {
                                        fieldLabel:'TCNO',
                                        width:310,
                                        name:'tcno',
                                        allowBlank:false
                                    },
									  {
                                        fieldLabel:'Telefon',
                                        width:310,
                                        name:'telefon',
                                        allowBlank:false
                                    },
									  {
                                        fieldLabel:'Adres',
                                        width:310,
                                        name:'adres',
                                        allowBlank:false
                                    },
								
                                ],

                                buttons:[
                                    {
                                        text:'Kaydet',
                                        handler:function (btn, eventObject) {
											
											
											
											
											
                                            var formPanel = btn.findParentByType("form");
                                            var form = formPanel.getForm();
                                            if (form.isValid()) {
                                                form.submit({
                                                    url:'php/Ekleme/kullaniciekle.php',
                                                    method:'get',  
													//params : {durum : durum},
                                                 	params : {durum : 3},
                                                
												    //clientValidation:true,
                                                    success:successNotice,
                                                    failure:failureNotice,
                                                    waitMsg:'Yanıt Bekleniyor...',
                                                    waitTitle:'Durum'
                                                });
                                            }
                                        }
                                    },
                                    {
                                        text:'Temizle',
                                        handler:function (btn, eventObject) {
                                            btn.findParentByType("form").getForm().reset();
                                        }
                                    }
                                ]
                            })
                        ]
                    }
                     
                ]
            } 
        ]
    });
});