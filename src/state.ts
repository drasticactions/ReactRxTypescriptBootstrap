import { Subject } from 'rx';
import { Actions } from './actions';

export interface IState {
    message: string;
}

export const InitialState: IState = {
    message: 'Ready'
};