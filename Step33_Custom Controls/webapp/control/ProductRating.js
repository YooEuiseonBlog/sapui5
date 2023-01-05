sap.ui.define([
    'sap/ui/core/Control',
    'sap/m/RatingIndicator',
    'sap/m/Label',
    'sap/m/Button'
], function(Control, RatingIndicator, Label, Button) {
    'use strict';
    
    return Control.extend("sap.ui.demo.walkthrough.control.ProductRating", {
        metadata: {
            properties : {
                value : {type: "float", defaultValue : 0}
            },
            aggregations : {
                _rating : {type: "sap.m.RatingIndicator", multiple: false, visibility : "hidden"},
                _label : {type: "sam.m.Label", multiple: false, visibility : "hidden"},
                _button : {type: "sap.m.Button", multiple: false, visibility: "hidden"} 
            },
            events : {
                change: {
                    prarmeters: {
                        value: {type: "init"}
                    }
                }
            }
        },
        init : function () {

        },

        renderer : function (oRM, oControl) {

        }
    });
});