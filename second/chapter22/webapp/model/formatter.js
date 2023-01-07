/*
    데이터 모델의 속성 서식 지정을 위해 더 복잡한 논리를 수행하려는 경우 사용자 지정 서식 지정 함수를 작성할 수도 있습니다. 
    이제 데이터 모델의 상태가 다소 기술적인 형식이기 때문에 사용자 정의 포맷터를 사용하여 현지화된 상태를 추가합니다.

    이제 사용자 정의 포맷터로 상태가 표시됩니다.

 */
sap.ui.define([

], function() {
    'use strict';
    return {
        statusText: function(sStatus) {
            var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
            switch (sStatus) {
                case 'A':
                    return resourceBundle.getText("invoiceStatusA");
                case 'B':
                    return resourceBundle.getText("invoiceStatusB");
                case 'C':
                    return resourceBundle.getText("invoiceStatusC");
                default:
                    return sStatus;
            }
        }
    }
});
/*
    앱 프로젝트에서 새 폴더 모델을 만듭니다.
    새 포맷터 파일은 앱의 모델 폴더에 배치됩니다.
    포맷터가 데이터 속성에 대해 작업하고 UI에 표시하기 위해 형식을 지정하기 때문입니다.
    지금까지 Invoices.json 파일을 제외하고 모델 관련 아티팩트가 없었으므로 이제 webapp/model 폴더를 앱에 추가합니다.
    이번에는 기본 개체에서 확장하지 않고 sap.ui.define 호출 내부의 포맷터 함수와 함께 JavaScript 개체를 반환합니다.

    statusText 함수는 데이터 모델에서 입력 매개변수로 기술 상태를 가져오고 
    resourceBundle 파일에서 읽을 수 있는 사람이 읽을 수 있는 텍스트를 반환합니다.
*/