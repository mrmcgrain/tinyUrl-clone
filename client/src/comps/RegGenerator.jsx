import React, { useState, useEffect, useDebugValue } from 'react'
const globToRegex = require('glob-to-regexp')
var pathToRegexp = require('path-to-regexp');

var RegexParser = require("regex-parser");

const RegGenerator = () => {

    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")

    useEffect(() => {
        setOutput(globToRegex(input))
        // console.log("pathreg", pathToRegexp(input))
        // console.log("RegexParser", RegexParser("this is a test"))

    }, [input])




    let phone = globToRegex('(602)333-2222')


    const handleChange = (e) => {
        setInput(e.target.value)
        // handleOutput(input)
        // setOutput(globToRegex(input))
    }

    // const handleOutput = (input) => {
    //     let test = globToRegex(input)
    //     setOutput(test)
    // }

    return (
        <div id='RegGenerator'>

            {console.log("output", output, input)}
            <p> RegGenerator </p>

            <input
                name="input"
                onChange={(e) => handleChange(e)}
            >
            </input>
            <div>
                {output ? <p> {`${output}`} </p> : null}
            </div>


        </div>
    )
};

export default RegGenerator
