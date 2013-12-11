 Ext.onReady(function () {
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	
	function kullaniciSifreGuncelle(oGrid_event){
   Ext.Ajax.request({   
   url:'php/kullanici_sifre_duzenle.php',
	 // method: 'POST', 
      params: {
         id: oGrid_event.record.data.id,
	    // sifre: oGrid_event.record.data.sifre,
		 		  }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            store_kullanicilar.commitChanges();
            store_kullanicilar.reload();
            break;					
         default:
            Ext.MessageBox.alert('Uyarı...','Değişiklik Kaydedilemedi...');
            break;
         }
      },
      failure: function(response){
         var result=response.responseText;
         Ext.MessageBox.alert('error','could not connect to the database. retry later');		
      }									    
   });   
  }    
  
	
	
	
	  function kullaniciGuncelle(oGrid_event){
		   Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Güncellenecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
   Ext.Ajax.request({   
   url:'php/kullanici_duzenle.php',
	 // method: 'POST', 
      params: {
         id: oGrid_event.record.data.id,
	     kullaniciadi: oGrid_event.record.data.kullaniciadi,
		// sifre: oGrid_event.record.data.sifre,
		 ad: oGrid_event.record.data.ad,
		 soyad: oGrid_event.record.data.soyad,
		 tcno: oGrid_event.record.data.tcno,
		 telefon: oGrid_event.record.data.telefon,
		 adres: oGrid_event.record.data.adres,
		 yetki: oGrid_event.record.data.yetki 
			  }, 
      success: function(response){							
         var result=eval(response.responseText);
         switch(result){
         case 1:
            store_kullanicilar.commitChanges();
            store_kullanicilar.reload();
            break;					
         default:
            Ext.MessageBox.alert('Uyarı...','Değişiklik Kaydedilemedi...');
            break;
         }
      },
      failure: function(response){
         var result=response.responseText;
         Ext.MessageBox.alert('error','could not connect to the database. retry later');		
      }									    
   });   
  }    
  
	else{
     
	 
   }
 })
  } 
	

    function successNotice(form, action) { // 10
        Ext.getCmp('ustgrid').store.reload();
        Ext.Msg.show({
            title:'Uyarı',
            msg:'Kayıt başarılı!',
            buttons:Ext.Msg.OK,
            icon:Ext.MessageBox.OK,
            width:275
        });
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


  var   textKullaniciYeniSifre=new Ext.form.TextField({
        id:'textKullaniciYeniSifre',
        width:150,
		 labelWidth: 200,
        fieldLabel:'Yeni Şifre ',
        labelStyle:'font-weight: bold',
        readOnly:false
    });
	
	 
	
     
	 var kullaniciyenisifreWindow =  new Ext.Window({
        title:'	',
        width:600,
        height:300,
         closable:true,
         closeAction:'hide',
        layout:'border', 
		items:[ 
            {
                region:'center',
                  items:[ 
					textKullaniciYeniSifre,
						  new Ext.Button({
            
			    fieldLabel:'Şifreyi Güncelle',
        	    labelAlign: 'right',
	     	    labelStyle: 'font-weight:bold;',
	            labelWidth: 150, 
                text: "Hesapla",
			    icon:'Images/hesapla.png',
			icon:'Images/hesapla.png',
            handler: function() {
		    	
			}})
                ]
            }
        ]}); 


 
    var store_kullanicilar = new Ext.data.JsonStore({
     fields:['id', 'kullaniciadi', 'sifre', 'ad', 'soyad','tcno','telefon','adres','yetki'],
          url:'php/kullanicilar.php',
        root:'roots',
        autoLoad:true
    });
	
	var secilen_kullanici_id;
	
    var sm_kullanicilar = new Ext.grid.CheckboxSelectionModel({
	    listeners:{
            selectionchange:function (selModel) {
              secilen_kullanici_id=selModel.selections.items[0].data.id;
            }
        }
    });
    var ustgrid = new Ext.grid.EditorGridPanel({
        id:"ustgrid",
	    selModel:sm_kullanicilar,
        store:store_kullanicilar,
       border:false,
        frame:true,
        columnLines:true, 
		title:"",
		disableSelection:true,
		editable: true,
		enableColLock:false,
		clickToEdit: 2,
        viewConfig: {forceFit:true}, 
	  
	   plugins:[new Ext.ux.grid.GridFilters({
            encode:true,
			autoReload: false, 
			local: true,  
            onCheckChange:function () { 
		    store_kullanicilar.lastOptions.params.start = 0;  
            },
            filters:[
               // {type:'string', dataIndex:'ID'},
				{type:'string', dataIndex:'kullaniciadi'},
				{type:'string', dataIndex:'ad'},
				{type:'string', dataIndex:'soyad'}
            ]
        })], 
	  
        columns:[
          //  sm_kullanicilar,
           /* {
                header:'ID',
                dataIndex:'id',
                width:50
            },*/
            {
                header:'Kullanıcı Adı',
                dataIndex:'kullaniciadi',
                width:200,
				sortable:true,
                editor:new Ext.form.TextField() 
            },
            {
                header:'Şifre',
                dataIndex:'sifre',
                width:150 
			 
            },
            {
                header:'Adı',
                dataIndex:'ad',
                width:150,
				sortable:true,
                editor:new Ext.form.TextField() 
            },
            {
                header:'Soyadı',
                dataIndex:'soyad',
                width:150,
				sortable:true,
                editor:new Ext.form.TextField() 
            },
			 {
                header:'TCNO',
                dataIndex:'tcno',
                width:150,
				sortable:true,
                editor:new Ext.form.TextField() 
            },
			 {
                header:'Telefon',
                dataIndex:'telefon',
                width:150,
				sortable:true,
                editor:new Ext.form.TextField() 
            },
			 {
                header:'Adres',
                dataIndex:'adres',
                width:150,
				sortable:true,
                editor:new Ext.form.TextField() 
            },
            {
                header:'Yetki Düzeyi',
                dataIndex:'yetki',
                width:100,
				sortable:true,
                editor:new Ext.form.TextField() 
            }
        ],
		bbar:[
		 
new Ext.PagingToolbar({
           
            store: store_kullanicilar,
            displayInfo: true
           //,plugins: new Ext.ux.SlidingPager()
        }),

		
          {
            text: "SIL",
			icon:'images/remove.png',
            handler: function() { 
			 
			 Ext.MessageBox.confirm('UYARI', 'Seçili Kayıt Silinecektir. Devam etmek istiyor musunuz?', function(btn){
   if(btn === 'yes'){
	        
			Ext.Ajax.request({ 
              url: 'php/Silme/kullanicisil.php', ////******
			  params:{
				  id: secilen_kullanici_id //**
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object();  
				 store_kullanicilar.load();////****
     
  } 
});
			}
			   else{
     
	 
   }
 })  		 
}
			
			},
			
			{
            text: "Şifre Değiştir",
			icon:'images/remove.png',
            handler: function() { 
			 
			 kullaniciyenisifreWindow.show();
	        
		/*	Ext.Ajax.request({ 
              url: 'php/Silme/kullanicisil.php', ////******
			  params:{
				  id: secilen_kullanici_id //**
			  },
			  method:'GET',
			  success: function(result, request){ 
				 var res = new Object();  
				 store_kullanicilar.load();////****
     
  } 
});*/
			}
			
			}
		
		],
        title:'Kullanıcı Bilgileri',
        height:200
    });

   
   
    ustgrid.on('afteredit', kullaniciGuncelle);
   
   
      var durum;
   
    var viewport = new Ext.Viewport({
        layout:'border',
        items:[
             {
                region:'north',
                height:200,
                border:false,
                margins:'5 5 5 5',
                items:[
                    ustgrid
                ]
            },
            {
                region:'center',
                margins:'5 5 5 5',
                layout:'column',
                autoScroll:true,
                items:[
                    {
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
									
								  new Ext.form.ComboBox({
                                        fieldLabel:'Yetki',
                                        width:310,
                                        typeAhead:true,
                                        triggerAction:'all',
                                        lazyRender:true,
                                        mode:'local',
                                        name:'yetki',
                                        store:new Ext.data.ArrayStore({
                                            fields:[
                                                'no',
                                                'durum'
                                            ],
                                            data:[
                                                ['1', 'Yönetici'],
                                                ['2', 'Yol Şube'] 
                                            ]
                                        }),
                                        valueField:'no',
                                        editable:false,
                                       // displayField:'durum',
                                       displayField:'durum',
                                        
									    listeners:{
                                            select:function (field, newv) {
                                              durum = newv.json[0];
                                            }
                                        }

                                    })

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
														params : {durum : durum},
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