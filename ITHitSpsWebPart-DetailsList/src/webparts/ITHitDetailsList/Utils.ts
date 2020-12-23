import { IDocument } from "./components/ITHitDetailsList";
import {
    Selection,
    IColumn
  } from "office-ui-fabric-react/lib/DetailsList";

export class Utils{
    /**
     * Returns the site relative url from an absolute url
     */
    static GetRelativePathFromAbsolute(absoluteUrl) {
        var serverRelativeUrl =
            absoluteUrl.toLowerCase().replace(window.location.protocol.toLowerCase() + "//" + window.location.host.toLowerCase(), "");
        return serverRelativeUrl;
    }

    static GetIconUrlByFileName(fileName: string){
        let iconurl: string;
        let ext = fileName.split('.').pop().toLowerCase();
        if(ext === 'pdf'){
            iconurl ='https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/48/pdf.svg';
        }
        else if (ext === fileName.toLowerCase()){
            iconurl ='https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/48/folder.svg';
        }
        else{
            iconurl =`https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/${fileName.split('.').pop()}_16x1.svg`;
        }
        return iconurl;
    }

    static ReadableFileSize(size) {
        var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = 0;
        while(size >= 1024) {
            size /= 1024;
            ++i;
        }
        return size.toFixed(1) + ' ' + units[i];
    }

    static GetSelectionDetails(selection: Selection): string {
        const selectionCount = selection.getSelectedCount();
    
        switch (selectionCount) {
          case 0:
            return "No items selected";
          case 1:
            return (
              "1 item selected: " +
              (selection.getSelection()[0] as IDocument).name
            );
          default:
            return `${selectionCount} items selected`;
        }
    }

    static CopyAndSort<T>(
        items: T[],
        columnKey: string,
        isSortedDescending?: boolean
      ): T[] {
        const key = columnKey as keyof T;
        return items
          .slice(0)
          .sort((a: T, b: T) =>
            (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1
          );
    }
}