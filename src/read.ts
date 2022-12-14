import chalk from 'chalk';
import Table from 'cli-table';
import Logger from './logger/logger';
import { RestService } from './services/rest/restService';
import { RequiredParams } from './services/rest/restService.types';

class ReadHandler {
    // Get a single label
    static async getLabel(params: RequiredParams, name: string) {
        const label: LabelResponse = await RestService.get<LabelResponse>(
            {
                ...params,
            },
            `/${name}`
        );

        Logger.info(`Label ${name} information:\n`);

        ReadHandler.printLabels([label]);
    }

    // Get all repository labels
    static async getAllLabels(params: RequiredParams, pagination: Pagination) {
        const labels: LabelResponse[] = await RestService.get<LabelResponse[]>(
            {
                ...params,
            },
            `?per_page${pagination.per_page}&page=${pagination.page}`
        );

        Logger.info(`Received ${labels.length} labels:\n`);

        ReadHandler.printLabels(labels);
    }

    // Prints the input labels in table format
    static printLabels(labels: LabelResponse[]) {
        const labelTable = new Table({
            head: ['Name', 'Description', 'Color'],
        });

        for (const label of labels) {
            const color = `#${label.color}`;

            labelTable.push([
                label.name,
                label.description ? label.description : '/',
                chalk.hex(color)(color),
            ]);
        }

        Logger.info(labelTable.toString());
    }
}

interface LabelResponse {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string | null;
    color: string;
    default: boolean;
}

interface Pagination {
    per_page: number;
    page: number;
}

export { ReadHandler, Pagination };
