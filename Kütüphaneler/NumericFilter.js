
Ext.ux.grid.filter.NumericFilter = Ext.extend(Ext.ux.grid.filter.Filter, {

 
    fieldCls : Ext.form.NumberField,
   
    iconCls : {
        gt : 'ux-rangemenu-gt',
        lt : 'ux-rangemenu-lt',
        eq : 'ux-rangemenu-eq'
    },

 
    menuItemCfgs : {
        emptyText: 'Filtrelenecek Deðer...',
        selectOnFocus: true,
        width: 125
    },

   
    menuItems : ['lt', 'gt', '-', 'eq'],

   
    init : function (config) {
       
        if (this.menu){
            this.menu.destroy();
        }        
        this.menu = new Ext.ux.menu.RangeMenu(Ext.apply(config, {
            // pass along filter configs to the menu
            fieldCfg : this.fieldCfg || {},
            fieldCls : this.fieldCls,
            fields : this.fields || {},
            iconCls: this.iconCls,
            menuItemCfgs: this.menuItemCfgs,
            menuItems: this.menuItems,
            updateBuffer: this.updateBuffer
        }));
        // relay the event fired by the menu
        this.menu.on('update', this.fireUpdate, this);
    },

});