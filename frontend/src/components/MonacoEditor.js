import React, { useEffect, useState } from 'react'
import EditorLoader from '../Loaders/EditorLoader';
import Editor from "@monaco-editor/react";

export default function MonacoEditor() {
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
          language="cpp"
          theme="vs-dark"
          value="// some comment"
          
        />
      ) : (
        <EditorLoader />
      )}
    </div>
    )
}