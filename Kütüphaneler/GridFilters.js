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

	createMenu: function () {
		var view = this.grid.getView(),
            hmenu = view.hmenu;

		if (this.showMenu && hmenu) {

			this.sep = hmenu.addSeparator();
			this.filterMenu = new Ext.menu.Menu({
				id: this.grid.id + '-filters-menu'
			});
			this.menu = hmenu.add({
				checked: false,
				itemId: 'filters',
				text: this.menuFilterText,
				menu: this.filterMenu
			});

			this.menu.on({
				scope: this,
				checkchange: this.onCheckChange,
				beforecheckchange: this.onBeforeCheck
			});
			hmenu.on('beforeshow', this.onMenu, this);
		}
		this.updateColumnHeadings();
	},

	getMenuFilter: function () {
		var view = this.grid.getView();
		if (!view || view.hdCtxIndex === undefined) {
			return null;
		}
		return this.filters.get(
            view.cm.config[view.hdCtxIndex].dataIndex
        );
	},


	onMenu: function (filterMenu) {
		var filter = this.getMenuFilter();

		if (filter) {

			this.menu.menu = filter.menu;
			this.menu.setChecked(filter.active, false);
			// disable the menu if filter.disabled explicitly set to true
			this.menu.setDisabled(filter.disabled === true);
		}

		this.menu.setVisible(filter !== undefined);
		this.sep.setVisible(filter !== undefined);
	},
	onCheckChange: function (item, value) {
		this.getMenuFilter().setActive(value);
	},
	onBeforeCheck: function (check, value) {
		return !value || this.getMenuFilter().isActivatable();
	},

	onStateChange: function (event, filter) {
		if (event === 'serialize') {
			return;
		}

		if (filter == this.getMenuFilter()) {
			this.menu.setChecked(filter.active, false);
		}

		if ((this.autoReload || this.local) && !this.applyingState) {
			this.deferredUpdate.delay(this.updateBuffer);
		}
		this.updateColumnHeadings();

		if (!this.applyingState) {
			this.grid.saveState();
		}
		this.grid.fireEvent('filterupdate', this, filter);
	},

	onBeforeLoad: function (store, options) {
		options.params = options.params || {};
		this.cleanParams(options.params);
		var params = this.buildQuery(this.getFilterData());
		Ext.apply(options.params, params);
	},

	onLoad: function (store, options) {
		store.filterBy(this.getRecordFilter());
	},

	onRefresh: function () {
		this.updateColumnHeadings();
	},

	updateColumnHeadings: function () {
		var view = this.grid.getView(),
            i, len, filter;
		if (view.mainHd) {
			for (i = 0, len = view.cm.config.length; i < len; i++) {
				filter = this.getFilter(view.cm.config[i].dataIndex);
				Ext.fly(view.getHeaderCell(i))[filter && filter.active ? 'addClass' : 'removeClass'](this.filterCls);
			}
		}
	},

	reload: function () {
		if (this.local) {
			this.grid.store.clearFilter(true);
			this.grid.store.filterBy(this.getRecordFilter());
		} else {
			var start,
                store = this.grid.store;
			this.deferredUpdate.cancel();
			if (this.toolbar) {
				start = store.paramNames.start;
				if (store.lastOptions && store.lastOptions.params && store.lastOptions.params[start]) {
					store.lastOptions.params[start] = 0;
				}
			}
			store.reload();
		}
	},

	
	getRecordFilter: function () {
		var f = [], len, i;
		this.filters.each(function (filter) {
			if (filter.active) {
				f.push(filter);
			}
		});

		len = f.length;
		return function (record) {
			for (i = 0; i < len; i++) {
				if (!f[i].validateRecord(record)) {
					return false;
				}
			}
			return true;
		};
	},

	addFilter: function (config) {
		var Cls = this.getFilterClass(config.type),
            filter = config.menu ? config : (new Cls(config));
		this.filters.add(filter);

		Ext.util.Observable.capture(filter, this.onStateChange, this);
		return filter;
	},

	addFilters: function (filters) {
		if (filters) {
			var i, len, filter, cm = false, dI;
			if (filters instanceof Ext.grid.ColumnModel) {
				filters = filters.config;
				cm = true;
			}
			for (i = 0, len = filters.length; i < len; i++) {
				filter = false;
				if (cm) {
					dI = filters[i].dataIndex;
					filter = filters[i].filter || filters[i].filterable;
					if (filter) {
						filter = (filter === true) ? {} : filter;
						Ext.apply(filter, { dataIndex: dI });
						
						filter.type = filter.type || this.store.fields.get(dI).type.type;
					}
				} else {
					filter = filters[i];
				}
				// if filter config found add filter for the column
				if (filter) {
					this.addFilter(filter);
				}
			}
		}
	},

	getFilter: function (dataIndex) {
		return this.filters.get(dataIndex);
	},

	clearFilters: function () {
		this.filters.each(function (filter) {
			filter.setActive(false);
		});
	},
   getFilterData: function () {
		var filters = [], i, len;

		this.filters.each(function (f) {
			if (f.active) {
				var d = [].concat(f.serialize());
				for (i = 0, len = d.length; i < len; i++) {
					filters.push({
						field: f.dataIndex,
						data: d[i]
					});
				}
			}
		});
		return filters;
	},
        buildQuery: function (filters) {
		var p = {}, i, f, root, dataPrefix, key, tmp,
            len = filters.length;

		if (!this.encode) {
			for (i = 0; i < len; i++) {
				f = filters[i];
				root = [this.paramPrefix, '[', i, ']'].join('');
				p[root + '[field]'] = f.field;

				dataPrefix = root + '[data]';
				for (key in f.data) {
					p[[dataPrefix, '[', key, ']'].join('')] = f.data[key];
				}
			}
		} else {
			tmp = [];
			for (i = 0; i < len; i++) {
				
				if (filters[i].data.type == 'numeric') {
					filters[i].data.value = filters[i].data.value.toString();
				}
				
				f = filters[i];
				tmp.push(Ext.apply(
                    {},
                    { field: f.field },
                    f.data
                ));
			}
			// only build if there is active filter
			if (tmp.length > 0) {
				p[this.paramPrefix] = Ext.util.JSON.encode(tmp);
			}
		}
		return p;
	},

	cleanParams: function (p) {
		if (this.encode) {
			delete p[this.paramPrefix];
			
		} else {
			var regex, key;
			regex = new RegExp('^' + this.paramPrefix + '\[[0-9]+\]');
			for (key in p) {
				if (regex.test(key)) {
					delete p[key];
				}
			}
		}
	},
	getFilterClass: function (type) {
		switch (type) {
			case 'auto':
				type = 'string';
				break;
			case 'int':
			case 'float':
				type = 'numeric';
				break;
			case 'bool':
				type = 'boolean';
				break;
		}
		return Ext.ux.grid.filter[type.substr(0, 1).toUpperCase() + type.substr(1) + 'Filter'];
	}
});
Ext.preg('gridfilters', Ext.ux.grid.GridFilters);
