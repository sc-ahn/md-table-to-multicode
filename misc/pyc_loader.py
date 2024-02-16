import pathlib
import tempfile
import importlib.util

BASE_DIR = pathlib.Path(__file__).resolve().parent.parent

module_name = 'convert'
pyc_path = BASE_DIR / 'module' / 'convert'

# create temp file
with tempfile.NamedTemporaryFile(mode='wb', suffix='.pyc') as temp:
    # read pyc file and write to temp file
    with open(pyc_path, 'rb') as pyc:
        temp.write(pyc.read())

    # get tempfile name
    temp_pyc_path = temp.name

    spec = importlib.util.spec_from_file_location(module_name, temp_pyc_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)

    print(module.__file__)

    # run `markdown_as_table` function from `convert` module
    md_table = """
    |column1|column2|
    |-|-|
    |a|b|"""

    print(module.markdown_as_table(md_table))

