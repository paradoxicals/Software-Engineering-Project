
Ext.namespace('Ext.ux.menu');

Ext.ux.menu.ListMenu = Ext.extend(Ext.menu.Menu, {
  
    labelField :  'text',
  
    loadingText : 'Loading...',
   
    loadOnShow : true,
   
    single : false,

    constructor : function (cfg) {
        this.selected = [];
        this.addEvents(
          
            'checkchange'
        );
      
        Ext.ux.menu.ListMenu.superclass.constructor.call(this, cfg = cfg || {});
    
        if(!cfg.store && cfg.options){
            var options = [];
            for(var i=0, len=cfg.options.length; i<len; i++){
                var value = cfg.options[i];
                switch(Ext.type(value)){
                    case 'array':  options.push(value); break;
                    case 'object': options.push([value.id, value[this.labelField]]); break;
                    case 'string': options.push([value, value]); break;
                }
            }
            
            this.store = new Ext.data.Store({
                reader: new Ext.data.ArrayReader({id: 0}, ['id', this.labelField]),
                data:   options,
                listeners: {
                    'load': this.onLoad,
                    scope:  this
                }
            });
            this.loaded = true;
        } else {
            this.add({text: this.loadingText, iconCls: 'loading-indicator'});
            this.store.on('load', this.onLoad, this);
        }
    },

    
});