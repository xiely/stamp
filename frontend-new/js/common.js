(function(){
	function getByClass (className, container) {
		var container = container || document,
			elms;
			
		if (container.getElementsByClassName) {
			elms = container.getElementsByClassName(className);
		} else if (container.querySelector) {
			elms = container.querySelector('.' + className);
		}
		return elms;

	}
	function forEach (array, handler) {
		var i;

		if ([].forEach) {
			[].forEach.call(array, handler);
		} else {
			for (i = 0; i < array.length; i++){
				handler(array[i], i, array);
			}
		}
	}
	function filter (array, handler) {
		var newArray = [],
			i;
		if ([].filter){
			  [].filter.call(array, handler);
		} else {
			forEach (array, function (item){
				if (handler(item)){
					newArray.push(item);
				}
			});
		}
		return newArray;
	}
	function listen (elm, type, handler, capture) {
		if (elm.addEventListener) {
			elm.addEventListener(type, handler, capture || false);
		} else if (elm.attachEvent) {
			elm.attachEvent('on' + type, handler);
		}
	}
	function bubbleElement (elm, tester) {
		var passed = true;

		while (!tester(elm)) {
			elm = elm.parentNode;

			if (elm.nodeType !== 1) {
				passed = false;
				break;
			}
		}
		return passed ? elm : undefined;
	}
	function getClassList (elm) {
		return elm.classList || {
			add : function (className) {
				if (this.contains(className)){
					return;
				}
				elm.className += " " + className;

			},
			remove : function (className) {
				if (!this.contains(className)) {
					return;
				}
				elm.className.replace(className, " ");
			},
			toggle : function (className) {
				if(this.contains(className)) {
					this.remove(className);
				} else if (!this.contains(className)) {
					this.add(className);
				}
			},
			contains : function (className) {
				var elmClasses = elm.classList.split(" "),
					contained = false;
				forEach (elmClasses, function (elmClass) {
					if (elmClass === className) {
						contained = true;
					}
				});
				return contained;
			}

		}
	}
	function dialog (id, config) {
		function Dialog (id, config) {
			this.elm = document.getElementById(id);
			this.config = config || {};
			!this.config.noMask && (this.mask = new Mask(this));
			this.listenEvents();
		}
		function Mask (dialog) {
			this.elm = document.createElement('div');
			getClassList(this.elm).add(MASK_CLASS);
			dialog.elm.parentNode.insertBefore(this.elm, dialog.elm);
		}
		Dialog.prototype = {
			constructor : Dialog,

			listenEvents : function () {
				var _this = this;
				listen(this.elm, 'click', function (e) {
					var t = e.target || event.srcElement,
						closeBtn = bubbleElement(t, function (elm) {
							return getClassList(elm).contains(CLOSER_CLASS);
						});
					if (closeBtn) {
						_this.close();
					}

				});
				if(this.config.blankClose) {
					listen(this.mask.elm, 'click', function () {
						_this.close();
					})
				}
				if(this.config.selfClose) {
					listen(this.elm, 'click', function () {
						_this.close();
					})
				}

			},
			open : function () {
				this.center();
				getClassList(this.elm).add(DILOG_OPENED_CLASS);
				this.mask && this.mask.open();

			},
			close : function () {
				getClassList(this.elm).remove(DILOG_OPENED_CLASS);
				this.mask && this.mask.close();
			},
			center : function () {
				this.elm.style.cssText += ";" + 'margin: -' + this.elm.offsetHeight/2 + 'px 0 0 -' + this.elm.offsetWidth/2 + 'px;';
			}

		};
		Mask.prototype = {
			constructor : Mask,

			open : function () {
				getClassList(this.elm).add(MASK_OPENED_CLASS);
			},
			close : function () {
				getClassList(this.elm).remove(MASK_OPENED_CLASS);
			}
		};
		var MASK_CLASS = 'boring-dialog-mask',
			CLOSER_CLASS = 'boring-dialog-closer',
			DILOG_OPENED_CLASS = 'boring-dialog-opened',
			MASK_OPENED_CLASS = 'boring-dialog-mask-opened';

		return new Dialog(id, config);

	}
	
	function tab(container, config){
		function Tab(container, config){
			var container = typeof container === 'string' ? document.getElementById(container) : container,
				config = config || {};
			this.handles = getByClass(HANDLES_CLASS, container)[0].children;
			this.panels = getByClass(PANELS_CLASS, container)[0].children;
			this.eventType =config.event || 'click';
			this.current = 0;
			this.listenEvents();
			this.go(this.current);
		}
		
		Tab.prototype = {
			constructor : Tab,

			listenEvents : function () {
				var _this = this;
				forEach(this.handles, function (handle, index){
					listen(handle, _this.eventType, function(){
						_this.go(index);
					});
				});
			},
			go : function(index){
				this.clearCurrentStatus();
				this.addTargetStatus(index);
				this.current = index;
			},
			clearCurrentStatus : function(){
				getClassList(this.handles[this.current]).remove(CURRENT_CLASS);
				getClassList(this.panels[this.current]).remove(CURRENT_CLASS);
			},
			addTargetStatus : function(index){
				getClassList(this.handles[index]).add(CURRENT_CLASS);
				getClassList(this.panels[index]).add(CURRENT_CLASS);
			},
			forward : function(){
				go(current +1);
			},
			back : function(){
				go(current -1);
			}


		};
		var HANDLES_CLASS = 'boring-tab-handles',
			CURRENT_CLASS = 'boring-tab-current',
			PANELS_CLASS ='boring-tab-panels';
		return new Tab(container, config);
	}
	

	var boring = {
		getByClass : getByClass,
		getClassList : getClassList,
		forEach : forEach,
		filter : filter,
		bubbleElement : bubbleElement,
		listen : listen,
		dialog : dialog,
		tab : tab
	}
	if(typeof window.define === 'function'){
		define(boring);
	}
	window.boring = boring
}())