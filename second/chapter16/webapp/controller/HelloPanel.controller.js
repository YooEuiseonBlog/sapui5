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
        }
    });
    
});

/*
    프래그먼트의 대화 상자가 아직 존재하지 않으면 loadFragment API를 호출하여 프래그먼트를 인스턴스화합니다.

    위 스니펫에서 볼 수 있듯이 컨트롤러 인스턴스에 대화 조각의 로드 Promise를 저장합니다. 
    이를 통해 우리는 helloDialogButton 버튼을 클릭할 때마다 대화 상자 열기를 비동기적으로 처리할 수 있습니다.

    다른 컨트롤러에서 대화 열기 및 닫기 기능을 재사용하려면 
    sap.ui.core.mvc.Controller를 확장하는 새 파일 sap.ui.demo.walkthrough.controller.BaseController를 만들고 
    모든 대화 관련 코딩을 넣을 수 있습니다. 
    이 컨트롤러에. 이제 다른 모든 컨트롤러는 sap.ui.core.mvc.Controller 
    대신 sap.ui.demo.walkthrough.controller.BaseController에서 확장할 수 있습니다.

    개인 함수와 변수는 항상 밑줄로 시작해야 합니다.
*/