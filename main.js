let pyodide;

// DOM elements
const inputTextArea = document.getElementById('input-textarea');
const outputTextArea = document.getElementById('output-textarea');

// global scope variables
const Global = {
  python: {
    output: "output"
  },
  js: {
    input: undefined,
  }
}

// JS <-> Python bridge code
const userCodeGenerator = () => `
import importlib.util

module_name, module_path = 'convert', 'convert.pyc'

spec = importlib.util.spec_from_file_location(module_name, module_path)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

input_value = """${Global.js.input}"""

table = module.markdown_as_table(input_value)
if not table.header:
    ${Global.python.output} = module.Message.TABLE_NOT_FOUND.value
elif not table.body:
    ${Global.python.output} = module.Message.TABLE_NOT_FOUND.value
else:
    ${Global.python.output} = module.convert_table_as_multiline_text(table)
print(f"Good >> {${Global.python.output}}")
`

const saveB64AsBinary = (b64, filename) => `
import base64

binary = base64.b64decode("""${b64}""")
with open("${filename}", "wb") as file:
  file.write(binary)
`

// Combine pre-written Python code with user input
const combinePythonCode = (preWrittenCode, userCodeGenerator) => {
  userCode = userCodeGenerator()
  return `${preWrittenCode}\n\n${userCode}`
}

// Load Pyodide
const promisePyodide = async() => {
  pyodide = await loadPyodide();
  const b64 = await loadExternalFileAsBytes("module/convert")
  await pyodide.runPythonAsync(saveB64AsBinary(b64, "convert.pyc"))
  console.log("Pyodide initialized")
}

// Load external python script
const loadExternalScript = async (scriptUrl) => {
  const response = await fetch(scriptUrl);
  const scriptContent = await response.text();
  return scriptContent;
}

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Load external file as bytes
const loadExternalFileAsBytes = async (fileUrl) => {
  const response = await fetch(fileUrl);
  const fileContent = await response.arrayBuffer();
  const bytes = new Uint8Array(fileContent);
  const base64 = arrayBufferToBase64(bytes);
  return base64;
}

const executePythonCode = async () => {
  // Combine pre-written Python code with user input
  Global.js.input = inputTextArea.value;
  if (pyodide) {
    try {
      if (!Global.js.input) {
        outputTextArea.value = "";
        return;
      }
      const pythonCode = userCodeGenerator();
      await pyodide.runPythonAsync(pythonCode);
      const outputValue = pyodide.globals.get(Global.python.output);
      outputTextArea.value = outputValue;
    } catch(error) {
      console.error("Error executing Python code: ", error);
    }
  } else {
    console.error("Pyodide is not loaded");
  }
}
promisePyodide();