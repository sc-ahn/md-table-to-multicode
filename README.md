# Markdown table to multicode block

마크다운으로 작성된 테이블정보를 Google chat, Slack 등의 메신저에서 사용가능한 멀티코드 블록으로 변환해주는 static page 입니다.

작성된 웹페이지는 `pyodide`를 사용하여 미리 작성된 파이썬 모듈을 불러오고,

사용자가 입력한 마크다운 테이블을 파싱하여 멀티코드 블록으로 변환하여 보여줍니다.

## 사용법

### 작성된 페이지를 열어서 사용

[여기를 클릭](https://sc-ahn.github.io/md-table-to-multicode/)

### 파이썬 코드 실행

```markdown
| Name | Age |
|------|-----|
| John | 25  |
| Jane | 23  |
```

`INPUT.md` 파일을 열어 변환이 필요한마크다운 테이블 정보를 아래와 같이 입력합니다.

```bash
python run.py

# 혹은 아래와 같이 경로 제공하여 실행
# python run.py INPUT.md OUTPUT.txt
```

이후 `run.py` 파일을 실행합니다.

```plaintext
Name    Age
John    25 
Jane    23 
```

위와 같이 변환된 멀티코드 블록을 확인할 수 있습니다.
