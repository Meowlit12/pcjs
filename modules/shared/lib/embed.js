/**
 * @fileoverview C1Pjs and PCjs embedding functionality.
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
 * <http://pcjs.org/modules/shared/lib/defines.js>.
 *
 * Some PCjs files also attempt to load external resource files, such as character-image files,
 * ROM files, and disk image files. Those external resource files are not considered part of PCjs
 * for purposes of the GNU General Public License, and the author does not claim any copyright
 * as to their contents.
 */

"use strict";

if (NODE) {
    var Str = require("../../shared/lib/strlib");
    var Web = require("../../shared/lib/weblib");
    var Component = require("../../shared/lib/component");
}

/*
 * We now support asynchronous XML and XSL file loads; simply set fAsync (below) to true.
 *
 * NOTE: For that support to work, we have to keep track of the number of machines on the page
 * (ie, how many embedMachine() calls were issued), reduce the count as each machine XML file
 * is fully transformed into HTML, and when the count finally returns to zero, notify all the
 * machine component init() handlers.
 *
 * Also, to prevent those init() handlers from running prematurely, we must disable all page
 * notification events at the start of the embedding process (Web.enablePageEvents(false)) and
 * re-enable them at the end (Web.enablePageEvents(true)).
 */
var fAsync = true;
var cAsyncMachines = 0;

/**
 * loadXML(sFile, idMachine, sAppName, sAppClass, sParms, fResolve, display, done)
 *
 * This is the preferred way to load all XML and XSL files. It uses getResource()
 * to load them as strings, which parseXML() can massage before parsing/transforming them.
 *
 * For example, since I've been unable to get the XSLT document() function to work inside any
 * XSL document loaded by JavaScript's XSLT processor, that has prevented me from dynamically
 * loading any XML machine file that uses the "ref" attribute to refer to and incorporate
 * another XML document.
 *
 * To solve that, I've added an fResolve parameter that tells parseXML() to fetch any
 * referenced documents ITSELF and insert them into the XML string prior to parsing, instead
 * of relying on the XSLT template to pull them in.  That fetching is handled by resolveXML(),
 * which iterates over the XML until all "refs" have been resolved (including any nested
 * references).
 *
 * Also, XSL files with a <!DOCTYPE [...]> cause MSIE's Microsoft.XMLDOM.loadXML() function
 * to choke, so I strip that out prior to parsing as well.
 *
 * TODO: Figure out why the XSLT document() function works great when the web browser loads an
 * XML file (and the associated XSL file) itself, but does not work when loading documents via
 * JavaScript XSLT support. Is it broken, is it a security issue, or am I just calling it wrong?
 *
 * @param {string} sXMLFile
 * @param {string|null|undefined} idMachine
 * @param {string|null|undefined} sAppName
 * @param {string|null|undefined} sAppClass
 * @param {string|null|undefined} sParms
 * @param {boolean} fResolve is true to resolve any "ref" attributes
 * @param {function(string)} display
 * @param {function(string,Object)} done (string contains the unparsed XML string data, and Object contains a parsed XML object)
 */
function loadXML(sXMLFile, idMachine, sAppName, sAppClass, sParms, fResolve, display, done)
{
    var doneLoadXML = function(sURLName, sXML, nErrorCode) {
        if (nErrorCode) {
            if (!sXML) sXML = "unable to load " + sXMLFile + " (" + nErrorCode + ")";
            done(sXML, null);
            return;
        }
        parseXML(sXML, sXMLFile, idMachine, sAppName, sAppClass, sParms, fResolve, display, done);
    };
    display("Loading " + sXMLFile + "...");
    Web.getResource(sXMLFile, null, fAsync, doneLoadXML);
}

