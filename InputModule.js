/**
 * @name inputModule
 * @version 0.0.1
*/


var InputModule = (function(window, document, inputModule) {

	function init (module) {

	};

	/**
	 * Cache DOM elements into this function
	 * 
	 * @param  {object} domElements [bind DOM elements in this sequence: 1.element, 2.input hidden element and 3.input placeholder element]
	 * @return {module} 
	 */
	function cacheDom (domElements) {
		this.element = domElements.element;
		this.list = this.element.querySelectorAll('ul');
		this.listElements = this.list[0].querySelectorAll('li');
		this.input_hidden = domElements.input_hidden;
		this.input = domElements.input;

		_bindEvents(this);

		return this;
	};

	/**
	 * Bind all events to cached elements in this function
	 * 
	 * @param module [module with cacheDom() method]
	 */
	function _bindEvents (/*this module context*/ module) {
		Array.prototype.forEach.call(module.listElements, function(dest) {
			dest.onclick = function(e) {
				element_code = e.target.dataset.destination;
				element_name = e.target.textContent;

				module.input_hidden.value = element_code;
				module.input.value = element_name.trim();

				classie.toggleClass(module.list[0], 'hidden');
			}
		});
		module.input.onclick = function(e) {
			e.preventDefault();
			this.value = "";
			classie.toggleClass(module.list[0], 'hidden');
		};
		document.onclick = function(e){
		    if (!classie.hasClass(e.target, "t_2") && !classie.hasClass(module.list[0], 'hidden')) {
		      classie.addClass(module.list[0], 'hidden');
		    }
		};
	};

	return  inputModule = {
		cacheDom: cacheDom
	};

})(window, document, inputModule || {});

InputModule.cacheDom({
	element:document.getElementById('destination'), 
	input_hidden:document.getElementById('t'), 
	input: destination.getElementsByClassName('t_2')[0]
});