/**
 * Copyright (c) 2018-present, Yong Yin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {IAxisSettings} from "./axis";

export interface IOptions {
    data: any[];
    width: number;
    height: number;
}

export interface IIncrementAxisOptions {
    axisSettings: IAxisSettings;
}

export interface IAxisOptions extends IOptions, IIncrementAxisOptions {

}

export interface IIncrementBaseLineOptions {
    showDot?: boolean;
}

export interface IBaseLineOptions extends IAxisOptions, IIncrementAxisOptions, IIncrementBaseLineOptions {

}
