from convert import (
    read_markdown_as_table,
    convert_table_as_multiline_text,
)

if __name__ == "__main__":
    table = read_markdown_as_table("TABLE.md")
    with open("table.txt", "w", encoding="utf-8") as file:
        file.write(convert_table_as_multiline_text(table))
