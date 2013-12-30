Ext.namespace("Ext.ux.form");


Ext.ux.form.MultiSelectField = Ext.extend(Ext.form.TriggerField, {
    
		initComponent:function() {
 
 				Ext.ux.form.MultiSelectField.superclass.initComponent.call(this);
 
				this.readOnly = true;
 				this.menu = new Ext.menu.Menu();
    		for(var i=0; i<this.items.length; i++)
				{
					var cfg = this.items[i];
					var ci = new Ext.menu.CheckItem({
						text: cfg.label,
						value: cfg.value,
						hideOnClick: false
					});
					ci.on("checkchange",function(check, bChecked){
						this.fireEvent("change", this);
						this.setRawValue(this.getLabel());
					},this);
					this.menu.add(ci);
				}
    },
		
		onTriggerClick : function(){
        if(this.disabled){
            return;
        }
				if(this.menu.isVisible())
        	this.menu.hide();
				else	
					this.menu.show(this.el, "tl-bl?");
    },
		
		onDestroy : function(){
        if(this.menu) {
            this.menu.destroy();
        }
        Ext.form.SelectButton.superclass.onDestroy.call(this);
    },
		
    getValue: function() 
		{
			var value = "";
			this.menu.items.each(function(item){
				if(item.checked)
				{
					if(value.length > 0)
						value += ",";
					value += item.value;
				}	
			});
			return value;    
    },
		
		getLabel: function()
		{
			var text = "";
			this.menu.items.each(function(item){
				if(item.checked)
				{
					if(text.length > 0)
						text += ",";
					text += item.text;
				}	
			});
			return text;    
		},
		
		setValue: function(sValue)
		{
			if(Ext.isEmpty(sValue))
				return;
			var els = sValue.split(",");
			this.menu.items.each(function(item){
				item.setChecked((els.indexOf(item.value) >= 0),true);
			});
			Ext.form.DateField.superclass.setRawValue.call(this, this.getLabel());
		},
		
		reset: function()
		{
			this.menu.items.each(function(item){
				item.setChecked(false, true);
			});
		},
		
		numChecked: function()
		{
			var c = 0;
			this.menu.items.each(function(item){
				if(item.checked)
					c++;
			});
			return c;
		}
		
		
});
 
// register xtype
Ext.reg('multiselectfield', Ext.ux.form.MultiSelectField);
