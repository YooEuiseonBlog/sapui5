sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/core/routing/History',
    'sap/m/MessageToast'
], function(Controller, History, MessageToast) {
    'use strict';

    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function(oEvent) {
            this.byId("rating").reset();
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        },
        onNavBack: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("overview", {}, true);
            }
        },
        onRatingChange: function (oEvent) {
            var fValue = oEvent.getParameter("value");
            var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

            MessageToast.show(oResourceBundle.getText("ratingConfirmation",[fValue]));
        }
    });  
});

/*
    sap.ui.core.routing 네임스페이스에서 탐색 기록을 관리하는 데 도움이 되는 새 종속성을 로드하고 
    세부 정보 페이지 컨트롤러에 이벤트 핸들러 구현을 추가합니다.

    이벤트 처리기에서 우리는 탐색 기록에 액세스하고 이전 해시를 확인하려고 시도합니다.
    브라우저 기록과 달리 앱 내에서 탐색 단계가 이미 발생한 경우에만 유효한 결과를 얻을 수 있습니다. 
    그런 다음 단순히 브라우저 기록을 사용하여 이전 페이지로 돌아갑니다. 
    이전에 탐색이 발생하지 않은 경우 개요 페이지로 직접 이동하도록 라우터에 지시할 수 있습니다. 
    세 번째 매개변수 true는 라우터가 현재 히스토리 상태를 새 것으로 바꾸도록 지시합니다. 
    왜냐하면 우리가 실제로 백네비게이션을 직접 수행하기 때문입니다. 
    두 번째 매개변수는 이 경로에 추가 매개변수를 전달하지 않으므로 빈 배열({})입니다.

    이 구현은 사용 사례에서 브라우저의 뒤로 버튼보다 약간 낫습니다. 
    우리가 앱 외부의 다른 페이지에 있더라도 브라우저는 기록에서 한 단계 뒤로 이동합니다. 
    앱에서 우리는 다른 링크에서 왔거나 책갈피로 직접 상세 페이지를 열었더라도 항상 개요 페이지로 돌아가고 싶습니다. 
    새 탭에서 세부정보 페이지를 직접 로드하고 앱에서 뒤로 버튼을 클릭하여 사용해 볼 수 있으며 여전히 개요 페이지로 돌아갑니다.


    Detail 컨트롤러에서 sap.m.MessageToast에 대한 종속성을 로드합니다. 
    예를 단순하게 유지하기 위해 등급을 백엔드로 보내는 대신 단순히 메시지를 표시하기 때문입니다. 
    이벤트 핸들러 onRatingChange는 등급이 제출되었을 때 실행되는 사용자 지정 변경 이벤트의 값을 읽습니다. 
    그런 다음 MessageToast 컨트롤의 값과 함께 확인 메시지를 표시합니다.

    onObjectMatched 비공개 메서드에서 재설정 메서드를 호출하여 
    다른 항목에 대한 상세 보기가 표시되자마자 다른 평가를 제출할 수 있도록 합니다.
*/