/*
    이 단계에서는 사용자 지정 컨트롤을 사용하여 SAPUI5의 기능을 확장할 것입니다. 
    세부 정보 페이지에 표시된 제품을 평가하고 싶기 때문에 SAPUI5 확장 메커니즘을 사용하여 
    여러 표준 컨트롤의 구성을 만들고 서로 잘 작동하도록 몇 가지 글루 코드를 추가합니다. 
    이렇게 하면 앱 전체에서 컨트롤을 재사용하고 모든 관련 기능을 하나의 모듈에 유지할 수 있습니다.

    세부 정보 페이지에 사용자 지정 제품 등급 컨트롤이 추가되었습니다.
*/
sap.ui.define([
    'sap/ui/core/Control',
    'sap/m/RatingIndicator',
    'sap/m/Label',
    'sap/m/Button'
], function(Control, RatingIndicator, Label, Button) {
    'use strict';

    return Control.extend("sap.ui.demo.walkthrough.control.ProductRating",{
        metadata: {
            properties: {
                value: {
                    type: "float",
                    defaultValue: 0
                }
            },
            aggregations: {
                _rating: {
                    type: "sap.m.RatingIndicator",
                    multiple: false,
                    visibility: "hidden"
                },
                _label: {
                    type: "sap.m.Label",
                    multiple: false,
                    visibility: "hidden"
                },
                _button: {
                    type: "sap.m.Button",
                    multiple: false,
                    visibility: "hidden"
                }
            },
            events: {
                change: {
                    parameters: {
                        value: {
                            type: "int"
                        }
                    }
                }
            }
        },
        init: function() {
            this.setAggregation("_rating", new RatingIndicator({
                value: this.getValue(),
                iconSize: "2rem",
                visualMode: "Half",
                liveChange: this._onRate.bind(this)
            }));
            this.setAggregation("_label", new Label({
                text: "{i18n>productRatingLabelInitial}"
            }).addStyleClass("sapUiSmallMargin"));
            this.setAggregation("_button", new Button({
                text: "{i18n>productRatingButton}",
                press: this._onSubmit.bind(this)
            }).addStyleClass("sapUiTinyMarginTopBottom"));
        },
        setValue: function(fValue) {
            this.setProperty("value", fValue, true);
            this.getAggregation("_rating").setValue(fValue);
        },
        reset: function() {
            var oResourceBundle = this.getModel("i18n").getResourceBundle();

            this.setValue(0);
            this.getAggregation("_label").setDesign("Standard");
            this.getAggregation("_rating").setEnabled(true);
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelInitial"));
            this.getAggregation("_button").setEnabled(true);
        },
        _onRate: function(oEvent) {
            var oResourceBundle = this.getModel("i18n").getResourceBundle();
            var fValue = oEvent.getParameter("value");

            this.setProperty("value", fValue, true);
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelIndicator", [fValue, oEvent.getSource().getMaxValue()]));
            this.getAggregation("_label").setDesign("Bold");
        },
        _onSubmit: function(oEvent) {
            var oResourceBundle = this.getModel("i18n").getResourceBundle();

            this.getAggregation("_rating").setEnabled(false);
            this.getAggregation("_label").setText(oResourceBundle.getText("productRatingLabelFinal"));
            this.getAggregation("_button").setEnabled(false);
            this.fireEvent("change", {
                value: this.getValue()
            });
        },
        renderer: function (oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("myAppDemoWTProductRating");
            oRm.openEnd();
            oRm.renderControl(oControl.getAggregation("_rating"));
            oRm.renderControl(oControl.getAggregation("_label"));
            oRm.renderControl(oControl.getAggregation("_button"));
            oRm.close("div");
        }
    });
    
});

