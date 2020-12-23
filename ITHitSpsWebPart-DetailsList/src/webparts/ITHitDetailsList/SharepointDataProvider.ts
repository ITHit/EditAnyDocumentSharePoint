import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from '@microsoft/sp-http';
import { IDocument, ISpList } from "./components/ITHitDetailsList";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { Utils } from "./Utils";
import { IITHitDetailsListProps } from "./components/IITHitDetailsListProps";

export default class SharePointDataProvider{
    private _webPartContext: WebPartContext;
    private _webAbsoluteUrl: string;

    constructor(value: WebPartContext) {
        this._webPartContext = value;
        this._webAbsoluteUrl = value.pageContext.web.absoluteUrl;
    }

    public LoadDocuments(listTitle: string, props: IITHitDetailsListProps) {
        const items: IDocument[] = [];
        if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
          props.spcontext.spHttpClient
            .get(
              this._webAbsoluteUrl + `/_api/web/lists/getbytitle('${listTitle}')/items/?$select=Modified,File,Editor/Title&$expand=File,Editor,Folder`,
              SPHttpClient.configurations.v1
            )
            .then((response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(JSON.stringify(response)));
                }
            })
            .then((listItems: any) => {
                console.log(listItems);
                listItems.value.forEach(element => {
                  if (element.File){
                      let url = new URL(element.File["@odata.id"]);
                      items.push({
                        name: element.File.Name,
                        value: element.File.Name,
                        iconName: Utils.GetIconUrlByFileName(element.File.Name),
                        fileType: element.File.Name.split('.')[1],
                        modifiedBy: element.Editor.Title,
                        dateModified: new Date(element.Modified).toLocaleDateString(),
                        dateModifiedValue: new Date(element.Modified).valueOf(),
                        fileSize: Utils.ReadableFileSize(element.File.Length),
                        fileSizeRaw: element.File.Length,
                        fileUrl: url.origin + element.File.ServerRelativeUrl,
                        linkingUrl: element.File.LinkingUrl,
                        isFile: true
                      });
                  }else if (element.Folder){
                    let url = new URL(element.Folder["@odata.id"]);
                    items.push({
                      name: element.Folder.Name,
                      value: element.Folder.Name,
                      iconName: Utils.GetIconUrlByFileName(element.Folder.Name),
                      fileType: element.Folder.Name.split('.')[1],
                      modifiedBy: element.Editor.Title,
                      dateModified: new Date(element.Modified).toLocaleDateString(),
                      dateModifiedValue: new Date(element.Modified).valueOf(),
                      fileSize: "",
                      fileSizeRaw: 0,
                      fileUrl: url.origin + element.Folder.ServerRelativeUrl,
                      linkingUrl: element.Folder.LinkingUrl,
                      isFile: false
                    });
                }
                });      
            });
        }
       
        return items;
    }

    public ReadListProperties(listTitle: string): Promise<ISpList> {
        let queryUrlGetList = this._webAbsoluteUrl + `/_api/web/lists/getbytitle('${listTitle}')`;

        return this.ReadRootFolder(listTitle).then((serverRelativeUrl: string): Promise<ISpList> => {
            return this._webPartContext.spHttpClient.get(
                queryUrlGetList,
                SPHttpClient.configurations.v1)
                .then((response: any) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        return Promise.reject(new Error(JSON.stringify(response)));
                    }
                })
                .then((data: any) => {
                    if (data) {
                        let list: ISpList = {
                            id: data.Id,
                            title: data.Title,
                            serverRelativeUrl: serverRelativeUrl
                        };
                        return list;
                    }
                    else {
                        console.log("no list info");
                    }
                    return null;
                }).catch((ex) => {
                    console.log("ReadListProperties > spHttpClient.get()...catch:", ex);
                    throw ex;
                });
        });
    }

    public ReadRootFolder(listTitle: string): Promise<string> {
        let queryUrlGetList = this._webAbsoluteUrl + `/_api/web/lists/getbytitle('${listTitle}')/RootFolder`;

        return this._webPartContext.spHttpClient.get(
            queryUrlGetList,
            SPHttpClient.configurations.v1)
            .then(
            (response: any) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    return Promise.reject(new Error(JSON.stringify(response)));
                }
            })
            .then((data: any) => {
                if (data) {
                    return data.ServerRelativeUrl;
                }
                else {
                    console.log("no url info");
                }
                return "";
            }).catch((ex) => {
                console.log("ReadRootFolder > spHttpClient.get()...catch:", ex);
                throw ex;
            });
    }
}