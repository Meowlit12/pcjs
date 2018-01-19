/**
 * @fileoverview Manages a collection of devices as a single machine
 * @author <a href="mailto:Jeff@pcjs.org">Jeff Parsons</a>
 * @copyright © 2012-2018 Jeff Parsons
 *
 * This file is part of PCjs, a computer emulation software project at <http://pcjs.org/>.
 *
 * PCjs is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * PCjs is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with PCjs.  If not,
 * see <http://www.gnu.org/licenses/gpl.html>.
 *
 * You are required to include the above copyright notice in every modified copy of this work
 * and to display that copyright notice when the software starts running; see COPYRIGHT in
 * <http://pcjs.org/modules/devices/machine.js>.
 *
 * Some PCjs files also attempt to load external resource files, such as character-image files,
 * ROM files, and disk image files. Those external resource files are not considered part of PCjs
 * for purposes of the GNU General Public License, and the author does not claim any copyright
 * as to their contents.
 */

"use strict";

/**
 * @class {Machine}
 * @unrestricted
 * @property {Chip} chip
 * @property {string} sConfigFile
 * @property {boolean} fConfigLoaded
 * @property {boolean} fPageLoaded
 */
class Machine extends Device {
    /**
     * Machine(idMachine, sConfig)
     * 
     * If sConfig contains a JSON object definition, then we parse it immediately and save the result in this.config;
     * otherwise, we assume it's the URL of an JSON object definition, so we request the resource, and once it's loaded,
     * we parse it.
     * 
     * Sample config:
     *
     *    {
     *      "ti57": {
     *        "class": "Machine",
     *        "type": "TI57",
     *        "name": "TI-57 Programmable Calculator Simulation",
     *        "version": 1.10,
     *        "autoStart": true,
     *        "autoRestore": true,
     *        "bindings": {
     *          "clear": "clearTI57",
     *          "print": "printTI57"
     *        }
     *      },
     *      "chip": {
     *        "class": "Chip",
     *        "type": "TMS-1500",
     *        "input": "buttons",
     *        "output": "display"
     *      },
     *      "clock": {
     *        "class": "Time",
     *        "cyclesPerSecond": 650000
     *        "bindings": {
     *          "run": "runTI57",
     *          "speed": "speedTI57",
     *          "step": "stepTI57"
     *        },
     *        "overrides": ["cyclesPerSecond"]
     *      },
     *      "display": {
     *        "class": "LED",
     *        "type": 3,
     *        "cols": 12,
     *        "rows": 1,
     *        "color": "red",
     *        "bindings": {
     *          "container": "displayTI57"
     *        },
     *        "overrides": ["color","backgroundColor"]
     *      },
     *      "buttons": {
     *        "class": "Input",
     *        "map": [
     *          ["2nd",  "inv",  "lnx",  "\\b",  "clr"],
     *          ["lrn",  "xchg", "sq",   "sqrt", "rcp"],
     *          ["sst",  "sto",  "rcl",  "sum",  "exp"],
     *          ["bst",  "ee",   "(",    ")",    "/"],
     *          ["gto",  "7",    "8",    "9",    "*"],
     *          ["sbr",  "4",    "5",    "6",    "-"],
     *          ["rst",  "1",    "2",    "3",    "+"],
     *          ["r/s",  "0",    ".",    "+/-",  "=|\\r"]
     *        ],
     *        "location": [139, 325, 368, 478, 0.34, 0.5, 640, 853, 418, 180, 75, 36],
     *        "bindings": {
     *          "surface": "imageTI57",
     *          "power": "powerTI57",
     *          "reset": "resetTI57"
     *        }
     *      },
     *      "rom": {
     *        "class": "ROM",
     *        "wordSize": 13,
     *        "valueSize": 16,
     *        "valueTotal": 2048,
     *        "littleEndian": true,
     *        "file": "ti57le.bin",
     *        "reference": "",
     *        "values": [
     *        ]
     *      }
     *    }
     *
     * @this {Machine}
     * @param {string} idMachine (of both the machine AND the <div> to contain it)
     * @param {string} sConfig (JSON configuration for entire machine, including any static resources)
     */
    constructor(idMachine, sConfig)
    {
        super(idMachine, idMachine, Machine.VERSION);

        let machine = this;
        this.chip = null;
        this.sConfigFile = "";
        this.fConfigLoaded = this.fPageLoaded = false;
        
        sConfig = sConfig.trim();
        
        if (sConfig[0] == '{') {
            this.loadConfig(sConfig);
        } else {
            this.sConfigFile = sConfig;
            this.getResource(this.sConfigFile, function onLoadConfig(sURL, sResource, readyState, nErrorCode) {
                if (readyState == 4) {
                    if (!nErrorCode && sResource) {
                        machine.loadConfig(sResource);
                        machine.initDevices();
                    }
                    else {
                        machine.printf("Error (%d) loading configuration: %s\n", nErrorCode, sURL);
                    }
                }
            });
        }
        
        /*
         * Device initialization is now deferred until after the page is fully loaded, for the benefit
         * of devices (eg, Input) that may be dependent on page resources.
         *
         * Strangely, for these page events, I must use the window object rather than the document object.
         */
        window.addEventListener('load', function onLoadPage(event) {
            machine.fPageLoaded = true;
            machine.initDevices();
        });
        let sEvent = this.isUserAgent("iOS")? 'pagehide' : (this.isUserAgent("Opera")? 'unload' : undefined);
        window.addEventListener(sEvent || 'beforeunload', function onUnloadPage(event) {
            machine.killDevices();
        });
    }

