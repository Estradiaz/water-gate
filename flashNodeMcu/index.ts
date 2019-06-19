const execSync = require('child_process').execSync
// import {execSync} from 'child_process'

console.log(execSync('netstat -a').toString().match(/esp-\d{6}/))