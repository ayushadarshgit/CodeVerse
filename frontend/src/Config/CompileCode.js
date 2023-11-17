export async function CompileCode(setIsCompiling, setView, setOutput, code, lang, input) {
  setIsCompiling(true);
  setView(false);
  const response = await fetch(
    "http://localhost:5000/codeverse/compile",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        lang: lang,
        input: input
      }),
    }
  );
  const json = await response.json();
  if (json.success) {
    const arr = json.output.split('\n');
    setOutput({ success: true, message: json.message, output: arr });
  }
  else {
    const arr = json.output.split('\n');
    setOutput({ success: false, message: json.message, output: arr });
  }
  setIsCompiling(false);
}

export async function CompileCodeRapidApi(setIsCompiling, setView, setOutput, code, lang, input) {
  setIsCompiling(true);
  setView(false);
  const response = await fetch(
    "http://localhost:5000/codeverse/compile/api",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        lang: lang,
        input: input
      }),
    }
  );
  const json = await response.json();
  if (json.success) {
    const arr = json.output.split('\n');
    setOutput({ success: true, message: json.message, output: arr });
  }
  else {
    const arr = json.output.split('\n');
    setOutput({ success: false, message: json.message, output: arr });
  }
  setIsCompiling(false);
}