    /**
     * initDevices()
     *
     * Initializes devices in the proper order.  For example, any Time devices should be initialized first,
     * to ensure that their timer services are available to other devices.
     *
     * @this {Machine}
     */
    initDevices()
    {
        if (this.fConfigLoaded && this.fPageLoaded) {
            for (let iClass = 0; iClass < Machine.CLASSORDER.length; iClass++) {
                for (let idDevice in this.config) {
                    let device, sClass;
                    try {
                        let config = this.config[idDevice], sStatus = "";
                        sClass = config['class'];
                        if (sClass != Machine.CLASSORDER[iClass]) continue;
                        switch (sClass) {
                        case Machine.CLASS.CHIP:
                            device = new Chip(this.idMachine, idDevice, config);
                            this.chip = device;
                            break;
                        case Machine.CLASS.INPUT:
                            device = new Input(this.idMachine, idDevice, config);
                            break;
                        case Machine.CLASS.LED:
                            device = new LED(this.idMachine, idDevice, config);
                            break;
                        case Machine.CLASS.ROM:
                            device = new ROM(this.idMachine, idDevice, config);
                            if (device.config['revision']) sStatus = "revision " + device.config['revision'];
                            break;
                        case Machine.CLASS.TIME:
                            device = new Time(this.idMachine, idDevice, config);
                            break;
                        case Machine.CLASS.MACHINE:
                            this.printf("PCjs %s v%3.2f\n", config['name'], Machine.VERSION);
                            this.println(Machine.COPYRIGHT);
                            this.println(Machine.LICENSE);
                            if (this.sConfigFile) this.println("Configuration: " + this.sConfigFile);
                            continue;
                        default:
                            this.println("unrecognized device class: " + sClass);
                            continue;
                        }
                        this.println(sClass + " device initialized" + (sStatus? " (" + sStatus + ")" : ""));
                    }
                    catch (err) {
                        this.println("error initializing " + sClass + " device '" + idDevice + "':\n" + err.message);
                        this.removeDevice(idDevice);
                    }
                }
            }
            let chip = this.chip;
            if (chip) {
                if (chip.onLoad && this.fAutoRestore) chip.onLoad();
                if (chip.onPower && this.fAutoStart) chip.onPower(true);
            }
        }
    }

    /**
     * killDevices()
     * 
     * @this {Machine}
     */
    killDevices()
    {
        let chip;
        if (chip = this.chip) {
            if (chip.onSave) chip.onSave();
            if (chip.onPower) chip.onPower(false);
        }
        
    }

    /**
     * loadConfig(sConfig)
     *
     * @this {Machine}
     * @param {string} sConfig
     */
    loadConfig(sConfig)
    {
        try {
            this.config = JSON.parse(sConfig);
            let config = this.config[this.idMachine];
            this.checkVersion(config);
            this.checkOverrides(config);
            this.addBindings(config['bindings']);
            this.fAutoStart = (config['autoStart'] !== false);
            this.fAutoRestore = (config['autoRestore'] !== false);
            this.fConfigLoaded = true;
        } catch(err) {
            let sError = err.message;
            let match = sError.match(/position ([0-9]+)/);
            if (match) {
                sError += " ('" + sConfig.substr(+match[1], 40).replace(/\s+/g, ' ') + "...')";
            }
            this.println("machine '" + this.idMachine + "' initialization error: " + sError);
        }
    }
}

Machine.CLASS = {
    CHIP:       "Chip",
    INPUT:      "Input",
    LED:        "LED",
    MACHINE:    "Machine",
    ROM:        "ROM",
    TIME:       "Time"
};

Machine.CLASSORDER = [
    Machine.CLASS.MACHINE,
    Machine.CLASS.TIME,
    Machine.CLASS.LED,
    Machine.CLASS.INPUT,
    Machine.CLASS.ROM,
    Machine.CLASS.CHIP
];

Machine.COPYRIGHT = "Copyright © 2012-2018 Jeff Parsons <Jeff@pcjs.org>";
Machine.LICENSE = "License: GPL version 3 or later <http://gnu.org/licenses/gpl.html>";

Machine.VERSION = +VERSION || 1.20;

window[MACHINE] = Machine;
