const { default: axios } = require("axios");
const Compiler = require("compilex")
const util = require('util');
const options = { stats: true }
Compiler.init(options)

async function compileCodeCompilex(req, res) {
    const code = req.body.code;
    const input = req.body.input;
    const lang = req.body.lang;
    try {
        if (lang === "cpp") {
            const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (!input) {
                Compiler.compileCPP(envData, code, (data) => {
                    if (data.output) {
                        Compiler.flush(function () { });
                        res.send({ success: true, message: "Compiled Successfully", output: data.output });
                    } else {
                        Compiler.flush(function () { });
                        res.send({ success: false, message: "Compilation Error", output: data.error })
                    }
                })
            } else {
                Compiler.compileCPPWithInput(envData, code, input, (data) => {
                    if (data.output) {
                        Compiler.flush(function () { });
                        res.send({ success: true, message: "Compiled Successfully", output: data.output });
                    } else {
                        Compiler.flush(function () { });
                        res.send({ success: false, message: "Compilation Error", output: data.error })
                    }
                })
            }
        } else if (lang === "java") {
            const envData = { OS: "windows" };
            if (!input) {
                Compiler.compileJava(envData, code, (data) => {
                    if (data.output) {
                        Compiler.flush(function () { });
                        res.send({ success: true, message: "Compiled Successfully", output: data.output });
                    } else {
                        Compiler.flush(function () { });
                        res.send({ success: false, message: "Compilation Error", output: data.error })
                    }
                })
            } else {
                Compiler.compileJavaWithInput(envData, code, input, (data) => {
                    if (data.output) {
                        Compiler.flush(function () { });
                        res.send({ success: true, message: "Compiled Successfully", output: data.output });
                    } else {
                        Compiler.flush(function () { });
                        res.send({ success: false, message: "Compilation Error", output: data.error })
                    }
                })
            }
        } else if (lang === "python") {
            const envData = { OS: "windows" };
            if (!input) {
                Compiler.compilePython(envData, code, (data) => {
                    if (data.output) {
                        Compiler.flush(function () { });
                        res.send({ success: true, message: "Compiled Successfully", output: data.output });
                    } else {
                        Compiler.flush(function () { });
                        res.send({ success: false, message: "Compilation Error", output: data.error })
                    }
                })
            } else {
                Compiler.compilePythonWithInput(envData, code, input, (data) => {
                    if (data.output) {
                        res.send({ success: true, message: "Compiled Successfully", output: data.output });
                    } else {
                        res.send({ success: false, message: "Compilation Error", output: data.error })
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const apiHelper = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '2b70649d7cmshd099b7e69e9fef4p1e711bjsn9f127ae1f450',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },
    data: {}
};

async function compileCodeRapidApi(req, res) {
    const lang = req.body.lang;
    const code = req.body.code;
    const input = req.body.input;
    const data = {
        language: "r",
        version: "latest",
        code: code,
        input: input
    }
    if(lang === "cpp"){
        data.language = "cpp17"
    }else if(lang === "java"){
        data.language = "java"
    }else if(lang === "python"){
        data.language = "python3"
        console.log(data)
    }
    if(data.language !== "cpp17" && data.language !== "java" && data.language !== "python3"){
        return res.json({success: false,message: "Language not compatible"});
    }
    apiHelper.data = data;      
    try {
        const response = await axios.request(apiHelper);
        res.send(response.data);
    } catch (error) {
        console.log(error);
        const errorString = util.inspect(error, { depth: null });

        res.status(500).json({ error: errorString });
    }    
}


module.exports = { compileCodeCompilex , compileCodeRapidApi }