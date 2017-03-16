/*
 * cylon-tplink commands
 * http://cylonjs.com
 *
 * Copyright (c) 2017 Kyle Stevenson
 * Licensed under the MIT License (MIT).
 */

"use strict";

module.exports = [

    /**
     * Gets the state of the WeMo
     *
     * @param {Function} callback
     * @export
     */
    "getInfo",

    /**
     * Sets state of the WeMo
     *
     * @param {Number} state Either 1 for on, or 0 for off
     * @param {Function} callback
     * @export
     */
    "getSysInfo",

    /**
     * Sets state of the WeMo
     *
     * @param {Number} state Either 1 for on, or 0 for off
     * @param {Function} callback
     * @export
     */
    "setPowerState",

    /**
     * Gets state of the WeMo
     *
     * @param {Number} state Either 1 for on, or 0 for off
     * @param {Function} callback
     * @export
     */
    "getPowerState",

    /**
     * Gets consumption of the WeMo
     *
     * @return {Promise}
     * @export
     */
    "getConsumption"

];