/*
    이제 대화 상자를 통합했으므로 일부 사용자 상호 작용을 추가할 차례입니다. 
    사용자는 언젠가는 대화 상자를 다시 닫고 싶어할 것이므로 대화 상자를 닫고 이벤트 핸들러를 할당하는 버튼을 추가합니다.

    이제 대화 상자에 "확인" 버튼이 있습니다.
*/

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    //"sap/ui/core/Fragment"
], function(Controller, MessageToast/*, Fragment*/) {
    'use strict';

    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
        onShowHello : function() {
            //read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);

            //show message
            MessageToast.show(sMsg);
        },

        onOpenDialog: function() {
            //create dialog lazily
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                    name: "sap.ui.demo.walkthrough.view.HelloDialog"
                });
            }
            this.pDialog.then(function(oDialog){
                oDialog.open();
            });
        },

        onCloseDialog : function() {
            //참고: 이 이벤트 핸들러는 로드된 대화 자체 내에서만 호출되기 때문에 pDialog 'promise'에 연결할 필요가 없습니다.
            this.byId("helloDialog").close();
        }
    });
});

/*
    이벤트 처리기 함수는 동일한 컨트롤러 파일에 배치되고 대화 상자를 반환하는 내부 도우미 함수에 액세스하여 대화 상자를 닫습니다.
*/