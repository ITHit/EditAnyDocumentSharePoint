require('ITHitWebDAVClient')
require('ITHitEditAnyDocumentSps')

import { BaseDialog } from '@microsoft/sp-dialog';
import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { mergeStyles, mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import { IITHitDetailsListProps } from "./IITHitDetailsListProps";
import { Utils } from '../Utils';
import SharepointDataProvider from '../SharepointDataProvider';
import { ActionButton, IIconProps } from 'office-ui-fabric-react';

declare var ITHit: any;
const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: "16px"
  },
  fileIconCell: {
    textAlign: "center",
    selectors: {
      "&:before": {
        content: ".",
        display: "inline-block",
        verticalAlign: "middle",
        height: "100%",
        width: "0px",
        visibility: "hidden"
      }
    }
  },
  fileIconImg: {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px"
  },
  controlWrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
  exampleToggle: {
    display: "inline-block",
    marginBottom: "10px",
    marginRight: "30px"
  },
  selectionDetails: {
    marginBottom: "20px"
  }
});
const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px"
  }
};
const buttonClass = mergeStyles({
  height: 20,
  width: 20,
  maxHeight: 20,
  border: "none 0 0",
  marginLeft: 5,
  marginRight: 5,
  borderStyle: "none",
});

export interface IDetailsListDocumentsState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
}

export interface IDocument {
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
  fileUrl: string;
  linkingUrl: string;
  isFile: boolean;
}

export interface ISpList {
  id: string;
  title: string;
  serverRelativeUrl: string;
}

export default class ITHitDetailsList extends React.Component<IITHitDetailsListProps, IDetailsListDocumentsState> {
  //TODO change list title here
  private _listTitle: string = 'Documents'; 
  
  private _selection: Selection;
  private _allItems: IDocument[];
  private _dataProvider: SharepointDataProvider;

  constructor(props: IITHitDetailsListProps, state: IDetailsListDocumentsState) {
    super(props);

    this._dataProvider = new SharepointDataProvider(props.spcontext);
    this._allItems = this._dataProvider.LoadDocuments(this._listTitle, this.props);
    this._dataProvider.ReadListProperties(this._listTitle)
    .then((list: ISpList) => {
        this.props.spcontext.pageContext._list = list;
      },
    );

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails()
        });
      }
    });

    this.state = {
      items: this._allItems,
      columns: this._setupColumns(),
      selectionDetails: this._getSelectionDetails()
    };
  }

  public render() {
    const { columns, items, selectionDetails } = this.state;

    return (
      <Fabric>
         <div className={classNames.controlWrapper}>
          <TextField
            label="Filter by name:"
            onChange={this._onChangeText}
            styles={controlStyles}
          />
        </div>
        <div className={classNames.selectionDetails}>{selectionDetails}</div>
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </Fabric>
    );
  }

  /**
   *  Specify the columns and their properties
   */
  private _setupColumns(){
    const columns: IColumn[] = [
      {
        key: "file_type",
        name: "File Type",
        className: classNames.fileIconCell,
        iconClassName: classNames.fileIconHeaderIcon,
        ariaLabel:
          "Column operations for File type, Press to sort on File type",
        iconName: "Page",
        isIconOnly: true,
        fieldName: "name",
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return (
            <img
              src={item.iconName}
              className={classNames.fileIconImg}
              alt={item.fileType + " file icon"}
            />
          );
        }
      },
      {
        key: "name",
        name: "Name",
        fieldName: "name",
        minWidth: 150,
        maxWidth: 300,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        onColumnClick: this._onColumnClick,
        data: "string",
        isPadded: true
      },
      {
        key: "date_modified",
        name: "Date Modified",
        fieldName: "dateModifiedValue",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: "number",
        onRender: (item: IDocument) => {
          return <span>{item.dateModified}</span>;
        },
        isPadded: true
      },
      {
        key: "modified_by",
        name: "Modified By",
        fieldName: "modifiedBy",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: "string",
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true
      },
      {
        key: "edit_btn",
        name: "Edit",
        fieldName: "edit_btn",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: "string",
        onRender: this._renderButton
      }
    ];
    return columns;
  }

  private _renderButton = (item: IDocument) => {
    let self = this;
    let title = "";
    let icon: IIconProps = null;
    if (item.isFile){
      icon = {
        iconName: "PageEdit",
      } as IIconProps;
      title = "Edit";
    }else{
      icon = {
        iconName: "FabricOpenFolderHorizontal",
      } as IIconProps;
      title = "Open Folder in OS File Manager";
    }

    return (
      <div>
        <ActionButton iconProps={icon} className={buttonClass} title={title} ariaLabel={title} onClick={() => { 
         if(ITHit.WebDAV.Client.DocManager.IsMicrosoftOfficeDocument(item.name)){
          window.open(item.linkingUrl);
         }else{
          /**
			    * <p>Opens document from Sharepoint sites for editing or printing using davX: protocol and prompts to install the protocol it if not found.</p>
          * @api
          * @param {PageContext} pageContext A property from Sharepoint extension context object.
          * @param {string} sDocumentUrls Array of document URLs to be opened for editing from server. All documents must be located under the same sharepoint site. Must be a full URL(s) including the domain name.
          * @param {function} [errorCallback] Function to call if document opening failed. Typically you will request the protocol installation in this callback.
          * If not specified a default message offering protocol installation will be displayed.
          * @param {string} [sCommand] Command to use when opening the document. Supported options are:
          * <ul>
          * <li> <code>'Edit'</code> - Opens a document for editing.
          * <li> <code>'OpenWith'</code> - Show system 'Open With' dialog to select application to be used to open a document. This option is supported on Windows only.
          * <li> <code>'Print'</code> - Prints a document. The application that prints a document is running in a minimized state and automatically closes if printing is successful. If printing fails, the application remains open. To print multiple documents, pass a list of documents as a first parameter. This option is supported on Windows only.
          * </ul>
          * Default is <code>'Edit'</code>.
          */
          ITHit.WebDAV.Client.SPSManager.SharePointEditDocument(self.props.spcontext.pageContext, item.fileUrl, null, null);
         }
        }}  />
      </div>
    );
  }

  private _onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1)
        : this._allItems
    });
  };

  private _getSelectionDetails(): string {
    return Utils.GetSelectionDetails(this._selection);
  }

  private _onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn
  ): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(
      currCol => column.key === currCol.key
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = Utils.CopyAndSort(
      items,
      currColumn.fieldName!,
      currColumn.isSortedDescending
    );
    this.setState({
      columns: newColumns,
      items: newItems
    });
  };
}



