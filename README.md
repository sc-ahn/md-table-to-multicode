# Markdown table to multicode block

마크다운으로 작성된 테이블정보를 Google chat, Slack 등의 메신저에서 사용가능한 멀티코드 블록으로 변환해주는 static page 입니다.

작성된 웹페이지는 `pyodide`를 사용하여 미리 작성된 파이썬 모듈을 불러오고,

사용자가 입력한 마크다운 테이블을 파싱하여 멀티코드 블록으로 변환하여 보여줍니다.
