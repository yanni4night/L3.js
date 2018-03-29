/**
 * Copyright (c) 2018-present, Yong Yin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as d3 from "d3";
import {merge} from "lodash";
import {IAxisSettings} from "../types/axis";
import {IAxisOptions, IIncrementAxisOptions} from "../types/options";
import {IHTMLSVGElement} from "../types/svg";
import {Chart} from "./chart";

const defaultOptions: IIncrementAxisOptions = {
    axisSettings: {
        xAxis: {
            margin: 30,
        },
        yAxis: {
            margin: 30,
        },
    },
};

export abstract class AxisChart<T extends IAxisOptions> extends Chart<T> {
    constructor(options: T) {
        super(merge({}, defaultOptions, options));
    }

    public draw(svgNode: IHTMLSVGElement): void {
        super.draw(svgNode);
        this.drawAxis();
    }

    private drawAxis(): void {
        const axisSettings: IAxisSettings = this.options.axisSettings;
        const {xAxis, yAxis} = axisSettings;
        const data = this.options.data;

        // y-axis
        let scale = d3.scaleLinear().domain([d3.max(data), 0]).range([this.dimention.height - yAxis.margin * 2, 0]);
        let axis = d3.axisLeft(scale)
            .ticks(data.length)
            .tickFormat((d: number, index: number) => `${(d3.max(data) - d)}`);

        this.root.append("g")
            .attr("transform", `translate(${xAxis.margin}, ${yAxis.margin})`)
            .call(axis);
        // x-axis
        scale = d3.scaleLinear().domain([0, data.length - 1]).range([0, this.dimention.width - xAxis.margin * 2]);
        axis = d3.axisBottom(scale)
        .ticks(data.length - 1)
        .tickFormat((d: number, index: number) => (xAxis.label ? xAxis.label[index] : `${index}`));

        this.root.append("g")
            .attr("transform", `translate(${xAxis.margin}, ${this.dimention.height - yAxis.margin})`)
            .call(axis);
    }
}
