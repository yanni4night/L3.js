/**
 * Copyright (c) 2018-present, Yong Yin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as d3 from "d3";
import {merge} from "lodash";
import {IAxisSettings} from "../../types/axis";
import {IBaseLineOptions, IIncrementBaseLineOptions} from "../../types/options";
import {IHTMLSVGElement} from "../../types/svg";
import {AxisChart} from "../axis-chart";

const LINE_CLAZZ = "l3-basic-line";
const DOT_CLAZZ = "l3-basic-dot";

const defaultOptions: IIncrementBaseLineOptions = {
    showDot: true,
};

export class BasicLineChart<T extends IBaseLineOptions> extends AxisChart<T> {
    constructor(options: T) {
        super(merge({}, defaultOptions, options));
    }

    public getDisplayName(): string {
        return "BasicLineChart";
    }

    public draw(svgNode: IHTMLSVGElement): void {
        super.draw(svgNode);
        this.drawChart();
        if (this.options.showDot) {
            this.drawDot();
        }
    }

    protected drawChart(): void {
        const data = this.options.data;

        const axisSettings: IAxisSettings = this.options.axisSettings;
        const {xAxis, yAxis} = axisSettings;

        const xscale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, this.dimention.width - xAxis.margin * 2]);
        const yscale = d3.scaleLinear()
            .domain([d3.max(data), 0])
            .range([this.dimention.height - yAxis.margin * 2, 0]);

        const line = d3.line<number>()
            .curve(d3.curveLinear)
            .x((d: number, index: number) => {
                return xAxis.margin + xscale(index);
            })
            .y((d: number) => {
                return this.dimention.height - yAxis.margin - yscale(d);
            });

        // enter
        this.root.selectAll("path." + LINE_CLAZZ)
            .data([data])
            .enter()
            .append("path")
            .attr("class", LINE_CLAZZ)
            .attr("fill", "none");
        // update
        this.root.selectAll("path." + LINE_CLAZZ)
            .data([data])
            .transition("linear").duration(2e3)
            .attr("d", (d) => line(d));
        // exit
        this.root.selectAll("path." + LINE_CLAZZ)
            .data([data])
            .exit()
            .remove();
    }

    protected drawDot(): void {
        const data = this.options.data;
        const axisSettings: IAxisSettings = this.options.axisSettings;
        const {xAxis, yAxis} = axisSettings;

        const xscale = d3.scaleLinear()
            .domain([0, data.length - 1])
            .range([0, this.dimention.width - xAxis.margin * 2]);
        const yscale = d3.scaleLinear()
            .domain([d3.max(data), 0])
            .range([this.dimention.height - yAxis.margin * 2, 0]);
        // enter
        this.root.selectAll("circle." + DOT_CLAZZ)
            .data(data)
            .enter()
            .append("circle")
            .attr("class", DOT_CLAZZ);
        // update
        this.root.selectAll("circle." + DOT_CLAZZ)
            .data(data)
            .attr("r", "4")
            .attr("cx", (d: number, index: number) => {
                return xAxis.margin + xscale(index);
            })
            .attr("cy", (d: number) => {
                return this.dimention.height - yAxis.margin - yscale(d);
            });
        // exit
        this.root.selectAll("circle." + DOT_CLAZZ)
            .data(data)
            .exit()
            .remove();
    }
}
