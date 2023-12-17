import React, { useEffect, useState } from 'react'
import EditorLoader from '../Loaders/EditorLoader';
import Editor from "@monaco-editor/react";
import { useSelector } from 'react-redux';

export default function MonacoEditor({
  handleEditorDidMount,
  startCode = `#include<bits/stdc++.h>

using namespace std;

int main(){
    
    return 0;
}`,
  lang,
  onChange
}) {
  const [isLoading, setIsLoading] = useState(true);
  const openedView = useSelector(state => state.openedView);

  const handleChange = () => {
    if (onChange) {
      onChange(openedView._id);
    }
  }

  useEffect(() => {
    const loadMonacoEditor = async () => {
      await import("@monaco-editor/react")

      setIsLoading(false);
    }
    loadMonacoEditor();
  }, [])
  return (
    <div style={{ height: '100%', width: "100%" }}>
      {!isLoading ? (
        <Editor
          width="100%"
          height="100%"
          language={lang}
          theme="vs-dark"
          value={startCode}
          onMount={handleEditorDidMount}
          onChange={handleChange}
        />
      ) : (
        <EditorLoader />
      )}
    </div>
  )
}