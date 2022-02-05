/**
 * @fileoverview added by tsickle
 * Generated from: lib/ivypinch.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Touches } from './touches';
/**
 * @record
 */
export function IvyPinchProperties() { }
if (false) {
    /** @type {?} */
    IvyPinchProperties.prototype.element;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.key;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.doubleTap;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.doubleTapScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.zoomControlScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.transitionDuration;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.autoZoomOut;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.limitZoom;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.disablePan;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.limitPan;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.minScale;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.eventHandler;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.listeners;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.wheel;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.autoHeight;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.wheelZoomFactor;
    /** @type {?|undefined} */
    IvyPinchProperties.prototype.draggableImage;
}
/** @type {?} */
export var IvyPinchDefaultProperties = {
    doubleTap: true,
    doubleTapScale: 2,
    transitionDuration: 200,
    limitZoom: "original image size",
    minScale: 0,
    wheelZoomFactor: 0.2,
    draggableImage: true
};
var IvyPinch = /** @class */ (function () {
    function IvyPinch(properties) {
        var _this = this;
        this.i = 0;
        this.scale = 1;
        this.initialScale = 1;
        this.startX = 0;
        this.startY = 0;
        this.moveX = 0;
        this.moveY = 0;
        this.initialMoveX = 0;
        this.initialMoveY = 0;
        this.moveXC = 0;
        this.moveYC = 0;
        this.lastTap = 0;
        this.draggingMode = false;
        this.distance = 0;
        this.doubleTapTimeout = 0;
        this.initialDistance = 0;
        this.events = {};
        this.maxHtmlContentScale = 3;
        this.maxScale = 1;
        /* Touchstart */
        this.handleTouchstart = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.getElementPosition();
            if (_this.eventType === undefined) {
                _this.getTouchstartPosition(event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /* touchend */
            if (event.type === "touchend") {
                _this.i = 0;
                _this.draggingMode = false;
                /** @type {?} */
                var touches = event.touches;
                // Min scale
                if (_this.scale < 1) {
                    _this.scale = 1;
                }
                // Auto Zoom Out
                if (_this.properties.autoZoomOut && _this.eventType === 'pinch') {
                    _this.scale = 1;
                }
                // Align image
                if (_this.eventType === 'pinch' || _this.eventType === 'pan') {
                    _this.alignImage();
                }
                // Update initial values
                if (_this.eventType === 'pinch' ||
                    _this.eventType === 'pan' ||
                    _this.eventType === 'horizontal-swipe' ||
                    _this.eventType === 'vertical-swipe') {
                    _this.updateInitialValues();
                }
                _this.eventType = 'touchend';
                if (touches && touches.length === 0) {
                    _this.eventType = undefined;
                }
            }
            /* mouseup */
            if (event.type === "mouseup") {
                _this.draggingMode = false;
                _this.updateInitialValues();
                _this.eventType = undefined;
            }
        });
        /*
             * Handlers
             */
        this.handlePan = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (_this.scale <= 1 || _this.properties.disablePan) {
                return;
            }
            event.preventDefault();
            var _a = _this.getClientPosition(event), clientX = _a.clientX, clientY = _a.clientY;
            if (!_this.eventType) {
                _this.startX = clientX - _this.elementPosition.left;
                _this.startY = clientY - _this.elementPosition.top;
            }
            _this.eventType = 'pan';
            _this.moveX = _this.initialMoveX + (_this.moveLeft(event, 0) - _this.startX);
            _this.moveY = _this.initialMoveY + (_this.moveTop(event, 0) - _this.startY);
            if (_this.properties.limitPan) {
                _this.limitPanY();
                _this.limitPanX();
            }
            /* mousemove */
            if (event.type === "mousemove") {
                _this.centeringImage();
            }
            _this.transformElement(0);
        });
        this.handleDoubleTap = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.toggleZoom(event);
            return;
        });
        this.handlePinch = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            if (_this.eventType === undefined || _this.eventType === 'pinch') {
                /** @type {?} */
                var touches = event.touches;
                if (!_this.eventType) {
                    _this.initialDistance = _this.getDistance(touches);
                    /** @type {?} */
                    var moveLeft0 = _this.moveLeft(event, 0);
                    /** @type {?} */
                    var moveLeft1 = _this.moveLeft(event, 1);
                    /** @type {?} */
                    var moveTop0 = _this.moveTop(event, 0);
                    /** @type {?} */
                    var moveTop1 = _this.moveTop(event, 1);
                    _this.moveXC = ((moveLeft0 + moveLeft1) / 2) - _this.initialMoveX;
                    _this.moveYC = ((moveTop0 + moveTop1) / 2) - _this.initialMoveY;
                }
                _this.eventType = 'pinch';
                _this.distance = _this.getDistance(touches);
                _this.scale = _this.initialScale * (_this.distance / _this.initialDistance);
                _this.moveX = _this.initialMoveX - (((_this.distance / _this.initialDistance) * _this.moveXC) - _this.moveXC);
                _this.moveY = _this.initialMoveY - (((_this.distance / _this.initialDistance) * _this.moveYC) - _this.moveYC);
                _this.handleLimitZoom();
                if (_this.properties.limitPan) {
                    _this.limitPanY();
                    _this.limitPanX();
                }
                _this.transformElement(0);
            }
        });
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            /** @type {?} */
            var zoomFactor = event.deltaY < 0 ? (_this.properties.wheelZoomFactor) : (-_this.properties.wheelZoomFactor);
            /** @type {?} */
            var newScale = _this.initialScale + zoomFactor;
            /* Round value */
            if (newScale < (1 + _this.properties.wheelZoomFactor)) {
                newScale = 1;
            }
            else if (newScale < _this.maxScale && newScale > _this.maxScale - _this.properties.wheelZoomFactor) {
                newScale = _this.maxScale;
            }
            if (newScale < 1 || newScale > _this.maxScale) {
                return;
            }
            if (newScale === _this.scale) {
                return;
            }
            _this.getElementPosition();
            _this.scale = newScale;
            /* Get cursor position over image */
            /** @type {?} */
            var xCenter = (event.clientX - _this.elementPosition.left) - _this.initialMoveX;
            /** @type {?} */
            var yCenter = (event.clientY - _this.elementPosition.top) - _this.initialMoveY;
            _this.setZoom({
                scale: newScale,
                center: [xCenter, yCenter]
            });
        });
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.setAutoHeight();
        });
        this.element = properties.element;
        this.elementTarget = this.element.querySelector('*').tagName;
        this.parentElement = this.element.parentElement;
        this.properties = Object.assign({}, IvyPinchDefaultProperties, properties);
        this.touches = new Touches({
            element: properties.element,
            listeners: properties.listeners,
            resize: properties.autoHeight
        });
        /* Init */
        this.setBasicStyles();
        /*
         * Listeners
         */
        this.touches.on('touchstart', this.handleTouchstart);
        this.touches.on('touchend', this.handleTouchend);
        this.touches.on('mousedown', this.handleTouchstart);
        this.touches.on('mouseup', this.handleTouchend);
        this.touches.on('pan', this.handlePan);
        this.touches.on('mousemove', this.handlePan);
        this.touches.on('pinch', this.handlePinch);
        if (this.properties.wheel) {
            this.touches.on('wheel', this.handleWheel);
        }
        if (this.properties.doubleTap) {
            this.touches.on('double-tap', this.handleDoubleTap);
        }
        if (this.properties.autoHeight) {
            this.touches.on('resize', this.handleResize);
        }
    }
    /**
     * @return {?}
     */
    IvyPinch.prototype.handleLimitZoom = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var limitZoom = this.maxScale;
        /** @type {?} */
        var minScale = this.properties.minScale;
        if (this.scale > limitZoom || this.scale <= minScale) {
            /** @type {?} */
            var imageWidth = this.getImageWidth();
            /** @type {?} */
            var imageHeight = this.getImageHeight();
            /** @type {?} */
            var enlargedImageWidth = imageWidth * this.scale;
            /** @type {?} */
            var enlargedImageHeight = imageHeight * this.scale;
            /** @type {?} */
            var moveXRatio = this.moveX / (enlargedImageWidth - imageWidth);
            /** @type {?} */
            var moveYRatio = this.moveY / (enlargedImageHeight - imageHeight);
            if (this.scale > limitZoom) {
                this.scale = limitZoom;
            }
            if (this.scale <= minScale) {
                this.scale = minScale;
            }
            /** @type {?} */
            var newImageWidth = imageWidth * this.scale;
            /** @type {?} */
            var newImageHeight = imageHeight * this.scale;
            this.moveX = -Math.abs((moveXRatio * (newImageWidth - imageWidth)));
            this.moveY = -Math.abs((-moveYRatio * (newImageHeight - imageHeight)));
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getLimitZoom = /**
     * @return {?}
     */
    function () {
        if (this.properties.limitZoom === "original image size") {
            if (this.elementTarget === "IMG") {
                /** @type {?} */
                var img = this.element.getElementsByTagName("img")[0];
                if (img.naturalWidth && img.offsetWidth) {
                    this.maxScale = img.naturalWidth / img.offsetWidth;
                    return this.maxScale;
                }
            }
            else {
                this.maxScale = this.maxHtmlContentScale;
                return this.maxScale;
            }
        }
        else {
            this.maxScale = this.properties.limitZoom;
            return this.maxScale;
        }
    };
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    IvyPinch.prototype.moveLeft = /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    function (event, index) {
        if (index === void 0) { index = 0; }
        /** @type {?} */
        var clientX = this.getClientPosition(event, index).clientX;
        return clientX - this.elementPosition.left;
    };
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    IvyPinch.prototype.moveTop = /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    function (event, index) {
        if (index === void 0) { index = 0; }
        /** @type {?} */
        var clientY = this.getClientPosition(event, index).clientY;
        return clientY - this.elementPosition.top;
    };
    /*
     * Detection
     */
    /*
         * Detection
         */
    /**
     * @return {?}
     */
    IvyPinch.prototype.centeringImage = /*
         * Detection
         */
    /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var img = this.element.getElementsByTagName(this.elementTarget)[0];
        /** @type {?} */
        var initialMoveX = this.moveX;
        /** @type {?} */
        var initialMoveY = this.moveY;
        if (this.moveY > 0) {
            this.moveY = 0;
        }
        if (this.moveX > 0) {
            this.moveX = 0;
        }
        if (img) {
            this.limitPanY();
            this.limitPanX();
        }
        if (img && this.scale < 1) {
            if (this.moveX < this.element.offsetWidth * (1 - this.scale)) {
                this.moveX = this.element.offsetWidth * (1 - this.scale);
            }
        }
        return initialMoveX !== this.moveX || initialMoveY !== this.moveY;
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.limitPanY = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgHeight = this.getImageHeight();
        /** @type {?} */
        var scaledImgHeight = imgHeight * this.scale;
        /** @type {?} */
        var parentHeight = this.parentElement.offsetHeight;
        /** @type {?} */
        var elementHeight = this.element.offsetHeight;
        if (scaledImgHeight < parentHeight) {
            this.moveY = (parentHeight - elementHeight * this.scale) / 2;
        }
        else {
            /** @type {?} */
            var imgOffsetTop = ((imgHeight - elementHeight) * this.scale) / 2;
            if (this.moveY > imgOffsetTop) {
                this.moveY = imgOffsetTop;
            }
            else if ((scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight) + this.moveY < 0) {
                this.moveY = -(scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight);
            }
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.limitPanX = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgWidth = this.getImageWidth();
        /** @type {?} */
        var scaledImgWidth = imgWidth * this.scale;
        /** @type {?} */
        var parentWidth = this.parentElement.offsetWidth;
        /** @type {?} */
        var elementWidth = this.element.offsetWidth;
        if (scaledImgWidth < parentWidth) {
            this.moveX = (parentWidth - elementWidth * this.scale) / 2;
        }
        else {
            /** @type {?} */
            var imgOffsetLeft = ((imgWidth - elementWidth) * this.scale) / 2;
            if (this.moveX > imgOffsetLeft) {
                this.moveX = imgOffsetLeft;
            }
            else if ((scaledImgWidth + Math.abs(imgOffsetLeft) - parentWidth) + this.moveX < 0) {
                this.moveX = -(imgWidth * this.scale + Math.abs(imgOffsetLeft) - parentWidth);
            }
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setBasicStyles = /**
     * @return {?}
     */
    function () {
        this.element.style.display = 'flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        this.element.style.transformOrigin = '0 0';
        this.setImageSize();
        this.setDraggableImage();
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.removeBasicStyles = /**
     * @return {?}
     */
    function () {
        this.element.style.display = '';
        this.element.style.alignItems = '';
        this.element.style.justifyContent = '';
        this.element.style.transformOrigin = '';
        this.removeImageSize();
        this.removeDraggableImage();
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setDraggableImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = this.properties.draggableImage;
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.removeDraggableImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = !this.properties.draggableImage;
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setImageSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '100%';
            imgElement[0].style.maxHeight = '100%';
            this.setAutoHeight();
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.setAutoHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (!this.properties.autoHeight || !imgElement.length) {
            return;
        }
        /** @type {?} */
        var imgNaturalWidth = imgElement[0].getAttribute("width");
        /** @type {?} */
        var imgNaturalHeight = imgElement[0].getAttribute("height");
        /** @type {?} */
        var sizeRatio = imgNaturalWidth / imgNaturalHeight;
        /** @type {?} */
        var parentWidth = this.parentElement.offsetWidth;
        imgElement[0].style.maxHeight = parentWidth / sizeRatio + "px";
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.removeImageSize = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '';
            imgElement[0].style.maxHeight = '';
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getElementPosition = /**
     * @return {?}
     */
    function () {
        this.elementPosition = this.element.parentElement.getBoundingClientRect();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    IvyPinch.prototype.getTouchstartPosition = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _a = this.getClientPosition(event), clientX = _a.clientX, clientY = _a.clientY;
        this.startX = clientX - this.elementPosition.left;
        this.startY = clientY - this.elementPosition.top;
    };
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    IvyPinch.prototype.getClientPosition = /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    function (event, index) {
        if (index === void 0) { index = 0; }
        /** @type {?} */
        var clientX;
        /** @type {?} */
        var clientY;
        if (event.type === "touchstart" || event.type === "touchmove") {
            clientX = event.touches[index].clientX;
            clientY = event.touches[index].clientY;
        }
        if (event.type === "mousedown" || event.type === "mousemove") {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        return {
            clientX: clientX,
            clientY: clientY
        };
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.resetScale = /**
     * @return {?}
     */
    function () {
        this.scale = 1;
        this.moveX = 0;
        this.moveY = 0;
        this.updateInitialValues();
        this.transformElement(this.properties.transitionDuration);
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.updateInitialValues = /**
     * @return {?}
     */
    function () {
        this.initialScale = this.scale;
        this.initialMoveX = this.moveX;
        this.initialMoveY = this.moveY;
    };
    /**
     * @param {?} touches
     * @return {?}
     */
    IvyPinch.prototype.getDistance = /**
     * @param {?} touches
     * @return {?}
     */
    function (touches) {
        return Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2));
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getImageHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetHeight;
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getImageWidth = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetWidth;
    };
    /**
     * @param {?} duration
     * @return {?}
     */
    IvyPinch.prototype.transformElement = /**
     * @param {?} duration
     * @return {?}
     */
    function (duration) {
        this.element.style.transition = "all " + duration + "ms";
        this.element.style.transform = "matrix(" + Number(this.scale) + ", 0, 0, " + Number(this.scale) + ", " + Number(this.moveX) + ", " + Number(this.moveY) + ")";
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.isTouchScreen = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        if (('ontouchstart' in window)) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        /** @type {?} */
        var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return this.getMatchMedia(query);
    };
    /**
     * @param {?} query
     * @return {?}
     */
    IvyPinch.prototype.getMatchMedia = /**
     * @param {?} query
     * @return {?}
     */
    function (query) {
        return window.matchMedia(query).matches;
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.isDragging = /**
     * @return {?}
     */
    function () {
        if (this.properties.disablePan) {
            return false;
        }
        /** @type {?} */
        var imgHeight = this.getImageHeight();
        /** @type {?} */
        var imgWidth = this.getImageWidth();
        if (this.scale > 1) {
            return imgHeight * this.scale > this.parentElement.offsetHeight ||
                imgWidth * this.scale > this.parentElement.offsetWidth;
        }
        if (this.scale === 1) {
            return imgHeight > this.parentElement.offsetHeight ||
                imgWidth > this.parentElement.offsetWidth;
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.pollLimitZoom = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var poll = setInterval((/**
         * @return {?}
         */
        function () {
            if (_this.getLimitZoom()) {
                clearInterval(poll);
            }
        }), 10);
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.getImageElement = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            return imgElement[0];
        }
    };
    /**
     * @param {?=} event
     * @return {?}
     */
    IvyPinch.prototype.toggleZoom = /**
     * @param {?=} event
     * @return {?}
     */
    function (event) {
        if (event === void 0) { event = false; }
        if (this.initialScale === 1) {
            if (event && event.changedTouches) {
                if (this.properties.doubleTapScale === undefined) {
                    return;
                }
                /** @type {?} */
                var changedTouches = event.changedTouches;
                this.scale = this.initialScale * this.properties.doubleTapScale;
                this.moveX = this.initialMoveX - (changedTouches[0].clientX - this.elementPosition.left) * (this.properties.doubleTapScale - 1);
                this.moveY = this.initialMoveY - (changedTouches[0].clientY - this.elementPosition.top) * (this.properties.doubleTapScale - 1);
            }
            else {
                this.scale = this.initialScale * (this.properties.zoomControlScale + 1);
                this.moveX = this.initialMoveX - this.element.offsetWidth * (this.scale - 1) / 2;
                this.moveY = this.initialMoveY - this.element.offsetHeight * (this.scale - 1) / 2;
            }
            this.centeringImage();
            this.updateInitialValues();
            this.transformElement(this.properties.transitionDuration);
        }
        else {
            this.resetScale();
        }
    };
    /**
     * @param {?} properties
     * @return {?}
     */
    IvyPinch.prototype.setZoom = /**
     * @param {?} properties
     * @return {?}
     */
    function (properties) {
        this.scale = properties.scale;
        /** @type {?} */
        var xCenter;
        /** @type {?} */
        var yCenter;
        /** @type {?} */
        var visibleAreaWidth = this.element.offsetWidth;
        /** @type {?} */
        var visibleAreaHeight = this.element.offsetHeight;
        /** @type {?} */
        var scalingPercent = (visibleAreaWidth * this.scale) / (visibleAreaWidth * this.initialScale);
        if (properties.center) {
            xCenter = properties.center[0];
            yCenter = properties.center[1];
        }
        else {
            xCenter = visibleAreaWidth / 2 - this.initialMoveX;
            yCenter = visibleAreaHeight / 2 - this.initialMoveY;
        }
        this.moveX = this.initialMoveX - ((scalingPercent * xCenter) - xCenter);
        this.moveY = this.initialMoveY - ((scalingPercent * yCenter) - yCenter);
        this.centeringImage();
        this.updateInitialValues();
        this.transformElement(this.properties.transitionDuration);
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.alignImage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isMoveChanged = this.centeringImage();
        if (isMoveChanged) {
            this.updateInitialValues();
            this.transformElement(this.properties.transitionDuration);
        }
    };
    /**
     * @return {?}
     */
    IvyPinch.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.removeBasicStyles();
        this.touches.destroy();
    };
    return IvyPinch;
}());
export { IvyPinch };
if (false) {
    /** @type {?} */
    IvyPinch.prototype.properties;
    /** @type {?} */
    IvyPinch.prototype.touches;
    /** @type {?} */
    IvyPinch.prototype.element;
    /** @type {?} */
    IvyPinch.prototype.elementTarget;
    /** @type {?} */
    IvyPinch.prototype.parentElement;
    /** @type {?} */
    IvyPinch.prototype.i;
    /** @type {?} */
    IvyPinch.prototype.scale;
    /** @type {?} */
    IvyPinch.prototype.initialScale;
    /** @type {?} */
    IvyPinch.prototype.elementPosition;
    /** @type {?} */
    IvyPinch.prototype.eventType;
    /** @type {?} */
    IvyPinch.prototype.startX;
    /** @type {?} */
    IvyPinch.prototype.startY;
    /** @type {?} */
    IvyPinch.prototype.moveX;
    /** @type {?} */
    IvyPinch.prototype.moveY;
    /** @type {?} */
    IvyPinch.prototype.initialMoveX;
    /** @type {?} */
    IvyPinch.prototype.initialMoveY;
    /** @type {?} */
    IvyPinch.prototype.moveXC;
    /** @type {?} */
    IvyPinch.prototype.moveYC;
    /** @type {?} */
    IvyPinch.prototype.lastTap;
    /** @type {?} */
    IvyPinch.prototype.draggingMode;
    /** @type {?} */
    IvyPinch.prototype.distance;
    /** @type {?} */
    IvyPinch.prototype.doubleTapTimeout;
    /** @type {?} */
    IvyPinch.prototype.initialDistance;
    /** @type {?} */
    IvyPinch.prototype.events;
    /** @type {?} */
    IvyPinch.prototype.maxHtmlContentScale;
    /** @type {?} */
    IvyPinch.prototype.maxScale;
    /** @type {?} */
    IvyPinch.prototype.handleTouchstart;
    /** @type {?} */
    IvyPinch.prototype.handleTouchend;
    /** @type {?} */
    IvyPinch.prototype.handlePan;
    /** @type {?} */
    IvyPinch.prototype.handleDoubleTap;
    /** @type {?} */
    IvyPinch.prototype.handlePinch;
    /** @type {?} */
    IvyPinch.prototype.handleWheel;
    /** @type {?} */
    IvyPinch.prototype.handleResize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXZ5cGluY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGluY2gtem9vbS8iLCJzb3VyY2VzIjpbImxpYi9pdnlwaW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7Ozs7QUFFbEMsd0NBa0JDOzs7SUFqQkcscUNBQWdCOztJQUNoQixpQ0FBZTs7SUFDZix1Q0FBc0I7O0lBQ3RCLDRDQUEwQjs7SUFDMUIsOENBQTRCOztJQUM1QixnREFBOEI7O0lBQzlCLHlDQUF3Qjs7SUFDeEIsdUNBQTZDOztJQUM3Qyx3Q0FBdUI7O0lBQ3ZCLHNDQUFxQjs7SUFDckIsc0NBQW9COztJQUNwQiwwQ0FBcUI7O0lBQ3JCLHVDQUF5Qzs7SUFDekMsbUNBQWtCOztJQUNsQix3Q0FBdUI7O0lBQ3ZCLDZDQUEyQjs7SUFDM0IsNENBQTJCOzs7QUFHL0IsTUFBTSxLQUFPLHlCQUF5QixHQUFHO0lBQ3JDLFNBQVMsRUFBRSxJQUFJO0lBQ2YsY0FBYyxFQUFFLENBQUM7SUFDakIsa0JBQWtCLEVBQUUsR0FBRztJQUN2QixTQUFTLEVBQUUscUJBQXFCO0lBQ2hDLFFBQVEsRUFBRSxDQUFDO0lBQ1gsZUFBZSxFQUFFLEdBQUc7SUFDcEIsY0FBYyxFQUFFLElBQUk7Q0FDdkI7QUFFRDtJQTRCSSxrQkFBWSxVQUFlO1FBQTNCLGlCQXVDQztRQTdERCxNQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ1AsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUN6QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUd6QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFdBQU0sR0FBVyxDQUFDLENB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QkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDOzs7O0lBRUQsMEJBQU87OztJQUFQO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0wsZUFBQztBQUFELENBQUMsQUFobkJELElBZ25CQzs7OztJQS9tQkcsOEJBQStCOztJQUMvQiwyQkFBYTs7SUFDYiwyQkFBYTs7SUFDYixpQ0FBbUI7O0lBQ25CLGlDQUFtQjs7SUFDbkIscUJBQWM7O0lBQ2QseUJBQXlCOztJQUN6QixnQ0FBeUI7O0lBQ3pCLG1DQUFxQjs7SUFDckIsNkJBQWU7O0lBQ2YsMEJBQW1COztJQUNuQiwwQkFBbUI7O0lBQ25CLHlCQUFrQjs7SUFDbEIseUJBQWtCOztJQUNsQixnQ0FBeUI7O0lBQ3pCLGdDQUF5Qjs7SUFDekIsMEJBQW1COztJQUNuQiwwQkFBbUI7O0lBQ25CLDJCQUFvQjs7SUFDcEIsZ0NBQThCOztJQUM5Qiw0QkFBcUI7O0lBQ3JCLG9DQUE2Qjs7SUFDN0IsbUNBQTRCOztJQUM1QiwwQkFBaUI7O0lBQ2pCLHVDQUFnQzs7SUFDaEMsNEJBQXFCOztJQThDckIsb0NBTUM7O0lBS0Qsa0NBNkNDOztJQU9ELDZCQStCQzs7SUFFRCxtQ0FHQzs7SUFFRCwrQkFpQ0M7O0lBR0QsK0JBZ0NDOztJQUVELGdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUb3VjaGVzfSBmcm9tICcuL3RvdWNoZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEl2eVBpbmNoUHJvcGVydGllcyB7XG4gICAgZWxlbWVudDogc3RyaW5nO1xuICAgIGtleSA/IDogc3RyaW5nO1xuICAgIGRvdWJsZVRhcCA/IDogYm9vbGVhbjtcbiAgICBkb3VibGVUYXBTY2FsZSA/IDogbnVtYmVyO1xuICAgIHpvb21Db250cm9sU2NhbGUgPyA6IG51bWJlcjtcbiAgICB0cmFuc2l0aW9uRHVyYXRpb24gPyA6IG51bWJlcjtcbiAgICBhdXRvWm9vbU91dCA/IDogYm9vbGVhbjtcbiAgICBsaW1pdFpvb20gPyA6IG51bWJlciB8IFwib3JpZ2luYWwgaW1hZ2Ugc2l6ZVwiO1xuICAgIGRpc2FibGVQYW4gPyA6IGJvb2xlYW47XG4gICAgbGltaXRQYW4gPyA6IGJvb2xlYW47XG4gICAgbWluU2NhbGUgPyA6IG51bWJlcjtcbiAgICBldmVudEhhbmRsZXIgPyA6IGFueTtcbiAgICBsaXN0ZW5lcnMgPyA6IFwiYXV0b1wiIHwgXCJtb3VzZSBhbmQgdG91Y2hcIjtcbiAgICB3aGVlbCA/IDogYm9vbGVhbjtcbiAgICBhdXRvSGVpZ2h0ID8gOiBib29sZWFuO1xuICAgIHdoZWVsWm9vbUZhY3RvciA/IDogbnVtYmVyO1xuICAgIGRyYWdnYWJsZUltYWdlID8gOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgSXZ5UGluY2hEZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBkb3VibGVUYXA6IHRydWUsXG4gICAgZG91YmxlVGFwU2NhbGU6IDIsXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAyMDAsXG4gICAgbGltaXRab29tOiBcIm9yaWdpbmFsIGltYWdlIHNpemVcIixcbiAgICBtaW5TY2FsZTogMCxcbiAgICB3aGVlbFpvb21GYWN0b3I6IDAuMixcbiAgICBkcmFnZ2FibGVJbWFnZTogdHJ1ZVxufVxuXG5leHBvcnQgY2xhc3MgSXZ5UGluY2gge1xuICAgIHByb3BlcnRpZXM6IEl2eVBpbmNoUHJvcGVydGllcztcbiAgICB0b3VjaGVzOiBhbnk7XG4gICAgZWxlbWVudDogYW55O1xuICAgIGVsZW1lbnRUYXJnZXQ6IGFueTtcbiAgICBwYXJlbnRFbGVtZW50OiBhbnk7XG4gICAgaTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc2NhbGU6IG51bWJlciA9IDE7XG4gICAgaW5pdGlhbFNjYWxlOiBudW1iZXIgPSAxO1xuICAgIGVsZW1lbnRQb3NpdGlvbjogYW55O1xuICAgIGV2ZW50VHlwZTogYW55O1xuICAgIHN0YXJ0WDogbnVtYmVyID0gMDtcbiAgICBzdGFydFk6IG51bWJlciA9IDA7XG4gICAgbW92ZVg6IG51bWJlciA9IDA7XG4gICAgbW92ZVk6IG51bWJlciA9IDA7XG4gICAgaW5pdGlhbE1vdmVYOiBudW1iZXIgPSAwO1xuICAgIGluaXRpYWxNb3ZlWTogbnVtYmVyID0gMDtcbiAgICBtb3ZlWEM6IG51bWJlciA9IDA7XG4gICAgbW92ZVlDOiBudW1iZXIgPSAwO1xuICAgIGxhc3RUYXA6IG51bWJlciA9IDA7XG4gICAgZHJhZ2dpbmdNb2RlOiBib29sZWFuID0gZmFsc2U7XG4gICAgZGlzdGFuY2U6IG51bWJlciA9IDA7XG4gICAgZG91YmxlVGFwVGltZW91dDogbnVtYmVyID0gMDtcbiAgICBpbml0aWFsRGlzdGFuY2U6IG51bWJlciA9IDA7XG4gICAgZXZlbnRzOiBhbnkgPSB7fTtcbiAgICBtYXhIdG1sQ29udGVudFNjYWxlOiBudW1iZXIgPSAzO1xuICAgIG1heFNjYWxlOiBudW1iZXIgPSAxO1xuXG4gICAgY29uc3RydWN0b3IocHJvcGVydGllczogYW55KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHByb3BlcnRpZXMuZWxlbWVudDtcbiAgICAgICAgdGhpcy5lbGVtZW50VGFyZ2V0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyonKS50YWdOYW1lO1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgSXZ5UGluY2hEZWZhdWx0UHJvcGVydGllcywgcHJvcGVydGllcyk7XG5cbiAgICAgICAgdGhpcy50b3VjaGVzID0gbmV3IFRvdWNoZXMoe1xuICAgICAgICAgICAgZWxlbWVudDogcHJvcGVydGllcy5lbGVtZW50LFxuICAgICAgICAgICAgbGlzdGVuZXJzOiBwcm9wZXJ0aWVzLmxpc3RlbmVycyxcbiAgICAgICAgICAgIHJlc2l6ZTogcHJvcGVydGllcy5hdXRvSGVpZ2h0XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLyogSW5pdCAqL1xuICAgICAgICB0aGlzLnNldEJhc2ljU3R5bGVzKCk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogTGlzdGVuZXJzXG4gICAgICAgICAqL1xuXG4gICAgICAgIHRoaXMudG91Y2hlcy5vbigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hzdGFydCk7XG4gICAgICAgIHRoaXMudG91Y2hlcy5vbigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRvdWNoZW5kKTtcbiAgICAgICAgdGhpcy50b3VjaGVzLm9uKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVRvdWNoc3RhcnQpO1xuICAgICAgICB0aGlzLnRvdWNoZXMub24oJ21vdXNldXAnLCB0aGlzLmhhbmRsZVRvdWNoZW5kKTtcbiAgICAgICAgdGhpcy50b3VjaGVzLm9uKCdwYW4nLCB0aGlzLmhhbmRsZVBhbik7XG4gICAgICAgIHRoaXMudG91Y2hlcy5vbignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVQYW4pO1xuICAgICAgICB0aGlzLnRvdWNoZXMub24oJ3BpbmNoJywgdGhpcy5oYW5kbGVQaW5jaCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy53aGVlbCkge1xuICAgICAgICAgICAgdGhpcy50b3VjaGVzLm9uKCd3aGVlbCcsIHRoaXMuaGFuZGxlV2hlZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5kb3VibGVUYXApIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hlcy5vbignZG91YmxlLXRhcCcsIHRoaXMuaGFuZGxlRG91YmxlVGFwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy50b3VjaGVzLm9uKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIFRvdWNoc3RhcnQgKi9cblxuICAgIGhhbmRsZVRvdWNoc3RhcnQgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdldFRvdWNoc3RhcnRQb3NpdGlvbihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIFRvdWNoZW5kICovXG5cbiAgICBoYW5kbGVUb3VjaGVuZCA9IChldmVudDogYW55KSA9PiB7XG5cbiAgICAgICAgLyogdG91Y2hlbmQgKi9cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hlbmRcIikge1xuICAgICAgICAgICAgdGhpcy5pID0gMDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQudG91Y2hlcztcblxuICAgICAgICAgICAgLy8gTWluIHNjYWxlXG4gICAgICAgICAgICBpZiAodGhpcy5zY2FsZSA8IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQXV0byBab29tIE91dFxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5hdXRvWm9vbU91dCAmJiB0aGlzLmV2ZW50VHlwZSA9PT0gJ3BpbmNoJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBbGlnbiBpbWFnZVxuICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlID09PSAncGluY2gnIHx8IHRoaXMuZXZlbnRUeXBlID09PSAncGFuJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25JbWFnZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgaW5pdGlhbCB2YWx1ZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PT0gJ3BpbmNoJyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID09PSAncGFuJyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID09PSAnaG9yaXpvbnRhbC1zd2lwZScgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9PT0gJ3ZlcnRpY2FsLXN3aXBlJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbml0aWFsVmFsdWVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID0gJ3RvdWNoZW5kJztcblxuICAgICAgICAgICAgaWYgKHRvdWNoZXMgJiYgdG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIG1vdXNldXAgKi9cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2V1cFwiKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nTW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbml0aWFsVmFsdWVzKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiBIYW5kbGVyc1xuICAgICAqL1xuXG4gICAgaGFuZGxlUGFuID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NhbGUgPD0gMSB8fCB0aGlzLnByb3BlcnRpZXMuZGlzYWJsZVBhbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgfSA9IHRoaXMuZ2V0Q2xpZW50UG9zaXRpb24oZXZlbnQpO1xuXG4gICAgICAgIGlmICghdGhpcy5ldmVudFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYID0gY2xpZW50WCAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLmxlZnQ7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0WSA9IGNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3A7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV2ZW50VHlwZSA9ICdwYW4nO1xuICAgICAgICB0aGlzLm1vdmVYID0gdGhpcy5pbml0aWFsTW92ZVggKyAodGhpcy5tb3ZlTGVmdChldmVudCwgMCkgLSB0aGlzLnN0YXJ0WCk7XG4gICAgICAgIHRoaXMubW92ZVkgPSB0aGlzLmluaXRpYWxNb3ZlWSArICh0aGlzLm1vdmVUb3AoZXZlbnQsIDApIC0gdGhpcy5zdGFydFkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMubGltaXRQYW4pIHtcbiAgICAgICAgICAgIHRoaXMubGltaXRQYW5ZKCk7XG4gICAgICAgICAgICB0aGlzLmxpbWl0UGFuWCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogbW91c2Vtb3ZlICovXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlbW92ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmluZ0ltYWdlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zZm9ybUVsZW1lbnQoMCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRG91YmxlVGFwID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy50b2dnbGVab29tKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhhbmRsZVBpbmNoID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5ldmVudFR5cGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ3BpbmNoJykge1xuICAgICAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXM7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ldmVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxEaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2UodG91Y2hlcyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlTGVmdDAgPSB0aGlzLm1vdmVMZWZ0KGV2ZW50LCAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlTGVmdDEgPSB0aGlzLm1vdmVMZWZ0KGV2ZW50LCAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlVG9wMCA9IHRoaXMubW92ZVRvcChldmVudCwgMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZVRvcDEgPSB0aGlzLm1vdmVUb3AoZXZlbnQsIDEpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWEMgPSAoKG1vdmVMZWZ0MCArIG1vdmVMZWZ0MSkgLyAyKSAtIHRoaXMuaW5pdGlhbE1vdmVYO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVlDID0gKChtb3ZlVG9wMCArIG1vdmVUb3AxKSAvIDIpIC0gdGhpcy5pbml0aWFsTW92ZVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID0gJ3BpbmNoJztcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlKHRvdWNoZXMpO1xuICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuaW5pdGlhbFNjYWxlICogKHRoaXMuZGlzdGFuY2UgLyB0aGlzLmluaXRpYWxEaXN0YW5jZSk7XG4gICAgICAgICAgICB0aGlzLm1vdmVYID0gdGhpcy5pbml0aWFsTW92ZVggLSAoKCh0aGlzLmRpc3RhbmNlIC8gdGhpcy5pbml0aWFsRGlzdGFuY2UpICogdGhpcy5tb3ZlWEMpIC0gdGhpcy5tb3ZlWEMpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IHRoaXMuaW5pdGlhbE1vdmVZIC0gKCgodGhpcy5kaXN0YW5jZSAvIHRoaXMuaW5pdGlhbERpc3RhbmNlKSAqIHRoaXMubW92ZVlDKSAtIHRoaXMubW92ZVlDKTtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVMaW1pdFpvb20oKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5saW1pdFBhbikge1xuICAgICAgICAgICAgICAgIHRoaXMubGltaXRQYW5ZKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5saW1pdFBhblgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBoYW5kbGVXaGVlbCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHpvb21GYWN0b3IgPSBldmVudC5kZWx0YVkgPCAwID8gKHRoaXMucHJvcGVydGllcy53aGVlbFpvb21GYWN0b3IpIDogKC0gdGhpcy5wcm9wZXJ0aWVzLndoZWVsWm9vbUZhY3Rvcik7XG4gICAgICAgIGxldCBuZXdTY2FsZSA9IHRoaXMuaW5pdGlhbFNjYWxlICsgem9vbUZhY3RvcjtcblxuICAgICAgICAvKiBSb3VuZCB2YWx1ZSAqL1xuICAgICAgICBpZiAobmV3U2NhbGUgPCAoMSArIHRoaXMucHJvcGVydGllcy53aGVlbFpvb21GYWN0b3IpKSB7XG4gICAgICAgICAgICBuZXdTY2FsZSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3U2NhbGUgPCB0aGlzLm1heFNjYWxlICYmIG5ld1NjYWxlID4gdGhpcy5tYXhTY2FsZSAtIHRoaXMucHJvcGVydGllcy53aGVlbFpvb21GYWN0b3IpIHtcbiAgICAgICAgICAgIG5ld1NjYWxlID0gdGhpcy5tYXhTY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY2FsZSA8IDEgfHwgbmV3U2NhbGUgPiB0aGlzLm1heFNjYWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3U2NhbGUgPT09IHRoaXMuc2NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBuZXdTY2FsZTtcblxuICAgICAgICAvKiBHZXQgY3Vyc29yIHBvc2l0aW9uIG92ZXIgaW1hZ2UgKi9cbiAgICAgICAgbGV0IHhDZW50ZXIgPSAoZXZlbnQuY2xpZW50WCAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLmxlZnQpIC0gdGhpcy5pbml0aWFsTW92ZVg7XG4gICAgICAgIGxldCB5Q2VudGVyID0gKGV2ZW50LmNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3ApIC0gdGhpcy5pbml0aWFsTW92ZVk7XG5cbiAgICAgICAgdGhpcy5zZXRab29tKHtcbiAgICAgICAgICAgIHNjYWxlOiBuZXdTY2FsZSxcbiAgICAgICAgICAgIGNlbnRlcjogW3hDZW50ZXIsIHlDZW50ZXJdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc2l6ZSA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0QXV0b0hlaWdodCgpO1xuICAgIH1cblxuICAgIGhhbmRsZUxpbWl0Wm9vbSgpIHtcbiAgICAgICAgY29uc3QgbGltaXRab29tID0gdGhpcy5tYXhTY2FsZTtcbiAgICAgICAgY29uc3QgbWluU2NhbGUgPSB0aGlzLnByb3BlcnRpZXMubWluU2NhbGU7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhbGUgPiBsaW1pdFpvb20gfHwgdGhpcy5zY2FsZSA8PSBtaW5TY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VXaWR0aCA9IHRoaXMuZ2V0SW1hZ2VXaWR0aCgpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VIZWlnaHQgPSB0aGlzLmdldEltYWdlSGVpZ2h0KCk7XG4gICAgICAgICAgICBjb25zdCBlbmxhcmdlZEltYWdlV2lkdGggPSBpbWFnZVdpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IGVubGFyZ2VkSW1hZ2VIZWlnaHQgPSBpbWFnZUhlaWdodCAqIHRoaXMuc2NhbGU7XG4gICAgICAgICAgICBjb25zdCBtb3ZlWFJhdGlvID0gdGhpcy5tb3ZlWCAvIChlbmxhcmdlZEltYWdlV2lkdGggLSBpbWFnZVdpZHRoKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVZUmF0aW8gPSB0aGlzLm1vdmVZIC8gKGVubGFyZ2VkSW1hZ2VIZWlnaHQgLSBpbWFnZUhlaWdodCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjYWxlID4gbGltaXRab29tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IGxpbWl0Wm9vbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgPD0gbWluU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gbWluU2NhbGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlV2lkdGggPSBpbWFnZVdpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlSGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgICAgICB0aGlzLm1vdmVYID0gLU1hdGguYWJzKChtb3ZlWFJhdGlvICogKG5ld0ltYWdlV2lkdGggLSBpbWFnZVdpZHRoKSkpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IC1NYXRoLmFicygoLW1vdmVZUmF0aW8gKiAobmV3SW1hZ2VIZWlnaHQgLSBpbWFnZUhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExpbWl0Wm9vbSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5saW1pdFpvb20gPT09IFwib3JpZ2luYWwgaW1hZ2Ugc2l6ZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50VGFyZ2V0ID09PSBcIklNR1wiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKVswXTtcblxuICAgICAgICAgICAgICAgIGlmIChpbWcubmF0dXJhbFdpZHRoICYmIGltZy5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1heFNjYWxlID0gaW1nLm5hdHVyYWxXaWR0aCAvIGltZy5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF4U2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNjYWxlID0gdGhpcy5tYXhIdG1sQ29udGVudFNjYWxlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1heFNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXhTY2FsZSA9IHRoaXMucHJvcGVydGllcy5saW1pdFpvb207XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXhTY2FsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVMZWZ0KGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNvbnN0IGNsaWVudFggPSB0aGlzLmdldENsaWVudFBvc2l0aW9uKGV2ZW50LCBpbmRleCkuY2xpZW50WDtcbiAgICAgICAgcmV0dXJuIGNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xuICAgIH1cblxuICAgIG1vdmVUb3AoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlciA9IDApIHtcbiAgICAgICAgY29uc3QgY2xpZW50WSA9IHRoaXMuZ2V0Q2xpZW50UG9zaXRpb24oZXZlbnQsIGluZGV4KS5jbGllbnRZO1xuICAgICAgICByZXR1cm4gY2xpZW50WSAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcDtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogRGV0ZWN0aW9uXG4gICAgICovXG5cbiAgICBjZW50ZXJpbmdJbWFnZSgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldClbMF07XG4gICAgICAgIGNvbnN0IGluaXRpYWxNb3ZlWCA9IHRoaXMubW92ZVg7XG4gICAgICAgIGNvbnN0IGluaXRpYWxNb3ZlWSA9IHRoaXMubW92ZVk7XG5cbiAgICAgICAgaWYgKHRoaXMubW92ZVkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb3ZlWCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGltZykge1xuICAgICAgICAgICAgdGhpcy5saW1pdFBhblkoKTtcbiAgICAgICAgICAgIHRoaXMubGltaXRQYW5YKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGltZyAmJiB0aGlzLnNjYWxlIDwgMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubW92ZVggPCB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggKiAoMSAtIHRoaXMuc2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCAqICgxIC0gdGhpcy5zY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5pdGlhbE1vdmVYICE9PSB0aGlzLm1vdmVYIHx8IGluaXRpYWxNb3ZlWSAhPT0gdGhpcy5tb3ZlWTtcbiAgICB9XG5cbiAgICBsaW1pdFBhblkoKSB7XG4gICAgICAgIGNvbnN0IGltZ0hlaWdodCA9IHRoaXMuZ2V0SW1hZ2VIZWlnaHQoKTtcbiAgICAgICAgY29uc3Qgc2NhbGVkSW1nSGVpZ2h0ID0gaW1nSGVpZ2h0ICogdGhpcy5zY2FsZTtcbiAgICAgICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHNjYWxlZEltZ0hlaWdodCA8IHBhcmVudEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IChwYXJlbnRIZWlnaHQgLSBlbGVtZW50SGVpZ2h0ICogdGhpcy5zY2FsZSkgLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW1nT2Zmc2V0VG9wID0gKChpbWdIZWlnaHQgLSBlbGVtZW50SGVpZ2h0KSAqIHRoaXMuc2NhbGUpIC8gMjtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZVkgPiBpbWdPZmZzZXRUb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVZID0gaW1nT2Zmc2V0VG9wO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoc2NhbGVkSW1nSGVpZ2h0ICsgTWF0aC5hYnMoaW1nT2Zmc2V0VG9wKSAtIHBhcmVudEhlaWdodCkgKyB0aGlzLm1vdmVZIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVkgPSAtKHNjYWxlZEltZ0hlaWdodCArIE1hdGguYWJzKGltZ09mZnNldFRvcCkgLSBwYXJlbnRIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGltaXRQYW5YKCkge1xuICAgICAgICBjb25zdCBpbWdXaWR0aCA9IHRoaXMuZ2V0SW1hZ2VXaWR0aCgpO1xuICAgICAgICBjb25zdCBzY2FsZWRJbWdXaWR0aCA9IGltZ1dpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgY29uc3QgcGFyZW50V2lkdGggPSB0aGlzLnBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBpZiAoc2NhbGVkSW1nV2lkdGggPCBwYXJlbnRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IChwYXJlbnRXaWR0aCAtIGVsZW1lbnRXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGltZ09mZnNldExlZnQgPSAoKGltZ1dpZHRoIC0gZWxlbWVudFdpZHRoKSAqIHRoaXMuc2NhbGUpIC8gMjtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZVggPiBpbWdPZmZzZXRMZWZ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IGltZ09mZnNldExlZnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChzY2FsZWRJbWdXaWR0aCArIE1hdGguYWJzKGltZ09mZnNldExlZnQpIC0gcGFyZW50V2lkdGgpICsgdGhpcy5tb3ZlWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVYID0gLShpbWdXaWR0aCAqIHRoaXMuc2NhbGUgKyBNYXRoLmFicyhpbWdPZmZzZXRMZWZ0KSAtIHBhcmVudFdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEJhc2ljU3R5bGVzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnMCAwJztcbiAgICAgICAgdGhpcy5zZXRJbWFnZVNpemUoKTtcbiAgICAgICAgdGhpcy5zZXREcmFnZ2FibGVJbWFnZSgpO1xuICAgIH1cblxuICAgIHJlbW92ZUJhc2ljU3R5bGVzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9ICcnO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnJztcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICcnO1xuICAgICAgICB0aGlzLnJlbW92ZUltYWdlU2l6ZSgpO1xuICAgICAgICB0aGlzLnJlbW92ZURyYWdnYWJsZUltYWdlKCk7XG4gICAgfVxuXG4gICAgc2V0RHJhZ2dhYmxlSW1hZ2UoKSB7XG4gICAgICAgIGNvbnN0IGltZ0VsZW1lbnQgPSB0aGlzLmdldEltYWdlRWxlbWVudCgpO1xuXG4gICAgICAgIGlmIChpbWdFbGVtZW50KSB7XG4gICAgICAgICAgICBpbWdFbGVtZW50LmRyYWdnYWJsZSA9IHRoaXMucHJvcGVydGllcy5kcmFnZ2FibGVJbWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZURyYWdnYWJsZUltYWdlKCkge1xuICAgICAgICBjb25zdCBpbWdFbGVtZW50ID0gdGhpcy5nZXRJbWFnZUVsZW1lbnQoKTtcblxuICAgICAgICBpZiAoaW1nRWxlbWVudCkge1xuICAgICAgICAgICAgaW1nRWxlbWVudC5kcmFnZ2FibGUgPSAhdGhpcy5wcm9wZXJ0aWVzLmRyYWdnYWJsZUltYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW1hZ2VTaXplKCkge1xuICAgICAgICBjb25zdCBpbWdFbGVtZW50ID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldCk7XG5cbiAgICAgICAgaWYgKGltZ0VsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbWdFbGVtZW50WzBdLnN0eWxlLm1heFdpZHRoID0gJzEwMCUnO1xuICAgICAgICAgICAgaW1nRWxlbWVudFswXS5zdHlsZS5tYXhIZWlnaHQgPSAnMTAwJSc7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QXV0b0hlaWdodCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QXV0b0hlaWdodCgpIHtcbiAgICAgICAgY29uc3QgaW1nRWxlbWVudCA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzLmVsZW1lbnRUYXJnZXQpO1xuXG4gICAgICAgIGlmICghdGhpcy5wcm9wZXJ0aWVzLmF1dG9IZWlnaHQgfHwgIWltZ0VsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbWdOYXR1cmFsV2lkdGggPSBpbWdFbGVtZW50WzBdLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpO1xuICAgICAgICBjb25zdCBpbWdOYXR1cmFsSGVpZ2h0ID0gaW1nRWxlbWVudFswXS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIik7XG4gICAgICAgIGNvbnN0IHNpemVSYXRpbyA9IGltZ05hdHVyYWxXaWR0aCAvIGltZ05hdHVyYWxIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIGltZ0VsZW1lbnRbMF0uc3R5bGUubWF4SGVpZ2h0ID0gcGFyZW50V2lkdGggLyBzaXplUmF0aW8gKyBcInB4XCI7XG4gICAgfVxuXG4gICAgcmVtb3ZlSW1hZ2VTaXplKCkge1xuICAgICAgICBjb25zdCBpbWdFbGVtZW50ID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldCk7XG5cbiAgICAgICAgaWYgKGltZ0VsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbWdFbGVtZW50WzBdLnN0eWxlLm1heFdpZHRoID0gJyc7XG4gICAgICAgICAgICBpbWdFbGVtZW50WzBdLnN0eWxlLm1heEhlaWdodCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudFBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRQb3NpdGlvbiA9IHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIGdldFRvdWNoc3RhcnRQb3NpdGlvbihldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZXG4gICAgICAgIH0gPSB0aGlzLmdldENsaWVudFBvc2l0aW9uKGV2ZW50KTtcblxuICAgICAgICB0aGlzLnN0YXJ0WCA9IGNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xuICAgICAgICB0aGlzLnN0YXJ0WSA9IGNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3A7XG4gICAgfVxuXG4gICAgZ2V0Q2xpZW50UG9zaXRpb24oZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlciA9IDApIHtcbiAgICAgICAgbGV0IGNsaWVudFg7XG4gICAgICAgIGxldCBjbGllbnRZO1xuXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoc3RhcnRcIiB8fCBldmVudC50eXBlID09PSBcInRvdWNobW92ZVwiKSB7XG4gICAgICAgICAgICBjbGllbnRYID0gZXZlbnQudG91Y2hlc1tpbmRleF0uY2xpZW50WDtcbiAgICAgICAgICAgIGNsaWVudFkgPSBldmVudC50b3VjaGVzW2luZGV4XS5jbGllbnRZO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlZG93blwiIHx8IGV2ZW50LnR5cGUgPT09IFwibW91c2Vtb3ZlXCIpIHtcbiAgICAgICAgICAgIGNsaWVudFggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgY2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXNldFNjYWxlKCkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5tb3ZlWCA9IDA7XG4gICAgICAgIHRoaXMubW92ZVkgPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZUluaXRpYWxWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KHRoaXMucHJvcGVydGllcy50cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIH1cblxuICAgIHVwZGF0ZUluaXRpYWxWYWx1ZXMoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICAgICAgdGhpcy5pbml0aWFsTW92ZVggPSB0aGlzLm1vdmVYO1xuICAgICAgICB0aGlzLmluaXRpYWxNb3ZlWSA9IHRoaXMubW92ZVk7XG4gICAgfVxuXG4gICAgZ2V0RGlzdGFuY2UodG91Y2hlczogYW55KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codG91Y2hlc1swXS5wYWdlWCAtIHRvdWNoZXNbMV0ucGFnZVgsIDIpICsgTWF0aC5wb3codG91Y2hlc1swXS5wYWdlWSAtIHRvdWNoZXNbMV0ucGFnZVksIDIpKTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZUhlaWdodCgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldClbMF07XG4gICAgICAgIHJldHVybiBpbWcub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIGdldEltYWdlV2lkdGgoKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzLmVsZW1lbnRUYXJnZXQpWzBdO1xuICAgICAgICByZXR1cm4gaW1nLm9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIHRyYW5zZm9ybUVsZW1lbnQoZHVyYXRpb246IGFueSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiYWxsIFwiICsgZHVyYXRpb24gKyBcIm1zXCI7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIm1hdHJpeChcIiArIE51bWJlcih0aGlzLnNjYWxlKSArIFwiLCAwLCAwLCBcIiArIE51bWJlcih0aGlzLnNjYWxlKSArIFwiLCBcIiArIE51bWJlcih0aGlzLm1vdmVYKSArIFwiLCBcIiArIE51bWJlcih0aGlzLm1vdmVZKSArIFwiKVwiO1xuICAgIH1cblxuICAgIGlzVG91Y2hTY3JlZW4oKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeGVzID0gJyAtd2Via2l0LSAtbW96LSAtby0gLW1zLSAnLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluY2x1ZGUgdGhlICdoZWFydHonIGFzIGEgd2F5IHRvIGhhdmUgYSBub24gbWF0Y2hpbmcgTVEgdG8gaGVscCB0ZXJtaW5hdGUgdGhlIGpvaW5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXQuaW8vdnpuRkhcbiAgICAgICAgY29uc3QgcXVlcnkgPSBbJygnLCBwcmVmaXhlcy5qb2luKCd0b3VjaC1lbmFibGVkKSwoJyksICdoZWFydHonLCAnKSddLmpvaW4oJycpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYXRjaE1lZGlhKHF1ZXJ5KTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaE1lZGlhKHF1ZXJ5OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICAgIH1cblxuICAgIGlzRHJhZ2dpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuZGlzYWJsZVBhbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW1nSGVpZ2h0ID0gdGhpcy5nZXRJbWFnZUhlaWdodCgpO1xuICAgICAgICBjb25zdCBpbWdXaWR0aCA9IHRoaXMuZ2V0SW1hZ2VXaWR0aCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYWxlID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGltZ0hlaWdodCAqIHRoaXMuc2NhbGUgPiB0aGlzLnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8XG4gICAgICAgICAgICAgICAgaW1nV2lkdGggKiB0aGlzLnNjYWxlID4gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNjYWxlID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1nSGVpZ2h0ID4gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodCB8fFxuICAgICAgICAgICAgICAgIGltZ1dpZHRoID4gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9sbExpbWl0Wm9vbSgpIHtcbiAgICAgICAgbGV0IHBvbGwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRMaW1pdFpvb20oKSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocG9sbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGltZ0VsZW1lbnQgPSB0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGhpcy5lbGVtZW50VGFyZ2V0KTtcblxuICAgICAgICBpZiAoaW1nRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbWdFbGVtZW50WzBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlWm9vbShldmVudDogYW55ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFNjYWxlID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmRvdWJsZVRhcFNjYWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWRUb3VjaGVzID0gZXZlbnQuY2hhbmdlZFRvdWNoZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuaW5pdGlhbFNjYWxlICogdGhpcy5wcm9wZXJ0aWVzLmRvdWJsZVRhcFNjYWxlO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVggPSB0aGlzLmluaXRpYWxNb3ZlWCAtIChjaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5lbGVtZW50UG9zaXRpb24ubGVmdCkgKiAodGhpcy5wcm9wZXJ0aWVzLmRvdWJsZVRhcFNjYWxlIC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IHRoaXMuaW5pdGlhbE1vdmVZIC0gKGNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3ApICogKHRoaXMucHJvcGVydGllcy5kb3VibGVUYXBTY2FsZSAtIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gdGhpcy5pbml0aWFsU2NhbGUgKiAodGhpcy5wcm9wZXJ0aWVzLnpvb21Db250cm9sU2NhbGUgKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVYID0gdGhpcy5pbml0aWFsTW92ZVggLSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggKiAodGhpcy5zY2FsZSAtIDEpIC8gMjtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVZID0gdGhpcy5pbml0aWFsTW92ZVkgLSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0ICogKHRoaXMuc2NhbGUgLSAxKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2VudGVyaW5nSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5pdGlhbFZhbHVlcygpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KHRoaXMucHJvcGVydGllcy50cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXNldFNjYWxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRab29tKHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2NhbGU6IG51bWJlcixcbiAgICAgICAgY2VudGVyPzogbnVtYmVyW11cbiAgICB9KSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBwcm9wZXJ0aWVzLnNjYWxlO1xuXG4gICAgICAgIGxldCB4Q2VudGVyO1xuICAgICAgICBsZXQgeUNlbnRlcjtcbiAgICAgICAgbGV0IHZpc2libGVBcmVhV2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCB2aXNpYmxlQXJlYUhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBzY2FsaW5nUGVyY2VudCA9ICh2aXNpYmxlQXJlYVdpZHRoICogdGhpcy5zY2FsZSkgLyAodmlzaWJsZUFyZWFXaWR0aCAqIHRoaXMuaW5pdGlhbFNjYWxlKTtcblxuICAgICAgICBpZiAocHJvcGVydGllcy5jZW50ZXIpIHtcbiAgICAgICAgICAgIHhDZW50ZXIgPSBwcm9wZXJ0aWVzLmNlbnRlclswXTtcbiAgICAgICAgICAgIHlDZW50ZXIgPSBwcm9wZXJ0aWVzLmNlbnRlclsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHhDZW50ZXIgPSB2aXNpYmxlQXJlYVdpZHRoIC8gMiAtIHRoaXMuaW5pdGlhbE1vdmVYO1xuICAgICAgICAgICAgeUNlbnRlciA9IHZpc2libGVBcmVhSGVpZ2h0IC8gMiAtIHRoaXMuaW5pdGlhbE1vdmVZO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlWCA9IHRoaXMuaW5pdGlhbE1vdmVYIC0gKChzY2FsaW5nUGVyY2VudCAqIHhDZW50ZXIpIC0geENlbnRlcik7XG4gICAgICAgIHRoaXMubW92ZVkgPSB0aGlzLmluaXRpYWxNb3ZlWSAtICgoc2NhbGluZ1BlcmNlbnQgKiB5Q2VudGVyKSAtIHlDZW50ZXIpO1xuXG4gICAgICAgIHRoaXMuY2VudGVyaW5nSW1hZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbml0aWFsVmFsdWVzKCk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudCh0aGlzLnByb3BlcnRpZXMudHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICBhbGlnbkltYWdlKCkge1xuICAgICAgICBjb25zdCBpc01vdmVDaGFuZ2VkID0gdGhpcy5jZW50ZXJpbmdJbWFnZSgpO1xuXG4gICAgICAgIGlmIChpc01vdmVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUluaXRpYWxWYWx1ZXMoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudCh0aGlzLnByb3BlcnRpZXMudHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQmFzaWNTdHlsZXMoKTtcbiAgICAgICAgdGhpcy50b3VjaGVzLmRlc3Ryb3koKTtcbiAgICB9XG59Il19