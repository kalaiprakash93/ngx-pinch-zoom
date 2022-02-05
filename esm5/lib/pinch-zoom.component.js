/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-zoom.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { defaultProperties, backwardCompatibilityProperties } from './properties';
import { IvyPinch } from './ivypinch';
var PinchZoomComponent = /** @class */ (function () {
    function PinchZoomComponent(elementRef) {
        this.elementRef = elementRef;
        this.transitionDuration = 200;
        this.doubleTap = true;
        this.doubleTapScale = 2;
        this.autoZoomOut = false;
        this.disabled = false;
        this.zoomControlScale = 1;
        this.backgroundColor = "rgba(0,0,0,0.85)";
        this.minScale = 0;
        this.listeners = 'mouse and touch';
        this.wheel = true;
        this.autoHeight = false;
        this.wheelZoomFactor = 0.2;
        this.draggableImage = false;
        this.applyOptionsDefault(defaultProperties, {});
    }
    Object.defineProperty(PinchZoomComponent.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
            return this._properties;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._properties = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "hostOverflow", {
        get: /**
         * @return {?}
         */
        function () {
            return this.properties['overflow'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "hostBackgroundColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this.properties['backgroundColor'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isTouchScreen", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
            /** @type {?} */
            var mq = (/**
             * @param {?} query
             * @return {?}
             */
            function (query) {
                return window.matchMedia(query).matches;
            });
            if (('ontouchstart' in window)) {
                return true;
            }
            // include the 'heartz' as a way to have a non matching MQ to help terminate the join
            // https://git.io/vznFH
            /** @type {?} */
            var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
            return mq(query);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isDragging", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pinchZoom.isDragging();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isDisabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.properties['disabled'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "scale", {
        get: /**
         * @return {?}
         */
        function () {
            return this.pinchZoom.scale;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PinchZoomComponent.prototype, "isZoomedIn", {
        get: /**
         * @return {?}
         */
        function () {
            return this.scale > 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initPinchZoom();
        /* Calls the method until the image size is available */
        this.pollLimitZoom();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PinchZoomComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var changedOptions = this.getProperties(changes);
        changedOptions = this.renameProperties(changedOptions);
        this.applyOptionsDefault(defaultProperties, changedOptions);
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy();
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.initPinchZoom = /**
     * @return {?}
     */
    function () {
        if (this.properties['disabled']) {
            return;
        }
        this.properties['element'] = this.elementRef.nativeElement.querySelector('.pinch-zoom-content');
        this.pinchZoom = new IvyPinch(this.properties);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PinchZoomComponent.prototype.getProperties = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var properties = {};
        for (var prop in changes) {
            if (prop !== 'properties') {
                properties[prop] = changes[prop].currentValue;
            }
            if (prop === 'properties') {
                properties = changes[prop].currentValue;
            }
        }
        return properties;
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PinchZoomComponent.prototype.renameProperties = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        for (var prop in options) {
            if (backwardCompatibilityProperties[prop]) {
                options[backwardCompatibilityProperties[prop]] = options[prop];
                delete options[prop];
            }
        }
        return options;
    };
    /**
     * @param {?} defaultOptions
     * @param {?} options
     * @return {?}
     */
    PinchZoomComponent.prototype.applyOptionsDefault = /**
     * @param {?} defaultOptions
     * @param {?} options
     * @return {?}
     */
    function (defaultOptions, options) {
        this.properties = Object.assign({}, defaultOptions, options);
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.toggleZoom = /**
     * @return {?}
     */
    function () {
        this.pinchZoom.toggleZoom();
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.isControl = /**
     * @return {?}
     */
    function () {
        if (this.isDisabled) {
            return false;
        }
        if (this.properties['disableZoomControl'] === "disable") {
            return false;
        }
        if (this.isTouchScreen && this.properties['disableZoomControl'] === "auto") {
            return false;
        }
        return true;
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.pollLimitZoom = /**
     * @return {?}
     */
    function () {
        this.pinchZoom.pollLimitZoom();
    };
    /**
     * @return {?}
     */
    PinchZoomComponent.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.pinchZoom.destroy();
    };
    PinchZoomComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pinch-zoom, [pinch-zoom]',
                    exportAs: 'pinchZoom',
                    template: "<div class=\"pinch-zoom-content\" [class.pz-dragging]=\"isDragging\">\n\t<ng-content></ng-content>\n</div>\n\n<!-- Control: one button -->\n<div class=\"pz-zoom-button pz-zoom-control-position-bottom\" \n\t[class.pz-zoom-button-out]=\"isZoomedIn\" \n\t*ngIf=\"isControl()\" \n\t(click)=\"toggleZoom()\"></div>",
                    styles: [":host{position:relative;overflow:hidden;display:block}.pinch-zoom-content{height:inherit}.pz-dragging{cursor:all-scroll}.pz-zoom-button{position:absolute;z-index:1000;color:#fff;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6IiBpZD0ic3ZnXzEiIGNsYXNzPSIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIGQ9Ik0xMiAxMGgtMnYySDl2LTJIN1Y5aDJWN2gxdjJoMnYxeiIgaWQ9InN2Z18zIiBjbGFzcz0iIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9zdmc+),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6TTcgOWg1djFIN3oiIGlkPSJzdmdfMiIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==);background-color:rgba(0,0,0,.8);background-position:center,-1000px;background-repeat:no-repeat,no-repeat;background-size:40px;width:56px;height:56px;border-radius:4px;opacity:.5;cursor:pointer;transition:opacity .1s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pz-zoom-button-out{background-position:-1000px,center}.pz-zoom-button:hover{opacity:.7}.pz-zoom-button.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-28px}.pz-zoom-button.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-button.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-28px}.pz-zoom-control{position:absolute;background-color:rgba(0,0,0,.8);border-radius:4px;overflow:hidden}.pz-zoom-control.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-48px}.pz-zoom-control.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-control.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-48px}.pz-zoom-in,.pz-zoom-out{width:48px;height:48px;background-position:center;background-repeat:no-repeat;opacity:1;cursor:pointer}.pz-zoom-in:hover,.pz-zoom-out:hover{background-color:rgba(255,255,255,.2)}.pz-zoom-control-position-bottom .pz-zoom-in,.pz-zoom-control-position-bottom .pz-zoom-out{float:right}.pz-disabled{opacity:.5;cursor:default}.pz-disabled:hover{background-color:rgba(255,255,255,0)}.pz-zoom-in{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48cGF0aCBkPSJNLTE1LjgzNjczNDQyMDQ2MTY1Myw0NC41MzU0MDkzMDY3MTAxOCBoNTguMjA0MDgwODI3NTkzMDkgdi02LjU3NjIyNjcyMzM2OTIyMTUgSC0xNS44MzY3MzQ0MjA0NjE2NTMgeiIgZmlsbD0ibm9uZSIgaWQ9InN2Z18yIiBjbGFzcz0iIiBzdHJva2U9Im5vbmUiLz48L2c+PC9zdmc+)}.pz-zoom-out{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzSDV2LTJoMTR2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==)}"]
                }] }
    ];
    /** @nocollapse */
    PinchZoomComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PinchZoomComponent.propDecorators = {
        properties: [{ type: Input, args: ['properties',] }],
        transitionDuration: [{ type: Input, args: ['transition-duration',] }],
        doubleTap: [{ type: Input, args: ['double-tap',] }],
        doubleTapScale: [{ type: Input, args: ['double-tap-scale',] }],
        autoZoomOut: [{ type: Input, args: ['auto-zoom-out',] }],
        limitZoom: [{ type: Input, args: ['limit-zoom',] }],
        disabled: [{ type: Input, args: ['disabled',] }],
        disablePan: [{ type: Input }],
        overflow: [{ type: Input }],
        zoomControlScale: [{ type: Input }],
        disableZoomControl: [{ type: Input }],
        backgroundColor: [{ type: Input }],
        limitPan: [{ type: Input }],
        minScale: [{ type: Input }],
        listeners: [{ type: Input }],
        wheel: [{ type: Input }],
        autoHeight: [{ type: Input }],
        wheelZoomFactor: [{ type: Input }],
        draggableImage: [{ type: Input }],
        hostOverflow: [{ type: HostBinding, args: ['style.overflow',] }],
        hostBackgroundColor: [{ type: HostBinding, args: ['style.background-color',] }]
    };
    return PinchZoomComponent;
}());
export { PinchZoomComponent };
if (false) {
    /** @type {?} */
    PinchZoomComponent.prototype.pinchZoom;
    /** @type {?} */
    PinchZoomComponent.prototype._properties;
    /** @type {?} */
    PinchZoomComponent.prototype.transitionDuration;
    /** @type {?} */
    PinchZoomComponent.prototype.doubleTap;
    /** @type {?} */
    PinchZoomComponent.prototype.doubleTapScale;
    /** @type {?} */
    PinchZoomComponent.prototype.autoZoomOut;
    /** @type {?} */
    PinchZoomComponent.prototype.limitZoom;
    /** @type {?} */
    PinchZoomComponent.prototype.disabled;
    /** @type {?} */
    PinchZoomComponent.prototype.disablePan;
    /** @type {?} */
    PinchZoomComponent.prototype.overflow;
    /** @type {?} */
    PinchZoomComponent.prototype.zoomControlScale;
    /** @type {?} */
    PinchZoomComponent.prototype.disableZoomControl;
    /** @type {?} */
    PinchZoomComponent.prototype.backgroundColor;
    /** @type {?} */
    PinchZoomComponent.prototype.limitPan;
    /** @type {?} */
    PinchZoomComponent.prototype.minScale;
    /** @type {?} */
    PinchZoomComponent.prototype.listeners;
    /** @type {?} */
    PinchZoomComponent.prototype.wheel;
    /** @type {?} */
    PinchZoomComponent.prototype.autoHeight;
    /** @type {?} */
    PinchZoomComponent.prototype.wheelZoomFactor;
    /** @type {?} */
    PinchZoomComponent.prototype.draggableImage;
    /**
     * @type {?}
     * @private
     */
    PinchZoomComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluY2gtem9vbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGluY2gtem9vbS8iLCJzb3VyY2VzIjpbImxpYi9waW5jaC16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWdCLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFHbkksT0FBTyxFQUFDLGlCQUFpQixFQUFFLCtCQUErQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFcEM7SUFpRkksNEJBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUE1RFosdUJBQWtCLEdBQUcsR0FBRyxDQUFDO1FBQ2xDLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDWCxtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUN0QixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUV6QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBR3BDLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUU3QixvQkFBZSxHQUFXLGtCQUFrQixDQUFDO1FBRTdDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsY0FBUyxHQUErQixpQkFBaUIsQ0FBQztRQUMxRCxVQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFDNUIsb0JBQWUsR0FBVyxHQUFHLENBQUM7UUFDOUIsbUJBQWMsR0FBWSxLQUFLLENBQUM7UUE0Q3JDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBdkVELHNCQUF5QiwwQ0FBVTs7OztRQUtuQztZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7OztRQVBELFVBQW9DLEtBQWlCO1lBQ2pELElBQUksS0FBSyxFQUFF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NkNBQXVDOztJQUN2Qyw0Q0FBeUM7Ozs7O0lBMkM3Qix3Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHtQcm9wZXJ0aWVzfSBmcm9tICcuL2ludGVyZmFjZXMnO1xyXG5pbXBvcnQge2RlZmF1bHRQcm9wZXJ0aWVzLCBiYWNrd2FyZENvbXBhdGliaWxpdHlQcm9wZXJ0aWVzfSBmcm9tICcuL3Byb3BlcnRpZXMnO1xyXG5pbXBvcnQge1RvdWNoZXN9IGZyb20gJy4vdG91Y2hlcyc7XHJcbmltcG9ydCB7SXZ5UGluY2h9IGZyb20gJy4vaXZ5cGluY2gnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdwaW5jaC16b29tLCBbcGluY2gtem9vbV0nLFxyXG4gICAgZXhwb3J0QXM6ICdwaW5jaFpvb20nLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BpbmNoLXpvb20uY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vcGluY2gtem9vbS5jb21wb25lbnQuc2FzcyddXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUGluY2hab29tQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBwaW5jaFpvb206IGFueTtcclxuICAgIF9wcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xyXG5cclxuICAgIEBJbnB1dCgncHJvcGVydGllcycpIHNldCBwcm9wZXJ0aWVzKHZhbHVlOiBQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgcHJvcGVydGllcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoJ3RyYW5zaXRpb24tZHVyYXRpb24nKSB0cmFuc2l0aW9uRHVyYXRpb24gPSAyMDA7XHJcbiAgICBASW5wdXQoJ2RvdWJsZS10YXAnKSBkb3VibGVUYXAgPSB0cnVlO1xyXG4gICAgQElucHV0KCdkb3VibGUtdGFwLXNjYWxlJykgZG91YmxlVGFwU2NhbGUgPSAyO1xyXG4gICAgQElucHV0KCdhdXRvLXpvb20tb3V0JykgYXV0b1pvb21PdXQgPSBmYWxzZTtcclxuICAgIEBJbnB1dCgnbGltaXQtem9vbScpIGxpbWl0Wm9vbTogbnVtYmVyIHwgXCJvcmlnaW5hbCBpbWFnZSBzaXplXCI7XHJcbiAgICBASW5wdXQoJ2Rpc2FibGVkJykgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVQYW46IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBvdmVyZmxvdzogXCJoaWRkZW5cIiB8IFwidmlzaWJsZVwiO1xyXG4gICAgQElucHV0KCkgem9vbUNvbnRyb2xTY2FsZTogbnVtYmVyID0gMTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVab29tQ29udHJvbDogXCJkaXNhYmxlXCIgfCBcIm5ldmVyXCIgfCBcImF1dG9cIjtcclxuICAgIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcjogc3RyaW5nID0gXCJyZ2JhKDAsMCwwLDAuODUpXCI7XHJcbiAgICBASW5wdXQoKSBsaW1pdFBhbjogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIG1pblNjYWxlOiBudW1iZXIgPSAwO1xyXG4gICAgQElucHV0KCkgbGlzdGVuZXJzOiAnYXV0bycgfCAnbW91c2UgYW5kIHRvdWNoJyA9ICdtb3VzZSBhbmQgdG91Y2gnO1xyXG4gICAgQElucHV0KCkgd2hlZWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgYXV0b0hlaWdodDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgd2hlZWxab29tRmFjdG9yOiBudW1iZXIgPSAwLjI7XHJcbiAgICBASW5wdXQoKSBkcmFnZ2FibGVJbWFnZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBIb3N0QmluZGluZygnc3R5bGUub3ZlcmZsb3cnKVxyXG4gICAgZ2V0IGhvc3RPdmVyZmxvdygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzWydvdmVyZmxvdyddO1xyXG4gICAgfVxyXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yJylcclxuICAgIGdldCBob3N0QmFja2dyb3VuZENvbG9yKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNbJ2JhY2tncm91bmRDb2xvciddO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1RvdWNoU2NyZWVuKCkge1xyXG4gICAgICAgIHZhciBwcmVmaXhlcyA9ICcgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gJy5zcGxpdCgnICcpO1xyXG4gICAgICAgIHZhciBtcSA9IGZ1bmN0aW9uKHF1ZXJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYShxdWVyeSkubWF0Y2hlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGluY2x1ZGUgdGhlICdoZWFydHonIGFzIGEgd2F5IHRvIGhhdmUgYSBub24gbWF0Y2hpbmcgTVEgdG8gaGVscCB0ZXJtaW5hdGUgdGhlIGpvaW5cclxuICAgICAgICAvLyBodHRwczovL2dpdC5pby92em5GSFxyXG4gICAgICAgIHZhciBxdWVyeSA9IFsnKCcsIHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSwgJ2hlYXJ0eicsICcpJ10uam9pbignJyk7XHJcbiAgICAgICAgcmV0dXJuIG1xKHF1ZXJ5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNEcmFnZ2luZygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waW5jaFpvb20uaXNEcmFnZ2luZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0Rpc2FibGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNbJ2Rpc2FibGVkJ107XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNjYWxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBpbmNoWm9vbS5zY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNab29tZWRJbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zY2FsZSA+IDE7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseU9wdGlvbnNEZWZhdWx0KGRlZmF1bHRQcm9wZXJ0aWVzLCB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKXtcclxuICAgICAgICB0aGlzLmluaXRQaW5jaFpvb20oKTtcclxuICAgICAgICBcclxuICAgICAgICAvKiBDYWxscyB0aGUgbWV0aG9kIHVudGlsIHRoZSBpbWFnZSBzaXplIGlzIGF2YWlsYWJsZSAqL1xyXG4gICAgICAgIHRoaXMucG9sbExpbWl0Wm9vbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcclxuICAgICAgICBsZXQgY2hhbmdlZE9wdGlvbnMgPSB0aGlzLmdldFByb3BlcnRpZXMoY2hhbmdlcyk7XHJcbiAgICAgICAgY2hhbmdlZE9wdGlvbnMgPSB0aGlzLnJlbmFtZVByb3BlcnRpZXMoY2hhbmdlZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICB0aGlzLmFwcGx5T3B0aW9uc0RlZmF1bHQoZGVmYXVsdFByb3BlcnRpZXMsIGNoYW5nZWRPcHRpb25zKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0UGluY2hab29tKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXNbJ2Rpc2FibGVkJ10pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzWydlbGVtZW50J10gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcucGluY2gtem9vbS1jb250ZW50Jyk7XHJcbiAgICAgICAgdGhpcy5waW5jaFpvb20gPSBuZXcgSXZ5UGluY2godGhpcy5wcm9wZXJ0aWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRQcm9wZXJ0aWVzKGNoYW5nZXMpe1xyXG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0ge307XHJcblxyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gY2hhbmdlcykge1xyXG4gICAgICAgICAgICBpZiAocHJvcCAhPT0gJ3Byb3BlcnRpZXMnKXtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXNbcHJvcF0gPSBjaGFuZ2VzW3Byb3BdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ3Byb3BlcnRpZXMnKXtcclxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgPSBjaGFuZ2VzW3Byb3BdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH1cclxuXHJcbiAgICByZW5hbWVQcm9wZXJ0aWVzKG9wdGlvbnM6IFByb3BlcnRpZXMpIHtcclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgaWYgKGJhY2t3YXJkQ29tcGF0aWJpbGl0eVByb3BlcnRpZXNbcHJvcF0pIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNbYmFja3dhcmRDb21wYXRpYmlsaXR5UHJvcGVydGllc1twcm9wXV0gPSBvcHRpb25zW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIG9wdGlvbnNbcHJvcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5T3B0aW9uc0RlZmF1bHQoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlWm9vbSgpIHtcclxuICAgICAgICB0aGlzLnBpbmNoWm9vbS50b2dnbGVab29tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaXNDb250cm9sKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllc1snZGlzYWJsZVpvb21Db250cm9sJ10gPT09IFwiZGlzYWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hTY3JlZW4gJiYgdGhpcy5wcm9wZXJ0aWVzWydkaXNhYmxlWm9vbUNvbnRyb2wnXSA9PT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcG9sbExpbWl0Wm9vbSgpIHtcclxuICAgICAgICB0aGlzLnBpbmNoWm9vbS5wb2xsTGltaXRab29tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnBpbmNoWm9vbS5kZXN0cm95KCk7XHJcbiAgICB9XHJcbn0iXX0=