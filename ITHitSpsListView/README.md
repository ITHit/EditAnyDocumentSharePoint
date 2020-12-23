# SharePoint List View with Edit Button on a Ribbon Bar for non-Microsoft Office Documents Editing

This sample demonstrates a SharePoint list view that displays Edit button on a ribbon bar for non-MS Office documents editing. Using this button you can open Adobe Acrobat PDF and other non-MS Office documents for editing. To open documents it utilizes [SharePointEditDocument()](https://ajax.webdavsystem.com/ITHit.WebDAV.Client.SPSManager.html#SharePointEditDocument) JavaScript function provided with [IT Hit Edit Any Document SDK](https://www.webdavsystem.com/sharepoint/).

See also the [getting started with building web parts on Microsoft website](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part).

Follow the guide below to run the sample.

### Prerequisites
This sample requires [Node.js](https://nodejs.org/) v4+ to run.

### Unzip a sample
Unzip a sample contents to the ITHitSpsListView folder.

### Installation
Install the dependencies and devDependencies and start the server.

```sh
$ cd ITHitSpsListView 
$ npm install
```

### Configure your SharePoint site url
Open **config\serve.json** and edit **pageUrl** parameter. Point it to your sharepoint site.

### Configure action appear place
Open **sharepoint\assets\elements.xml** and edit **Location** parameter:
  - *ClientSideExtension.ListViewCommandSet.CommandBar* – Action will be available on the Command Bar
  - *ClientSideExtension.ListViewCommandSet.ContextMenu* – This will appear as a context menu.
  - *ClientSideExtension.ListViewCommandSet* – This, will give both options - CommandBar and ContextMenu.

### Run the sample
From the ITHitSpsExtension folder build and run the sample in the debug mode:

```sh
$ gulp serve
```
Agree to the **Allow debug scripts?** dialog by pressing **Load debug scripts**.

### Opening documents for editing
  - Select the document in the list. Now select the *Command Edit* button on a command bar or a context menu to open it for editing. The dialog asking for protocol application installation will appear.
  - Install the protocol application and activate the web browser extension. Find more about the web browser extension activation in [this article](https://www.webdavsystem.com/sharepoint/install/protocol/web_browser_extensions/).
  - Now click the Edit button again. This time the web browser protocol warning dialog will appear. Confirm the document opening. The document will open in the desktop application that is associated with the file extension on the client machine.

