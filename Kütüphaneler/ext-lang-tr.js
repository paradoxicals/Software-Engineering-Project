/** 
  * List compiled by mystix on the extjs.com forums. 
  * Thank you Mystix! 
  * 
  * Turkish translation by Alper YAZGAN 
  * 2008-01-24 , 10:29 AM  
 */ 
  
 Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Y�kleniyor ...</div>'; 
  
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
   Ext.LoadMask.prototype.msg = "Y�kleniyor ..."; 
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
   "�rs", 
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
     minText           : "Bu tarih izin verilen en k���k tarihten daha �nce", 
     maxText           : "Bu tarih izin verilen en b�y�k tarihten daha sonra", 
     disabledDaysText  : "", 
     disabledDatesText : "", 
     monthNames        : Date.monthNames, 
     dayNames          : Date.dayNames, 
     nextText          : 'Gelecek Ay (Control+Right)', 
     prevText          : '�nceki Ay (Control+Left)', 
     monthYearText     : 'Bir ay �e�iniz (Y�l� art�rmak/azaltmak i�in Control+Up/Down)', 
     todayTip          : "{0} (Bo�luk Tu�u - Spacebar)", 
     format            : "d/m/Y", 
     okText            : "&#160;Tamam&#160;", 
     cancelText        : "�ptal", 
     startDay          : 1 
   }); 
 } 
  
 if(Ext.PagingToolbar){ 
   Ext.apply(Ext.PagingToolbar.prototype, { 
     beforePageText : "Sayfa", 
     afterPageText  : " / {0}", 
     firstText      : "Ilk Sayfa", 
     prevText       : "�nceki Sayfa", 
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
     maxText : "En �ok {0} girilebilir", 
     nanText : "{0} ge�ersiz bir sayidir" 
   }); 
 } 
  
 if(Ext.form.DateField){ 
   Ext.apply(Ext.form.DateField.prototype, { 
     disabledDaysText  : "Disabled", 
     disabledDatesText : "Disabled", 
     minText           : "Bu tarih, {0} tarihinden daha sonra olmalidir",  
     maxText           : "Bu tarih, {0} tarihinden daha �nce olmalidir", 
     invalidText       : "{0} ge�ersiz bir tarihdir - tarih formati {1} seklinde olmalidir", 
     format            : "d/m/Y", 
     altFormats        : "d.m.y|d.m.Y|d/m/y|d-m-Y|d-m-y|d.m|d/m|d-m|dm|dmY|dmy|d|Y.m.d|Y-m-d|Y/m/d" 
   }); 
 } 
  
 if(Ext.form.ComboBox){ 
   Ext.apply(Ext.form.ComboBox.prototype, { 
     loadingText       : "Y�kleniyor ...", 
     valueNotFoundText : undefined 
   }); 
 } 
  
 if(Ext.form.VTypes){ 
   Ext.apply(Ext.form.VTypes, { 
     emailText    : 'Bu alan "user@domain.com" seklinde elektronik posta format�nda olmalidir', 
     urlText      : 'Bu alan "http://www.domain.com" �eklinde URL adres format�nda olmalidir', 
     alphaText    : 'Bu alan sadece harf ve _ i�ermeli', 
     alphanumText : 'Bu alan sadece harf, say� ve _ i�ermeli' 
   }); 
 } 
  
 if(Ext.form.HtmlEditor){ 
   Ext.apply(Ext.form.HtmlEditor.prototype, { 
     createLinkText : 'L�tfen bu baglanti i�in gerekli URL adresini giriniz:', 
     buttonTips : { 
       bold : { 
         title: 'Kal�n(Bold) (Ctrl+B)', 
         text: '�e�ili yaz�y� kal�n yapar.', 
         cls: 'x-html-editor-tip' 
       }, 
       italic : { 
         title: '�talik(Italic) (Ctrl+I)', 
         text: '�e�ili yaz�y� italik yapar.', 
         cls: 'x-html-editor-tip' 
       }, 
       underline : { 
         title: 'Alt �izgi(Underline) (Ctrl+U)', 
         text: '�e�ili yaz�n�n alt�n� �izer.', 
         cls: 'x-html-editor-tip' 
       }, 
       increasefontsize : { 
         title: 'Fontu b�y�lt', 
         text: 'Yaz� fontunu b�y�t�r.', 
         cls: 'x-html-editor-tip' 
       }, 
       decreasefontsize : { 
         title: 'Fontu k���lt', 
         text: 'Yaz� fontunu k���lt�r.', 
         cls: 'x-html-editor-tip' 
       }, 
       backcolor : { 
         title: 'Arka Plan Rengi', 
         text: 'Se�ili yaz�n�n arka plan rengini de�i�tir.', 
         cls: 'x-html-editor-tip' 
       }, 
       forecolor : { 
         title: 'Yaz� Rengi', 
         text: 'Se�ili yaz�n�n rengini de�i�tir.', 
         cls: 'x-html-editor-tip' 
       }, 
       justifyleft : { 
         title: 'Sola Daya', 
         text: 'Yaz�y� sola daya.', 
         cls: 'x-html-editor-tip' 
       }, 
       justifycenter : { 
         title: 'Ortala', 
         text: 'Yaz�y� edit�rde ortala.', 
         cls: 'x-html-editor-tip' 
       }, 
       justifyright : { 
         title: 'Sa�a daya', 
         text: 'Yaz�y� sa�a daya.', 
         cls: 'x-html-editor-tip' 
       }, 
       insertunorderedlist : { 
         title: 'Noktal� Liste', 
         text: 'Noktal� listeye ba�la.', 
         cls: 'x-html-editor-tip' 
       }, 
       insertorderedlist : { 
         title: 'Numaral� Liste', 
         text: 'Numaral� lisyeye ba�la.', 
         cls: 'x-html-editor-tip' 
       }, 
       createlink : { 
         title: 'Web Adresi(Hyperlink)', 
         text: 'Se�ili yaz�y� web adresi(hyperlink) yap.', 
         cls: 'x-html-editor-tip' 
       }, 
       sourceedit : { 
         title: 'Kaynak kodu D�zenleme', 
         text: 'Kaynak kodu d�zenleme moduna ge�.', 
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
     groupByText    : 'Bu Alana G�re Grupla', 
     showGroupsText : 'Gruplar Halinde G�ster' 
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
     splitTip            : "Yeniden boyutland�rmak i�in s�r�kle.", 
     collapsibleSplitTip : "Yeniden boyutland�rmak i�in s�r�kle. Saklamak i�in �ift t�kla." 
   }); 
 } 
 