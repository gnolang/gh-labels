#!/usr/bin/env node
import { Command } from 'commander';
import { CreateHandler } from './create';
import DeleteHandler from './delete';
import Logger from './logger/logger';
import { ReadHandler } from './read';
import { RequiredParams } from './services/rest/restService.types';
import { UpdateHandler } from './update';

async function run() {
    const program = new Command();

    // Extracts the required REST call options
    const getRequiredParams = (): RequiredParams => {
        const options = program.opts();

        return {
            owner: options.owner,
            repo: options.repo,
            token: options.token,
        };
    };

    // Set the base program params
    program
        .name('gh-labels')
        .description('A small CLI tool for managing GitHub labels')
        .version('1.0.0');

    program.requiredOption(
        '-o, --owner <owner>',
        'The account owner of the repository. The name is not case sensitive',
    );

    program.requiredOption(
        '-r, --repo <repo>',
        'The name of the repository. The name is not case sensitive',
    );

    program.requiredOption(
        '-t, --token <token>',
        'The access token provided by GitHub',
    );

    // Define the create command
    program
        .command('create')
        .description('creates a new label using the provided params')
        .option('-n, --name <name>', 'The name of the label')
        .option(
            '-c, --color <color>',
            'The hexadecimal color code for the label, without the leading #',
        )
        .option(
            '-d, --description <description>',
            'A short description of the label. Must be 100 characters or fewer',
        )
        .action(() => {
            const options = program.opts();

            CreateHandler.createLabel(getRequiredParams(), {
                name: options.name,
                color: options.color,
                description: options.description,
            });
        });

    // Define the get command
    program
        .command('get')
        .description('fetches a label from the repository')
        .option('-n, --name <name>', 'The name of the label')
        .action(() => {
            const options = program.opts();

            ReadHandler.getLabel(getRequiredParams(), options.name);
        });

    // Define the get-all command
    program
        .command('get-all')
        .description('fetches all labels from the repository')
        .option('-p, --page <page>', 'Page number of the results to fetch')
        .option(
            '-pp, --per-page <perPage>',
            'The number of results per page (max 100)',
        )
        .action(() => {
            const options = program.opts();

            ReadHandler.getAllLabels(getRequiredParams(), {
                per_page: options.perPage ? options.perPage : 30,
                page: options.page ? options.page : 1,
            });
        });

    // Define the update command
    program
        .command('update')
        .description('updates an existing label using the provided params')
        .option('-n, --name <name>', 'The name of the label to be updated')
        .option('-nn, --new-name <newName>', 'The new name of the label')
        .option(
            '-c, --color <color>',
            'The hexadecimal color code for the label, without the leading #',
        )
        .option(
            '-d, --description <description>',
            'A short description of the label. Must be 100 characters or fewer',
        )
        .action(() => {
            const options = program.opts();

            UpdateHandler.updateLabel(
                getRequiredParams(),
                {
                    new_name: options.newName,
                    color: options.color,
                    description: options.description,
                },
                options.name,
            );
        });

    // Define the delete command
    program
        .command('delete')
        .description('deletes labels using the provided list')
        .argument('<labels...>', 'labels to delete')
        .action((labels: string[]) => {
            DeleteHandler.deleteLabels(getRequiredParams(), labels);
        });

    // Define the set command
    program
        .command('set')
        .description(
            'sets the labels using the provided list. Removes missing (config) labels, adds new (config) ones, and updates existing labels',
        )
        .argument('<path>', 'path to the corresponding label *.json file')
        .action(() => {
            // TODO
        });

    program.parse();
}

run()
    .then()
    .catch((err) => {
        Logger.error(err);
    });
