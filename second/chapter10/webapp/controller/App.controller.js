/**
 * onInit 함수와 필수 모듈을 삭제하십시오. 이것은 이제 구성 요소에서 수행됩니다. 이제 위에 표시된 코드가 있습니다.
 */
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/resource/ResourceModel'
], function(Controller, MessageToast, JSONModel, ResourceModel) {
    'use strict';

    return Controller.extend('sap.ui.demo.walkthrough.controller.App', {
        onShowHello : function() {
            // read msg from i18n model
            var oBundle = this.getView().getModel('i18n').getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        }
    });   
});