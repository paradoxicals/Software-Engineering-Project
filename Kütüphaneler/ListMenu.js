
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

    destroy : function () {
        if (this.store) {
            this.store.destroy();    
        }
        Ext.ux.menu.ListMenu.superclass.destroy.call(this);
    },

    show : function () {
        var lastArgs = null;
        return function(){
            if(arguments.length === 0){
                Ext.ux.menu.ListMenu.superclass.show.apply(this, lastArgs);
            } else {
                lastArgs = arguments;
                if (this.loadOnShow && !this.loaded) {
                    this.store.load();
                }
                Ext.ux.menu.ListMenu.superclass.show.apply(this, arguments);
            }
        };
    }(),
    
    /** @private */
    onLoad : function (store, records) {
        var visible = this.isVisible();
        this.hide(false);
        
        this.removeAll(true);
        
        var gid = this.single ? Ext.id() : null;
        for(var i=0, len=records.length; i<len; i++){
            var item = new Ext.menu.CheckItem({
                text:    records[i].get(this.labelField), 
                group:   gid,
                checked: this.selected.indexOf(records[i].id) > -1,
                hideOnClick: false});
            
            item.itemId = records[i].id;
            item.on('checkchange', this.checkChange, this);
                        
            this.add(item);
        }
        
        this.loaded = true;
        
        if (visible) {
            this.show();
        }	
        this.fireEvent('load', this, records);
    },

    /**
     * Get the selected items.
     * @return {Array} selected
     */
    getSelected : function () {
        return this.selected;
    },
    
    /** @private */
    setSelected : function (value) {
        value = this.selected = [].concat(value);

        if (this.loaded) {
            this.items.each(function(item){
                item.setChecked(false, true);
                for (var i = 0, len = value.length; i < len; i++) {
                    if (item.itemId == value[i]) {
                        item.setChecked(true, true);
                    }
                }
            }, this);
        }
    },
    
    checkChange : function (item, checked) {
        var value = [];
        this.items.each(function(item){
            if (item.checked) {
                value.push(item.itemId);
            }
        },this);
        this.selected = value;
        
        this.fireEvent('checkchange', item, checked);
    }    
});