/**
 * parseXML(sXML, sXMLFile, idMachine, sAppName, sAppClass, sParms, fResolve, display, done)
 *
 * Generates an XML document from an XML string. This function also provides a work-around for XSLT's
 * lack of support for the document() function (at least on some browsers), by replacing every reference
 * tag (ie, a tag with a "ref" attribute) with the contents of the referenced file.
 *
 * @param {string} sXML
 * @param {string|null} sXMLFile
 * @param {string|null|undefined} idMachine
 * @param {string|null|undefined} sAppName
 * @param {string|null|undefined} sAppClass
 * @param {string|null|undefined} sParms
 * @param {boolean} fResolve is true to resolve any "ref" attributes; default is false
 * @param {function(string)} display
 * @param {function(string,Object)} done (string contains the unparsed XML string data, and Object contains a parsed XML object)
 */
function parseXML(sXML, sXMLFile, idMachine, sAppName, sAppClass, sParms, fResolve, display, done)
{
    var buildXML = function(sXML, sError) {
        if (sError) {
            done(sError, null);
            return;
        }
        if (idMachine) {

            /*
             * A more sensible place to record the machine XML would be embedMachine(), like we do for the
             * XSL file, but since we're about to modify the original machine XML, it's best to record it now.
             */
            Component.addMachineResource(idMachine, sXMLFile, sXML);

            var sURL = sXMLFile;
            if (sURL && sURL.indexOf('/') < 0 && window.location.pathname.slice(-1) == '/') {
                sURL = window.location.pathname + sURL;
            }
            /*
             * We embed the URL of the XML file both as a separate "xml" attribute for easy access from the
             * XSL file, and as part of the "parms" attribute for easy access from machines (see getMachineParm()).
             */
            if (!sParms) {
                sParms = '{';
            } else if (sParms.slice(-1) == '}') {
                sParms = sParms.slice(0, -1);
                if (sParms.length > 1) sParms += ',';
            } else {            // sParms must just be a "state" file, so encode it as a "state" property
                sParms = '{state:"' + sParms + '",';
            }
            sParms += 'url:"' + sURL + '"}';
            /*
             * Note that while we no longer generate a machine XML file with a "state" attribute (because it's
             * encoded inside the "parms" attribute), the XSL file must still cope with "state" attributes inside
             * other XML files; for example, manifest XML files like /apps/pc/1981/visicalc/manifest.xml contain
             * machine elements with "state" attributes that must still be passed down to the computer element
             * "the old fashioned way".
             *
             * Until/unless that changes, components.xsl cannot be simplified as much as I might have hoped.
             */
            if (typeof resources == 'object') sURL = null;      // turn off URL inclusion if we have embedded resources
            sParms = sParms.replace(/\$/g, "$$$$");
            sXML = sXML.replace(/(<machine[^>]*\sid=)(['"]).*?\2/, "$1$2" + idMachine + "$2" + (sParms? " parms='" + sParms + "'" : "") + (sURL? ' url="' + sURL + '"' : ''));
        }

        if (!fResolve) {
            /*
             * I'm trying to switch to a shared components.xsl (at least for all PC-class machines),
             * but in the interim, that means hacking the XSL file on the fly to reflect the actual class.
             */
            sXML = sXML.replace(/(<xsl:variable name="APPNAME">).*?(<\/xsl:variable>)/, "$1" + sAppName + "$2");
            sXML = sXML.replace(/(<xsl:variable name="APPCLASS">).*?(<\/xsl:variable>)/, "$1" + sAppClass + "$2");

            /*
             * Non-COMPILED kludge to replace the version number template in the XSL file (which we assume we're reading,
             * since fResolve is false) with whatever XMLVERSION we extracted from the XML file (see corresponding kludge below).
             *
             * ES6 ALERT: Template strings.
             */
            if (!COMPILED && XMLVERSION) {
                sXML = sXML.replace(/<xsl:variable name="APPVERSION">1.x.x<\/xsl:variable>/, `<xsl:variable name="APPVERSION">${XMLVERSION}</xsl:variable>`);
            }
        }

        /*
         * If the resource we requested is not really an XML file (or the file didn't exist and the server simply returned
         * a message like "Cannot GET /devices/pc/machine/5150/cga/64kb/donkey/machine.xml"), we'd like to display a more
         * meaningful message, because the XML DOM parsers will blithely return a document that contains nothing useful; eg:
         *
         *      This page contains the following errors:error on line 1 at column 1:
         *      Document is empty Below is a rendering of the page up to the first error.
         *
         * Supposedly, the IE XML DOM parser will throw an exception, but I haven't tested that, and unless all other
         * browsers do that, that's not helpful.
         *
         * The best I can do at this stage (assuming Web.getResource() didn't drop any error information on the floor)
         * is verify that the requested resource "looks like" valid XML (in other words, it begins with a '<').
         */
        var xmlDoc = null;
        if (sXML.charAt(0) == '<') {
            try {
                /*
                 * Another hack for MSIE, which fails to load XSL documents containing a <!DOCTYPE [...]> tag.
                 *
                 * This is also why the XSLTProcessor 'transformToFragment' method in Microsoft Edge silently failed,
                 * so I had pull this hack out of the "ActiveXObject" code.  And rather than add yet-another Microsoft
                 * browser check, I'm going to try doing this across the board, and hope that none of the other XSLT
                 * processors fail *without* the DOCTYPE tag.
                 */
                if (!fResolve) {
                    sXML = sXML.replace(/<!DOCTYPE(.|[\r\n])*]>\s*/g, "");
                }
                /*
                 * Beginning with Microsoft Edge and the corresponding release of Windows 10, all the
                 * 'ActiveXObject' crud has gone away; but of course, this code must remain in place if
                 * we want to continue supporting older Internet Explorer browsers (ie, back to IE9).
                 */
                /** @namespace window.ActiveXObject */
                if (window.ActiveXObject || 'ActiveXObject' in window) {        // second test is required for IE11 on Windows 8.1
                    xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc['loadXML'](sXML);
                } else {
                    /** @namespace window.DOMParser */
                    xmlDoc = (new window.DOMParser()).parseFromString(sXML, "text/xml");
                }
            } catch(e) {
                xmlDoc = null;
                sXML = e.message;
            }
        } else {
            sXML = "unrecognized XML: " + (sXML.length > 255? sXML.substr(0, 255) + "..." : sXML);
        }
        done(sXML, xmlDoc);
    };
    if (sXML) {
        if (PRIVATE) sXML = sXML.replace(/\/library.xml/, "/private/library.xml");
        if (fResolve) {
            resolveXML(sXML, display, buildXML);
            return;
        }
        buildXML(sXML, null);
        return;
    }
    done("no data" + (sXMLFile? " for file: " + sXMLFile : ""), null);
}

/**
 * resolveXML(sXML, display, done)
 *
 * Replaces every tag with a "ref" attribute with the contents of the corresponding file.
 *
 * TODO: Fix some of the limitations of this code, such as: 1) requiring the "ref" attribute
 * to appear as the tag's first attribute, 2) requiring the "ref" attribute to be double-quoted,
 * and 3) requiring the "ref" tag to be self-closing.
 *
 * @param {string} sXML
 * @param {function(string)} display
 * @param {function(string,(string|null))} done (the first string contains the resolved XML data, the second is for any error message)
 */
function resolveXML(sXML, display, done)
{
    var matchRef;
    var reRef = /<([a-z]+)\s+ref="(.*?)"(.*?)\/>/g;

    if ((matchRef = reRef.exec(sXML))) {

        var sRefFile = matchRef[2];

        var doneReadXML = function(sURLName, sXMLRef, nErrorCode) {
            if (nErrorCode || !sXMLRef) {
                done(sXML, "unable to resolve XML reference: " + matchRef[0] + " (" + nErrorCode + ")");
                return;
            }
            /*
             * If there are additional attributes in the "referring" XML tag, we want to insert them
             * into the "referred" XML tag; attributes that don't exist in the referred tag should be
             * appended, and attributes that DO exist should be overwritten.
             */
            var sRefAttrs = matchRef[3];
            if (sRefAttrs) {
                var aXMLRefTag = sXMLRef.match(new RegExp("<" + matchRef[1] + "[^>]*>"));
                if (aXMLRefTag) {
                    var sXMLNewTag = aXMLRefTag[0];
                    /*
                     * Iterate over all the attributes in the "referring" XML tag (sRefAttrs)
                     */
                    var matchAttr;
                    var reAttr = /( [a-z]+=)(['"])(.*?)\2/gi;
                    while ((matchAttr = reAttr.exec(sRefAttrs))) {
                        if (sXMLNewTag.toLowerCase().indexOf(matchAttr[1].toLowerCase()) < 0) {
                            /*
                             * This is the append case....
                             */
                            sXMLNewTag = sXMLNewTag.replace(">", matchAttr[0] + ">");
                        } else {
                            /*
                             * This is the overwrite case....
                             */
                            sXMLNewTag = sXMLNewTag.replace(new RegExp(matchAttr[1] + "(['\"])(.*?)\\1"), matchAttr[0]);
                        }
                    }
                    if (aXMLRefTag[0] != sXMLNewTag) {
                        sXMLRef = sXMLRef.replace(aXMLRefTag[0], sXMLNewTag);
                    }
                } else {
                    done(sXML, "missing <" + matchRef[1] + "> in " + sRefFile);
                    return;
                }
            }

            /*
             * Apparently when a Windows Azure server delivers one of my XML files, it may modify the first line:
             *
             *      <?xml version="1.0" encoding="UTF-8"?>\n
             *
             * I didn't determine exactly what it was doing at this point (probably just changing the \n to \r\n),
             * but in any case, relaxing the following replace() solved it.
             */
            sXMLRef = sXMLRef.replace(/<\?xml[^>]*>[\r\n]*/, "");

            sXML = sXML.replace(matchRef[0], sXMLRef);

            resolveXML(sXML, display, done);
        };

        display("Loading " + sRefFile + "...");
        Web.getResource(sRefFile, null, fAsync, doneReadXML);
        return;
    }
    done(sXML, null);
}

/**
 * embedMachine(sAppName, sAppClass, sVersion, idMachine, sXMLFile, sXSLFile, sParms)
 *
 * This allows to you embed a machine on a web page, by transforming the machine XML into HTML.
 *
 * @param {string} sAppName is the app name (eg, "PCx86")
 * @param {string} sAppClass is the app class (eg, "pcx86"); also known as the machine class
 * @param {string} sVersion is the app version (eg, "1.15.7")
 * @param {string} idMachine
 * @param {string} [sXMLFile]
 * @param {string} [sXSLFile]
 * @param {string} [sParms]
 * @return {boolean} true if successful, false if error
 */
function embedMachine(sAppName, sAppClass, sVersion, idMachine, sXMLFile, sXSLFile, sParms)
{
    var eMachine, eWarning, fSuccess = true;

    if (!sXMLFile) {
        sXMLFile = "machine.xml";
        if (!sXSLFile) sXSLFile = "components.xsl";
    }
    
    cAsyncMachines++;
    Component.addMachine(idMachine);

    var doneMachine = function() {
        Component.assert(cAsyncMachines > 0);
        if (!--cAsyncMachines) {
            if (fAsync) Web.enablePageEvents(true);
        }
    };

    var displayError = function(sError) {
        Component.log(sError);
        displayMessage("Error: " + sError);
        if (fSuccess) doneMachine();
        fSuccess = false;
    };

    var displayMessage = function(sMessage) {
        if (eWarning === undefined) {
            /*
             * Our MarkOut module (in convertMDMachineLinks()) creates machine containers that look like:
             *
             *      <div id="' + sMachineID + '" class="machine-placeholder"><p>Embedded PC</p><p class="machine-warning">...</p></div>
             *
             * with the "machine-warning" paragraph pre-populated with a warning message that the user will
             * see if nothing at all happens.  But hopefully, in the normal case (and especially the error case),
             * *something* will have happened.
             *
             * Note that it is the HTMLOut module (in processMachines()) that ultimately decides which scripts to
             * include and then generates the embedXXX() call.
             */
            var aeWarning = (eMachine && Component.getElementsByClass(eMachine, "machine-warning"));
            eWarning = (aeWarning && aeWarning[0]) || eMachine;
        }
        if (eWarning) eWarning.innerHTML = Str.escapeHTML(sMessage);
    };

    try {
        eMachine = document.getElementById(idMachine);
        if (eMachine) {

            /*
             * If we have a 'css' resource, add it to the page first.
             */
            var css;
            if (typeof resources == "object" && (css = resources['css'])) {
                var head = document.head || document.getElementsByTagName('head')[0];
                var style = document.createElement('style');
                style.type = 'text/css';
                // noinspection JSDeprecatedSymbols
                if (style.styleSheet) {
                    // noinspection JSDeprecatedSymbols
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                head.appendChild(style);
            }

            if (!sXSLFile) {
                /*
                 * Now that PCjs is an open-source project, we can make the following test more flexible,
                 * and revert to the internal template if DEBUG *or* internal version (instead of *and*).
                 *
                 * Third-party sites that don't use the PCjs server will ALWAYS want to specify a fully-qualified
                 * path to the XSL file, unless they choose to mirror our folder structure.
                 */
                var sAppFolder = sAppClass;
                if (DEBUG || sVersion == "1.x.x") {
                    if (sAppClass != "c1pjs") sAppFolder = "shared";
                    sXSLFile = "/modules/" + sAppFolder + "/templates/components.xsl";
                } else {
                    if (sAppClass.substr(0, 3) == "pdp") sAppFolder = "pdpjs";
                    sXSLFile = "/versions/" + sAppFolder + "/" + sVersion + "/components.xsl";
                }
            }

            var processXML = function(sXML, xml) {
                if (!xml) {
                    displayError(sXML);
                    return;
                }

                /*
                 * Non-COMPILED kludge to extract the version number from the stylesheet path in the machine XML file;
                 * we don't need this code in COMPILED (non-DEBUG) releases, because APPVERSION is hard-coded into them.
                 */
                if (!COMPILED) {
                    var aMatch = sXML.match(/<\?xml-stylesheet[^>]* href=(['"])[^'"]*?\/([0-9.]*)\/([^'"]*)\1/);
                    if (aMatch) XMLVERSION = aMatch[2];
                }

                var transformXML = function(sXSL, xsl) {
                    if (!xsl) {
                        displayError(sXSL);
                        return;
                    }

                    /*
                     * Record the XSL file, in case someone wants to save the entire machine later.
                     * 
                     * NOTE: sXSLFile will never be undefined by this point, but apparently the Closure Compiler doesn't realize that.  
                     */
                    Component.addMachineResource(idMachine, sXSLFile || "", sXSL);

                    /*
                     * The <machine> template in components.xsl now generates a "machine div" that makes
                     * the div we required the caller of embedMachine() to provide redundant, so instead
                     * of appending this fragment to the caller's node, we REPLACE the caller's node.
                     * This works only because because we ALSO inject the caller's "machine div" ID into
                     * the fragment's ID during parseXML().
                     *
                     *      eMachine.innerHTML = sFragment;
                     *
                     * Also, if the transform function fails, make sure you're using the appropriate
                     * "components.xsl" and not a "machine.xsl", because the latter will not produce valid
                     * embeddable HTML (and is the most common cause of failure at this final stage).
                     */
                    displayMessage("Processing " + sXMLFile + "...");

                    /*
                     * Beginning with Microsoft Edge and the corresponding release of Windows 10, all the
                     * 'ActiveXObject' crud has gone away; but of course, this code must remain in place if
                     * we want to continue supporting older Internet Explorer browsers (ie, back to IE9).
                     */
                    if (window.ActiveXObject || 'ActiveXObject' in window) {        // second test is required for IE11 on Windows 8.1
                        var sFragment = xml['transformNode'](xsl);
                        if (sFragment) {
                            eMachine.outerHTML = sFragment;
                            doneMachine();
                        } else {
                            displayError("transformNodeToObject failed");
                        }
                    }
                    else if (document.implementation && document.implementation.createDocument) {
                        var xsltProcessor = new XSLTProcessor();
                        xsltProcessor['importStylesheet'](xsl);
                        var eFragment = xsltProcessor['transformToFragment'](xml, document);
                        if (eFragment) {
                            /*
                             * This fails in Microsoft Edge...
                             *
                            var machine = eFragment.getElementById(idMachine);
                            if (!machine) {
                                displayError("machine generation failed: " + idMachine);
                            } else
                            */
                            if (eMachine.parentNode) {
                                eMachine.parentNode.replaceChild(eFragment, eMachine);
                                doneMachine();
                            } else {
                                /*
                                 * NOTE: This error can occur if our Node web server, when processing a folder with
                                 * both a manifest.xml with a machine.xml reference AND a README.md containing a
                                 * machine link, generates duplicate embedXXX() calls for the same machine; if the
                                 * first embedXXX() call finds its target, subsequent calls for the same target will
                                 * fail.
                                 *
                                 * Technically, such a folder is in a misconfigured state, but it happens, in part
                                 * because when we switched to the Jekyll web server, we had to add machine links to
                                 * all README.md files where we had previously relied on manifest.xml or machine.xml
                                 * processing.  This is because the Jekyll web server currently doesn't process XML
                                 * files, nor is support for that likely to be added any time soon; it was a nice
                                 * feature of the Node web server, but it's not clear that it's worth doing for Jekyll.
                                 */
                                displayError("invalid machine element: " + idMachine);
                            }
                        } else {
                            displayError("transformToFragment failed");
                        }
                    } else {
                        /*
                         * Perhaps I should have performed this test at the outset; on the other hand, I'm
                         * not aware of any browsers don't support one or both of the above XSLT transformation
                         * methods, so treat this as a bug.
                         */
                        displayError("unable to transform XML: unsupported browser");
                    }
                };
                /*
                 * NOTE: sXSLFile will never be undefined by this point, but apparently the Closure Compiler doesn't realize that.  
                 */
                loadXML(sXSLFile || "", null, sAppName, sAppClass, null, false, displayMessage, transformXML);
            };

            if (sXMLFile.charAt(0) != '<') {
                loadXML(sXMLFile, idMachine, sAppName, sAppClass, sParms, true, displayMessage, processXML);
            } else {
                parseXML(sXMLFile, null, idMachine, sAppName, sAppClass, sParms, false, displayMessage, processXML);
            }
        } else {
            displayError("missing machine element: " + idMachine);
        }
    } catch(e) {
        displayError(e.message);
    }
    return fSuccess;
}

/**
 * embedC1P(idMachine, sXMLFile, sXSLFile)
 *
 * @param {string} idMachine
 * @param {string} [sXMLFile]
 * @param {string} [sXSLFile]
 * @return {boolean} true if successful, false if error
 */
function embedC1P(idMachine, sXMLFile, sXSLFile)
{
    if (fAsync) Web.enablePageEvents(false);
    return embedMachine("C1Pjs", "c1pjs", APPVERSION, idMachine, sXMLFile, sXSLFile);
}

/**
 * embedPCx86(idMachine, sXMLFile, sXSLFile, sParms)
 *
 * @param {string} idMachine
 * @param {string} [sXMLFile]
 * @param {string} [sXSLFile]
 * @param {string} [sParms]
 * @return {boolean} true if successful, false if error
 */
function embedPCx86(idMachine, sXMLFile, sXSLFile, sParms)
{
    if (fAsync) Web.enablePageEvents(false);
    return embedMachine("PCx86", "pcx86", APPVERSION, idMachine, sXMLFile, sXSLFile, sParms);
}

/**
 * embedPC8080(idMachine, sXMLFile, sXSLFile, sParms)
 *
 * @param {string} idMachine
 * @param {string} [sXMLFile]
 * @param {string} [sXSLFile]
 * @param {string} [sParms]
 * @return {boolean} true if successful, false if error
 */
function embedPC8080(idMachine, sXMLFile, sXSLFile, sParms)
{
    if (fAsync) Web.enablePageEvents(false);
    return embedMachine("PC8080", "pc8080", APPVERSION, idMachine, sXMLFile, sXSLFile, sParms);
}

/**
 * embedPDP10(idMachine, sXMLFile, sXSLFile, sParms)
 *
 * @param {string} idMachine
 * @param {string} [sXMLFile]
 * @param {string} [sXSLFile]
 * @param {string} [sParms]
 * @return {boolean} true if successful, false if error
 */
function embedPDP10(idMachine, sXMLFile, sXSLFile, sParms)
{
    if (fAsync) Web.enablePageEvents(false);
    return embedMachine("PDPjs", "pdp10", APPVERSION, idMachine, sXMLFile, sXSLFile, sParms);
}

/**
 * embedPDP11(idMachine, sXMLFile, sXSLFile, sParms)
 *
 * @param {string} idMachine
 * @param {string} [sXMLFile]
 * @param {string} [sXSLFile]
 * @param {string} [sParms]
 * @return {boolean} true if successful, false if error
 */
function embedPDP11(idMachine, sXMLFile, sXSLFile, sParms)
{
    if (fAsync) Web.enablePageEvents(false);
    return embedMachine("PDPjs", "pdp11", APPVERSION, idMachine, sXMLFile, sXSLFile, sParms);
}

/**
 * findMachineComponent(idMachine, sType)
 *
 * @param {string} idMachine
 * @param {string} sType
 * @return {Component|null}
 */
function findMachineComponent(idMachine, sType)
{
    return Component.getComponentByType(sType, idMachine + ".machine");
}

/**
 * commandMachine(control, fSingle, idMachine, sComponent, sCommand, sValue)
 *
 * Use Component methods to find the requested component for a specific machine, and if the component is found,
 * then check its 'exports' table for an entry matching the specified command string, and if an entry is found, then
 * the corresponding function is called with the specified data.
 *
 * @param {Object} control
 * @param {boolean} fSingle
 * @param {string} idMachine
 * @param {string} sComponent
 * @param {string} sCommand
 * @param {string} [sValue]
 * @return {boolean}
 */
function commandMachine(control, fSingle, idMachine, sComponent, sCommand, sValue)
{
    if (sCommand == "script") {
        if (Component.processScript(idMachine, sValue)) {
            if (fSingle) control.disabled = true;
            return true;
        }
        return false;
    }
    if (sComponent) {
        var component = Component.getComponentByType(sComponent, idMachine + ".machine");
        if (component) {
            var exports = component['exports'];
            if (exports) {
                var fnCommand = exports[sCommand];
                if (fnCommand) {
                    if (fnCommand.call(component, sValue)) {
                        if (fSingle) control.disabled = true;
                        return true;
                    }
                    return false;
                }
            }
        }
    }
    console.log("unimplemented: commandMachine('" + idMachine + "','" + sComponent + "','" + sCommand + "','" + sValue + "')");
    return false;
}

/**
 * Prevent the Closure Compiler from renaming functions we want to export, by adding them as global properties.
 *
 * TODO: Consider making all these functions properties on a single global object (eg, 'PCjs'), to minimize global
 * pollution and risk of name collision.
 */
if (APPNAME == "C1Pjs") {
    window['embedC1P']    = embedC1P;
}
if (APPNAME == "PCx86") {
    window['embedPC']     = embedPCx86;         // WARNING: embedPC() deprecated as of v1.23.0
    window['embedPCx86']  = embedPCx86;
}
if (APPNAME == "PC8080") {
    window['embedPC8080'] = embedPC8080;
}
if (APPNAME == "PDPjs") {
    window['embedPDP10']  = embedPDP10;
    window['embedPDP11']  = embedPDP11;
}

window['commandMachine'] = commandMachine;

window['enableEvents'] = Web.enablePageEvents;
window['sendEvent']    = Web.sendPageEvent;
