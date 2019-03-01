const {Worker,} = require('worker_threads');
const os = require('os');
const path = require('path');
const inquirer = require('inquirer');
const userCPUcount = os.cpus().length;
const ora = require('ora');
const NS_PER_SEC = 1e9;

const calculateFactorialWithWorker = (number) => {
    if(number === 0) {
        return 1;
    }

    return new Promise(async (parentResolve, parentReject) => {
        const numbers = [] // [... new Array(number)].map((_, i) => BigInt(i + 1));
        for(let i = 1; i <= number; i++){
            numbers.push(i);
        }
        
        const segmentSize = Math.ceil(numbers.length / userCPUcount);
        const segments = [];

        for (let segmentIndex = 0; segmentIndex < userCPUcount; segmentIndex++){
            const start = segmentIndex * segmentSize;
            const end = start + segmentSize;
            const segment = numbers.slice(start, end);
            segments.push(segment);
        }

        try{
            const  results = await Promise.all(segments.map(segment => new Promise ((resolve, reject) => {

                const worker = new Worker(path.resolve('factorial_worker.js'), {
                workerData: segment,
                });
    
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if(code !== 0) {
                        reject(new Error(`Worker stopped with exit code ${code}`))
                    }
                });
            })));
            const finalResult = results.reduce((acc, val) => acc * val, 1);
            parentResolve(finalResult);
        } catch(e){
            parentReject(e);
        }
        


    });

};

const calculateFactorial = (number) => {
    const numbers = [] // [... new Array(number)].map((_, i) => BigInt(i + 1));
    for(let i = 1; i <= number; i++){
        numbers.push(i);
    }
    
    return numbers.reduce((acc, val) => acc * val, 1);
};
const benchmarkFactorial = async (inputNumber, factFun, label) => {
    const spinner = ora('Calculating with ${label}...').start();
    const startTime = process.hrtime();
    const result = await factFun(BigInt(inputNumber));
    const diffTime = process.hrtime(startTime);
    spinner.succeed(`${label} Result: ${result}, done in ${diffTime[0] * NS_PER_SEC + diffTime[1]} `);
}
const run = async () => {
    const {inputNumber} = await inquirer.prompt([{
        type : "input",
        name : "inputNumber",
        message : 'Calculate factorial for ',
        default: 10
      }]);

      await benchmarkFactorial(inputNumber, calculateFactorialWithWorker, 'Worker');
      await benchmarkFactorial(inputNumber, calculateFactorial, 'Normal');

    }

run(); 