import sys

from convert import (
    read_markdown_as_table,
    convert_table_as_multiline_text,
)

if __name__ == "__main__":
    # 실행시 파일경로를 인자로 받을 수 있음
    # 1. 입력파일경로
    # 2. 출력파일경로
    # 둘 다 옵셔널하게 받을 수 있음

    # 입력파일경로
    try:
        input_path = sys.argv[1]
    except IndexError:
        input_path = "INPUT.md"

    # 출력파일경로
    try:
        output_path = sys.argv[2]
    except IndexError:
        output_path = "OUTPUT.txt"

    table = read_markdown_as_table(input_path)
    with open(output_path, "w", encoding="utf-8") as file:
        file.write(convert_table_as_multiline_text(table))
