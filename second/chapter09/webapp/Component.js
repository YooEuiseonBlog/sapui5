/**
 * 애플리케이션 설정을 저장할 webapp 폴더에 초기 Component.js 파일을 생성합니다. 
 * 구성 요소의 초기화 기능은 구성 요소가 인스턴스화될 때 SAPUI5에 의해 자동으로 호출됩니다. 
 * 우리의 구성 요소는 기본 클래스 sap.ui.core.UIComponent에서 상속되며 
 * 재정의된 init 메서드에서 기본 클래스의 init 함수에 대한 슈퍼 호출을 수행해야 합니다.
 */

/**
 * 이제 Component.js 파일은 root view에 대한 참조를 정의하는 새 메타데이터 섹션과 구성 요소가 초기화될 때 호출되는 이전에 도입된 init 함수의 두 부분으로 구성됩니다. 
 * 이전에 했던 것처럼 index.js 파일에 root view를 직접 표시하는 대신 구성 요소가 이제 앱 보기의 표시를 관리합니다.
 */

/**
 * init 함수에서 이전에 앱 컨트롤러에서 했던 것처럼 데이터 모델과 i18n 모델을 인스턴스화합니다. 
 * 모델은 구성 요소의 루트 뷰가 아니라 구성 요소에 직접 설정된다는 점에 유의하십시오. 
 * 그러나 중첩된 컨트롤은 부모 컨트롤에서 자동으로 모델을 상속하므로 view에서도 모델을 사용할 수 있습니다.
 */
sap.ui.define([
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/resource/ResourceModel'
], function(UIComponent, JSONModel, ResourceModel){
    "use strict";

    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        metadata : {
            "interfaces" : ["sap.ui.core.IAsyncContentCreation"],
            "rootView" : {
                "viewName" : "sap.ui.demo.walkthrough.view.App",
                "type" : "XML",
                /* "async" : true,  // sap.ui.core.IAsyncContentCreation 인터페이스를 통해 암시적으로 설정 */ 
                "id": "app"
            }
        },
        init : function() { //재정의된 init --> override? 초기화 과정
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            //component를 상속한 view는 모델도 상속한다.
            // set data model
            var oData = {
                recipient : {
                    name: "World"
                }
            };

            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            //set i18n model 
            var i18nModel = new ResourceModel({
                bundleName: 'sap.ui.demo.walkthrough.i18n.i18n'
            });

            this.setModel(i18nModel, "i18n");
        }
    });
});