const { default: axios } = require("axios");
const Compiler = require("compilex")
const util = require('util');
const options = { stats: true }
require("dotenv").config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
Compiler.init(options)


apiHandler = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
    },
    data: {}
};

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
    console.log(apiHandler);
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
    const apiHelper = apiHandler;
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