import chalk from 'chalk';

class Logger {
    static info(s: string) {
        console.log(`\n${s}`);
    }

    static title(s: string) {
        console.log(`\n${chalk.blue(s)}`);
    }

    static warn(s: string) {
        console.log(`\n${chalk.yellow(`⚠️️ ${s}`)}`);
    }

    static success(s: string) {
        console.log(`\n${chalk.green(`✅ ${s}`)}`);
    }

    static error(s: string) {
        console.log(`\n${chalk.red(`⛔️ ${s}`)}`);
    }
}

export default Logger;
