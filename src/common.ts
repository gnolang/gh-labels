import chalk from 'chalk';
import Table from 'cli-table3';
import * as fs from 'fs';
import Logger from './logger/logger';
import { Label } from './types';

class CommonUtils {
    // Finds the difference between sets A and B (what is in A, but not in B)
    static findLabelDifference(a: Label[], b: Label[]): Label[] {
        return a.filter(
            (label) => b.findIndex((l) => l.name == label.name) == -1
        );
    }

    // Finds the common labels between sets A and B
    static findCommonLabels(a: Label[], b: Label[]): Label[] {
        return a.filter(
            (label) => b.findIndex((l) => l.name == label.name) > -1
        );
    }

    static fetchLabels(path: string): Label[] {
        // @ts-ignore
        return JSON.parse(fs.readFileSync(path));
    }

    // Prints the input labels in table format
    static printLabels(labels: Label[]) {
        const labelTable = new Table({
            head: ['Name', 'Description', 'Color'],
        });

        for (const label of labels) {
            const color = `#${label.color}`;

            labelTable.push([
                label.name,
                label.description ? label.description : '/',
                label.color ? chalk.hex(color)(color) : '/',
            ]);
        }

        Logger.info(labelTable.toString());
    }
}

export default CommonUtils;
