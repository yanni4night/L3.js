/**
 * Copyright (c) 2018-present, Yong Yin.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as d3 from "d3";
import {merge} from "lodash";
import {IDimention} from "../types/dimention";
import {IOptions} from "../types/options";
import {IHTMLSVGElement} from "../types/svg";

export abstract class Chart<T extends IOptions> {
    protected options: T = null;
    protected svgNode: IHTMLSVGElement = null;
    protected dimention: IDimention = null;

    constructor(options: T) {
        this.options = merge({}, options);

        this.dimention = {
            height: this.options.height,
            width: this.options.width,
        };
    }

    get root() {
        return d3.select(this.svgNode);
    }

    public abstract getDisplayName(): string;

    public draw(svgNode: IHTMLSVGElement): void {
        if (!svgNode
            || !svgNode.tagName
            || svgNode.tagName.toLowerCase() !== "svg"
            /* tslint:disable no-bitwise */
            || (0x1 & document.compareDocumentPosition(svgNode))) {
            throw new Error(`"${this.getDisplayName()}" must be drawn on a <svg> element in document.`);
        }

        this.svgNode = svgNode;
    }
}
