/*
    데이터 모델의 일부가 아닌 통화 코드에 액세스할 수 있도록 송장 목록의 컨트롤러에서 보기 모델을 정의합니다. 
    하나의 기축 통화와 EUR 값만 있는 간단한 JSON 모델입니다. 
    이는 숫자 필드의 포맷터에 바인딩될 수 있습니다. 
    보기 모델view model은 가시성과 같은 속성을 바인딩하기 위해 컨트롤에 할당된 모든 구성 옵션을 보유할 수 있습니다.

    가능하면 사용자 정의 포맷터 대신 데이터 유형을 사용하십시오.
*/

/*
    포맷터 기능을 로드하려면 InvoiceList.controller.js에 추가해야 합니다. 
    이 컨트롤러에서 먼저 사용자 지정 포맷터 모듈에 종속성을 추가합니다. 
    컨트롤러는 view에서 액세스할 수 있도록 로드된 포맷터 함수를 로컬 속성 포맷터에 저장합니다.
*/

sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/formatter'
], function(Controller, JSONModel, formatter) {
    'use strict';

    return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
        formatter: formatter,
        onInit : function() {
            var oViewModel = new JSONModel({
                currency: "EUR"
            });

            this.getView().setModel(oViewModel, "view");
        }
    });
    
});