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
var Touches = /** @class */ (function () {
    function Touches(properties) {
        var _this = this;
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
        function (event) {
            _this.elementPosition = _this.getElementPosition();
            _this.touchstartTime = new Date().getTime();
            if (_this.eventType === undefined) {
                _this.getTouchstartPosition(event);
            }
            _this.runHandler("touchstart", event);
        });
        /* Touchmove */
        this.handleTouchmove = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var touches = event.touches;
            // Pan
            if (_this.detectPan(touches)) {
                _this.runHandler("pan", event);
            }
            // Pinch
            if (_this.detectPinch(event)) {
                _this.runHandler("pinch", event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var touches = event.touches;
            // Double Tap
            if (_this.detectDoubleTap()) {
                _this.runHandler("double-tap", event);
            }
            // Tap
            _this.detectTap();
            _this.runHandler("touchend", event);
            _this.eventType = 'touchend';
            if (touches && touches.length === 0) {
                _this.eventType = undefined;
                _this.i = 0;
            }
        });
        /* Mousedown */
        this.handleMousedown = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.isMousedown = true;
            _this.elementPosition = _this.getElementPosition();
            _this.touchstartTime = new Date().getTime();
            if (_this.eventType === undefined) {
                _this.getMousedownPosition(event);
            }
            _this.runHandler("mousedown", event);
        });
        /* Mousemove */
        this.handleMousemove = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            //event.preventDefault();
            if (!_this.isMousedown) {
                return;
            }
            // Pan
            _this.runHandler("pan", event);
            // Linear swipe
            switch (_this.detectLinearSwipe(event)) {
                case "horizontal-swipe":
                    event.swipeType = "horizontal-swipe";
                    _this.runHandler("horizontal-swipe", event);
                    break;
                case "vertical-swipe":
                    event.swipeType = "vertical-swipe";
                    _this.runHandler("vertical-swipe", event);
                    break;
            }
            // Linear swipe
            if (_this.detectLinearSwipe(event) ||
                _this.eventType === 'horizontal-swipe' ||
                _this.eventType === 'vertical-swipe') {
                _this.handleLinearSwipe(event);
            }
        });
        /* Mouseup */
        this.handleMouseup = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Tap
            _this.detectTap();
            _this.isMousedown = false;
            _this.runHandler("mouseup", event);
            _this.eventType = undefined;
            _this.i = 0;
        });
        /* Wheel */
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.runHandler("wheel", event);
        });
        /* Resize */
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.runHandler("resize", event);
        });
        this.properties = properties;
        this.element = this.properties.element;
        this.elementPosition = this.getElementPosition();
        this.toggleEventListeners('addEventListener');
    }
    /**
     * @return {?}
     */
    Touches.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.toggleEventListeners('removeEventListener');
    };
    /**
     * @param {?} action
     * @return {?}
     */
    Touches.prototype.toggleEventListeners = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        /** @type {?} */
        var listeners;
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
            var handler = listeners[listener];
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.handleLinearSwipe = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @param {?} eventName
     * @param {?} response
     * @return {?}
     */
    Touches.prototype.runHandler = /**
     * @param {?} eventName
     * @param {?} response
     * @return {?}
     */
    function (eventName, response) {
        if (this.handlers[eventName]) {
            this.handlers[eventName](response);
        }
    };
    /*
     * Detection
     */
    /*
         * Detection
         */
    /**
     * @param {?} touches
     * @return {?}
     */
    Touches.prototype.detectPan = /*
         * Detection
         */
    /**
     * @param {?} touches
     * @return {?}
     */
    function (touches) {
        return touches.length === 1 && !this.eventType || this.eventType === 'pan';
    };
    /**
     * @return {?}
     */
    Touches.prototype.detectDoubleTap = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        var currentTime = new Date().getTime();
        /** @type {?} */
        var tapLength = currentTime - this.lastTap;
        clearTimeout(this.doubleTapTimeout);
        if (tapLength < this.doubleTapMinTimeout && tapLength > 0) {
            return true;
        }
        else {
            this.doubleTapTimeout = setTimeout((/**
             * @return {?}
             */
            function () {
                clearTimeout(_this.doubleTapTimeout);
            }), this.doubleTapMinTimeout);
        }
        this.lastTap = currentTime;
    };
    /**
     * @return {?}
     */
    Touches.prototype.detectTap = /**
     * @return {?}
     */
    function () {
        if (this.eventType != undefined) {
            return;
        }
        /** @type {?} */
        var currentTime = new Date().getTime();
        /** @type {?} */
        var tapLength = currentTime - this.touchstartTime;
        if (tapLength > 0) {
            if (tapLength < this.tapMinTimeout) {
                this.runHandler("tap", event);
            }
            else {
                this.runHandler("longtap", event);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.detectPinch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var touches = event.touches;
        return (touches.length === 2 && this.eventType === undefined) || this.eventType === 'pinch';
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.detectLinearSwipe = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var touches = event.touches;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.getLinearSwipeType = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.eventType !== 'horizontal-swipe' && this.eventType !== 'vertical-swipe') {
            /** @type {?} */
            var movementX = Math.abs(this.moveLeft(0, event) - this.startX);
            /** @type {?} */
            var movementY = Math.abs(this.moveTop(0, event) - this.startY);
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
    };
    /**
     * @return {?}
     */
    Touches.prototype.getElementPosition = /**
     * @return {?}
     */
    function () {
        return this.element.getBoundingClientRect();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.getTouchstartPosition = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.startX = event.touches[0].clientX - this.elementPosition.left;
        this.startY = event.touches[0].clientY - this.elementPosition.top;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.getMousedownPosition = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.startX = event.clientX - this.elementPosition.left;
        this.startY = event.clientY - this.elementPosition.top;
    };
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.moveLeft = /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        /** @type {?} */
        var touches = event.touches;
        if (touches) {
            return touches[index].clientX - this.elementPosition.left;
        }
        else {
            return event.clientX - this.elementPosition.left;
        }
    };
    /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    Touches.prototype.moveTop = /**
     * @param {?} index
     * @param {?} event
     * @return {?}
     */
    function (index, event) {
        /** @type {?} */
        var touches = event.touches;
        if (touches) {
            return touches[index].clientY - this.elementPosition.top;
        }
        else {
            return event.clientY - this.elementPosition.top;
        }
    };
    /**
     * @return {?}
     */
    Touches.prototype.detectTouchScreen = /**
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
    };
    /* Public properties and methods */
    /* Public properties and methods */
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    Touches.prototype.on = /* Public properties and methods */
    /**
     * @param {?} event
     * @param {?} handler
     * @return {?}
     */
    function (event, handler) {
        if (event) {
            this.handlers[event] = handler;
        }
    };
    return Touches;
}());
export { Touches };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG91Y2hlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1waW5jaC16b29tLyIsInNvdXJjZXMiOlsibGliL3RvdWNoZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxnQ0FJQzs7O0lBSEcsNkJBQXFCOztJQUNyQiwrQkFBdUM7O0lBQ3ZDLDRCQUFpQjs7QUFPckI7SUErQkksaUJBQVksVUFBc0I7UUFBbEMsaUJBTUM7UUFqQ0QsY0FBUyxHQUFjLFNBQVMsQ0FBQztRQUNqQyxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBQ25CLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUVaLHdCQUFtQixHQUFHLEdBQUcsQ0FBQztRQUMxQixrQkFBYSxHQUFHLEdBQUcsQ0FBQztRQUNwQixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQUNuQixNQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ2QsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsbUJBQWMsR0FBUTtZQUNsQixZQUFZLEVBQUUsa0JBQWtCO1lBQ2hDLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsVUFBVSxFQUFFLGdCQUFnQjtTQUMvQixDQUFBO1FBQ0QsbUJBQWMsR0FBUTtZQUNsQixXQUFXLEVBQUUsaUJBQWlCO1lBQzlCLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsT0FBTyxFQUFFLGFBQWE7U0FDekIsQ0FBQTtRQUNELG1CQUFjLEdBQVE7WUFDbEIsUUFBUSxFQUFFLGNBQWM7U0FDM0IsQ0FBQTs7Ozs7UUFnRUQscUJBQWdCOzs7O1FBQUcsVUFBQyxLQUFVO1lBQzFCLEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDakQsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTNDLElBQUks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LE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFHRCxtQ0FBbUM7Ozs7Ozs7SUFDbkMsb0JBQUU7Ozs7OztJQUFGLFVBQUcsS0FBZ0IsRUFBRSxPQUFpQjtRQUNsQyxJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBN1hELElBNlhDOzs7O0lBNVhHLDZCQUF1Qjs7SUFDdkIsMEJBQXFCOztJQUNyQixrQ0FBNEI7O0lBQzVCLDRCQUFpQzs7SUFDakMsMkJBQW1COztJQUNuQix5QkFBVzs7SUFDWCx5QkFBVzs7SUFDWCwwQkFBWTs7SUFDWixtQ0FBc0I7O0lBQ3RCLHNDQUEwQjs7SUFDMUIsZ0NBQW9COztJQUNwQixpQ0FBbUI7O0lBQ25CLG9CQUFjOztJQUNkLDhCQUFvQjs7SUFFcEIsaUNBSUM7O0lBQ0QsaUNBS0M7O0lBQ0QsaUNBRUM7O0lBZ0VELG1DQVNDOztJQUtELGtDQVlDOztJQXVCRCxpQ0FrQkM7O0lBS0Qsa0NBVUM7O0lBS0Qsa0NBNkJDOztJQUtELGdDQVNDOztJQUtELDhCQUVDOztJQUlELCtCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0aWVzIHtcclxuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgbGlzdGVuZXJzPzogJ2F1dG8nIHwgJ21vdXNlIGFuZCB0b3VjaCc7XHJcbiAgICByZXNpemU/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBFdmVudFR5cGUgPSB1bmRlZmluZWQgfCAndG91Y2hlbmQnIHwgJ3BhbicgfCAncGluY2gnIHwgJ2hvcml6b250YWwtc3dpcGUnIHwgJ3ZlcnRpY2FsLXN3aXBlJyB8ICd0YXAnIHwgJ2xvbmd0YXAnO1xyXG5leHBvcnQgdHlwZSBUb3VjaEhhbmRsZXIgPSAnaGFuZGxlVG91Y2hzdGFydCcgfCAnaGFuZGxlVG91Y2htb3ZlJyB8ICdoYW5kbGVUb3VjaGVuZCc7XHJcbmV4cG9ydCB0eXBlIE1vdXNlSGFuZGxlciA9ICdoYW5kbGVNb3VzZWRvd24nIHwgJ2hhbmRsZU1vdXNlbW92ZScgfCAnaGFuZGxlTW91c2V1cCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVG91Y2hlcyB7XHJcbiAgICBwcm9wZXJ0aWVzOiBQcm9wZXJ0aWVzO1xyXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcbiAgICBlbGVtZW50UG9zaXRpb246IENsaWVudFJlY3Q7XHJcbiAgICBldmVudFR5cGU6IEV2ZW50VHlwZSA9IHVuZGVmaW5lZDtcclxuICAgIGhhbmRsZXJzOiBhbnkgPSB7fTtcclxuICAgIHN0YXJ0WCA9IDA7XHJcbiAgICBzdGFydFkgPSAwO1xyXG4gICAgbGFzdFRhcCA9IDA7XHJcbiAgICBkb3VibGVUYXBUaW1lb3V0OiBhbnk7XHJcbiAgICBkb3VibGVUYXBNaW5UaW1lb3V0ID0gMzAwO1xyXG4gICAgdGFwTWluVGltZW91dCA9IDIwMDtcclxuICAgIHRvdWNoc3RhcnRUaW1lID0gMDtcclxuICAgIGk6IG51bWJlciA9IDA7XHJcbiAgICBpc01vdXNlZG93biA9IGZhbHNlO1xyXG5cclxuICAgIHRvdWNoTGlzdGVuZXJzOiBhbnkgPSB7XHJcbiAgICAgICAgXCJ0b3VjaHN0YXJ0XCI6IFwiaGFuZGxlVG91Y2hzdGFydFwiLFxyXG4gICAgICAgIFwidG91Y2htb3ZlXCI6IFwiaGFuZGxlVG91Y2htb3ZlXCIsXHJcbiAgICAgICAgXCJ0b3VjaGVuZFwiOiBcImhhbmRsZVRvdWNoZW5kXCJcclxuICAgIH1cclxuICAgIG1vdXNlTGlzdGVuZXJzOiBhbnkgPSB7XHJcbiAgICAgICAgXCJtb3VzZWRvd25cIjogXCJoYW5kbGVNb3VzZWRvd25cIixcclxuICAgICAgICBcIm1vdXNlbW92ZVwiOiBcImhhbmRsZU1vdXNlbW92ZVwiLFxyXG4gICAgICAgIFwibW91c2V1cFwiOiBcImhhbmRsZU1vdXNldXBcIixcclxuICAgICAgICBcIndoZWVsXCI6IFwiaGFuZGxlV2hlZWxcIlxyXG4gICAgfVxyXG4gICAgb3RoZXJMaXN0ZW5lcnM6IGFueSA9IHtcclxuICAgICAgICBcInJlc2l6ZVwiOiBcImhhbmRsZVJlc2l6ZVwiXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcGVydGllczogUHJvcGVydGllcykge1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gdGhpcy5wcm9wZXJ0aWVzLmVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UG9zaXRpb24gPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLnRvZ2dsZUV2ZW50TGlzdGVuZXJzKCdhZGRFdmVudExpc3RlbmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnRvZ2dsZUV2ZW50TGlzdGVuZXJzKCdyZW1vdmVFdmVudExpc3RlbmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRXZlbnRMaXN0ZW5lcnMoYWN0aW9uOiAnYWRkRXZlbnRMaXN0ZW5lcicgfCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicpIHtcclxuICAgICAgICBsZXQgbGlzdGVuZXJzO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmxpc3RlbmVycyA9PT0gJ21vdXNlIGFuZCB0b3VjaCcpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXJzID0gT2JqZWN0LmFzc2lnbih0aGlzLnRvdWNoTGlzdGVuZXJzLCB0aGlzLm1vdXNlTGlzdGVuZXJzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsaXN0ZW5lcnMgPSB0aGlzLmRldGVjdFRvdWNoU2NyZWVuKCkgPyB0aGlzLnRvdWNoTGlzdGVuZXJzIDogdGhpcy5tb3VzZUxpc3RlbmVycztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMucmVzaXplKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IE9iamVjdC5hc3NpZ24obGlzdGVuZXJzLCB0aGlzLm90aGVyTGlzdGVuZXJzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGxpc3RlbmVyIGluIGxpc3RlbmVycykge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyOiBNb3VzZUhhbmRsZXIgPSBsaXN0ZW5lcnNbbGlzdGVuZXJdO1xyXG5cclxuICAgICAgICAgICAgLy8gV2luZG93XHJcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gXCJyZXNpemVcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZEV2ZW50TGlzdGVuZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIsIHRoaXNbaGFuZGxlcl0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdyZW1vdmVFdmVudExpc3RlbmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyLCB0aGlzW2hhbmRsZXJdLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIERvY3VtZW50XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXIgPT09ICdtb3VzZXVwJyB8fCBsaXN0ZW5lciA9PT0gXCJtb3VzZW1vdmVcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ2FkZEV2ZW50TGlzdGVuZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lciwgdGhpc1toYW5kbGVyXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3JlbW92ZUV2ZW50TGlzdGVuZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lciwgdGhpc1toYW5kbGVyXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFbGVtZW50XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09PSAnYWRkRXZlbnRMaXN0ZW5lcicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lciwgdGhpc1toYW5kbGVyXSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3JlbW92ZUV2ZW50TGlzdGVuZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIsIHRoaXNbaGFuZGxlcl0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICogTGlzdGVuZXJzXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKiBUb3VjaHN0YXJ0ICovXHJcblxyXG4gICAgaGFuZGxlVG91Y2hzdGFydCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UG9zaXRpb24gPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMudG91Y2hzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRUb3VjaHN0YXJ0UG9zaXRpb24oZXZlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwidG91Y2hzdGFydFwiLCBldmVudCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIFRvdWNobW92ZSAqL1xyXG5cclxuICAgIGhhbmRsZVRvdWNobW92ZSA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXM7XHJcblxyXG4gICAgICAgIC8vIFBhblxyXG4gICAgICAgIGlmICh0aGlzLmRldGVjdFBhbih0b3VjaGVzKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJwYW5cIiwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGluY2hcclxuICAgICAgICBpZiAodGhpcy5kZXRlY3RQaW5jaChldmVudCkpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwicGluY2hcIiwgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVMaW5lYXJTd2lwZShldmVudDogYW55KSB7XHJcbiAgICAgICAgLy9ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICB0aGlzLmkrKztcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaSA+IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudFR5cGUgPSB0aGlzLmdldExpbmVhclN3aXBlVHlwZShldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ldmVudFR5cGUgPT09ICdob3Jpem9udGFsLXN3aXBlJykge1xyXG4gICAgICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoJ2hvcml6b250YWwtc3dpcGUnLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5ldmVudFR5cGUgPT09ICd2ZXJ0aWNhbC1zd2lwZScpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5IYW5kbGVyKCd2ZXJ0aWNhbC1zd2lwZScsIGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIFRvdWNoZW5kICovXHJcblxyXG4gICAgaGFuZGxlVG91Y2hlbmQgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRvdWNoZXMgPSBldmVudC50b3VjaGVzO1xyXG5cclxuICAgICAgICAvLyBEb3VibGUgVGFwXHJcbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0RG91YmxlVGFwKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwiZG91YmxlLXRhcFwiLCBldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUYXBcclxuICAgICAgICB0aGlzLmRldGVjdFRhcCgpO1xyXG5cclxuICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJ0b3VjaGVuZFwiLCBldmVudCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFR5cGUgPSAndG91Y2hlbmQnO1xyXG5cclxuICAgICAgICBpZiAodG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgdGhpcy5pID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qIE1vdXNlZG93biAqL1xyXG5cclxuICAgIGhhbmRsZU1vdXNlZG93biA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5pc01vdXNlZG93biA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UG9zaXRpb24gPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMudG91Y2hzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRNb3VzZWRvd25Qb3NpdGlvbihldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJtb3VzZWRvd25cIiwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBNb3VzZW1vdmUgKi9cclxuXHJcbiAgICBoYW5kbGVNb3VzZW1vdmUgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXRoaXMuaXNNb3VzZWRvd24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGFuXHJcbiAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwicGFuXCIsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gTGluZWFyIHN3aXBlXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmRldGVjdExpbmVhclN3aXBlKGV2ZW50KSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaG9yaXpvbnRhbC1zd2lwZVwiOlxyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3dpcGVUeXBlID0gXCJob3Jpem9udGFsLXN3aXBlXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJob3Jpem9udGFsLXN3aXBlXCIsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidmVydGljYWwtc3dpcGVcIjpcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN3aXBlVHlwZSA9IFwidmVydGljYWwtc3dpcGVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuSGFuZGxlcihcInZlcnRpY2FsLXN3aXBlXCIsIGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTGluZWFyIHN3aXBlXHJcbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0TGluZWFyU3dpcGUoZXZlbnQpIHx8XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID09PSAnaG9yaXpvbnRhbC1zd2lwZScgfHxcclxuICAgICAgICAgICAgdGhpcy5ldmVudFR5cGUgPT09ICd2ZXJ0aWNhbC1zd2lwZScpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTGluZWFyU3dpcGUoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogTW91c2V1cCAqL1xyXG5cclxuICAgIGhhbmRsZU1vdXNldXAgPSAoZXZlbnQ6IGFueSkgPT4ge1xyXG5cclxuICAgICAgICAvLyBUYXBcclxuICAgICAgICB0aGlzLmRldGVjdFRhcCgpO1xyXG5cclxuICAgICAgICB0aGlzLmlzTW91c2Vkb3duID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwibW91c2V1cFwiLCBldmVudCk7XHJcbiAgICAgICAgdGhpcy5ldmVudFR5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5pID0gMDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyogV2hlZWwgKi9cclxuXHJcbiAgICBoYW5kbGVXaGVlbCA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwid2hlZWxcIiwgZXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFJlc2l6ZSAqL1xyXG5cclxuICAgIGhhbmRsZVJlc2l6ZSA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgdGhpcy5ydW5IYW5kbGVyKFwicmVzaXplXCIsIGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBydW5IYW5kbGVyKGV2ZW50TmFtZTogYW55LCByZXNwb25zZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0ocmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIERldGVjdGlvblxyXG4gICAgICovXHJcblxyXG4gICAgZGV0ZWN0UGFuKHRvdWNoZXM6IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0b3VjaGVzLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5ldmVudFR5cGUgfHwgdGhpcy5ldmVudFR5cGUgPT09ICdwYW4nO1xyXG4gICAgfVxyXG5cclxuICAgIGRldGVjdERvdWJsZVRhcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5ldmVudFR5cGUgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgY29uc3QgdGFwTGVuZ3RoID0gY3VycmVudFRpbWUgLSB0aGlzLmxhc3RUYXA7XHJcblxyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmRvdWJsZVRhcFRpbWVvdXQpO1xyXG5cclxuICAgICAgICBpZiAodGFwTGVuZ3RoIDwgdGhpcy5kb3VibGVUYXBNaW5UaW1lb3V0ICYmIHRhcExlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kb3VibGVUYXBUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kb3VibGVUYXBUaW1lb3V0KTtcclxuICAgICAgICAgICAgfSwgdGhpcy5kb3VibGVUYXBNaW5UaW1lb3V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0VGFwID0gY3VycmVudFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGV0ZWN0VGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICBjb25zdCB0YXBMZW5ndGggPSBjdXJyZW50VGltZSAtIHRoaXMudG91Y2hzdGFydFRpbWU7XHJcblxyXG4gICAgICAgIGlmICh0YXBMZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0YXBMZW5ndGggPCB0aGlzLnRhcE1pblRpbWVvdXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucnVuSGFuZGxlcihcInRhcFwiLCBldmVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJ1bkhhbmRsZXIoXCJsb25ndGFwXCIsIGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZXRlY3RQaW5jaChldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXM7XHJcbiAgICAgICAgcmV0dXJuICh0b3VjaGVzLmxlbmd0aCA9PT0gMiAmJiB0aGlzLmV2ZW50VHlwZSA9PT0gdW5kZWZpbmVkKSB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ3BpbmNoJztcclxuICAgIH1cclxuXHJcbiAgICBkZXRlY3RMaW5lYXJTd2lwZShldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXM7XHJcblxyXG4gICAgICAgIGlmICh0b3VjaGVzKSB7XHJcbiAgICAgICAgICAgIGlmICh0b3VjaGVzLmxlbmd0aCA9PT0gMSAmJiAhdGhpcy5ldmVudFR5cGUgfHwgdGhpcy5ldmVudFR5cGUgPT09ICdob3Jpem9udGFsLXN3aXBlJyB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ3ZlcnRpY2FsLXN3aXBlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZWFyU3dpcGVUeXBlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5ldmVudFR5cGUgfHwgdGhpcy5ldmVudFR5cGUgPT09ICdob3Jpem9udGFsLXN3aXBlJyB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ3ZlcnRpY2FsLXN3aXBlJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGluZWFyU3dpcGVUeXBlKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRMaW5lYXJTd2lwZVR5cGUoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSAhPT0gJ2hvcml6b250YWwtc3dpcGUnICYmIHRoaXMuZXZlbnRUeXBlICE9PSAndmVydGljYWwtc3dpcGUnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1vdmVtZW50WCA9IE1hdGguYWJzKHRoaXMubW92ZUxlZnQoMCwgZXZlbnQpIC0gdGhpcy5zdGFydFgpO1xyXG4gICAgICAgICAgICBjb25zdCBtb3ZlbWVudFkgPSBNYXRoLmFicyh0aGlzLm1vdmVUb3AoMCwgZXZlbnQpIC0gdGhpcy5zdGFydFkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKChtb3ZlbWVudFkgKiAzKSA+IG1vdmVtZW50WCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICd2ZXJ0aWNhbC1zd2lwZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hvcml6b250YWwtc3dpcGUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRUeXBlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRFbGVtZW50UG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUb3VjaHN0YXJ0UG9zaXRpb24oZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRYID0gZXZlbnQudG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5lbGVtZW50UG9zaXRpb24ubGVmdDtcclxuICAgICAgICB0aGlzLnN0YXJ0WSA9IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WSAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRNb3VzZWRvd25Qb3NpdGlvbihldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdGFydFggPSBldmVudC5jbGllbnRYIC0gdGhpcy5lbGVtZW50UG9zaXRpb24ubGVmdDtcclxuICAgICAgICB0aGlzLnN0YXJ0WSA9IGV2ZW50LmNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3A7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUxlZnQoaW5kZXg6IGFueSwgZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IHRvdWNoZXMgPSBldmVudC50b3VjaGVzO1xyXG5cclxuICAgICAgICBpZiAodG91Y2hlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdG91Y2hlc1tpbmRleF0uY2xpZW50WCAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLmxlZnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlVG9wKGluZGV4OiBhbnksIGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQudG91Y2hlcztcclxuXHJcbiAgICAgICAgaWYgKHRvdWNoZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRvdWNoZXNbaW5kZXhdLmNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3A7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3A7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRldGVjdFRvdWNoU2NyZWVuKCkge1xyXG4gICAgICAgIHZhciBwcmVmaXhlcyA9ICcgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gJy5zcGxpdCgnICcpO1xyXG4gICAgICAgIHZhciBtcSA9IGZ1bmN0aW9uKHF1ZXJ5OiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaW5jbHVkZSB0aGUgJ2hlYXJ0eicgYXMgYSB3YXkgdG8gaGF2ZSBhIG5vbiBtYXRjaGluZyBNUSB0byBoZWxwIHRlcm1pbmF0ZSB0aGUgam9pblxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0LmlvL3Z6bkZIXHJcbiAgICAgICAgdmFyIHF1ZXJ5ID0gWycoJywgcHJlZml4ZXMuam9pbigndG91Y2gtZW5hYmxlZCksKCcpLCAnaGVhcnR6JywgJyknXS5qb2luKCcnKTtcclxuICAgICAgICByZXR1cm4gbXEocXVlcnkpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKiBQdWJsaWMgcHJvcGVydGllcyBhbmQgbWV0aG9kcyAqL1xyXG4gICAgb24oZXZlbnQ6IEV2ZW50VHlwZSwgaGFuZGxlcjogRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyc1tldmVudF0gPSBoYW5kbGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==