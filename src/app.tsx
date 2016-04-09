import * as React from 'react';
import {  } from './state';
import {  } from './actions';

export class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props, undefined);
    }

    render() {
        let state = this.props;
        return (<div>
           <h2>Test</h2>
        </div>
        );
    }
}