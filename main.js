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
input_value = """${Global.js.input}"""

table = markdown_as_table(input_value)
if not table.header:
    ${Global.python.output} = Message.TABLE_NOT_FOUND.value
elif not table.body:
    ${Global.python.output} = Message.TABLE_NOT_FOUND.value
else:
    ${Global.python.output} = convert_table_as_multiline_text(table)
print(f"Good >> {${Global.python.output}}")
`

// Combine pre-written Python code with user input
const combinePythonCode = (preWrittenCode, userCodeGenerator) => {
  userCode = userCodeGenerator()
  return `${preWrittenCode}\n\n${userCode}`
}

// Load Pyodide
const promisePyodide = async() => {
  pyodide = await loadPyodide();
}

// Load external python script
const loadExternalScript = async (scriptUrl) => {
  const response = await fetch(scriptUrl);
  const scriptContent = await response.text();
  return scriptContent;
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
      const pythonCode = combinePythonCode(await preWrittenPythonCode, userCodeGenerator);
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

const preWrittenPythonCode = loadExternalScript('convert.py');
promisePyodide();