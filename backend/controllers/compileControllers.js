const { default: axios } = require("axios");
const Compiler = require("compilex")
const util = require('util');
const options = { stats: true }

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST;
Compiler.init(options)


const apiHandler = {
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
    const { code, input, lang } = req.body;
    try {
        if (lang === "cpp") {
            const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (!input) {
                try {
                    const compilePromise = new Promise((resolve, reject) => {
                        Compiler.compileCPP(envData, code, (data) => {
                            if (!data.error) {
                                Compiler.flush(function () { });
                                resolve({ success: true, message: "Compiled Successfully", output: data.output });
                            } else {
                                Compiler.flush(function () { });
                                resolve({ success: false, message: "Compilation Error", output: data.error });
                            }
                        });
                    });
                    const result = await compilePromise;
                    if (!res.headersSent) {
                        if (!result.output && !result.success) {
                            result.output = `stdout maxBuffer exceeded.\n 
                            You might have initialized an infinite loop.\n
                             It might be possible the code is expecting some input but you didn't provide`
                        }
                        res.json(result);
                    }
                } catch (error) {
                    console.log(error);
                    if (!res.headersSent) {
                        res.status(500).json({ success: false, message: "Internal Server Error", output: "" });
                    }
                }
            } else {
                try {
                    const compilePromise = new Promise((resolve, reject) => {
                        Compiler.compileCPPWithInput(envData, code, input, (data) => {
                            if (!data.error) {
                                Compiler.flush(function () { });
                                resolve({ success: true, message: "Compiled Successfully", output: data.output });
                            } else {
                                Compiler.flush(function () { });
                                resolve({ success: false, message: "Compilation Error", output: data.error });
                            }
                        });
                    });
                    const result = await compilePromise;
                    if (!res.headersSent) {
                        if (!result.output && !result.success) {
                            result.output = `stdout maxBuffer exceeded.\n 
                            You might have initialized an infinite loop.\n`
                        }
                        res.json(result);
                    }
                } catch (error) {
                    console.log(error);
                    if (!res.headersSent) {
                        res.status(500).json({ success: false, message: "Internal Server Error", output: "" });
                    }
                }
            }
        } else if (lang === "java") {
            const envData = { OS: "windows", options: { timeout: 10000 } };
            if (!input) {
                try {
                    const compilePromise = new Promise((resolve, reject) => {
                        Compiler.compileJava(envData, code, (data) => {
                            if (!data.error) {
                                Compiler.flush(function () { });
                                resolve({ success: true, message: "Compiled Successfully", output: data.output });
                            } else {
                                Compiler.flush(function () { });
                                resolve({ success: false, message: "Compilation Error", output: data.error })
                            }
                        })

                    });
                    const result = await compilePromise;
                    if (!res.headersSent) {
                        if (!result.output && !result.success) {
                            result.output = `stdout maxBuffer exceeded.\n 
                            You might have initialized an infinite loop.\n
                             It might be possible the code is expecting some input but you didn't provide`
                        }
                        res.json(result);
                    }
                } catch (error) {
                    console.log(error);
                    if (!res.headersSent) {
                        res.status(500).json({ success: false, message: "Internal Server Error", output: "" });
                    }
                }
            } else {
                try {
                    const compilePromise = new Promise((resolve, reject) => {
                        Compiler.compileJavaWithInput(envData, code, input, (data) => {
                            if (!data.error) {
                                Compiler.flush(function () { });
                                resolve({ success: true, message: "Compiled Successfully", output: data.output });
                            } else {
                                Compiler.flush(function () { });
                                resolve({ success: false, message: "Compilation Error", output: data.error })
                            }
                        })
                    });
                    const result = await compilePromise;
                    if (!res.headersSent) {
                        if (!result.output && !result.success) {
                            result.output = `stdout maxBuffer exceeded.\n 
                            You might have initialized an infinite loop.\n`
                        }
                        res.json(result);
                    }
                } catch (error) {
                    console.log(error);
                    if (!res.headersSent) {
                        res.status(500).json({ success: false, message: "Internal Server Error", output: "" });
                    }
                }
            }
        } else if (lang === "python") {
            const envData = { OS: "windows" };
            if (!input) {
                try {
                    const compilePromise = new Promise((resolve, reject) => {
                        Compiler.compilePython(envData, code, (data) => {
                            if (!data.error) {
                                Compiler.flush(function () { });
                                resolve({ success: true, message: "Compiled Successfully", output: data.output });
                            } else {
                                Compiler.flush(function () { });
                                resolve({ success: false, message: "Compilation Error", output: data.error })
                            }
                        })
                    });
                    const result = await compilePromise;
                    if (!res.headersSent) {
                        if (!result.output && !result.success) {
                            result.output = `stdout maxBuffer exceeded.\n 
                            You might have initialized an infinite loop.\n
                             It might be possible the code is expecting some input but you didn't provide`
                        }
                        res.json(result);
                    }
                } catch (error) {
                    console.log(error);
                    if (!res.headersSent) {
                        res.status(500).json({ success: false, message: "Internal Server Error", output: "" });
                    }
                }
            } else {
                try {
                    const compilePromise = new Promise((resolve, reject) => {
                        Compiler.compilePythonWithInput(envData, code, input, (data) => {
                            if (!data.error) {
                                Compiler.flush(function () { });
                                resolve({ success: true, message: "Compiled Successfully", output: data.output });
                            } else {
                                Compiler.flush(function () { });
                                resolve({ success: false, message: "Compilation Error", output: data.error })
                            }
                        })
                    });
                    const result = await compilePromise;
                    if (!res.headersSent) {
                        if (!result.output && !result.success) {
                            result.output = `stdout maxBuffer exceeded.\n 
                            You might have initialized an infinite loop.\n`
                        }
                        res.json(result);
                    }
                } catch (error) {
                    console.log(error);
                    if (!res.headersSent) {
                        res.status(500).json({ success: false, message: "Internal Server Error", output: "" });
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}


async function compileCodeRapidApi(req, res) {
    const { code, input, lang } = req.body
    const data = {
        language: "r",
        version: "latest",
        code: code,
        input: input
    }
    if (lang === "cpp") {
        data.language = "cpp17"
    } else if (lang === "java") {
        data.language = "java"
    } else if (lang === "python") {
        data.language = "python3"
    }
    if (data.language !== "cpp17" && data.language !== "java" && data.language !== "python3") {
        return res.json({ success: false, message: "Language not compatible" });
    }
    const apiHelper = apiHandler;
    apiHelper.data = data;
    try {
        const response = await axios.request(apiHelper);
        res.send({ success: true, message: "Compiled Successfully", output: response.data.output });
    } catch (error) {
        console.log(error);
        const errorString = util.inspect(error, { depth: null });

        res.status(500).json({ error: errorString });
    }
}


module.exports = { compileCodeCompilex, compileCodeRapidApi }