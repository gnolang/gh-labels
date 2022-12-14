import CommonUtils from './common';
import { CreateHandler } from './create';
import DeleteHandler from './delete';
import Logger from './logger/logger';
import { ReadHandler } from './read';
import { RequiredParams } from './services/rest/restService.types';
import { Label } from './types';
import { UpdateHandler } from './update';

class SetHandler {
    // Sets the repo labels to match the specified config
    static async setLabels(params: RequiredParams, path: string) {
        // Read the complete provided labels from disk
        const desiredLabels: Label[] = await CommonUtils.fetchLabels(path);

        // Read the labels at the repository
        const repoLabels: Label[] = await ReadHandler.getAllLabels(params, {
            per_page: 100,
            page: 1,
        });

        // See which labels need to be added
        const labelsToAdd: Label[] = CommonUtils.findLabelDifference(
            desiredLabels,
            repoLabels
        );

        // See which labels need to be removed
        const labelsToRemove: Label[] = CommonUtils.findLabelDifference(
            repoLabels,
            desiredLabels
        );

        // See which labels need to be updated
        const labelsToUpdate: Label[] = CommonUtils.findCommonLabels(
            desiredLabels,
            repoLabels
        );

        // Add the labels
        Logger.info(`Adding ${labelsToAdd.length} new labels:`);
        CommonUtils.printLabels(labelsToAdd);

        for (const label of labelsToAdd) {
            await CreateHandler.createLabel(params, {
                name: label.name,
                color: label.color,
                description: label.description,
            });
        }

        Logger.success(`Successfully added ${labelsToAdd.length} labels!`);

        // Remove the labels
        Logger.info(`Removing ${labelsToRemove.length} labels:`);
        CommonUtils.printLabels(labelsToRemove);

        for (const label of labelsToRemove) {
            await DeleteHandler.deleteLabel(params, label.name);
        }

        Logger.success(`Successfully removed ${labelsToRemove.length} labels!`);

        // Update the labels
        Logger.info(`Updating ${labelsToUpdate.length} labels:`);
        CommonUtils.printLabels(labelsToUpdate);

        for (const label of labelsToUpdate) {
            await UpdateHandler.updateLabel(
                params,
                {
                    color: label.color,
                    description: label.description,
                },
                label.name
            );
        }

        Logger.success(`Successfully updated ${labelsToUpdate.length} labels!`);
    }
}

export default SetHandler;
