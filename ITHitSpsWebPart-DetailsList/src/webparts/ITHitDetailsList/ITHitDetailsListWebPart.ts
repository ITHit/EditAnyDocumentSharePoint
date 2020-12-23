import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ITHitDetailsList from './components/ITHitDetailsList';
import { IITHitDetailsListProps } from './components/IITHitDetailsListProps';
import SharePointDataProvider from './SharepointDataProvider';

export interface IITHitDetailsListWebPartProps {
  description: string;
}

export default class ITHitDetailsListWebPart extends BaseClientSideWebPart<IITHitDetailsListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IITHitDetailsListProps > = React.createElement(
      ITHitDetailsList,
      {
        spcontext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
