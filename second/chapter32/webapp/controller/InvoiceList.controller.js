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

/*
    필터링을 위해 두 개의 새로운 종속성을 로드합니다. 
    필터 개체는 필터 작업에 대한 구성을 보유하고 FilterOperator는 필터를 지정하기 위해 필요한 도우미 유형입니다.

    onFilterInvoices 함수에서 사용자가 검색 필드에 입력한 검색 문자열에서 필터 개체를 구성합니다. 
    이벤트 처리기는 항상 이벤트가 제공하는 매개 변수에 액세스하는 데 사용할 수 있는 이벤트 인수를 받습니다. 
    이 경우 검색 필드는 oEvent 매개변수에서 getParameter("query")를 호출하여 액세스하는 매개변수 쿼리를 정의합니다.


    쿼리가 비어 있지 않으면 아직 비어 있는 필터 배열에 새 필터 개체를 추가합니다. 
    그러나 쿼리가 비어 있으면 바인딩을 빈 배열로 필터링합니다. 이렇게 하면 모든 목록 요소가 다시 표시됩니다. 
    둘 이상의 데이터 필드를 검색하려는 경우 배열에 더 많은 필터를 추가할 수도 있습니다. 
    이 예제에서는 ProductName 경로에서 검색하고 지정된 쿼리 문자열을 검색할 필터 연산자를 지정합니다.

    이 목록은 뷰에서 지정한 ID로 액세스됩니다. 
    컨트롤에는 뷰 ID가 자동으로 접두사로 붙기 때문에 헬퍼 함수 byId를 사용하여 뷰에 컨트롤을 요청해야 합니다. 
    목록 컨트롤에서 집계 항목의 바인딩에 액세스하여 새로 구성된 필터 개체로 필터링합니다. 
    이렇게 하면 검색 문자열로 목록이 자동으로 필터링되어 검색이 트리거될 때 일치하는 항목만 표시됩니다. 
    필터 연산자 FilterOperator.Contains는 대/소문자를 구분하지 않습니다.

*/

sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    '../model/formatter',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(Controller, JSONModel, formatter, Filter, FilterOperator) {
    'use strict';

    return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
        formatter: formatter,
        onInit : function() {
            var oViewModel = new JSONModel({
                currency: "EUR"
            });

            this.getView().setModel(oViewModel, "view");
        },
        onFilterInvoices : function(oEvent) {
            
            //build filter array
            var aFilter = [];
            var sQuery = oEvent.getParameter("query");
            if (sQuery) {
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }

            //filter binding
            var oList = this.byId("invoiceList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            });
        }
    });
    
});

/*
    상호 작용한 컨트롤 인스턴스는 모든 SAPUI5 이벤트에 사용할 수 있는 getSource 메서드로 액세스할 수 있습니다.
    우리의 경우 클릭된 ObjectListItem을 반환합니다.
    동일한 항목이 표시될 수 있도록 클릭한 항목의 정보를 상세 페이지로 전달하는 데 사용합니다.

    이제 navTo 메서드에서 항목의 현재 정보로 탐색 매개 변수 invoicePath를 채우는 구성 개체를 추가합니다.
    이렇게 하면 URL이 업데이트되고 동시에 상세 보기로 이동합니다.
    세부 정보 페이지에서 이 컨텍스트 정보에 다시 액세스하여 해당 항목을 표시할 수 있습니다.

    선택한 개체를 식별하기 위해 일반적으로 짧고 정확하기 때문에 백엔드 시스템에서 항목의 키를 사용합니다.
    그러나 인보이스 항목의 경우 간단한 키가 없으며 바인딩 경로를 직접 사용하여 예제를 짧고 간단하게 유지합니다.
    항목에 대한 경로는 컨트롤에 대한 바인딩 정보를 관리하기 위한 SAPUI5의 도우미 개체인 바인딩 컨텍스트의 일부입니다. 
    바인딩 컨텍스트는 바인딩된 SAPUI5 컨트롤의 모델 이름과 함께 getBindingContext 메서드를 호출하여 액세스할 수 있습니다.
    URL의 특수 문자이고 허용되지 않기 때문에 문자열에서 .substr(1)을 호출하여 바인딩 경로에서 첫 번째 /를 제거해야 합니다.
    세부 정보 페이지에 다시 추가합니다.
*/