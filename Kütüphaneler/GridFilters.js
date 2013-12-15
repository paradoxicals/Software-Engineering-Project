Ext.namespace('Ext.ux.grid');
Ext.ux.grid.GridFilters = Ext.extend(Ext.util.Observable, {
	
	autoReload: true,

	filterCls: 'ux-filtered-column',
	
	local: false,
	
	menuFilterText: 'Filtre',
	
	paramPrefix: 'filter',
	
	showMenu: true,
	
	stateId: undefined,
	
	updateBuffer: 500,

	
	constructor: function (config) {
		config = config || {};
		this.deferredUpdate = new Ext.util.DelayedTask(this.reload, this);
		this.filters = new Ext.util.MixedCollection();
		this.filters.getKey = function (o) {
			return o ? o.dataIndex : null;
		};
		this.addFilters(config.filters);
		delete config.filters;
		Ext.apply(this, config);
	},

	init: function (grid) {
		if (grid instanceof Ext.grid.GridPanel) {
			this.grid = grid;

			this.bindStore(this.grid.getStore(), true);
			if (this.filters.getCount() == 0) {
				this.addFilters(this.grid.getColumnModel());
			}

			this.grid.filters = this;

			this.grid.addEvents({ 'filterupdate': true });

			grid.on({
				scope: this,
				beforestaterestore: this.applyState,
				beforestatesave: this.saveState,
				beforedestroy: this.destroy,
				reconfigure: this.onReconfigure
			});

			if (grid.rendered) {
				this.onRender();
			} else {
				grid.on({
					scope: this,
					single: true,
					render: this.onRender
				});
			}

		} else if (grid instanceof Ext.PagingToolbar) {
			this.toolbar = grid;
		}
	},

	
	applyState: function (grid, state) {
		var key, filter;
		this.applyingState = true;
		this.clearFilters();
		if (state.filters) {
			for (key in state.filters) {
				filter = this.filters.get(key);
				if (filter) {
					filter.setValue(state.filters[key]);
					filter.setActive(true);
				}
			}
		}
		this.deferredUpdate.cancel();
		if (this.local) {
			this.reload();
		}
		delete this.applyingState;
		delete state.filters;
	},

	saveState: function (grid, state) {
		var filters = {};
		this.filters.each(function (filter) {
			if (filter.active) {
				filters[filter.dataIndex] = filter.getValue();
			}
		});
		return (state.filters = filters);
	},

	
	onRender: function () {
		this.grid.getView().on('refresh', this.onRefresh, this);
		this.createMenu();
	},


	destroy: function () {
		this.removeAll();
		this.purgeListeners();

		if (this.filterMenu) {
			Ext.menu.MenuMgr.unregister(this.filterMenu);
			this.filterMenu.destroy();
			this.filterMenu = this.menu.menu = null;
		}
	},

	removeAll: function () {
		if (this.filters) {
			Ext.destroy.apply(Ext, this.filters.items);
			// remove all items from the collection
			this.filters.clear();
		}
	},

	bindStore: function (store, initial) {
		if (!initial && this.store) {
			if (this.local) {
				store.un('load', this.onLoad, this);
			} else {
				store.un('beforeload', this.onBeforeLoad, this);
			}
		}
		if (store) {
			if (this.local) {
				store.on('load', this.onLoad, this);
			} else {
				store.on('beforeload', this.onBeforeLoad, this);
			}
		}
		this.store = store;
	},

	onReconfigure: function () {
		this.bindStore(this.grid.getStore());
		this.store.clearFilter();
		this.removeAll();
		this.addFilters(this.grid.getColumnModel());
		this.updateColumnHeadings();
	},

		