/*
    새 폴더 컨트롤과 새 컨트롤을 보유할 ProductRating.js 파일을 만듭니다. 
    컨트롤러 및 보기와 마찬가지로 사용자 지정 컨트롤은 SAPUI5 기본 개체에서 공통 컨트롤 기능을 상속합니다. 
    컨트롤의 경우 기본 클래스 sap.ui.core.Control을 확장하여 수행됩니다.

    사용자 지정 컨트롤은 앱 내에서 매우 쉽게 만들 수 있는 작은 재사용 구성 요소입니다. 
    특성상 "메모장" 또는 "즉시" 컨트롤이라고도 합니다. 
    사용자 지정 컨트롤은 두 개의 특수 섹션(메타데이터 및 렌더러)과 기능을 구현하는 여러 메서드가 있는 JavaScript 개체입니다. 제어.

    메타데이터 섹션은 데이터 구조와 컨트롤의 API를 정의합니다. 
    제어 SAPUI5의 속성, 이벤트 및 집계에 대한 이 메타 정보를 사용하여 
    앱 내에서 호출할 수 있는 세터(setter) 및 게터(getter) 메서드와 기타 편의 기능을 자동으로 생성합니다.

    렌더러는 컨트롤Control이 보기View에서 인스턴스화될 때마다 앱의 DOM 트리에 추가될 HTML 구조를 정의합니다. 
    일반적으로 처음에 SAPUI5의 핵심에 의해 그리고 컨트롤의 속성이 변경될 때마다 호출됩니다. 
    렌더링 기능의 매개변수 oRM은 문자열을 작성하고 HTML 페이지에 속성을 제어하는 ​​데 사용할 수 있는 SAPUI5 렌더링 관리자입니다.

    init 메서드는 컨트롤이 인스턴스화될 때마다 SAPUI5 코어에서 호출하는 특수 함수입니다. 
    컨트롤을 설정하고 표시할 콘텐츠를 준비하는 데 사용할 수 있습니다.

    주목!
    컨트롤은 항상 sap.ui.core.Control을 확장하고 자체적으로 렌더링합니다. 
    렌더링되지 않은 개체에 대한 데이터 바인딩을 포함하여 SAPUI5의 수명 주기 기능을 재사용하려는 경우 
    sap.ui.core.Element 또는 sap.ui.base.ManagedObject를 직접 확장할 수도 있습니다. 
    제어 상속 계층 구조에 대한 자세한 내용은 API 참조를 참조하십시오.


    이제 필요한 사용자 정의 기능으로 새로운 사용자 정의 컨트롤을 향상시킵니다. 
    우리의 경우 대화형 제품 등급을 생성하려고 하므로 
    값을 정의하고 컨트롤에 의해 자동으로 업데이트되어 표시되는 세 가지 내부 컨트롤을 사용합니다. 
    RatingIndicator 컨트롤은 제품에 대한 사용자 입력을 수집하는 데 사용되며 
    레이블은 추가 정보를 표시하고 버튼은 등급을 앱에 제출하여 저장합니다.

    따라서 메타데이터 섹션에서 우리는 구현에서 사용하는 몇 가지 속성을 정의합니다.

    Properties
        Value
            등급rating에서 사용자가 선택한 값을 보유할 컨트롤 속성 값을 정의합니다. 
            이 속성에 대한 Getter 및 Setter 함수는 자동으로 생성되며 원하는 경우 
            XML 보기view에서 데이터 모델의 필드에 바인딩할 수도 있습니다.

    Aggregations
        첫 번째 단락에서 설명한 것처럼 평가 기능을 구현하려면 세 가지 내부 제어가 필요합니다. 
        따라서 가시성 속성을 숨김으로 설정하여 세 개의 "숨겨진 집계"를 만듭니다. 
        이러한 방식으로 보기에 설정된 모델을 내부 컨트롤에서도 사용할 수 있으며 
        SAPUI5는 수명 주기 관리를 처리하고 컨트롤이 더 이상 필요하지 않을 때 제거합니다. 
        집계를 사용하여 컨트롤 배열을 보유할 수도 있지만 
        각 집계에 단일 컨트롤이 필요하므로 다중 속성을 false로 설정하여 카디널리티를 조정해야 합니다.

            rating: 사용자 입력을 위한 sap.m.RatingIndicator 컨트롤

            _label: 추가 정보를 표시하는 sap.m.Label

            _button: 등급을 제출하기 위한 sap.m.Button


    주목!
    컨트롤에 대한 집계 및 연결을 정의할 수 있습니다. 차이점은 상위 컨트롤과 관련 컨트롤 간의 관계에 있습니다.

    Aggregation는 관련 컨트롤의 수명 주기도 관리하는 강력한 관계입니다. 
    예를 들어 부모가 소멸되면 관련 컨트롤도 소멸됩니다. 
    또한 컨트롤은 하나의 단일 집계에만 할당할 수 있으며 두 번째 집계에 할당되면 자동으로 이전 집계에서 제거됩니다.

    association은 수명 주기를 관리하지 않고 여러 번 정의할 수 있는 약한 관계입니다. 
    명확한 구분을 위해 연결은 ID만 저장하는 반면 집계는 컨트롤에 대한 직접 참조를 저장합니다. 
    이 예에서는 연결을 지정하지 않습니다. 부모가 내부 제어를 관리하기를 원하기 때문입니다.

    Events
        Change
            등급이 제출될 때 컨트롤이 실행되는 변경 이벤트를 지정합니다. 
            현재 값을 이벤트 매개변수로 포함합니다. 
            애플리케이션은 이 이벤트에 등록하고 
            실제로 사용자 지정 컨트롤과 유사하게 구축된 "일반" SAPUI5 컨트롤과 유사한 결과를 처리할 수 있습니다.

    컨트롤의 새 인스턴스가 인스턴스화될 때마다 SAPUI5에서 자동으로 호출하는 init 함수에서 내부 컨트롤을 설정합니다.
    세 개의 컨트롤을 인스턴스화하고 sap.ui.core.Control에서 상속된 프레임워크 메서드 setAggregation을 호출하여 내부 집계에 저장합니다. 
    위에서 지정한 내부 집계의 이름과 새 제어 인스턴스를 전달합니다. 
    일부 컨트롤 속성을 지정하여 사용자 지정 컨트롤을 보기 좋게 만들고 등급에 liveChange 이벤트를 등록하고 단추에 누르기 이벤트를 등록합니다.
    레이블 및 버튼의 초기 텍스트는 i18n 모델에서 참조됩니다.

    지금은 다른 내부 도우미 함수와 이벤트 핸들러를 무시하고 렌더러를 정의하겠습니다. 
    참조로 전달되는 SAPUI5 렌더링 관리자 및 컨트롤 인스턴스의 도움으로 이제 컨트롤의 HTML 구조를 렌더링할 수 있습니다. 
    외부 <div> 태그의 시작 부분을 <div로 렌더링하고 헬퍼 메서드 writeControlData를 호출하여 
    div 태그 내 컨트롤의 ID 및 기타 기본 속성을 렌더링합니다. 
    다음으로, 나중에 CSS 파일에서 사용자 지정 컨트롤에 대한 스타일 지정 규칙을 정의할 수 있도록 사용자 지정 CSS 클래스를 추가합니다. 
    이 CSS 클래스와 뷰에 추가된 다른 클래스는 렌더러 인스턴스에서 writeClasses를 호출하여 렌더링됩니다. 
    그런 다음 주변 div 태그를 닫고 내부 집계의 내용을 렌더링 관리자의 renderControl 함수에 전달하여 세 개의 내부 컨트롤을 렌더링합니다. 
    그러면 컨트롤의 렌더러가 호출되고 해당 HTML이 페이지에 추가됩니다. 마지막으로 주변 <div> 태그를 닫습니다.

    setValue는 재정의된 setter입니다. 
    SAPUI5는 컨트롤러에서 호출되거나 XML 보기에서 정의될 때 속성 값을 업데이트하는 setter를 생성하지만 
    상태를 제대로 반영하려면 숨겨진 집계의 내부 등급 컨트롤도 업데이트해야 합니다. 
    또한 setProperty 메서드를 호출하여 컨트롤 속성을 세 번째 매개 변수로 true로 업데이트하면 
    일반적으로 컨트롤에서 속성이 변경될 때 트리거되는 SAPUI5의 다시 렌더링을 건너뛸 수 있습니다.

    이제 내부 평가 컨트롤에 대한 이벤트 핸들러를 정의합니다. 
    사용자가 등급을 변경할 때마다 호출됩니다. 
    등급 제어의 현재 값은 sap.m.RatingIndicator 제어의 이벤트 매개변수 값에서 읽을 수 있습니다.
    제어 상태를 업데이트하기 위해 재정의된 setter를 호출하는 값으로 등급 옆에 있는 레이블을 업데이트하여 
    사용자가 현재 선택한 값을 표시하고 최대값도 표시합니다. 
    컨트롤에 자동으로 할당된 i18n 모델에서 자리 표시자 값이 있는 문자열을 읽습니다.

    다음으로 평가를 제출하는 평가 버튼에 대한 프레스 핸들러가 있습니다. 
    제품 평가는 일회성 작업이라고 가정하고 먼저 평가와 버튼을 비활성화하여 사용자가 다른 평가를 제출할 수 없도록 합니다. 
    또한 "평가해 주셔서 감사합니다!"를 표시하도록 레이블을 업데이트합니다. 
    그런 다음 컨트롤의 변경 이벤트를 발생시키고 현재 값을 매개 변수로 전달하여 
    이 이벤트를 수신하는 응용 프로그램이 평가 상호 작용에 반응할 수 있도록 합니다.

    사용자가 다시 평가를 제출할 수 있도록 UI의 컨트롤 상태를 초기 상태로 되돌릴 수 있도록 reset 메서드를 정의합니다.

*/