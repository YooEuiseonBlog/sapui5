19단계: 집계 바인딩
이제 우리는 앱을 위한 좋은 구조를 확립했으므로 더 많은 기능을 추가할 시간입니다. 
패널 아래 목록에 표시되는 JSON 형식의 일부 송장 데이터를 추가하여 데이터 바인딩의 더 많은 기능을 탐색하기 시작합니다.

인보이스 목록이 패널 아래에 표시됩니다.

Invoices 파일에는 앱에서 컨트롤을 바인딩하는 데 사용할 수 있는 JSON 형식의 Invoice 5개가 포함되어 있습니다. 
JSON은 데이터 저장을 위한 매우 가벼운 형식이며 SAPUI5 애플리케이션의 데이터 소스로 직접 사용할 수 있습니다.

디스크립터의 sap.ui5 섹션에 새 모델 invoice을 추가합니다. 
이번에는 JSONModel이 필요하므로 유형을 sap.ui.model.json.JSONModel로 설정합니다. 
uri 키는 구성 요소와 관련된 테스트 데이터의 경로입니다. 
이 작은 구성으로 구성 요소는 Invoices.json 파일에서 invoice 데이터를 로드하는 새 JSONModel을 자동으로 인스턴스화합니다. 
마지막으로 인스턴스화된 JSONModel은 명명된 모델 invoice으로 구성 요소에 배치됩니다. 명명된 모델은 앱 전체에서 볼 수 있습니다.

주목!
자동 모델 인스턴스화는 SAPUI5 버전 1.30에서만 사용할 수 있습니다. 
이전 버전을 사용하는 경우 9단계: 구성 요소 구성에서 리소스 번들에 대해 수행한 것처럼 
Component.js 파일의 init 메서드에서 앱의 리소스 번들 및 기타 모델을 수동으로 인스턴스화할 수 있습니다.