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
        const desiredLabels: Label[] = CommonUtils.fetchLabels(path);

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
        await SetHandler.addLabels(params, labelsToAdd);

        // Remove the labels
        await SetHandler.removeLabels(params, labelsToRemove);

        // Update the labels
        await SetHandler.updateLabels(params, labelsToUpdate);
    }

    static async addLabels(
        params: RequiredParams,
        labelsToAdd: Label[]
    ): Promise<void> {
        if (labelsToAdd.length < 1) {
            Logger.warn('No labels to add');

            return;
        }

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
    }

    static async removeLabels(
        params: RequiredParams,
        labelsToRemove: Label[]
    ): Promise<void> {
        if (labelsToRemove.length < 1) {
            Logger.warn('No labels to remove');

            return;
        }

        Logger.info(`Removing ${labelsToRemove.length} labels:`);
        CommonUtils.printLabels(labelsToRemove);

        for (const label of labelsToRemove) {
            await DeleteHandler.deleteLabel(params, label.name);
        }

        Logger.success(`Successfully removed ${labelsToRemove.length} labels!`);
    }

    static async updateLabels(
        params: RequiredParams,
        labelsToUpdate: Label[]
    ): Promise<void> {
        if (labelsToUpdate.length < 1) {
            Logger.warn('No labels to update');

            return;
        }

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
