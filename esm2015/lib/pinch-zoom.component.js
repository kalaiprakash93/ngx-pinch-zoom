/**
 * @fileoverview added by tsickle
 * Generated from: lib/pinch-zoom.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { defaultProperties, backwardCompatibilityProperties } from './properties';
import { IvyPinch } from './ivypinch';
export class PinchZoomComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set properties(value) {
        if (value) {
            this._properties = value;
        }
    }
    /**
     * @return {?}
     */
    get properties() {
        return this._properties;
    }
    /**
     * @return {?}
     */
    get hostOverflow() {
        return this.properties['overflow'];
    }
    /**
     * @return {?}
     */
    get hostBackgroundColor() {
        return this.properties['backgroundColor'];
    }
    /**
     * @return {?}
     */
    get isTouchScreen() {
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
    }
    /**
     * @return {?}
     */
    get isDragging() {
        return this.pinchZoom.isDragging();
    }
    /**
     * @return {?}
     */
    get isDisabled() {
        return this.properties['disabled'];
    }
    /**
     * @return {?}
     */
    get scale() {
        return this.pinchZoom.scale;
    }
    /**
     * @return {?}
     */
    get isZoomedIn() {
        return this.scale > 1;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initPinchZoom();
        /* Calls the method until the image size is available */
        this.pollLimitZoom();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let changedOptions = this.getProperties(changes);
        changedOptions = this.renameProperties(changedOptions);
        this.applyOptionsDefault(defaultProperties, changedOptions);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
    /**
     * @return {?}
     */
    initPinchZoom() {
        if (this.properties['disabled']) {
            return;
        }
        this.properties['element'] = this.elementRef.nativeElement.querySelector('.pinch-zoom-content');
        this.pinchZoom = new IvyPinch(this.properties);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    getProperties(changes) {
        /** @type {?} */
        let properties = {};
        for (var prop in changes) {
            if (prop !== 'properties') {
                properties[prop] = changes[prop].currentValue;
            }
            if (prop === 'properties') {
                properties = changes[prop].currentValue;
            }
        }
        return properties;
    }
    /**
     * @param {?} options
     * @return {?}
     */
    renameProperties(options) {
        for (var prop in options) {
            if (backwardCompatibilityProperties[prop]) {
                options[backwardCompatibilityProperties[prop]] = options[prop];
                delete options[prop];
            }
        }
        return options;
    }
    /**
     * @param {?} defaultOptions
     * @param {?} options
     * @return {?}
     */
    applyOptionsDefault(defaultOptions, options) {
        this.properties = Object.assign({}, defaultOptions, options);
    }
    /**
     * @return {?}
     */
    toggleZoom() {
        this.pinchZoom.toggleZoom();
    }
    /**
     * @return {?}
     */
    isControl() {
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
    }
    /**
     * @return {?}
     */
    pollLimitZoom() {
        this.pinchZoom.pollLimitZoom();
    }
    /**
     * @return {?}
     */
    destroy() {
        this.pinchZoom.destroy();
    }
}
PinchZoomComponent.decorators = [
    { type: Component, args: [{
                selector: 'pinch-zoom, [pinch-zoom]',
                exportAs: 'pinchZoom',
                template: "<div class=\"pinch-zoom-content\" [class.pz-dragging]=\"isDragging\">\n\t<ng-content></ng-content>\n</div>\n\n<!-- Control: one button -->\n<div class=\"pz-zoom-button pz-zoom-control-position-bottom\" \n\t[class.pz-zoom-button-out]=\"isZoomedIn\" \n\t*ngIf=\"isControl()\" \n\t(click)=\"toggleZoom()\"></div>",
                styles: [":host{position:relative;overflow:hidden;display:block}.pinch-zoom-content{height:inherit}.pz-dragging{cursor:all-scroll}.pz-zoom-button{position:absolute;z-index:1000;color:#fff;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6IiBpZD0ic3ZnXzEiIGNsYXNzPSIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIGQ9Ik0xMiAxMGgtMnYySDl2LTJIN1Y5aDJWN2gxdjJoMnYxeiIgaWQ9InN2Z18zIiBjbGFzcz0iIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9zdmc+),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6TTcgOWg1djFIN3oiIGlkPSJzdmdfMiIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==);background-color:rgba(0,0,0,.8);background-position:center,-1000px;background-repeat:no-repeat,no-repeat;background-size:40px;width:56px;height:56px;border-radius:4px;opacity:.5;cursor:pointer;transition:opacity .1s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pz-zoom-button-out{background-position:-1000px,center}.pz-zoom-button:hover{opacity:.7}.pz-zoom-button.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-28px}.pz-zoom-button.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-button.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-28px}.pz-zoom-control{position:absolute;background-color:rgba(0,0,0,.8);border-radius:4px;overflow:hidden}.pz-zoom-control.pz-zoom-control-position-right{right:16px;top:50%;margin-top:-48px}.pz-zoom-control.pz-zoom-control-position-right-bottom{right:16px;bottom:32px}.pz-zoom-control.pz-zoom-control-position-bottom{bottom:16px;left:50%;margin-left:-48px}.pz-zoom-in,.pz-zoom-out{width:48px;height:48px;background-position:center;background-repeat:no-repeat;opacity:1;cursor:pointer}.pz-zoom-in:hover,.pz-zoom-out:hover{background-color:rgba(255,255,255,.2)}.pz-zoom-control-position-bottom .pz-zoom-in,.pz-zoom-control-position-bottom .pz-zoom-out{float:right}.pz-disabled{opacity:.5;cursor:default}.pz-disabled:hover{background-color:rgba(255,255,255,0)}.pz-zoom-in{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48cGF0aCBkPSJNLTE1LjgzNjczNDQyMDQ2MTY1Myw0NC41MzU0MDkzMDY3MTAxOCBoNTguMjA0MDgwODI3NTkzMDkgdi02LjU3NjIyNjcyMzM2OTIyMTUgSC0xNS44MzY3MzQ0MjA0NjE2NTMgeiIgZmlsbD0ibm9uZSIgaWQ9InN2Z18yIiBjbGFzcz0iIiBzdHJva2U9Im5vbmUiLz48L2c+PC9zdmc+)}.pz-zoom-out{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzSDV2LTJoMTR2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==)}"]
            }] }
];
/** @nocollapse */
PinchZoomComponent.ctorParameters = () => [
    { type: ElementRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGluY2gtem9vbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGluY2gtem9vbS8iLCJzb3VyY2VzIjpbImxpYi9waW5jaC16b29tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQWdCLEtBQUssRUFBMkIsTUFBTSxlQUFlLENBQUM7QUFHbkksT0FBTyxFQUFDLGlCQUFpQixFQUFFLCtCQUErQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRWhGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFTcEMsTUFBTSxPQUFPLGtCQUFrQjs7OztJQTBFM0IsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTVEWix1QkFBa0IsR0FBRyxHQUFHLENBQUM7UUFDbEMsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNYLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXpCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHcEMscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBRTdCLG9CQUFlLEdBQVcsa0JBQWtCLENBQUM7UUFFN0MsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixjQUFTLEdBQStCLGlCQUFpQixDQUFDO1FBQzFELFVBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixvQkFBZSxHQUFXLEdBQUcsQ0FBQztRQUM5QixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQTRDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Ozs7O0lBdkVELElBQXlCLFVBQVUsQ0FBQyxLQUFpQjtRQUNqRCxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0wsQ0FBQzs7OztJQUNELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUM1QixDQUFDOzs7O0lBcUJELElBQ0ksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN2QyxDQUFDOzs7O0lBQ0QsSUFDSSxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUMsQ0FBQzs7OztJQUVELElBQUksYUFBYTs7WUFDVCxRQUFRLEdBQUcsMkJBQTJCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7WUFDakQsRUFBRTs7OztRQUFHLFVBQVMsS0FBSztZQUNuQixPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzVDLENBQUMsQ0FBQTtRQUVELElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUM7U0FDZjs7OztZQUlHLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDNUUsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7OztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDTCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxJQUFJLFVBQVU7UUFDVixPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFNRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBTzs7WUFDWCxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDaEQsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDaEUsQ0FBQzs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7OztJQUVELGFBQWE7UUFDVCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDN0IsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRCxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxPQUFPOztZQUNiLFVBQVUsR0FBRyxFQUFFO1FBRW5CLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1lBQ3RCLElBQUksSUFBSSxLQUFLLFlBQVksRUFBQztnQkFDdEIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUM7YUFDakQ7WUFDRCxJQUFJLElBQUksS0FBSyxZQUFZLEVBQUM7Z0JBQ3RCLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDO2FBQzNDO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELGdCQUFnQixDQUFDLE9BQW1CO1FBQ2hDLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxFQUFFO1lBQ3RCLElBQUksK0JBQStCLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7U0FDSjtRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Ozs7OztJQUVELG1CQUFtQixDQUFDLGNBQWMsRUFBRSxPQUFPO1FBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFFRCxVQUFVO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoQyxDQUFDOzs7O0lBRUQsU0FBUztRQUNMLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLFNBQVMsRUFBRTtZQUNyRCxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEtBQUssTUFBTSxFQUFFO1lBQ3hFLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7OztJQUVELGFBQWE7UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7WUF2S0osU0FBUyxTQUFDO2dCQUNWLFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ2pDLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixpVUFBMEM7O2FBRTdDOzs7O1lBWnFDLFVBQVU7Ozt5QkFtQjNDLEtBQUssU0FBQyxZQUFZO2lDQVNsQixLQUFLLFNBQUMscUJBQXFCO3dCQUMzQixLQUFLLFNBQUMsWUFBWTs2QkFDbEIsS0FBSyxTQUFDLGtCQUFrQjswQkFDeEIsS0FBSyxTQUFDLGVBQWU7d0JBQ3JCLEtBQUssU0FBQyxZQUFZO3VCQUNsQixLQUFLLFNBQUMsVUFBVTt5QkFDaEIsS0FBSzt1QkFDTCxLQUFLOytCQUNMLEtBQUs7aUNBQ0wsS0FBSzs4QkFDTCxLQUFLO3VCQUNMLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLO29CQUNMLEtBQUs7eUJBQ0wsS0FBSzs4QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBRUwsV0FBVyxTQUFDLGdCQUFnQjtrQ0FJNUIsV0FBVyxTQUFDLHdCQUF3Qjs7OztJQW5DckMsdUNBQWU7O0lBQ2YseUNBQXdCOztJQVd4QixnREFBdUQ7O0lBQ3ZELHVDQUFzQzs7SUFDdEMsNENBQThDOztJQUM5Qyx5Q0FBNEM7O0lBQzVDLHVDQUErRDs7SUFDL0Qsc0NBQTZDOztJQUM3Qyx3Q0FBNkI7O0lBQzdCLHNDQUF3Qzs7SUFDeEMsOENBQXNDOztJQUN0QyxnREFBMEQ7O0lBQzFELDZDQUFzRDs7SUFDdEQsc0NBQTJCOztJQUMzQixzQ0FBOEI7O0lBQzlCLHVDQUFtRTs7SUFDbkUsbUNBQStCOztJQUMvQix3Q0FBcUM7O0lBQ3JDLDZDQUF1Qzs7SUFDdkMsNENBQXlDOzs7OztJQTJDN0Isd0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7UHJvcGVydGllc30gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHtkZWZhdWx0UHJvcGVydGllcywgYmFja3dhcmRDb21wYXRpYmlsaXR5UHJvcGVydGllc30gZnJvbSAnLi9wcm9wZXJ0aWVzJztcclxuaW1wb3J0IHtUb3VjaGVzfSBmcm9tICcuL3RvdWNoZXMnO1xyXG5pbXBvcnQge0l2eVBpbmNofSBmcm9tICcuL2l2eXBpbmNoJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAncGluY2gtem9vbSwgW3BpbmNoLXpvb21dJyxcclxuICAgIGV4cG9ydEFzOiAncGluY2hab29tJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9waW5jaC16b29tLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL3BpbmNoLXpvb20uY29tcG9uZW50LnNhc3MnXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBpbmNoWm9vbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gICAgcGluY2hab29tOiBhbnk7XHJcbiAgICBfcHJvcGVydGllczogUHJvcGVydGllcztcclxuXHJcbiAgICBASW5wdXQoJ3Byb3BlcnRpZXMnKSBzZXQgcHJvcGVydGllcyh2YWx1ZTogUHJvcGVydGllcykge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm9wZXJ0aWVzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IHByb3BlcnRpZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KCd0cmFuc2l0aW9uLWR1cmF0aW9uJykgdHJhbnNpdGlvbkR1cmF0aW9uID0gMjAwO1xyXG4gICAgQElucHV0KCdkb3VibGUtdGFwJykgZG91YmxlVGFwID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgnZG91YmxlLXRhcC1zY2FsZScpIGRvdWJsZVRhcFNjYWxlID0gMjtcclxuICAgIEBJbnB1dCgnYXV0by16b29tLW91dCcpIGF1dG9ab29tT3V0ID0gZmFsc2U7XHJcbiAgICBASW5wdXQoJ2xpbWl0LXpvb20nKSBsaW1pdFpvb206IG51bWJlciB8IFwib3JpZ2luYWwgaW1hZ2Ugc2l6ZVwiO1xyXG4gICAgQElucHV0KCdkaXNhYmxlZCcpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlUGFuOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgb3ZlcmZsb3c6IFwiaGlkZGVuXCIgfCBcInZpc2libGVcIjtcclxuICAgIEBJbnB1dCgpIHpvb21Db250cm9sU2NhbGU6IG51bWJlciA9IDE7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlWm9vbUNvbnRyb2w6IFwiZGlzYWJsZVwiIHwgXCJuZXZlclwiIHwgXCJhdXRvXCI7XHJcbiAgICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZyA9IFwicmdiYSgwLDAsMCwwLjg1KVwiO1xyXG4gICAgQElucHV0KCkgbGltaXRQYW46IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBtaW5TY2FsZTogbnVtYmVyID0gMDtcclxuICAgIEBJbnB1dCgpIGxpc3RlbmVyczogJ2F1dG8nIHwgJ21vdXNlIGFuZCB0b3VjaCcgPSAnbW91c2UgYW5kIHRvdWNoJztcclxuICAgIEBJbnB1dCgpIHdoZWVsOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGF1dG9IZWlnaHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHdoZWVsWm9vbUZhY3RvcjogbnVtYmVyID0gMC4yO1xyXG4gICAgQElucHV0KCkgZHJhZ2dhYmxlSW1hZ2U6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLm92ZXJmbG93JylcclxuICAgIGdldCBob3N0T3ZlcmZsb3coKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllc1snb3ZlcmZsb3cnXTtcclxuICAgIH1cclxuICAgIEBIb3N0QmluZGluZygnc3R5bGUuYmFja2dyb3VuZC1jb2xvcicpXHJcbiAgICBnZXQgaG9zdEJhY2tncm91bmRDb2xvcigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzWydiYWNrZ3JvdW5kQ29sb3InXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNUb3VjaFNjcmVlbigpIHtcclxuICAgICAgICB2YXIgcHJlZml4ZXMgPSAnIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtICcuc3BsaXQoJyAnKTtcclxuICAgICAgICB2YXIgbXEgPSBmdW5jdGlvbihxdWVyeSkge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEocXVlcnkpLm1hdGNoZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpbmNsdWRlIHRoZSAnaGVhcnR6JyBhcyBhIHdheSB0byBoYXZlIGEgbm9uIG1hdGNoaW5nIE1RIHRvIGhlbHAgdGVybWluYXRlIHRoZSBqb2luXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXQuaW8vdnpuRkhcclxuICAgICAgICB2YXIgcXVlcnkgPSBbJygnLCBwcmVmaXhlcy5qb2luKCd0b3VjaC1lbmFibGVkKSwoJyksICdoZWFydHonLCAnKSddLmpvaW4oJycpO1xyXG4gICAgICAgIHJldHVybiBtcShxdWVyeSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzRHJhZ2dpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGluY2hab29tLmlzRHJhZ2dpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaXNEaXNhYmxlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzWydkaXNhYmxlZCddO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzY2FsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5waW5jaFpvb20uc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzWm9vbWVkSW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2NhbGUgPiAxO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHRoaXMuYXBwbHlPcHRpb25zRGVmYXVsdChkZWZhdWx0UHJvcGVydGllcywge30pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgdGhpcy5pbml0UGluY2hab29tKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyogQ2FsbHMgdGhlIG1ldGhvZCB1bnRpbCB0aGUgaW1hZ2Ugc2l6ZSBpcyBhdmFpbGFibGUgKi9cclxuICAgICAgICB0aGlzLnBvbGxMaW1pdFpvb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzKSB7XHJcbiAgICAgICAgbGV0IGNoYW5nZWRPcHRpb25zID0gdGhpcy5nZXRQcm9wZXJ0aWVzKGNoYW5nZXMpO1xyXG4gICAgICAgIGNoYW5nZWRPcHRpb25zID0gdGhpcy5yZW5hbWVQcm9wZXJ0aWVzKGNoYW5nZWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgdGhpcy5hcHBseU9wdGlvbnNEZWZhdWx0KGRlZmF1bHRQcm9wZXJ0aWVzLCBjaGFuZ2VkT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFBpbmNoWm9vbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzWydkaXNhYmxlZCddKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvcGVydGllc1snZWxlbWVudCddID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnBpbmNoLXpvb20tY29udGVudCcpO1xyXG4gICAgICAgIHRoaXMucGluY2hab29tID0gbmV3IEl2eVBpbmNoKHRoaXMucHJvcGVydGllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UHJvcGVydGllcyhjaGFuZ2VzKXtcclxuICAgICAgICBsZXQgcHJvcGVydGllcyA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGNoYW5nZXMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3AgIT09ICdwcm9wZXJ0aWVzJyl7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzW3Byb3BdID0gY2hhbmdlc1twcm9wXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdwcm9wZXJ0aWVzJyl7XHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0gY2hhbmdlc1twcm9wXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuYW1lUHJvcGVydGllcyhvcHRpb25zOiBQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGlmIChiYWNrd2FyZENvbXBhdGliaWxpdHlQcm9wZXJ0aWVzW3Byb3BdKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2JhY2t3YXJkQ29tcGF0aWJpbGl0eVByb3BlcnRpZXNbcHJvcF1dID0gb3B0aW9uc1twcm9wXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBvcHRpb25zW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBhcHBseU9wdGlvbnNEZWZhdWx0KGRlZmF1bHRPcHRpb25zLCBvcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVpvb20oKSB7XHJcbiAgICAgICAgdGhpcy5waW5jaFpvb20udG9nZ2xlWm9vbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQ29udHJvbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXNbJ2Rpc2FibGVab29tQ29udHJvbCddID09PSBcImRpc2FibGVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1RvdWNoU2NyZWVuICYmIHRoaXMucHJvcGVydGllc1snZGlzYWJsZVpvb21Db250cm9sJ10gPT09IFwiYXV0b1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHBvbGxMaW1pdFpvb20oKSB7XHJcbiAgICAgICAgdGhpcy5waW5jaFpvb20ucG9sbExpbWl0Wm9vbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5waW5jaFpvb20uZGVzdHJveSgpO1xyXG4gICAgfVxyXG59Il19