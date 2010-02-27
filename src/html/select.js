
/**
 * HTMLSelectElement - DOM Level 2
 */
HTMLSelectElement = function(ownerDocument) {
    HTMLTypeValueInputs.apply(this, arguments);

    this._oldIndex = -1;
};
HTMLSelectElement.prototype = new HTMLTypeValueInputs;
__extend__(HTMLSelectElement.prototype, inputElements_dataProperties);
__extend__(HTMLButtonElement.prototype, inputElements_size);
__extend__(HTMLSelectElement.prototype, inputElements_onchange);
__extend__(HTMLSelectElement.prototype, inputElements_focusEvents);
__extend__(HTMLSelectElement.prototype, {

    // over-ride the value setter in HTMLTypeValueInputs
    set value(newValue) {
       //console.log('select set value %s', newValue);
        var options = this.options,
            i, index;
       //console.log('select options length %s', options.length);
        for (i=0; i<options.length; i++) {
            if (options[i].value == newValue) {
                index = i;
                break;
            }
        }
       //console.log('options index %s', index);
        if (index !== undefined) {
           //console.log('select setAttribute value %s', newValue);
            this.setAttribute('value', newValue);
            this.selectedIndex = index;
        }
    },
    get value() {
       //console.log('select get value');
        var value = this.getAttribute('value'),
            index;
        if (value === undefined || value === null) {
            index = this.selectedIndex;
            return (index != -1) ? this.options[index].value : "";
        } else {
            return value;
        }
    },
    get length(){
        return this.options.length;
    },
    get multiple(){
        return this.getAttribute('multiple');
    },
    set multiple(value){
        this.setAttribute('multiple',value);
    },
    get options(){
        return this.getElementsByTagName('option');
    },
    get selectedIndex(){
       //console.log('select get selectedIndex ');
        var options = this.options;
        for(var i=0;i<options.length;i++){
            if(options[i].selected){
               //console.log('select get selectedIndex %s', i);
                return i;
            }
        };
       //console.log('select get selectedIndex %s', -1);
        return -1;
    },
    
    set selectedIndex(value) {
        var i,
            options = this.options;
        for (i=0; i<options.length; i++) {
           //console.log('select set selectedIndex %s', Number(value));
            if(i === Number(value)){
                options[i].selected = true;
            }else{
                options[i].selected = false;
            }
           //console.log('select options[i].selected %s',options[i].selected);
        }
    },
    get type(){
        var type = this.getAttribute('type');
        return type?type:'select-one';
    },
    
    appendChild: function(node){
        var i, 
            length,
            selected = false;
        node = HTMLElement.prototype.appendChild.apply(this, [node]);
        //make sure at least one is selected by default
        try{
       //console.log('select appendChild option %s %s', node.nodeType, node.tagName);   
        if(node.nodeType === Node.ELEMENT_NODE && node.tagName === 'OPTION'){
           //console.log('select appending option %s %s', this.value, node.value);                    
            if(this.value === ""){
               //console.log('!!! setting select value %s', node.value);     
                this.value = node.value;
               //console.log('!!! finished setting select value %s', node.value);  
            }
        }}catch(e){
           //console.log('error appending node to select %s',e);
        }
       //console.log('finished select appendChild options %s %s', node.nodeType, node.tagName)
        return node;
    },
    add : function(){
        __add__(this);
    },
    remove : function(){
        __remove__(this);
    }
});


