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

/**
 * 구성 요소의 메타데이터 섹션에서 이제 rootView 속성을 속성 키 매니페스트 및 값 json으로 바꿉니다. 
 * 구성 요소가 인스턴스화될 때 자동으로 로드되고 구문 분석될 설명자에 대한 참조를 정의합니다.
 *  이제 리소스 번들에 대한 모델 인스턴스화가 포함된 코드 줄을 완전히 제거할 수 있습니다. 
 * 설명자의 구성 항목을 사용하여 SAPUI5에서 자동으로 수행됩니다. 
 * 익명 콜백 함수 내에서 사용하지 않기 때문에 sap/ui/model/resource/ResourceModel 및 해당 형식 매개변수 ResourceModel에 대한 종속성을 제거할 수도 있습니다.
 */

/**
 * 팁
 * 이전 버전의 SAPUI5에서는 서비스 구성, 루트 보기 및 라우팅 구성과 같은 앱에 대한 추가 구성 설정을 Component.js 파일의 메타데이터 섹션에 추가해야 했습니다.
 * SAPUI5 버전 1.30부터는 manifest.json 설명자 파일에서 이러한 설정을 정의하는 것이 좋습니다.
 * 이전 SAPUI5 버전을 기반으로 생성된 앱 및 예제는 여전히 이 용도로 Component.js 파일을 사용하므로 여전히 지원되지만 권장되지는 않습니다.
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
            "manifest": "json"
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