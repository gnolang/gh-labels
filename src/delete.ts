import { SingleBar } from 'cli-progress';
import Logger from './logger/logger';
import { RestService } from './services/rest/restService';
import { RequiredParams } from './services/rest/restService.types';

class DeleteHandler {
    // Delete the specified list of labels
    static async deleteLabels(params: RequiredParams, labels: string[]) {
        if (labels.length == 0) {
            Logger.warn('No labels specified');
        }

        const deleteErrors: Error[] = [];
        const deleteBar = new SingleBar({
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
        });

        deleteBar.start(labels.length, 0, {
            speed: 'N/A',
        });

        for (const label of labels) {
            try {
                await DeleteHandler.deleteLabel(params, label);
            } catch (e: any) {
                deleteErrors.push(e);
            }

            deleteBar.increment();
        }

        deleteBar.stop();

        Logger.success('Label deletion completed');

        if (deleteErrors.length > 0) {
            Logger.warn('Errors encountered during label deletion:');

            for (const err of deleteErrors) {
                Logger.error(err.message);
            }
        }
    }

    static async deleteLabel(params: RequiredParams, label: string) {
        await RestService.delete(params, label);
    }
}

export default DeleteHandler;
