/** 
  * List compiled by mystix on the extjs.com forums. 
  * Thank you Mystix! 
  * 
  * Turkish translation by Alper YAZGAN 
  * 2008-01-24 , 10:29 AM  
 */ 
  
 Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Yükleniyor ...</div>'; 
  
 if(Ext.View){ 
   Ext.View.prototype.emptyText = ""; 
 } 
  
 if(Ext.grid.GridPanel){ 
   Ext.grid.GridPanel.prototype.ddText = "Secili Satir Sayisi : {0}"; 
 } 
  
 if(Ext.TabPanelItem){ 
   Ext.TabPanelItem.prototype.closeText = "Sekmeyi kapat"; 
 } 
  
 if(Ext.form.Field){ 
   Ext.form.Field.prototype.invalidText = "Bu alandaki deger gecersiz"; 
 } 
  
 if(Ext.LoadMask){ 
   Ext.LoadMask.prototype.msg = "Yükleniyor ..."; 
 } 
  
 Date.monthNames = [ 
   "Ocak", 
   "Subat", 
   "Mart", 
   "Nisan", 
   "Mayis", 
   "Haziran", 
   "Temmuz", 
   "Agustos", 
   "Eylul", 
   "Ekim", 
   "Kasim", 
   "Aralik" 
 ]; 
  
 Date.getShortMonthName = function(month) { 
   return Date.monthNames[month].substring(0, 3); 
 }; 
  
 Date.monthNumbers = { 
   Jan : 0, 
   Feb : 1, 
   Mar : 2, 
   Apr : 3, 
   May : 4, 
   Jun : 5, 
   Jul : 6, 
   Aug : 7, 
   Sep : 8, 
   Oct : 9, 
   Nov : 10, 
   Dec : 11 
 }; 
  
 Date.getMonthNumber = function(name) { 
   return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()]; 
 }; 
  
 Date.dayNames = [ 
   "Pazar", 
   "Pazartesi", 
   "Sali", 
   "Carsamba", 
   "Persembe", 
   "Cuma", 
   "Cumartesi" 
 ]; 
  
 Date.shortDayNames = [ 
   "Paz", 
   "Pzt", 
   "Sal", 
   "Çrs", 
   "Prs", 
   "Cum", 
   "Cmt" 
 ]; 
  
 Date.getShortDayName = function(day) { 
   return Date.shortDayNames[day]; 
 }; 
  
 if(Ext.MessageBox){ 
   Ext.MessageBox.buttonText = { 
     ok     : "Tamam", 
     cancel : "Iptal", 
     yes    : "Evet", 
     no     : "Hayir" 
   }; 
 } 
  
 if(Ext.util.Format){ 
   Ext.util.Format.date = function(v, format){ 
     if(!v) return ""; 
     if(!(v instanceof Date)) v = new Date(Date.parse(v)); 
     return v.dateFormat(format || "d/m/Y"); 
   }; 
 } 
  
 if(Ext.DatePicker){ 
   Ext.apply(Ext.DatePicker.prototype, { 
     todayText         : "Bugun", 
     minText           : "Bu tarih izin verilen en küçük tarihten daha önce", 
     maxText           : "Bu tarih izin verilen en büyük tarihten daha sonra", 
     disabledDaysText  : "", 
     disabledDatesText : "", 
     monthNames        : Date.monthNames, 
     dayNames          : Date.dayNames, 
     nextText          : 'Gelecek Ay (Control+Right)', 
     prevText          : 'Önceki Ay (Control+Left)', 
     monthYearText     : 'Bir ay þeçiniz (Yýlý artýrmak/azaltmak için Control+Up/Down)', 
     todayTip          : "{0} (Boþluk Tuþu - Spacebar)", 
     format            : "d/m/Y", 
     okText            : "&#160;Tamam&#160;", 
     cancelText        : "Ýptal", 
     startDay          : 1 
   }); 
 } 
  
 if(Ext.PagingToolbar){ 
   Ext.apply(Ext.PagingToolbar.prototype, { 
     beforePageText : "Sayfa", 
     afterPageText  : " / {0}", 
     firstText      : "Ilk Sayfa", 
     prevText       : "Önceki Sayfa", 
     nextText       : "Sonraki Sayfa", 
     lastText       : "Son Sayfa", 
     refreshText    : "Yenile", 
   //  displayMsg     : "Gosterilen {0} - {1} / {2}", 
     displayMsg     : "Toplam Kayit :  {2}", 
   
     emptyMsg       : 'Gosterilebilecek veri yok' 
   }); 
 } 
  
 if(Ext.form.TextField){ 
   Ext.apply(Ext.form.TextField.prototype, { 
     minLengthText : "Girilen verinin uzunlugu en az {0} olabilir", 
     maxLengthText : "Girilen verinin uzunlugu en fazla {0} olabilir", 
     blankText     : "Bu alan bos birakilamaz", 
     regexText     : "", 
     emptyText     : null 
   }); 
 } 
  
 if(Ext.form.NumberField){ 
   Ext.apply(Ext.form.NumberField.prototype, { 
     minText : "En az {0} girilebilir", 
     maxText : "En çok {0} girilebilir", 
     nanText : "{0} geçersiz bir sayidir" 
   }); 
 } 
  
 if(Ext.form.DateField){ 
   Ext.apply(Ext.form.DateField.prototype, { 
     disabledDaysText  : "Disabled", 
     disabledDatesText : "Disabled", 
     minText           : "Bu tarih, {0} tarihinden daha sonra olmalidir",  
     maxText           : "Bu tarih, {0} tarihinden daha önce olmalidir", 
     invalidText       : "{0} geçersiz bir tarihdir - tarih formati {1} seklinde olmalidir", 
     format            : "d/m/Y", 
     altFormats        : "d.m.y|d.m.Y|d/m/y|d-m-Y|d-m-y|d.m|d/m|d-m|dm|dmY|dmy|d|Y.m.d|Y-m-d|Y/m/d" 
   }); 
 } 
  
 if(Ext.form.ComboBox){ 
   Ext.apply(Ext.form.ComboBox.prototype, { 
     loadingText       : "Yükleniyor ...", 
     valueNotFoundText : undefined 
   }); 
 } 
  
 if(Ext.form.VTypes){ 
   Ext.apply(Ext.form.VTypes, { 
     emailText    : 'Bu alan "user@domain.com" seklinde elektronik posta formatýnda olmalidir', 
     urlText      : 'Bu alan "http://www.domain.com" þeklinde URL adres formatýnda olmalidir', 
     alphaText    : 'Bu alan sadece harf ve _ içermeli', 
     alphanumText : 'Bu alan sadece harf, sayý ve _ içermeli' 
   }); 
 } 
  
 if(Ext.form.HtmlEditor){ 
   Ext.apply(Ext.form.HtmlEditor.prototype, { 
     createLinkText : 'Lütfen bu baglanti için gerekli URL adresini giriniz:', 
     buttonTips : { 
       bold : { 
         title: 'Kalýn(Bold) (Ctrl+B)', 
         text: 'Þeçili yazýyý kalýn yapar.', 
         cls: 'x-html-editor-tip' 
       }, 
       italic : { 
         title: 'Ýtalik(Italic) (Ctrl+I)', 
         text: 'Þeçili yazýyý italik yapar.', 
         cls: 'x-html-editor-tip' 
       }, 
       underline : { 
         title: 'Alt Çizgi(Underline) (Ctrl+U)', 
         text: 'Þeçili yazýnýn altýný çizer.', 
         cls: 'x-html-editor-tip' 
       }, 
       increasefontsize : { 
         title: 'Fontu büyült', 
         text: 'Yazý fontunu büyütür.', 
         cls: 'x-html-editor-tip' 
       }, 
       decreasefontsize : { 
         title: 'Fontu küçült', 
         text: 'Yazý fontunu küçültür.', 
         cls: 'x-html-editor-tip' 
       }, 
       backcolor : { 
         title: 'Arka Plan Rengi', 
         text: 'Seçili yazýnýn arka plan rengini deðiþtir.', 
         cls: 'x-html-editor-tip' 
       }, 
       forecolor : { 
         title: 'Yazý Rengi', 
         text: 'Seçili yazýnýn rengini deðiþtir.', 
         cls: 'x-html-editor-tip' 
       }, 
       justifyleft : { 
         title: 'Sola Daya', 
         text: 'Yazýyý sola daya.', 
         cls: 'x-html-editor-tip' 
       }, 
       justifycenter : { 
         title: 'Ortala', 
         text: 'Yazýyý editörde ortala.', 
         cls: 'x-html-editor-tip' 
       }, 
       justifyright : { 
         title: 'Saða daya', 
         text: 'Yazýyý saða daya.', 
         cls: 'x-html-editor-tip' 
       }, 
       insertunorderedlist : { 
         title: 'Noktalý Liste', 
         text: 'Noktalý listeye baþla.', 
         cls: 'x-html-editor-tip' 
       }, 
       insertorderedlist : { 
         title: 'Numaralý Liste', 
         text: 'Numaralý lisyeye baþla.', 
         cls: 'x-html-editor-tip' 
       }, 
       createlink : { 
         title: 'Web Adresi(Hyperlink)', 
         text: 'Seçili yazýyý web adresi(hyperlink) yap.', 
         cls: 'x-html-editor-tip' 
       }, 
       sourceedit : { 
         title: 'Kaynak kodu Düzenleme', 
         text: 'Kaynak kodu düzenleme moduna geç.', 
         cls: 'x-html-editor-tip' 
       } 
     } 
   }); 
 } 
  
 if(Ext.grid.GridView){ 
   Ext.apply(Ext.grid.GridView.prototype, { 
     sortAscText  : "Artan sirada sirala", 
     sortDescText : "Azalan sirada sirala", 
     lockText     : "Kolonu kilitle", 
     unlockText   : "Kolon kilidini kaldir", 
     columnsText  : "Kolonlar" 
   }); 
 } 
  
 if(Ext.grid.GroupingView){ 
   Ext.apply(Ext.grid.GroupingView.prototype, { 
     emptyGroupText : '(Yok)', 
     groupByText    : 'Bu Alana Göre Grupla', 
     showGroupsText : 'Gruplar Halinde Göster' 
   }); 
 } 
  
 if(Ext.grid.PropertyColumnModel){ 
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, { 
     nameText   : "Ad", 
     valueText  : "Deger", 
     dateFormat : "d/m/Y" 
   }); 
 } 
  
 if(Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion){ 
   Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, { 
     splitTip            : "Yeniden boyutlandýrmak için sürükle.", 
     collapsibleSplitTip : "Yeniden boyutlandýrmak için sürükle. Saklamak için çift týkla." 
   }); 
 } 
 