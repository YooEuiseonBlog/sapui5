sap.ui.define([
   'sap/m/Text'
], function(Text){
    "use strict";

    new Text({
        text : "hello world control"
    }).placeAt('content');
});