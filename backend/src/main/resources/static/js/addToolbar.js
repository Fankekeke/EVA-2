/**
 * Created by Administrator on 2019\10\10 0010.
 */
/**
 * @class Ext.Toolbar
 * Basic Toolbar class.
 * @constructor
 * Creates a new Toolbar
 * @param {String/HTMLElement/Element} container The id or element that will contain the toolbar
 * @param {Array} buttons (optional) array of button configs or elements to add
 * @param {Object} config The config object
 */
Ext.Toolbar = function(container, buttons, config){
    if(container instanceof Array){ // omit the container for later rendering
        buttons = container;
        config = buttons;
        container = null;
    }
    Ext.apply(this, config);
    this.buttons = buttons;
    if(container){
        this.render(container);
    }
};

Ext.Toolbar.prototype = {

    render : function(ct){
        this.el = Ext.get(ct);
        if(this.cls){
            this.el.addClass(this.cls);
        }
        // using a table allows for vertical alignment
        this.el.update('<div class="x-toolbar x-small-editor"><table cellspacing="0"><tr></tr></table></div>');
        this.tr = this.el.child("tr", true);
        var autoId = 0;
        this.items = new Ext.util.MixedCollection(false, function(o){
            return o.id || ("item" + (++autoId));
        });
        if(this.buttons){
            this.add.apply(this, this.buttons);
            delete this.buttons;
        }
    },

    /**
     * Adds element(s) to the toolbar - this function takes a variable number of
     * arguments of mixed type and adds them to the toolbar.
     * @param {Mixed} arg1 If arg is a Toolbar.Button, it is added. If arg is a string, it is wrapped
     * in a ytb-text element and added unless the text is "separator" in which case a separator
     * is added. Otherwise, it is assumed the element is an HTMLElement and it is added directly.
     * @param {Mixed} arg2
     * @param {Mixed} etc
     */
    add : function(){
        var a = arguments, l = a.length;
        for(var i = 0; i < l; i++){
            var el = a[i];
            if(el.applyTo){ // some kind of form field
                this.addField(el);
            }else if(el.render){ // some kind of Toolbar.Item
                this.addItem(el);
            }else if(typeof el == "string"){ // string
                if(el == "separator" || el == "-"){
                    this.addSeparator();
                }else if(el == " "){
                    this.addSpacer();
                }else{
                    this.addText(el);
                }
            }else if(el.tagName){ // element
                this.addElement(el);
            }else if(typeof el == "object"){ // must be button config?
                this.addButton(el);
            }
        }
    },

    /**
     * Returns the element for this toolbar
     * @return {Ext.Element}
     */
    getEl : function(){
        return this.el;
    },

    /**
     * Adds a separator
     * @return {Ext.Toolbar.Item} The separator item
     */
    addSeparator : function(){
        return this.addItem(new Ext.Toolbar.Separator());
    },

    /**
     * Adds a spacer element
     * @return {Ext.Toolbar.Item} The spacer item
     */
    addSpacer : function(){
        return this.addItem(new Ext.Toolbar.Spacer());
    },

    /**
     * Adds any standard HTML element to the toolbar
     * @param {String/HTMLElement/Element} el The element or id of the element to add
     * @return {Ext.Toolbar.Item} The element's item
     */
    addElement : function(el){
        return this.addItem(new Ext.Toolbar.Item(el));
    },

    /**
     * Adds any Toolbar.Item or subclass
     * @param {Toolbar.Item} item
     * @return {Ext.Toolbar.Item} The item
     */
    addItem : function(item){
        var td = this.nextBlock();
        item.render(td);
        this.items.add(item);
        return item;
    },

    /**
     * Add a button (or buttons), see {@link Ext.Toolbar.Button} for more info on the config
     * @param {Object/Array} config A button config or array of configs
     * @return {Ext.Toolbar.Button/Array}
     */
    addButton : function(config){
        if(config instanceof Array){
            var buttons = [];
            for(var i = 0, len = config.length; i < len; i++) {
                buttons.push(this.addButton(config[i]));
            }
            return buttons;
        }
        var b = config;
        if(!(config instanceof Ext.Toolbar.Button)){
            b = new Ext.Toolbar.Button(config);
        }
        var td = this.nextBlock();
        b.render(td);
        this.items.add(b);
        return b;
    },

    /**
     * Adds text to the toolbar
     * @param {String} text The text to add
     * @return {Ext.Toolbar.Item} The element's item
     */
    addText : function(text){
        return this.addItem(new Ext.Toolbar.TextItem(text));
    },

    /**
     * Inserts any Toolbar.Item/Toolbar.Button at the specified index
     * @param {Number} index The index where the item is to be inserted
     * @param {Object/Toolbar.Item/Toolbar.Button (may be Array)} item The button, or button config object to be inserted.
     * @return {Ext.Toolbar.Button/Item}
     */
    insertButton : function(index, item){
        if(item instanceof Array){
            var buttons = [];
            for(var i = 0, len = item.length; i < len; i++) {
                buttons.push(this.insertButton(index + i, item[i]));
            }
            return buttons;
        }
        if (!(item instanceof Ext.Toolbar.Button)){
            item = new Ext.Toolbar.Button(item);
        }
        var td = document.createElement("td");
        this.tr.insertBefore(td, this.tr.childNodes[index]);
        item.render(td);
        this.items.insert(index, item);
        return item;
    },

    /**
     * Adds a new element to the toolbar from the passed DomHelper config
     * @param {Object} config
     * @return {Ext.Toolbar.Item} The element's item
     */
    addDom : function(config, returnEl){
        var td = this.nextBlock();
        Ext.DomHelper.overwrite(td, config);
        var ti = new Ext.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        return ti;
    },

    /**
     * Add a dynamically rendered Ext.form field (TextField, ComboBox, etc). Note: the field should not have
     * been rendered yet. For a field that has already been rendered, use addElement.
     * @param {Field} field
     * @return {ToolbarItem}
     */
    addField : function(field){
        var td = this.nextBlock();
        field.render(td);
        var ti = new Ext.Toolbar.Item(td.firstChild);
        ti.render(td);
        this.items.add(ti);
        return ti;
    },

    // private
    nextBlock : function(){
        var td = document.createElement("td");
        this.tr.appendChild(td);
        return td;
    }
};

