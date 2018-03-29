/**
 * Copyright (c) 2018-present, Yong Yin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
interface IAsixSetting {
    margin: number;
    label?: string[];
}

export interface IAxisSettings {
    xAxis: IAsixSetting;
    yAxis: IAsixSetting;
}
