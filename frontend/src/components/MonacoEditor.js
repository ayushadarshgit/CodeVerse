import React, { useEffect, useState } from 'react'
import EditorLoader from '../Loaders/EditorLoader';
import Editor from "@monaco-editor/react";

export default function MonacoEditor({
  handleEditorDidMount,
  startCode= `#include<bits/stdc++.h>

using namespace std;
  
int main(){
    // Start typing your code here
    
    return 0;
}`,
lang
}) {
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        const loadMonacoEditor = async()=>{
            await import("@monaco-editor/react")
            
            setIsLoading(false);
        }
        loadMonacoEditor();
    },[])
    return (
        <div style={{ height: '100%' }}>
      {!isLoading ? (
        <Editor
          width="100%"
          height="100%"
          language={lang}
          theme="vs-dark"
          value={startCode}
          onMount={handleEditorDidMount}
        />
      ) : (
        <EditorLoader />
      )}
    </div>
    )
}