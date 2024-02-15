from typing import List
from dataclasses import dataclass


@dataclass
class Table:
    header: List[str]
    body: List[List[str]]


def read_markdown_as_text(path) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def calc_pad_of_each_column(table: Table) -> List[int]:
    """
    테이블의 각 열의 최대 길이를 계산하는 함수
    """
    max_column_length_list = [len(column) for column in table.header]
    for row in table.body:
        for i, element in enumerate(row):
            max_column_length_list[i] = max(max_column_length_list[i], len(element))
    return max_column_length_list


def markdown_as_table(text: str) -> Table:
    """
    테이블 정보가 기록된 마크다운 파일을 읽어서 Table 객체로 변환하는 함수

    원본 마크다운 예시:

    | col 1 | col 2 | col 3 |
    |--------|--------|--------|
    | val 1   | val 2   | val 3   |
    | val 4   | val 5   | val 6   |
    | val 7   | val 8   | val 9   |

    이런 마크다운 테이블이 있다고 가정할때, 이 테이블을 아래의 자료구조로 변환하고 싶다.

    변환 이후 예시:

    Table(
        header=["col 1", "col 2", "col 3"],
        body=[
            ["val 1", "val 2", "val 3"],
            ["val 4", "val 5", "val 6"],
            ["val 7", "val 8", "val 9"]
        ]
    )
    """
    rows = text.split("\n")
    try:
        table_ = [
            [element.strip() for element in row.split("|")[1:-1]] for row in rows if row
        ]
    except IndexError:
        return Table(header=[], body=[])
    table = Table(header=table_[0], body=table_[2:])
    return table


def read_markdown_as_table(path) -> Table:
    text = read_markdown_as_text(path)
    return markdown_as_table(text)


def convert_table_as_multiline_text(table: Table) -> str:
    try:
        pad_list = calc_pad_of_each_column(table)
    except IndexError:
        return "테이블 정보가 올바르지 않습니다."
    result = "```\n"
    result += (
        "    ".join(
            [f"{element:>{pad_list[i]}}" for i, element in enumerate(table.header)]
        )
        + "\n"
    )
    for row in table.body:
        result += (
            "    ".join([f"{element:>{pad_list[i]}}" for i, element in enumerate(row)])
            + "\n"
        )
    result += "```\n"

    return result
