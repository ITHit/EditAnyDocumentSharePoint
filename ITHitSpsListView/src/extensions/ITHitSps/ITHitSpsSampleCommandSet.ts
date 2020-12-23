require('ITHitWebDAVClient')
require('ITHitEditAnyDocumentSps')


import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'ITHitSpsSampleCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IITHitSpsSampleCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextEdit: string;
}

const LOG_SOURCE: string = 'ITHitSpsSampleCommandSet';
declare var ITHit: any;

export default class ITHitSpsSampleCommandSet extends BaseListViewCommandSet<IITHitSpsSampleCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ITHitSpsSampleCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const editCommand: Command = this.tryGetCommand('COMMAND_EDIT');
    if (editCommand) {
      // This command should be hidden unless exactly one row is selected.
      editCommand.visible = event.selectedRows.length === 1 && 
      !ITHit.WebDAV.Client.DocManager.IsMicrosoftOfficeDocument('.' + event.selectedRows[0].getValueByName('File_x0020_Type'));
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    // Get domain.
    let sMountUrl = this.context.pageContext.site.absoluteUrl.replace(/\/$/, "");
    let rootSiteUrl = sMountUrl.substring(0, sMountUrl.length - this.context.pageContext.site.serverRelativeUrl.length + 1);
    // Combine domain and file path.
    let sDocumentUrls = this._combineURLs(rootSiteUrl, event.selectedRows[0].getValueByName('FileRef'));

    switch (event.itemId) {
      case 'COMMAND_EDIT':
        ITHit.WebDAV.Client.SPSManager.SharePointEditDocument(this.context.pageContext, sDocumentUrls, null, null);
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _combineURLs(baseURL, relativeURL): string {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
  }
}
