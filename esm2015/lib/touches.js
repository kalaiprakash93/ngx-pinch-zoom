/**
 * @fileoverview added by tsickle
 * Generated from: lib/touches.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Properties() { }
if (false) {
    /** @type {?} */
    Properties.prototype.element;
    /** @type {?|undefined} */
    Properties.prototype.listeners;
    /** @type {?|undefined} */
    Properties.prototype.resize;
}
export class Touches {
    /**
     * @param {?} properties
     */
    constructor(properties) {
        this.eventType = undefined;
        this.handlers = {};
        this.startX = 0;
        this.startY = 0;
        this.lastTap = 0;
        this.doubleTapMinTimeout = 300;
        this.tapMinTimeout = 200;
        this.touchstartTime = 0;
        this.i = 0;
        this.isMousedown = false;
        this.touchListeners = {
            "touchstart": "handleTouchstart",
            "touchmove": "handleTouchmove",
            "touchend": "handleTouchend"
        };
        this.mouseListeners = {
            "mousedown": "handleMousedown",
            "mousemove": "handleMousemove",
            "mouseup": "handleMouseup",
            "wheel": "handleWheel"
        };
        this.otherListeners = {
            "resize": "handleResize"
        };
        /*
             * Listeners
             */
        /* Touchstart */
        this.handleTouchstart = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.elementPosition = this.getElementPosition();
            this.touchstartTime = new Date().getTime();
            if (this.eventType === undefined) {
                this.getTouchstartPosition(event);
            }
            this.runHandler("touchstart", event);
        });
        /* Touchmove */
        this.handleTouchmove = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const touches = event.touches;
            // Pan
            if (this.detectPan(touches)) {
                this.runHandler("pan", event);
            }
            // Pinch
            if (this.detectPinch(event)) {
                this.runHandler("pinch", event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const touches = event.touches;
            // Double Tap
            if (this.detectDoubleTap()) {
                this.runHandler("double-tap", event);
            }
            // Tap
            this.detectTap();
            this.runHandler("touchend", event);
            this.eventType = 'touchend';
            if (touches && touches.length === 0) {
                this.eventType = undefined;
                this.i = 0;
            }
        });
        /* Mousedown */
        this.handleMousedown = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.isMousedown = true;
            this.elementPosition = this.getElementPosition();
            this.touchstartTime = new Date().getTime();
            if (this.eventType === undefined) {
                this.getMousedownPosition(event);
            }
            this.runHandler("mousedown", event);
        });
        /* Mousemove */
        this.handleMousemove = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            //event.preventDefault();
            if (!this.isMousedown) {
                return;
            }
            // Pan
            this.runHandler("pan", event);
            // Linear swipe
            switch (this.detectLinearSwipe(event)) {
                case "horizontal-swipe":
                    event.swipeType = "horizontal-swipe";
                    this.runHandler("horizontal-swipe", event);
                    break;
                case "vertical-swipe":
                    event.swipeType = "vertical-swipe";
                    this.runHandler("vertical-swipe", event);
                    break;
            }
            // Linear swipe
            if (this.detectLinearSwipe(event) ||
                this.eventType === 'horizontal-swipe' ||
                this.eventType === 'vertical-swipe') {
                this.handleLinearSwipe(event);
            }
        });
        /* Mouseup */
        this.handleMouseup = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            // Tap
            this.detectTap();
            this.isMousedown = false;
            this.runHandler("mouseup", event);
            this.eventType = undefined;
            this.i = 0;
        });
        /* Wheel */
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.runHandler("wheel", event);
        });
        /* Resize */
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.runHandler("resize", event);
        });
        this.properties = properties;
        this.element = this.properties.element;
        this.elementPosition = this.getElementPosition();
        this.toggleEventListeners('addEventListener');
    }
    /**
     * @return {?}
     */
    destroy() {
        this.toggleEventListeners('removeEventListener');
    }
    /**
     * @param {?} action
     * @return {?}
     */
    toggleEventListeners(action) {
        /** @type {?} */
        let listeners;
        if (this.properties.listeners === 'mouse and touch') {
            listeners = Object.assign(this.touchListeners, this.mouseListeners);
        }
        else {
            listeners = this.detectTouchScreen() ? this.touchListeners : this.mouseListeners;
        }
        if (this.properties.resize) {
            listeners = Object.assign(listeners, this.otherListeners);
        }
        for (var listener in listeners) {
            /** @type {?} */
            const handler = listeners[listener];
            // Window
            if (listener === "resize") {
                if (action === 'addEventListener') {
                    window.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    window.removeEventListener(listener, this[handler], false);
                }
                // Document
            }
            else if (listener === 'mouseup' || listener === "mousemove") {
                if (action === 'addEventListener') {
                    document.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    document.removeEventListener(listener, this[handler], false);
                }
                // Element
            }
            else {
                if (action === 'addEventListener') {
                    this.element.addEventListener(listener, this[handler], false);
                }
                if (action === 'removeEventListener') {
                    this.element.removeEventListener(listener, this[handler], false);
                }
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleLinearSwipe(event) {
        //event.preventDefault();
        this.i++;
        if (this.i > 3) {
            this.eventType = this.getLinearSwipeType(event);
        }
        if (this.eventType === 'horizontal-swipe') {
            this.runHandler('horizontal-swipe', event);
        }
        if (this.eventType === 'vertical-swipe') {
            this.runHandler('vertical-swipe', event);
        }
    }
    /**
     * @param {?} eventName
     * @param {?} response
     * @return {?}
     */
    runHandler(eventName, response) {
        if (this.handlers[eventName]) {
            this.handlers[eventName](response);
        }
    }
    /*
         * Detection
         */
    /**
     * @param {?} touches
     * @return {?}
     */
    detectPan(touches) {
        return touches.length === 1 && !this.eventType || this.eventType === 'pan';
    }
    /**
     * @return {?}
     */
    detectDoubleTap() {
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        const currentTime = new Date().getTime();
        /** @type {?} */
        const tapLength = currentTime - this.lastTap;
        clearTimeout(this.doubleTapTimeout);
        if (tapLength < this.doubleTapMinTimeout && tapLength > 0) {
            return true;
        }
        else {
            this.doubleTapTimeout = setTimeout((/**
             * @return {?}
             */
            () => {
                clearTimeout(this.doubleTapTimeout);
            }), this.doubleTapMinTimeout);
        }
        this.lastTap = currentTime;
    }
    /**
     * @return {?}
     */
    detectTap() {
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        const currentTime = new Date().getTime();
        /** @type {?} */
        const tapLength = currentTime - this.touchstartTime;
        if (tapLength > 0) {
            if (tapLength < this.tapMinTimeout) {
                this.runHandler("tap", event);
            }
            else {
                this.runHandler("longtap", event);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    detectPinch(event) {
        /** @type {?} */
        const touches = event.touches;
        return (touches.length === 2 && this.eventType === undefined) || this.eventType === 'pinch';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    detectLinearSwipe(event) {
        /** @type {?} */
        const touches = event.touches;
        if (touches) {
            if (touches.length === 1 && !this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
                return this.getLinearSwipeType(event);
            }
        }
        else {
            if (!this.eventType || this.eventType === 'horizontal-swipe' || this.eventType === 'vertical-swipe') {
                return this.getLinearSwipeType(event);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getLinearSwipeType(event) {
        if (this.eventType !== 'horizontal-swipe' && this.eventType !== 'vertical-swipe') {
            /** @type {?} */
            const movementX = Math.abs(this.moveLeft(0, event) - this.startX);
            /** @type {?} */
            const movementY = Math.abs(this.moveTop(0, event) - this.startY);
            if ((movementY * 3) > movementX) {
                return 'vertical-swipe';
            }
            else {
                return 'horizontal-swipe';
            }
        }
        else {
            return this.eventType;
        }
    }
    /**
     * @return {?}
     */
    getElementPosition() {
        return this.element.getBoundingClientRect();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getTouchstartPosition(event) {
        this.startX = event.touches[0].clientX - this.elementPosition.left;
        this.startY = event.touches[0].clientY - this.elementPosition.top;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getMousedownPosition(event) {
        this.startX = event.clientX - this.elementPosition.left;
        this.startY = event.clientY - this.elementPosition.top;
    }
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    moveLeft(index, event) {
        /** @type {?} */
        const touches = event.touches;
        if (touches) {
            return touches[index].clientX - this.elementPosition.left;
        }
        else {
            return event.clientX - this.elementPosition.left;
        }
    }
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    moveTop(index, event) {
        /** @type {?} */
        const touches = event.touches;
        if (touches) {
            return touches[index].clientY - this.elementPosition.top;
        }
        else {
            return event.clientY - this.elementPosition.top;
        }
    }
    /**
     * @return {?}
     */
    detectTouchScreen() {
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
    /* Public properties and methods */
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    on(event, handler) {
        if (event) {
            this.handlers[event] = handler;
        }
    }
}
if (false) {
    /** @type {?} */
    Touches.prototype.properties;
    /** @type {?} */
    Touches.prototype.element;
    /** @type {?} */
    Touches.prototype.elementPosition;
    /** @type {?} */
    Touches.prototype.eventType;
    /** @type {?} */
    Touches.prototype.handlers;
    /** @type {?} */
    Touches.prototype.startX;
    /** @type {?} */
    Touches.prototype.startY;
    /** @type {?} */
    Touches.prototype.lastTap;
    /** @type {?} */
    Touches.prototype.doubleTapTimeout;
    /** @type {?} */
    Touches.prototype.doubleTapMinTimeout;
    /** @type {?} */
    Touches.prototype.tapMinTimeout;
    /** @type {?} */
    Touches.prototype.touchstartTime;
    /** @type {?} */
    Touches.prototype.i;
    /** @type {?} */
    Touches.prototype.isMousedown;
    /** @type {?} */
    Touches.prototype.touchListeners;
    /** @type {?} */
    Touches.prototype.mouseListeners;
    /** @type {?} */
    Touches.prototype.otherListeners;
    /** @type {?} */
    Touches.prototype.handleTouchstart;
    /** @type {?} */
    Touches.prototype.handleTouchmove;
    /** @type {?} */
    Touches.prototype.handleTouchend;
    /** @type {?} */
    Touches.prototype.handleMousedown;
    /** @type {?} */
    Touches.prototype.handleMousemove;
    /** @type {?} */
    Touches.prototype.handleMouseup;
    /** @type {?} */
    Touches.prototype.handleWheel;
    /** @type {?} */
    Touches.prototype.handleResize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91Y2hlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1waW5jaC16b29tLyIsInNvdXJjZXMiOlsibGliL3RvdWNoZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxnQ0FJQzs7O0lBSEcsNkJBQXFCOztJQUNyQiwrQkFBdUM7O0lBQ3ZDLDRCQUFpQjs7QUFPckIsTUFBTSxPQUFPLE9BQU87Ozs7SUErQmhCLFlBQVksVUFBc0I7UUEzQmxDLGNBQVMsR0FBYyxTQUFTLENBQUM7UUFDakMsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQUNuQixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFFWix3QkFBbUIsR0FBRyxHQUFHLENBQUM7UUFDMUIsa0JBQWEsR0FBRyxHQUFHLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsTUFBQyxHQUFXLENBQUMsQ0FBQztRQUNkLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXBCLG1CQUFjLEdBQVE7WUFDbEIsWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLFVBQVUsRUFBRSxnQkFBZ0I7U0FDL0IsQ0FBQTtRQUNELG1CQUFjLEdBQVE7WUFDbEIsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLFNBQVMsRUFBRSxlQUFlO1lBQzFCLE9BQU8sRUFBRSxhQUFhO1NBQ3pCLENBQUE7UUFDRCxtQkFBYyxHQUFRO1lBQ2xCLFFBQVEsRUFBRSxjQUFjO1NBQzNCLENBQUE7Ozs7O1FBZ0VELHFCQUFnQjs7OztRQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFF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QjtRQUNsQyxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztDQUNKOzs7SUE1WEcsNkJBQXVCOztJQUN2QiwwQkFBcUI7O0lBQ3JCLGtDQUE0Qjs7SUFDNUIsNEJBQWlDOztJQUNqQywyQkFBbUI7O0lBQ25CLHlCQUFXOztJQUNYLHlCQUFXOztJQUNYLDBCQUFZOztJQUNaLG1DQUFzQjs7SUFDdEIsc0NBQTBCOztJQUMxQixnQ0FBb0I7O0lBQ3BCLGlDQUFtQjs7SUFDbkIsb0JBQWM7O0lBQ2QsOEJBQW9COztJQUVwQixpQ0FJQzs7SUFDRCxpQ0FLQzs7SUFDRCxpQ0FFQzs7SUFnRUQsbUNBU0M7O0lBS0Qsa0NBWUM7O0lBdUJELGlDQWtCQzs7SUFLRCxrQ0FVQzs7SUFLRCxrQ0E2QkM7O0lBS0QsZ0NBU0M7O0lBS0QsOEJBRUM7O0lBSUQsK0JBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFByb3BlcnRpZXMge1xyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBsaXN0ZW5lcnM/OiAnYXV0bycgfCAnbW91c2UgYW5kIHRvdWNoJztcclxuICAgIHJlc2l6ZT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEV2ZW50VHlwZSA9IHVuZGVmaW5lZCB8ICd0b3VjaGVuZCcgfCAncGFuJyB8ICdwaW5jaCcgfCAnaG9yaXpvbnRhbC1zd2lwZScgfCAndmVydGljYWwtc3dpcGUnIHwgJ3RhcCcgfCAnbG9uZ3RhcCc7XHJcbmV4cG9ydCB0eXBlIFRvdWNoSGFuZGxlciA9ICdoYW5kbGVUb3VjaHN0YXJ0JyB8ICdoYW5kbGVUb3VjaG1vdmUnIHwgJ2hhbmRsZVRvdWNoZW5kJztcclxuZXhwb3J0IHR5cGUgTW91c2VIYW5kbGVyID0gJ2hhbmRsZU1vdXNlZG93bicgfCAnaGFuZGxlTW91c2Vtb3ZlJyB8ICdoYW5kbGVNb3VzZXVwJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUb3VjaGVzIHtcclxuICAgIHByb3BlcnRpZXM6IFByb3BlcnRpZXM7XHJcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIGVsZW1lbnRQb3NpdGlvbjogQ2xpZW50UmVjdDtcclxuICAgIGV2ZW50VHlwZTogRXZlbnRUeXBlID0gdW5kZWZpbmVkO1xyXG4gICAgaGFuZGxlcnM6IGFueSA9IHt9O1xyXG4gICAgc3RhcnRYID0gMDtcclxuICAgIHN0YXJ0WSA9IDA7XHJcbiAgICBsYXN0VGFwID0gMDtcclxuICAgIGRvdWJsZVRhcFRpbWVvdXQ6IGFueTtcclxuICAgIGRvdWJsZVRhcE1pblRpbWVvdXQgPSAzMDA7XHJcbiAgICB0YXBNaW5UaW1lb3V0ID0gMjAwO1xyXG4gICAgdG91Y2hzdGFydFRpbWUgPSAwO1xyXG4gICAgaTogbnVtYmVyID0gMDtcclxuICAgIGlzTW91c2Vkb3duID0gZmFsc2U7XHJcblxyXG4gICAgdG91Y2hMaXN0ZW5lcnM6IGFueSA9IHtcclxuICAgICAgICBcInRvdWNoc3RhcnRcIjogXCJoYW5kbGVUb3VjaHN0YXJ0XCIsXHJcbiAgICAgICAgXCJ0b3VjaG1vdmVcIjogXCJoYW5kbGVUb3VjaG1vdmVcIixcclxuICAgICAgICBcInRvdWNoZW5kXCI6IFwiaGFuZGxlVG91Y2hlbmRcIlxyXG4gICAgfVxyXG4gICAgbW91c2VMaXN0ZW5lcnM6IGFueSA9IHtcclxuICAgICAgICBcIm1vdXNlZG93blwiOiBcImhhbmRsZU1vdXNlZG93blwiLFxyXG4gICAgICAgIFwibW91c2Vtb3ZlXCI6IFwiaGFuZGxlTW91c2Vtb3ZlXCIsXHJcbiAgICAgICAgXCJtb3VzZXVwXCI6IFwiaGFuZGxlTW91c2V1cFwiLFxyXG4gICAgICAgIFwid2hlZWxcIjogXCJoYW5kbGVXaGVlbFwiXHJcbiAgICB9XHJcbiAgICBvdGhlckxpc3RlbmVyczogYW55ID0ge1xyXG4gICAgICAgIFwicmVzaXplXCI6IFwiaGFuZGxlUmVzaXplXCJcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLnByb3BlcnRpZXMuZWxlbWVudDtcclxuICAgICAgICB0aGlzLmVsZW1lbnRQb3NpdGlvbiA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKCk7XHJcblxyXG4gICAgICAgIHRoaXMudG9nZ2xlRXZlbnRMaXN0ZW5lcnMoJ2FkZEV2ZW50TGlzdGVuZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMudG9nZ2xlRXZlbnRMaXN0ZW5lcnMoJ3JlbW92ZUV2ZW50TGlzdGVuZXInKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVFdmVudExpc3RlbmVycyhhY3Rpb246ICdhZGRFdmVudExpc3RlbmVyJyB8ICdyZW1vdmVFdmVudExpc3RlbmVyJykge1xyXG4gICAgICAgIGxldCBsaXN0ZW5lcnM7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMubGlzdGVuZXJzID09PSAnbW91c2UgYW5kIHRvdWNoJykge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSBPYmplY3QuYXNzaWduKHRoaXMudG91Y2hMaXN0ZW5lcnMsIHRoaXMubW91c2VMaXN0ZW5lcnMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMuZGV0ZWN0VG91Y2hTY3JlZW4oKSA/IHRoaXMudG91Y2hMaXN0ZW5lcnMgOiB0aGlzLm1vdXNlTGlzdGVuZXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5yZXNpemUpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXJzID0gT2JqZWN0LmFzc2lnbihsaXN0ZW5lcnMsIHRoaXMub3RoZXJMaXN0ZW5lcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yICh2YXIgbGlzdGVuZXIgaW4gbGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZXI6IE1vdXNlSGFuZGxlciA9IGxpc3RlbmVyc1tsaXN0ZW5lcl07XHJcblxyXG4gICAgICAgICAgICAvLyBXaW5kb3dcclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyID09PSBcInJlc2l6ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkRXZlbnRMaXN0ZW5lcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lciwgdGhpc1toYW5kbGVyXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3JlbW92ZUV2ZW50TGlzdGVuZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIsIHRoaXNbaGFuZGxlcl0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRG9jdW1lbnRcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lciA9PT0gJ21vdXNldXAnIHx8IGxpc3RlbmVyID09PSBcIm1vdXNlbW92ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkRXZlbnRMaXN0ZW5lcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyLCB0aGlzW2hhbmRsZXJdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncmVtb3ZlRXZlbnRMaXN0ZW5lcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyLCB0aGlzW2hhbmRsZXJdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVsZW1lbnRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdhZGRFdmVudExpc3RlbmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyLCB0aGlzW2hhbmRsZXJdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncmVtb3ZlRXZlbnRMaXN0ZW5lcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lciwgdGhpc1toYW5kbGVyXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgKiBMaXN0ZW5lcnNcclxuICAgICAqL1xyXG5cclxuICAgIC8qIFRvdWNoc3RhcnQgKi9cclxuXHJcbiAgICBoYW5kbGVUb3VjaHN0YXJ0ID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRQb3NpdGlvbiA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ldmVudFR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldFRvdWNoc3RhcnRQb3NpdGlvbihldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJ0b3VjaHN0YXJ0XCIsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogVG91Y2htb3ZlICovXHJcblxyXG4gICAgaGFuZGxlVG91Y2htb3ZlID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQudG91Y2hlcztcclxuXHJcbiAgICAgICAgLy8gUGFuXHJcbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0UGFuKHRvdWNoZXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuSGFuZGxlcihcInBhblwiLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaW5jaFxyXG4gICAgICAgIGlmICh0aGlzLmRldGVjdFBpbmNoKGV2ZW50KSkge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJwaW5jaFwiLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUxpbmVhclN3aXBlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICAvL2V2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuaSsrO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pID4gMykge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IHRoaXMuZ2V0TGluZWFyU3dpcGVUeXBlKGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PT0gJ2hvcml6b250YWwtc3dpcGUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMucnVuSGFuZGxlcignaG9yaXpvbnRhbC1zd2lwZScsIGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PT0gJ3ZlcnRpY2FsLXN3aXBlJykge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoJ3ZlcnRpY2FsLXN3aXBlJywgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogVG91Y2hlbmQgKi9cclxuXHJcbiAgICBoYW5kbGVUb3VjaGVuZCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXM7XHJcblxyXG4gICAgICAgIC8vIERvdWJsZSBUYXBcclxuICAgICAgICBpZiAodGhpcy5kZXRlY3REb3VibGVUYXAoKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJkb3VibGUtdGFwXCIsIGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRhcFxyXG4gICAgICAgIHRoaXMuZGV0ZWN0VGFwKCk7XHJcblxyXG4gICAgICAgIHRoaXMucnVuSGFuZGxlcihcInRvdWNoZW5kXCIsIGV2ZW50KTtcclxuICAgICAgICB0aGlzLmV2ZW50VHlwZSA9ICd0b3VjaGVuZCc7XHJcblxyXG4gICAgICAgIGlmICh0b3VjaGVzICYmIHRvdWNoZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB0aGlzLmkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogTW91c2Vkb3duICovXHJcblxyXG4gICAgaGFuZGxlTW91c2Vkb3duID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLmlzTW91c2Vkb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmVsZW1lbnRQb3NpdGlvbiA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ldmVudFR5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldE1vdXNlZG93blBvc2l0aW9uKGV2ZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucnVuSGFuZGxlcihcIm1vdXNlZG93blwiLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIE1vdXNlbW92ZSAqL1xyXG5cclxuICAgIGhhbmRsZU1vdXNlbW92ZSA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgLy9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghdGhpcy5pc01vdXNlZG93bikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQYW5cclxuICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJwYW5cIiwgZXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBMaW5lYXIgc3dpcGVcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZGV0ZWN0TGluZWFyU3dpcGUoZXZlbnQpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJob3Jpem9udGFsLXN3aXBlXCI6XHJcbiAgICAgICAgICAgICAgICBldmVudC5zd2lwZVR5cGUgPSBcImhvcml6b250YWwtc3dpcGVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuSGFuZGxlcihcImhvcml6b250YWwtc3dpcGVcIiwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ2ZXJ0aWNhbC1zd2lwZVwiOlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3dpcGVUeXBlID0gXCJ2ZXJ0aWNhbC1zd2lwZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwidmVydGljYWwtc3dpcGVcIiwgZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBMaW5lYXIgc3dpcGVcclxuICAgICAgICBpZiAodGhpcy5kZXRlY3RMaW5lYXJTd2lwZShldmVudCkgfHxcclxuICAgICAgICAgICAgdGhpcy5ldmVudFR5cGUgPT09ICdob3Jpem9udGFsLXN3aXBlJyB8fFxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9PT0gJ3ZlcnRpY2FsLXN3aXBlJykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVMaW5lYXJTd2lwZShldmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBNb3VzZXVwICovXHJcblxyXG4gICAgaGFuZGxlTW91c2V1cCA9IChldmVudDogYW55KSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFRhcFxyXG4gICAgICAgIHRoaXMuZGV0ZWN0VGFwKCk7XHJcblxyXG4gICAgICAgIHRoaXMuaXNNb3VzZWRvd24gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJtb3VzZXVwXCIsIGV2ZW50KTtcclxuICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmkgPSAwO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBXaGVlbCAqL1xyXG5cclxuICAgIGhhbmRsZVdoZWVsID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJ3aGVlbFwiLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUmVzaXplICovXHJcblxyXG4gICAgaGFuZGxlUmVzaXplID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJyZXNpemVcIiwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1bkhhbmRsZXIoZXZlbnROYW1lOiBhbnksIHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5oYW5kbGVyc1tldmVudE5hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXShyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKlxyXG4gICAgICogRGV0ZWN0aW9uXHJcbiAgICAgKi9cclxuXHJcbiAgICBkZXRlY3RQYW4odG91Y2hlczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoZXMubGVuZ3RoID09PSAxICYmICF0aGlzLmV2ZW50VHlwZSB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ3Bhbic7XHJcbiAgICB9XHJcblxyXG4gICAgZGV0ZWN0RG91YmxlVGFwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBjb25zdCB0YXBMZW5ndGggPSBjdXJyZW50VGltZSAtIHRoaXMubGFzdFRhcDtcclxuXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZG91YmxlVGFwVGltZW91dCk7XHJcblxyXG4gICAgICAgIGlmICh0YXBMZW5ndGggPCB0aGlzLmRvdWJsZVRhcE1pblRpbWVvdXQgJiYgdGFwTGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmRvdWJsZVRhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRvdWJsZVRhcFRpbWVvdXQpO1xyXG4gICAgICAgICAgICB9LCB0aGlzLmRvdWJsZVRhcE1pblRpbWVvdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RUYXAgPSBjdXJyZW50VGltZTtcclxuICAgIH1cclxuXHJcbiAgICBkZXRlY3RUYXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIGNvbnN0IHRhcExlbmd0aCA9IGN1cnJlbnRUaW1lIC0gdGhpcy50b3VjaHN0YXJ0VGltZTtcclxuXHJcbiAgICAgICAgaWYgKHRhcExlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRhcExlbmd0aCA8IHRoaXMudGFwTWluVGltZW91dCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwidGFwXCIsIGV2ZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuSGFuZGxlcihcImxvbmd0YXBcIiwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRldGVjdFBpbmNoKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQudG91Y2hlcztcclxuICAgICAgICByZXR1cm4gKHRvdWNoZXMubGVuZ3RoID09PSAyICYmIHRoaXMuZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHx8IHRoaXMuZXZlbnRUeXBlID09PSAncGluY2gnO1xyXG4gICAgfVxyXG5cclxuICAgIGRldGVjdExpbmVhclN3aXBlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQudG91Y2hlcztcclxuXHJcbiAgICAgICAgaWYgKHRvdWNoZXMpIHtcclxuICAgICAgICAgICAgaWYgKHRvdWNoZXMubGVuZ3RoID09PSAxICYmICF0aGlzLmV2ZW50VHlwZSB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ2hvcml6b250YWwtc3dpcGUnIHx8IHRoaXMuZXZlbnRUeXBlID09PSAndmVydGljYWwtc3dpcGUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMaW5lYXJTd2lwZVR5cGUoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmV2ZW50VHlwZSB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ2hvcml6b250YWwtc3dpcGUnIHx8IHRoaXMuZXZlbnRUeXBlID09PSAndmVydGljYWwtc3dpcGUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMaW5lYXJTd2lwZVR5cGUoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldExpbmVhclN3aXBlVHlwZShldmVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlICE9PSAnaG9yaXpvbnRhbC1zd2lwZScgJiYgdGhpcy5ldmVudFR5cGUgIT09ICd2ZXJ0aWNhbC1zd2lwZScpIHtcclxuICAgICAgICAgICAgY29uc3QgbW92ZW1lbnRYID0gTWF0aC5hYnModGhpcy5tb3ZlTGVmdCgwLCBldmVudCkgLSB0aGlzLnN0YXJ0WCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdmVtZW50WSA9IE1hdGguYWJzKHRoaXMubW92ZVRvcCgwLCBldmVudCkgLSB0aGlzLnN0YXJ0WSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoKG1vdmVtZW50WSAqIDMpID4gbW92ZW1lbnRYKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3ZlcnRpY2FsLXN3aXBlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaG9yaXpvbnRhbC1zd2lwZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudFR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEVsZW1lbnRQb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFRvdWNoc3RhcnRQb3NpdGlvbihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFggPSBldmVudC50b3VjaGVzWzBdLmNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xyXG4gICAgICAgIHRoaXMuc3RhcnRZID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRZIC0gdGhpcy5lbGVtZW50UG9zaXRpb24udG9wO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vdXNlZG93blBvc2l0aW9uKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0WCA9IGV2ZW50LmNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xyXG4gICAgICAgIHRoaXMuc3RhcnRZID0gZXZlbnQuY2xpZW50WSAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlTGVmdChpbmRleDogYW55LCBldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXM7XHJcblxyXG4gICAgICAgIGlmICh0b3VjaGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0b3VjaGVzW2luZGV4XS5jbGllbnRYIC0gdGhpcy5lbGVtZW50UG9zaXRpb24ubGVmdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQuY2xpZW50WCAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLmxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vdmVUb3AoaW5kZXg6IGFueSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHRvdWNoZXMgPSBldmVudC50b3VjaGVzO1xyXG5cclxuICAgICAgICBpZiAodG91Y2hlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdG91Y2hlc1tpbmRleF0uY2xpZW50WSAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQuY2xpZW50WSAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGV0ZWN0VG91Y2hTY3JlZW4oKSB7XHJcbiAgICAgICAgdmFyIHByZWZpeGVzID0gJyAtd2Via2l0LSAtbW96LSAtby0gLW1zLSAnLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgdmFyIG1xID0gZnVuY3Rpb24ocXVlcnk6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEocXVlcnkpLm1hdGNoZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpbmNsdWRlIHRoZSAnaGVhcnR6JyBhcyBhIHdheSB0byBoYXZlIGEgbm9uIG1hdGNoaW5nIE1RIHRvIGhlbHAgdGVybWluYXRlIHRoZSBqb2luXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXQuaW8vdnpuRkhcclxuICAgICAgICB2YXIgcXVlcnkgPSBbJygnLCBwcmVmaXhlcy5qb2luKCd0b3VjaC1lbmFibGVkKSwoJyksICdoZWFydHonLCAnKSddLmpvaW4oJycpO1xyXG4gICAgICAgIHJldHVybiBtcShxdWVyeSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIFB1YmxpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzICovXHJcbiAgICBvbihldmVudDogRXZlbnRUeXBlLCBoYW5kbGVyOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzW2V2ZW50XSA9IGhhbmRsZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19