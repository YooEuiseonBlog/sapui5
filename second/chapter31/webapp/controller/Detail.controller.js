sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';

    return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
        onInit: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function(oEvent) {
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                model: "invoice"
            });
        }
    });  
});

/*
    퍼즐을 맞추는 마지막 조각은 디테일 컨트롤러입니다. 
    인보이스 목록에서 선택된 항목이 실제로 표시되도록 보기view에서 URL 매개변수 invoicePath와 함께 전달한 컨텍스트를 설정해야 합니다. 
    그렇지 않으면 보기가 단순히 비어 있게 됩니다.

    컨트롤러의 onInit 메서드에서 앱 라우터의 인스턴스를 가져오고 
    그 이름으로 액세스한 경로에서 attachPatternMatched 메서드를 호출하여 세부 경로에 연결합니다. 
    항목을 클릭하거나 세부 정보 페이지의 URL로 앱을 호출하여 경로에 도달했을 때 실행될 내부 콜백 함수 _onObjectMatched를 등록합니다.

    라우터에 의해 트리거되는 _onObjectMatched 메서드에서 URL 및 탐색 매개변수에 액세스하는 데 사용할 수 있는 이벤트를 수신합니다.
    인수 매개변수는 경로 패턴의 탐색 매개변수에 해당하는 객체를 반환합니다.
    송장 목록 컨트롤러에서 설정한 invoicePath에 액세스하고 뷰에서 bindElement 함수를 호출하여 컨텍스트를 설정합니다. 
    경로를 URL 매개변수로 전달하기 위해 제거한 루트 /를 경로 앞에 다시 추가해야 합니다.

    bindElement 함수는 SAPUI5 컨트롤에 대한 바인딩 컨텍스트를 만들고 모델 이름과 구성 개체의 항목 경로를 받습니다. 
    이렇게 하면 송장 모델의 필드와 연결한 UI 컨트롤의 업데이트가 트리거됩니다. 
    이제 인보이스 목록에서 항목을 클릭하면 별도의 페이지에 인보이스 세부 정보가 표시됩니다.
*/