/**
 * @class Ext.Toolbar.Item
 * The base class that other classes should extend in order to get some basic common toolbar item functionality.
 * @constructor
 * Creates a new Item
 * @param {HTMLElement} el
 */
Ext.Toolbar.Item = function(el){
    this.el = Ext.getDom(el);
    this.id = Ext.id(this.el);
    this.hidden = false;
};

Ext.Toolbar.Item.prototype = {

    /**
     * Get this item's HTML Element
     * @return {HTMLElement}
     */
    getEl : function(){
        return this.el;
    },

    // private
    render : function(td){
        this.td = td;
        td.appendChild(this.el);
    },

    /**
     * Remove and destroy this button
     */
    destroy : function(){
        this.td.parentNode.removeChild(this.td);
    },

    /**
     * Show this item
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },

    /**
     * Hide this item
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },

    /**
     * Convenience function for boolean show/hide
     * @param {Boolean} visible true to show/false to hide
     */
    setVisible: function(visible){
        if(visible) {
            this.show();
        }else{
            this.hide();
        }
    },

    /**
     * Try to focus this item
     */
    focus : function(){
        Ext.fly(this.el).focus();
    },

    /**
     * Disable this item
     */
    disable : function(){
        Ext.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
        this.el.disabled = true;
    },

    /**
     * Enable this item
     */
    enable : function(){
        Ext.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
        this.el.disabled = false;
    }
};


/**
 * @class Ext.Toolbar.Separator
 * @extends Ext.Toolbar.Item
 * A simple toolbar separator class
 * @constructor
 * Creates a new Separator
 */
Ext.Toolbar.Separator = function(){
    var s = document.createElement("span");
    s.className = "ytb-sep";
    Ext.Toolbar.Separator.superclass.constructor.call(this, s);
};
Ext.extend(Ext.Toolbar.Separator, Ext.Toolbar.Item);

/**
 * @class Ext.Toolbar.Spacer
 * @extends Ext.Toolbar.Item
 * A simple element that adds extra horizontal space to a toolbar.
 * @constructor
 * Creates a new Spacer
 */
Ext.Toolbar.Spacer = function(){
    var s = document.createElement("div");
    s.className = "ytb-spacer";
    Ext.Toolbar.Separator.superclass.constructor.call(this, s);
};
Ext.extend(Ext.Toolbar.Spacer, Ext.Toolbar.Item);

/**
 * @class Ext.Toolbar.TextItem
 * @extends Ext.Toolbar.Item
 * A simple class that renders text directly into a toolbar.
 * @constructor
 * Creates a new TextItem
 * @param {String} text
 */
Ext.Toolbar.TextItem = function(text){
    var s = document.createElement("span");
    s.className = "ytb-text";
    s.innerHTML = text;
    Ext.Toolbar.TextItem.superclass.constructor.call(this, s);
};
Ext.extend(Ext.Toolbar.TextItem, Ext.Toolbar.Item);

/**
 * @class Ext.Toolbar.Button
 * @extends Ext.Button
 * A button that renders into a toolbar.
 * @constructor
 * Creates a new Button
 * @param {Object} config A standard {@link Ext.Button} config object
 */
Ext.Toolbar.Button = function(config){
    Ext.Toolbar.Button.superclass.constructor.call(this, null, config);
};
Ext.extend(Ext.Toolbar.Button, Ext.Button, {
    render : function(td){
        this.td = td;
        Ext.Toolbar.Button.superclass.render.call(this, td);
    },

    /**
     * Remove and destroy this button
     */
    destroy : function(){
        Ext.Toolbar.Button.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },

    /**
     * Show this button
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },

    /**
     * Hide this button
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    },

    /**
     * Disable this item
     */
    disable : function(){
        Ext.fly(this.td).addClass("x-item-disabled");
        this.disabled = true;
    },

    /**
     * Enable this item
     */
    enable : function(){
        Ext.fly(this.td).removeClass("x-item-disabled");
        this.disabled = false;
    }
});
// backwards compat
Ext.ToolbarButton = Ext.Toolbar.Button;

/**
 * @class Ext.Toolbar.MenuButton
 * @extends Ext.MenuButton
 * A menu button that renders into a toolbar.
 * @constructor
 * Creates a new MenuButton
 * @param {Object} config A standard {@link Ext.MenuButton} config object
 */
Ext.Toolbar.MenuButton = function(config){
    Ext.Toolbar.MenuButton.superclass.constructor.call(this, null, config);
};
Ext.extend(Ext.Toolbar.MenuButton, Ext.MenuButton, {
    render : function(td){
        this.td = td;
        Ext.Toolbar.MenuButton.superclass.render.call(this, td);
    },

    /**
     * Remove and destroy this button
     */
    destroy : function(){
        Ext.Toolbar.MenuButton.superclass.destroy.call(this);
        this.td.parentNode.removeChild(this.td);
    },

    /**
     * Show this button
     */
    show: function(){
        this.hidden = false;
        this.td.style.display = "";
    },

    /**
     * Hide this button
     */
    hide: function(){
        this.hidden = true;
        this.td.style.display = "none";
    }
});
