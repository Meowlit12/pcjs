---
layout: post
title: WordStar On The PC
date: 2017-12-20 10:00:00
permalink: /blog/2017/12/20/
machines:
  - id: ibm5150
    type: pcx86
    config: /devices/pcx86/machine/5150/mda/256kb/machine.xml
    autoMount:
      A:
        path: /disks/pcx86/dos/ibm/2.00/PCDOS200-DISK1.json
      B:
        path: /disks/pcx86/apps/other/wordstar/3.24/WS324-MOUNTABLE.json
    autoType: $date\r$time\rB:\rWS\r
  - id: scrollLEDs
    type: leds
    name: LED Scroller
    config: /devices/leds/scroller/ATT4425.json
styles:
  _scrollLEDs:
    position: relative;
    display: inline-block;
    float: left;
    margin-right: 32px;
    margin-bottom: 16px;
  _displayScroll:
    position: relative;
---

I recently added another disk to the PCjs Archives, [WordStar 3.24](/disks/pcx86/apps/other/wordstar/3.24/), along with a copy
of the article "[WordStar 3.24 and 3.3: MicroPro Does It Again... And Again](/disks/pcx86/apps/other/wordstar/#pc-magazine-review)",
an interesting review/rant from 1983 on this and other versions of WordStar for the IBM PC.

This is the earliest PC version of WordStar I've been able to locate so far.  Until now, the earliest version online was
[WordStar 3.30](/disks/pcx86/apps/other/wordstar/3.30/).  Sadly, the legendary *first* PC version, WordStar 3.02M, remains
elusive.

And, since this may be my last blog post of the year, here's a little scrolling LED display to wish everyone a happy new year.

{% include machine.html id="scrollLEDs" config="json" %}

<div id="scrollLEDs"><div id="displayScroll"></div></div>

The [LED Scroller](/devices/leds/scroller/) is built with a new set of [PCjs Devices](/modules/devices/) used in PCjs machines
such as:

* Texas Instruments [TI-42](/devices/ti42/machine/), [TI-55](/devices/ti55/machine/), and [TI-57](/devices/ti57/machine/rev0/) Programmable Calculators
* [John Conway's](http://www.conwaylife.com/wiki/John_Horton_Conway) "[Game of Life](http://www.conwaylife.com/wiki/Conway%27s_Game_of_Life)" Cellular Automaton built as an [LED Simulation](/devices/leds/life/)
* [Hasbro's](https://en.wikipedia.org/wiki/Hasbro) "[Lite-Brite](https://en.wikipedia.org/wiki/Lite-Brite)" reimagined as an animated [LED Simulation](/devices/leds/litebrite/) (eg, [Animated Christmas Tree](/devices/leds/litebrite?autoStart=true&pattern=0/0/45/39/A45o$45o$21b47R154G39B1A256CoRGBACo$21o47R154G39B1A256C2oRGBACo$20o47R154G39B1A256CoRGBACb47R154G39B1A256CoRGBACo$20o47R154G39B1A256CoRGBAC2b47R154G39B1A256CoRGBACo$19o47R154G39B1A256CoRGBAC3b47R154G39B1A256CoRGBACo$19o47R154G39B1A256CoRGBAC4b47R154G39B1A256CoRGBACo$18o47R154G39B1A256CoRGBAC4b255R255G249B1A8976Co47R154G39B256CoRGBACo$18o47R154G39B1A256CoRGBAC3b255R255G249B1A784CobRGBACb47R154G39B1A256CoRGBACo$17o47R154G39B1A256CoRGBAC2b255R255G249B1A8976Co4880CoRGBAC3b47R154G39B1A256CoRGBACo$17o47R154G39B1A256CoRGBACb255R255G249B1A784CobRGBACo4b47R154G39B1A256CoRGBACo$16o47R154G39B1A256Co255R255G249B8976Co4880CoRGBACo6b47R154G39B1A256CoRGBACo$16o47R154G39B1A256CoRGBACo8b255R255G249B1A8976Co47R154G39B256CoRGBACo$15o47R154G39B1A256CoRGBACo7b255R255G249B1A784CobRGBACo47R154G39B1A256CoRGBACo$15o47R154G39B1A256CoRGBACo6b255R255G249B1A8976Co4880CoRGBAC3b47R154G39B1A256CoRGBACo$14o47R154G39B1A256CoRGBACo5b255R255G249B1A784CobRGBAC5b47R154G39B1A256CoRGBACo$14o47R154G39B1A256CoRGBAC5b255R255G249B1A8976Co4880CoRGBAC7b47R154G39B1A256CoRGBACo$13o47R154G39B1A256CoRGBAC4b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co47R154G39B256CoRGBACo$13o47R154G39B1A256CoRGBAC3b255R255G249B1A8976Co4880CoRGBAC8b255R255G249B1A784CobRGBACo47R154G39B1A256CoRGBACo$12o47R154G39B1A256CoRGBAC2b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co4880CoRGBAC3b47R154G39B1A256CoRGBACo$12o47R154G39B1A256CoRGBACb255R255G249B1A8976Co4880CoRGBACo7b255R255G249B1A784CobRGBAC5b47R154G39B1A256CoRGBACo$11o47R154G39B1A256Co255R255G249B784CobRGBAC8b255R255G249B1A8976Co4880CoRGBAC7b47R154G39B1A256CoRGBACo$11o47R154G39B1A256CoRGBAC9b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co47R154G39B256CoRGBACo$10o47R154G39B1A256CoRGBAC8b255R255G249B1A8976Co4880CoRGBAC8b255R255G249B1A784CobRGBACb47R154G39B1A256CoRGBACo$10o47R154G39B1A256CoRGBAC7b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co4880CoRGBAC3b47R154G39B1A256CoRGBACo$9o47R154G39B1A256CoRGBAC6b255R255G249B1A8976Co4880CoRGBAC8b255R255G249B1A784CobRGBAC5b47R154G39B1A256CoRGBACo$9o47R154G39B1A256CoRGBAC5b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co4880CoRGBAC7b47R154G39B1A256CoRGBACo$8o47R154G39B1A256CoRGBAC4b255R255G249B1A8976Co4880CoRGBAC8b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co47R154G39B256CoRGBACo$8o47R154G39B1A256CoRGBAC3b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co4880CoRGBAC8b255R255G249B1A784CobRGBACb47R154G39B1A256CoRGBACo$7o47R154G39B1A256CoRGBAC2b255R255G249B1A8976Co4880CoRGBAC8b255R255G249B1A784CobRGBAC8b255R255G249B1A8976Co4880CoRGBAC3b47R154G39B1A256CoRGBACo$7o47R154G39B1A256C30oRGBACo$21o250R125G20B1A256CoRGBACo$21o250R125G20B1A256C2oRGBACo$21o250R125G20B1A256CoRGBACo$21o250R125G20B1A256C2oRGBACo$21o250R125G20B1A256CoRGBACo$21o250R125G20B1A256C2oRGBACo$45o))

The [LED Device](/modules/devices/led.js), in conjunction with the [LED Controller](/modules/devices/ledctrl.js), provides
a variety of LED types, layouts, and features, including built-in support for the 7-segment LED digits used in all the
TI Programmable Calculator displays.

{% include machine.html id="ibm5150" %}

*[@jeffpar](http://twitter.com/jeffpar)*  
*Dec 20, 2017*
