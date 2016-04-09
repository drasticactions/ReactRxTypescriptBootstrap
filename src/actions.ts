import { Subject } from 'rx';
import { template, curry, find, filter } from 'lodash';
import { IState } from './state';

type S = IState | Promise<IState>

export const Actions = new Subject<IAction | S>();

export interface IAction { <S>(state: S): S; };

/* tslint:disable */

export async function initialAction(state: IState) {

}
