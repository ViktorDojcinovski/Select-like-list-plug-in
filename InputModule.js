/**
 * @name inputModule
 * @version 0.0.1
 *
 * Uses classie.js for class manipulation of the DOM elements.
 * Embed classie.js before InputModule.js
*/


function InputModule (window, document) {

	var num_of_inputs;

	/**
	 * Initialize the plugin
	 * 
	 */
	function init () {

	};

	/**
	 * Cache DOM elements into this function
	 * 
	 * @param  {object} domElements [bind DOM elements in this sequence: 1.element, 2.input hidden element and 3.input placeholder element]
	 * @return {module} 
	 */
	function cacheDom (dom) {
		this.formElement = dom['formElementId'];
		this.lists = this.formElement.querySelectorAll('ul');
		this.input_hidden = this.formElement.querySelectorAll('input[type=hidden].uniform');
		this.input = this.formElement.getElementsByClassName('t_2');

		num_of_inputs = this.input.length;

		_bindEvents(this);

		return this;
	};

	/**
	 * Bind all events to cached elements in this function
	 * 
	 * @param module [module with cacheDom() method]
	 */
	function _bindEvents (/*this module context*/ module) {
		Array.prototype.forEach.call(module.lists, function(list) {
			Array.prototype.forEach.call(list.querySelectorAll('li'), function(el, j) {
				el.onclick = function(e) {
					element_code = e.target.dataset.value;
					element_name = e.target.textContent;

					var data_hidden = el.parentElement.previousElementSibling.dataset.hidden;
						
					for(var i = 0; i < num_of_inputs; i++) {
						if(module.input_hidden[i].getAttribute('id') === data_hidden) {

							module.input_hidden[i].value = e.target.dataset.value;
							_shouldListen(module.input_hidden[i], 'change');
							module.input_hidden[i].nextElementSibling.value = element_name.trim();
						}
					}

					classie.toggleClass(el.parentElement, 'hidden');
				}
			})
		});
		Array.prototype.forEach.call(module.input, function(input){
			input.onclick = function(e) {
				e.preventDefault();
				this.value = "";

				var _thisElementSibling = this.nextElementSibling;

				Array.prototype.forEach.call(module.lists, function(list, i) { 
					if(module.lists[i] !== _thisElementSibling) {
						classie.addClass(list, 'hidden');
					}
				});
				classie.toggleClass(this.nextElementSibling, 'hidden');
			}
		});
		document.onclick = function(e){
		    if (!classie.hasClass(e.target, "t_2") || !e.target.name == 'LI') {
		      Array.prototype.forEach.call(module.lists, function(list) { classie.addClass(list, 'hidden'); });
		    }
		};
	};

	function _simulateEvent(el, eventName) {
	  var event = new MouseEvent(eventName, {
	    'view': window,
	    'bubbles': true,
	    'cancelable': true
	  });
	  var cancelled = !el.dispatchEvent(event);
	  if (cancelled) {
	    // A handler called preventDefault.
	    
	  } else {
	    // None of the handlers called preventDefault.
	    
	  }
	}

	function _shouldListen(element, eventName) {
		if(element.dataset.shouldListen == 'yes') {
			_simulateEvent(element, eventName)
		}
	}

	return {
		cacheDom: cacheDom
	};

};