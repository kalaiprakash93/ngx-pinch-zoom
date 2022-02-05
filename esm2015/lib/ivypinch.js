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
export const IvyPinchDefaultProperties = {
    doubleTap: true,
    doubleTapScale: 2,
    transitionDuration: 200,
    limitZoom: "original image size",
    minScale: 0,
    wheelZoomFactor: 0.2,
    draggableImage: true
};
export class IvyPinch {
    /**
     * @param {?} properties
     */
    constructor(properties) {
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
        (event) => {
            this.getElementPosition();
            if (this.eventType === undefined) {
                this.getTouchstartPosition(event);
            }
        });
        /* Touchend */
        this.handleTouchend = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /* touchend */
            if (event.type === "touchend") {
                this.i = 0;
                this.draggingMode = false;
                /** @type {?} */
                const touches = event.touches;
                // Min scale
                if (this.scale < 1) {
                    this.scale = 1;
                }
                // Auto Zoom Out
                if (this.properties.autoZoomOut && this.eventType === 'pinch') {
                    this.scale = 1;
                }
                // Align image
                if (this.eventType === 'pinch' || this.eventType === 'pan') {
                    this.alignImage();
                }
                // Update initial values
                if (this.eventType === 'pinch' ||
                    this.eventType === 'pan' ||
                    this.eventType === 'horizontal-swipe' ||
                    this.eventType === 'vertical-swipe') {
                    this.updateInitialValues();
                }
                this.eventType = 'touchend';
                if (touches && touches.length === 0) {
                    this.eventType = undefined;
                }
            }
            /* mouseup */
            if (event.type === "mouseup") {
                this.draggingMode = false;
                this.updateInitialValues();
                this.eventType = undefined;
            }
        });
        /*
             * Handlers
             */
        this.handlePan = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (this.scale <= 1 || this.properties.disablePan) {
                return;
            }
            event.preventDefault();
            const { clientX, clientY } = this.getClientPosition(event);
            if (!this.eventType) {
                this.startX = clientX - this.elementPosition.left;
                this.startY = clientY - this.elementPosition.top;
            }
            this.eventType = 'pan';
            this.moveX = this.initialMoveX + (this.moveLeft(event, 0) - this.startX);
            this.moveY = this.initialMoveY + (this.moveTop(event, 0) - this.startY);
            if (this.properties.limitPan) {
                this.limitPanY();
                this.limitPanX();
            }
            /* mousemove */
            if (event.type === "mousemove") {
                this.centeringImage();
            }
            this.transformElement(0);
        });
        this.handleDoubleTap = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.toggleZoom(event);
            return;
        });
        this.handlePinch = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.preventDefault();
            if (this.eventType === undefined || this.eventType === 'pinch') {
                /** @type {?} */
                const touches = event.touches;
                if (!this.eventType) {
                    this.initialDistance = this.getDistance(touches);
                    /** @type {?} */
                    const moveLeft0 = this.moveLeft(event, 0);
                    /** @type {?} */
                    const moveLeft1 = this.moveLeft(event, 1);
                    /** @type {?} */
                    const moveTop0 = this.moveTop(event, 0);
                    /** @type {?} */
                    const moveTop1 = this.moveTop(event, 1);
                    this.moveXC = ((moveLeft0 + moveLeft1) / 2) - this.initialMoveX;
                    this.moveYC = ((moveTop0 + moveTop1) / 2) - this.initialMoveY;
                }
                this.eventType = 'pinch';
                this.distance = this.getDistance(touches);
                this.scale = this.initialScale * (this.distance / this.initialDistance);
                this.moveX = this.initialMoveX - (((this.distance / this.initialDistance) * this.moveXC) - this.moveXC);
                this.moveY = this.initialMoveY - (((this.distance / this.initialDistance) * this.moveYC) - this.moveYC);
                this.handleLimitZoom();
                if (this.properties.limitPan) {
                    this.limitPanY();
                    this.limitPanX();
                }
                this.transformElement(0);
            }
        });
        this.handleWheel = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            event.preventDefault();
            /** @type {?} */
            let zoomFactor = event.deltaY < 0 ? (this.properties.wheelZoomFactor) : (-this.properties.wheelZoomFactor);
            /** @type {?} */
            let newScale = this.initialScale + zoomFactor;
            /* Round value */
            if (newScale < (1 + this.properties.wheelZoomFactor)) {
                newScale = 1;
            }
            else if (newScale < this.maxScale && newScale > this.maxScale - this.properties.wheelZoomFactor) {
                newScale = this.maxScale;
            }
            if (newScale < 1 || newScale > this.maxScale) {
                return;
            }
            if (newScale === this.scale) {
                return;
            }
            this.getElementPosition();
            this.scale = newScale;
            /* Get cursor position over image */
            /** @type {?} */
            let xCenter = (event.clientX - this.elementPosition.left) - this.initialMoveX;
            /** @type {?} */
            let yCenter = (event.clientY - this.elementPosition.top) - this.initialMoveY;
            this.setZoom({
                scale: newScale,
                center: [xCenter, yCenter]
            });
        });
        this.handleResize = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.setAutoHeight();
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
    handleLimitZoom() {
        /** @type {?} */
        const limitZoom = this.maxScale;
        /** @type {?} */
        const minScale = this.properties.minScale;
        if (this.scale > limitZoom || this.scale <= minScale) {
            /** @type {?} */
            const imageWidth = this.getImageWidth();
            /** @type {?} */
            const imageHeight = this.getImageHeight();
            /** @type {?} */
            const enlargedImageWidth = imageWidth * this.scale;
            /** @type {?} */
            const enlargedImageHeight = imageHeight * this.scale;
            /** @type {?} */
            const moveXRatio = this.moveX / (enlargedImageWidth - imageWidth);
            /** @type {?} */
            const moveYRatio = this.moveY / (enlargedImageHeight - imageHeight);
            if (this.scale > limitZoom) {
                this.scale = limitZoom;
            }
            if (this.scale <= minScale) {
                this.scale = minScale;
            }
            /** @type {?} */
            const newImageWidth = imageWidth * this.scale;
            /** @type {?} */
            const newImageHeight = imageHeight * this.scale;
            this.moveX = -Math.abs((moveXRatio * (newImageWidth - imageWidth)));
            this.moveY = -Math.abs((-moveYRatio * (newImageHeight - imageHeight)));
        }
    }
    /**
     * @return {?}
     */
    getLimitZoom() {
        if (this.properties.limitZoom === "original image size") {
            if (this.elementTarget === "IMG") {
                /** @type {?} */
                let img = this.element.getElementsByTagName("img")[0];
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
    }
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    moveLeft(event, index = 0) {
        /** @type {?} */
        const clientX = this.getClientPosition(event, index).clientX;
        return clientX - this.elementPosition.left;
    }
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    moveTop(event, index = 0) {
        /** @type {?} */
        const clientY = this.getClientPosition(event, index).clientY;
        return clientY - this.elementPosition.top;
    }
    /*
         * Detection
         */
    /**
     * @return {?}
     */
    centeringImage() {
        /** @type {?} */
        const img = this.element.getElementsByTagName(this.elementTarget)[0];
        /** @type {?} */
        const initialMoveX = this.moveX;
        /** @type {?} */
        const initialMoveY = this.moveY;
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
    }
    /**
     * @return {?}
     */
    limitPanY() {
        /** @type {?} */
        const imgHeight = this.getImageHeight();
        /** @type {?} */
        const scaledImgHeight = imgHeight * this.scale;
        /** @type {?} */
        const parentHeight = this.parentElement.offsetHeight;
        /** @type {?} */
        const elementHeight = this.element.offsetHeight;
        if (scaledImgHeight < parentHeight) {
            this.moveY = (parentHeight - elementHeight * this.scale) / 2;
        }
        else {
            /** @type {?} */
            const imgOffsetTop = ((imgHeight - elementHeight) * this.scale) / 2;
            if (this.moveY > imgOffsetTop) {
                this.moveY = imgOffsetTop;
            }
            else if ((scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight) + this.moveY < 0) {
                this.moveY = -(scaledImgHeight + Math.abs(imgOffsetTop) - parentHeight);
            }
        }
    }
    /**
     * @return {?}
     */
    limitPanX() {
        /** @type {?} */
        const imgWidth = this.getImageWidth();
        /** @type {?} */
        const scaledImgWidth = imgWidth * this.scale;
        /** @type {?} */
        const parentWidth = this.parentElement.offsetWidth;
        /** @type {?} */
        const elementWidth = this.element.offsetWidth;
        if (scaledImgWidth < parentWidth) {
            this.moveX = (parentWidth - elementWidth * this.scale) / 2;
        }
        else {
            /** @type {?} */
            const imgOffsetLeft = ((imgWidth - elementWidth) * this.scale) / 2;
            if (this.moveX > imgOffsetLeft) {
                this.moveX = imgOffsetLeft;
            }
            else if ((scaledImgWidth + Math.abs(imgOffsetLeft) - parentWidth) + this.moveX < 0) {
                this.moveX = -(imgWidth * this.scale + Math.abs(imgOffsetLeft) - parentWidth);
            }
        }
    }
    /**
     * @return {?}
     */
    setBasicStyles() {
        this.element.style.display = 'flex';
        this.element.style.alignItems = 'center';
        this.element.style.justifyContent = 'center';
        this.element.style.transformOrigin = '0 0';
        this.setImageSize();
        this.setDraggableImage();
    }
    /**
     * @return {?}
     */
    removeBasicStyles() {
        this.element.style.display = '';
        this.element.style.alignItems = '';
        this.element.style.justifyContent = '';
        this.element.style.transformOrigin = '';
        this.removeImageSize();
        this.removeDraggableImage();
    }
    /**
     * @return {?}
     */
    setDraggableImage() {
        /** @type {?} */
        const imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = this.properties.draggableImage;
        }
    }
    /**
     * @return {?}
     */
    removeDraggableImage() {
        /** @type {?} */
        const imgElement = this.getImageElement();
        if (imgElement) {
            imgElement.draggable = !this.properties.draggableImage;
        }
    }
    /**
     * @return {?}
     */
    setImageSize() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '100%';
            imgElement[0].style.maxHeight = '100%';
            this.setAutoHeight();
        }
    }
    /**
     * @return {?}
     */
    setAutoHeight() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (!this.properties.autoHeight || !imgElement.length) {
            return;
        }
        /** @type {?} */
        const imgNaturalWidth = imgElement[0].getAttribute("width");
        /** @type {?} */
        const imgNaturalHeight = imgElement[0].getAttribute("height");
        /** @type {?} */
        const sizeRatio = imgNaturalWidth / imgNaturalHeight;
        /** @type {?} */
        const parentWidth = this.parentElement.offsetWidth;
        imgElement[0].style.maxHeight = parentWidth / sizeRatio + "px";
    }
    /**
     * @return {?}
     */
    removeImageSize() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            imgElement[0].style.maxWidth = '';
            imgElement[0].style.maxHeight = '';
        }
    }
    /**
     * @return {?}
     */
    getElementPosition() {
        this.elementPosition = this.element.parentElement.getBoundingClientRect();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    getTouchstartPosition(event) {
        const { clientX, clientY } = this.getClientPosition(event);
        this.startX = clientX - this.elementPosition.left;
        this.startY = clientY - this.elementPosition.top;
    }
    /**
     * @param {?} event
     * @param {?=} index
     * @return {?}
     */
    getClientPosition(event, index = 0) {
        /** @type {?} */
        let clientX;
        /** @type {?} */
        let clientY;
        if (event.type === "touchstart" || event.type === "touchmove") {
            clientX = event.touches[index].clientX;
            clientY = event.touches[index].clientY;
        }
        if (event.type === "mousedown" || event.type === "mousemove") {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        return {
            clientX,
            clientY
        };
    }
    /**
     * @return {?}
     */
    resetScale() {
        this.scale = 1;
        this.moveX = 0;
        this.moveY = 0;
        this.updateInitialValues();
        this.transformElement(this.properties.transitionDuration);
    }
    /**
     * @return {?}
     */
    updateInitialValues() {
        this.initialScale = this.scale;
        this.initialMoveX = this.moveX;
        this.initialMoveY = this.moveY;
    }
    /**
     * @param {?} touches
     * @return {?}
     */
    getDistance(touches) {
        return Math.sqrt(Math.pow(touches[0].pageX - touches[1].pageX, 2) + Math.pow(touches[0].pageY - touches[1].pageY, 2));
    }
    /**
     * @return {?}
     */
    getImageHeight() {
        /** @type {?} */
        const img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetHeight;
    }
    /**
     * @return {?}
     */
    getImageWidth() {
        /** @type {?} */
        const img = this.element.getElementsByTagName(this.elementTarget)[0];
        return img.offsetWidth;
    }
    /**
     * @param {?} duration
     * @return {?}
     */
    transformElement(duration) {
        this.element.style.transition = "all " + duration + "ms";
        this.element.style.transform = "matrix(" + Number(this.scale) + ", 0, 0, " + Number(this.scale) + ", " + Number(this.moveX) + ", " + Number(this.moveY) + ")";
    }
    /**
     * @return {?}
     */
    isTouchScreen() {
        /** @type {?} */
        const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
        if (('ontouchstart' in window)) {
            return true;
        }
        // include the 'heartz' as a way to have a non matching MQ to help terminate the join
        // https://git.io/vznFH
        /** @type {?} */
        const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
        return this.getMatchMedia(query);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    getMatchMedia(query) {
        return window.matchMedia(query).matches;
    }
    /**
     * @return {?}
     */
    isDragging() {
        if (this.properties.disablePan) {
            return false;
        }
        /** @type {?} */
        const imgHeight = this.getImageHeight();
        /** @type {?} */
        const imgWidth = this.getImageWidth();
        if (this.scale > 1) {
            return imgHeight * this.scale > this.parentElement.offsetHeight ||
                imgWidth * this.scale > this.parentElement.offsetWidth;
        }
        if (this.scale === 1) {
            return imgHeight > this.parentElement.offsetHeight ||
                imgWidth > this.parentElement.offsetWidth;
        }
    }
    /**
     * @return {?}
     */
    pollLimitZoom() {
        /** @type {?} */
        let poll = setInterval((/**
         * @return {?}
         */
        () => {
            if (this.getLimitZoom()) {
                clearInterval(poll);
            }
        }), 10);
    }
    /**
     * @return {?}
     */
    getImageElement() {
        /** @type {?} */
        const imgElement = this.element.getElementsByTagName(this.elementTarget);
        if (imgElement.length) {
            return imgElement[0];
        }
    }
    /**
     * @param {?=} event
     * @return {?}
     */
    toggleZoom(event = false) {
        if (this.initialScale === 1) {
            if (event && event.changedTouches) {
                if (this.properties.doubleTapScale === undefined) {
                    return;
                }
                /** @type {?} */
                const changedTouches = event.changedTouches;
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
    }
    /**
     * @param {?} properties
     * @return {?}
     */
    setZoom(properties) {
        this.scale = properties.scale;
        /** @type {?} */
        let xCenter;
        /** @type {?} */
        let yCenter;
        /** @type {?} */
        let visibleAreaWidth = this.element.offsetWidth;
        /** @type {?} */
        let visibleAreaHeight = this.element.offsetHeight;
        /** @type {?} */
        let scalingPercent = (visibleAreaWidth * this.scale) / (visibleAreaWidth * this.initialScale);
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
    }
    /**
     * @return {?}
     */
    alignImage() {
        /** @type {?} */
        const isMoveChanged = this.centeringImage();
        if (isMoveChanged) {
            this.updateInitialValues();
            this.transformElement(this.properties.transitionDuration);
        }
    }
    /**
     * @return {?}
     */
    destroy() {
        this.removeBasicStyles();
        this.touches.destroy();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXZ5cGluY2guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtcGluY2gtem9vbS8iLCJzb3VyY2VzIjpbImxpYi9pdnlwaW5jaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxXQUFXLENBQUM7Ozs7QUFFbEMsd0NBa0JDOzs7SUFqQkcscUNBQWdCOztJQUNoQixpQ0FBZTs7SUFDZix1Q0FBc0I7O0lBQ3RCLDRDQUEwQjs7SUFDMUIsOENBQTRCOztJQUM1QixnREFBOEI7O0lBQzlCLHlDQUF3Qjs7SUFDeEIsdUNBQTZDOztJQUM3Qyx3Q0FBdUI7O0lBQ3ZCLHNDQUFxQjs7SUFDckIsc0NBQW9COztJQUNwQiwwQ0FBcUI7O0lBQ3JCLHVDQUF5Qzs7SUFDekMsbUNBQWtCOztJQUNsQix3Q0FBdUI7O0lBQ3ZCLDZDQUEyQjs7SUFDM0IsNENBQTJCOzs7QUFHL0IsTUFBTSxPQUFPLHlCQUF5QixHQUFHO0lBQ3JDLFNBQVMsRUFBRSxJQUFJO0lBQ2YsY0FBYyxFQUFFLENBQUM7SUFDakIsa0JBQWtCLEVBQUUsR0FBRztJQUN2QixTQUFTLEVBQUUscUJBQXFCO0lBQ2hDLFFBQVEsRUFBRSxDQUFDO0lBQ1gsZUFBZSxFQUFFLEdBQUc7SUFDcEIsY0FBYyxFQUFFLElBQUk7Q0FDdkI7QUFFRCxNQUFNLE9BQU8sUUFBUTs7OztJQTRCakIsWUFBWSxVQUFlO1FBdEIzQixNQUFDLEdBQVcsQ0FBQyxDQUFDO1FBQ1AsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUN6QixpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUd6QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLFdBQU0sR0FBVyxD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Qjs7SUFDbkIscUJBQWM7O0lBQ2QseUJBQXlCOztJQUN6QixnQ0FBeUI7O0lBQ3pCLG1DQUFxQjs7SUFDckIsNkJBQWU7O0lBQ2YsMEJBQW1COztJQUNuQiwwQkFBbUI7O0lBQ25CLHlCQUFrQjs7SUFDbEIseUJBQWtCOztJQUNsQixnQ0FBeUI7O0lBQ3pCLGdDQUF5Qjs7SUFDekIsMEJBQW1COztJQUNuQiwwQkFBbUI7O0lBQ25CLDJCQUFvQjs7SUFDcEIsZ0NBQThCOztJQUM5Qiw0QkFBcUI7O0lBQ3JCLG9DQUE2Qjs7SUFDN0IsbUNBQTRCOztJQUM1QiwwQkFBaUI7O0lBQ2pCLHVDQUFnQzs7SUFDaEMsNEJBQXFCOztJQThDckIsb0NBTUM7O0lBS0Qsa0NBNkNDOztJQU9ELDZCQStCQzs7SUFFRCxtQ0FHQzs7SUFFRCwrQkFpQ0M7O0lBR0QsK0JBZ0NDOztJQUVELGdDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUb3VjaGVzfSBmcm9tICcuL3RvdWNoZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEl2eVBpbmNoUHJvcGVydGllcyB7XG4gICAgZWxlbWVudDogc3RyaW5nO1xuICAgIGtleSA/IDogc3RyaW5nO1xuICAgIGRvdWJsZVRhcCA/IDogYm9vbGVhbjtcbiAgICBkb3VibGVUYXBTY2FsZSA/IDogbnVtYmVyO1xuICAgIHpvb21Db250cm9sU2NhbGUgPyA6IG51bWJlcjtcbiAgICB0cmFuc2l0aW9uRHVyYXRpb24gPyA6IG51bWJlcjtcbiAgICBhdXRvWm9vbU91dCA/IDogYm9vbGVhbjtcbiAgICBsaW1pdFpvb20gPyA6IG51bWJlciB8IFwib3JpZ2luYWwgaW1hZ2Ugc2l6ZVwiO1xuICAgIGRpc2FibGVQYW4gPyA6IGJvb2xlYW47XG4gICAgbGltaXRQYW4gPyA6IGJvb2xlYW47XG4gICAgbWluU2NhbGUgPyA6IG51bWJlcjtcbiAgICBldmVudEhhbmRsZXIgPyA6IGFueTtcbiAgICBsaXN0ZW5lcnMgPyA6IFwiYXV0b1wiIHwgXCJtb3VzZSBhbmQgdG91Y2hcIjtcbiAgICB3aGVlbCA/IDogYm9vbGVhbjtcbiAgICBhdXRvSGVpZ2h0ID8gOiBib29sZWFuO1xuICAgIHdoZWVsWm9vbUZhY3RvciA/IDogbnVtYmVyO1xuICAgIGRyYWdnYWJsZUltYWdlID8gOiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgSXZ5UGluY2hEZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBkb3VibGVUYXA6IHRydWUsXG4gICAgZG91YmxlVGFwU2NhbGU6IDIsXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAyMDAsXG4gICAgbGltaXRab29tOiBcIm9yaWdpbmFsIGltYWdlIHNpemVcIixcbiAgICBtaW5TY2FsZTogMCxcbiAgICB3aGVlbFpvb21GYWN0b3I6IDAuMixcbiAgICBkcmFnZ2FibGVJbWFnZTogdHJ1ZVxufVxuXG5leHBvcnQgY2xhc3MgSXZ5UGluY2gge1xuICAgIHByb3BlcnRpZXM6IEl2eVBpbmNoUHJvcGVydGllcztcbiAgICB0b3VjaGVzOiBhbnk7XG4gICAgZWxlbWVudDogYW55O1xuICAgIGVsZW1lbnRUYXJnZXQ6IGFueTtcbiAgICBwYXJlbnRFbGVtZW50OiBhbnk7XG4gICAgaTogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgc2NhbGU6IG51bWJlciA9IDE7XG4gICAgaW5pdGlhbFNjYWxlOiBudW1iZXIgPSAxO1xuICAgIGVsZW1lbnRQb3NpdGlvbjogYW55O1xuICAgIGV2ZW50VHlwZTogYW55O1xuICAgIHN0YXJ0WDogbnVtYmVyID0gMDtcbiAgICBzdGFydFk6IG51bWJlciA9IDA7XG4gICAgbW92ZVg6IG51bWJlciA9IDA7XG4gICAgbW92ZVk6IG51bWJlciA9IDA7XG4gICAgaW5pdGlhbE1vdmVYOiBudW1iZXIgPSAwO1xuICAgIGluaXRpYWxNb3ZlWTogbnVtYmVyID0gMDtcbiAgICBtb3ZlWEM6IG51bWJlciA9IDA7XG4gICAgbW92ZVlDOiBudW1iZXIgPSAwO1xuICAgIGxhc3RUYXA6IG51bWJlciA9IDA7XG4gICAgZHJhZ2dpbmdNb2RlOiBib29sZWFuID0gZmFsc2U7XG4gICAgZGlzdGFuY2U6IG51bWJlciA9IDA7XG4gICAgZG91YmxlVGFwVGltZW91dDogbnVtYmVyID0gMDtcbiAgICBpbml0aWFsRGlzdGFuY2U6IG51bWJlciA9IDA7XG4gICAgZXZlbnRzOiBhbnkgPSB7fTtcbiAgICBtYXhIdG1sQ29udGVudFNjYWxlOiBudW1iZXIgPSAzO1xuICAgIG1heFNjYWxlOiBudW1iZXIgPSAxO1xuXG4gICAgY29uc3RydWN0b3IocHJvcGVydGllczogYW55KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IHByb3BlcnRpZXMuZWxlbWVudDtcbiAgICAgICAgdGhpcy5lbGVtZW50VGFyZ2V0ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyonKS50YWdOYW1lO1xuICAgICAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgSXZ5UGluY2hEZWZhdWx0UHJvcGVydGllcywgcHJvcGVydGllcyk7XG5cbiAgICAgICAgdGhpcy50b3VjaGVzID0gbmV3IFRvdWNoZXMoe1xuICAgICAgICAgICAgZWxlbWVudDogcHJvcGVydGllcy5lbGVtZW50LFxuICAgICAgICAgICAgbGlzdGVuZXJzOiBwcm9wZXJ0aWVzLmxpc3RlbmVycyxcbiAgICAgICAgICAgIHJlc2l6ZTogcHJvcGVydGllcy5hdXRvSGVpZ2h0XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLyogSW5pdCAqL1xuICAgICAgICB0aGlzLnNldEJhc2ljU3R5bGVzKCk7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogTGlzdGVuZXJzXG4gICAgICAgICAqL1xuXG4gICAgICAgIHRoaXMudG91Y2hlcy5vbigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlVG91Y2hzdGFydCk7XG4gICAgICAgIHRoaXMudG91Y2hlcy5vbigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZVRvdWNoZW5kKTtcbiAgICAgICAgdGhpcy50b3VjaGVzLm9uKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZVRvdWNoc3RhcnQpO1xuICAgICAgICB0aGlzLnRvdWNoZXMub24oJ21vdXNldXAnLCB0aGlzLmhhbmRsZVRvdWNoZW5kKTtcbiAgICAgICAgdGhpcy50b3VjaGVzLm9uKCdwYW4nLCB0aGlzLmhhbmRsZVBhbik7XG4gICAgICAgIHRoaXMudG91Y2hlcy5vbignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVQYW4pO1xuICAgICAgICB0aGlzLnRvdWNoZXMub24oJ3BpbmNoJywgdGhpcy5oYW5kbGVQaW5jaCk7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy53aGVlbCkge1xuICAgICAgICAgICAgdGhpcy50b3VjaGVzLm9uKCd3aGVlbCcsIHRoaXMuaGFuZGxlV2hlZWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5kb3VibGVUYXApIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hlcy5vbignZG91YmxlLXRhcCcsIHRoaXMuaGFuZGxlRG91YmxlVGFwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy50b3VjaGVzLm9uKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIFRvdWNoc3RhcnQgKi9cblxuICAgIGhhbmRsZVRvdWNoc3RhcnQgPSAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmdldFRvdWNoc3RhcnRQb3NpdGlvbihldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qIFRvdWNoZW5kICovXG5cbiAgICBoYW5kbGVUb3VjaGVuZCA9IChldmVudDogYW55KSA9PiB7XG5cbiAgICAgICAgLyogdG91Y2hlbmQgKi9cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwidG91Y2hlbmRcIikge1xuICAgICAgICAgICAgdGhpcy5pID0gMDtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmdNb2RlID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB0b3VjaGVzID0gZXZlbnQudG91Y2hlcztcblxuICAgICAgICAgICAgLy8gTWluIHNjYWxlXG4gICAgICAgICAgICBpZiAodGhpcy5zY2FsZSA8IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQXV0byBab29tIE91dFxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5hdXRvWm9vbU91dCAmJiB0aGlzLmV2ZW50VHlwZSA9PT0gJ3BpbmNoJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGUgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBbGlnbiBpbWFnZVxuICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRUeXBlID09PSAncGluY2gnIHx8IHRoaXMuZXZlbnRUeXBlID09PSAncGFuJykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxpZ25JbWFnZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgaW5pdGlhbCB2YWx1ZXNcbiAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PT0gJ3BpbmNoJyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID09PSAncGFuJyB8fFxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID09PSAnaG9yaXpvbnRhbC1zd2lwZScgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9PT0gJ3ZlcnRpY2FsLXN3aXBlJykge1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVJbml0aWFsVmFsdWVzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID0gJ3RvdWNoZW5kJztcblxuICAgICAgICAgICAgaWYgKHRvdWNoZXMgJiYgdG91Y2hlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIG1vdXNldXAgKi9cbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09IFwibW91c2V1cFwiKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdnaW5nTW9kZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbml0aWFsVmFsdWVzKCk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50VHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiBIYW5kbGVyc1xuICAgICAqL1xuXG4gICAgaGFuZGxlUGFuID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc2NhbGUgPD0gMSB8fCB0aGlzLnByb3BlcnRpZXMuZGlzYWJsZVBhbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgfSA9IHRoaXMuZ2V0Q2xpZW50UG9zaXRpb24oZXZlbnQpO1xuXG4gICAgICAgIGlmICghdGhpcy5ldmVudFR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRYID0gY2xpZW50WCAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLmxlZnQ7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0WSA9IGNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3A7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV2ZW50VHlwZSA9ICdwYW4nO1xuICAgICAgICB0aGlzLm1vdmVYID0gdGhpcy5pbml0aWFsTW92ZVggKyAodGhpcy5tb3ZlTGVmdChldmVudCwgMCkgLSB0aGlzLnN0YXJ0WCk7XG4gICAgICAgIHRoaXMubW92ZVkgPSB0aGlzLmluaXRpYWxNb3ZlWSArICh0aGlzLm1vdmVUb3AoZXZlbnQsIDApIC0gdGhpcy5zdGFydFkpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMubGltaXRQYW4pIHtcbiAgICAgICAgICAgIHRoaXMubGltaXRQYW5ZKCk7XG4gICAgICAgICAgICB0aGlzLmxpbWl0UGFuWCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogbW91c2Vtb3ZlICovXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlbW92ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmNlbnRlcmluZ0ltYWdlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zZm9ybUVsZW1lbnQoMCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRG91YmxlVGFwID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy50b2dnbGVab29tKGV2ZW50KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGhhbmRsZVBpbmNoID0gKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodGhpcy5ldmVudFR5cGUgPT09IHVuZGVmaW5lZCB8fCB0aGlzLmV2ZW50VHlwZSA9PT0gJ3BpbmNoJykge1xuICAgICAgICAgICAgY29uc3QgdG91Y2hlcyA9IGV2ZW50LnRvdWNoZXM7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5ldmVudFR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxEaXN0YW5jZSA9IHRoaXMuZ2V0RGlzdGFuY2UodG91Y2hlcyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlTGVmdDAgPSB0aGlzLm1vdmVMZWZ0KGV2ZW50LCAwKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlTGVmdDEgPSB0aGlzLm1vdmVMZWZ0KGV2ZW50LCAxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlVG9wMCA9IHRoaXMubW92ZVRvcChldmVudCwgMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZVRvcDEgPSB0aGlzLm1vdmVUb3AoZXZlbnQsIDEpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWEMgPSAoKG1vdmVMZWZ0MCArIG1vdmVMZWZ0MSkgLyAyKSAtIHRoaXMuaW5pdGlhbE1vdmVYO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVlDID0gKChtb3ZlVG9wMCArIG1vdmVUb3AxKSAvIDIpIC0gdGhpcy5pbml0aWFsTW92ZVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRUeXBlID0gJ3BpbmNoJztcbiAgICAgICAgICAgIHRoaXMuZGlzdGFuY2UgPSB0aGlzLmdldERpc3RhbmNlKHRvdWNoZXMpO1xuICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuaW5pdGlhbFNjYWxlICogKHRoaXMuZGlzdGFuY2UgLyB0aGlzLmluaXRpYWxEaXN0YW5jZSk7XG4gICAgICAgICAgICB0aGlzLm1vdmVYID0gdGhpcy5pbml0aWFsTW92ZVggLSAoKCh0aGlzLmRpc3RhbmNlIC8gdGhpcy5pbml0aWFsRGlzdGFuY2UpICogdGhpcy5tb3ZlWEMpIC0gdGhpcy5tb3ZlWEMpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IHRoaXMuaW5pdGlhbE1vdmVZIC0gKCgodGhpcy5kaXN0YW5jZSAvIHRoaXMuaW5pdGlhbERpc3RhbmNlKSAqIHRoaXMubW92ZVlDKSAtIHRoaXMubW92ZVlDKTtcblxuICAgICAgICAgICAgdGhpcy5oYW5kbGVMaW1pdFpvb20oKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5saW1pdFBhbikge1xuICAgICAgICAgICAgICAgIHRoaXMubGltaXRQYW5ZKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5saW1pdFBhblgoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBoYW5kbGVXaGVlbCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHpvb21GYWN0b3IgPSBldmVudC5kZWx0YVkgPCAwID8gKHRoaXMucHJvcGVydGllcy53aGVlbFpvb21GYWN0b3IpIDogKC0gdGhpcy5wcm9wZXJ0aWVzLndoZWVsWm9vbUZhY3Rvcik7XG4gICAgICAgIGxldCBuZXdTY2FsZSA9IHRoaXMuaW5pdGlhbFNjYWxlICsgem9vbUZhY3RvcjtcblxuICAgICAgICAvKiBSb3VuZCB2YWx1ZSAqL1xuICAgICAgICBpZiAobmV3U2NhbGUgPCAoMSArIHRoaXMucHJvcGVydGllcy53aGVlbFpvb21GYWN0b3IpKSB7XG4gICAgICAgICAgICBuZXdTY2FsZSA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3U2NhbGUgPCB0aGlzLm1heFNjYWxlICYmIG5ld1NjYWxlID4gdGhpcy5tYXhTY2FsZSAtIHRoaXMucHJvcGVydGllcy53aGVlbFpvb21GYWN0b3IpIHtcbiAgICAgICAgICAgIG5ld1NjYWxlID0gdGhpcy5tYXhTY2FsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY2FsZSA8IDEgfHwgbmV3U2NhbGUgPiB0aGlzLm1heFNjYWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3U2NhbGUgPT09IHRoaXMuc2NhbGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBuZXdTY2FsZTtcblxuICAgICAgICAvKiBHZXQgY3Vyc29yIHBvc2l0aW9uIG92ZXIgaW1hZ2UgKi9cbiAgICAgICAgbGV0IHhDZW50ZXIgPSAoZXZlbnQuY2xpZW50WCAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLmxlZnQpIC0gdGhpcy5pbml0aWFsTW92ZVg7XG4gICAgICAgIGxldCB5Q2VudGVyID0gKGV2ZW50LmNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3ApIC0gdGhpcy5pbml0aWFsTW92ZVk7XG5cbiAgICAgICAgdGhpcy5zZXRab29tKHtcbiAgICAgICAgICAgIHNjYWxlOiBuZXdTY2FsZSxcbiAgICAgICAgICAgIGNlbnRlcjogW3hDZW50ZXIsIHlDZW50ZXJdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVJlc2l6ZSA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0QXV0b0hlaWdodCgpO1xuICAgIH1cblxuICAgIGhhbmRsZUxpbWl0Wm9vbSgpIHtcbiAgICAgICAgY29uc3QgbGltaXRab29tID0gdGhpcy5tYXhTY2FsZTtcbiAgICAgICAgY29uc3QgbWluU2NhbGUgPSB0aGlzLnByb3BlcnRpZXMubWluU2NhbGU7XG5cbiAgICAgICAgaWYgKHRoaXMuc2NhbGUgPiBsaW1pdFpvb20gfHwgdGhpcy5zY2FsZSA8PSBtaW5TY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VXaWR0aCA9IHRoaXMuZ2V0SW1hZ2VXaWR0aCgpO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VIZWlnaHQgPSB0aGlzLmdldEltYWdlSGVpZ2h0KCk7XG4gICAgICAgICAgICBjb25zdCBlbmxhcmdlZEltYWdlV2lkdGggPSBpbWFnZVdpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IGVubGFyZ2VkSW1hZ2VIZWlnaHQgPSBpbWFnZUhlaWdodCAqIHRoaXMuc2NhbGU7XG4gICAgICAgICAgICBjb25zdCBtb3ZlWFJhdGlvID0gdGhpcy5tb3ZlWCAvIChlbmxhcmdlZEltYWdlV2lkdGggLSBpbWFnZVdpZHRoKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVZUmF0aW8gPSB0aGlzLm1vdmVZIC8gKGVubGFyZ2VkSW1hZ2VIZWlnaHQgLSBpbWFnZUhlaWdodCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjYWxlID4gbGltaXRab29tKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IGxpbWl0Wm9vbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2NhbGUgPD0gbWluU2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gbWluU2NhbGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlV2lkdGggPSBpbWFnZVdpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlSGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKiB0aGlzLnNjYWxlO1xuXG4gICAgICAgICAgICB0aGlzLm1vdmVYID0gLU1hdGguYWJzKChtb3ZlWFJhdGlvICogKG5ld0ltYWdlV2lkdGggLSBpbWFnZVdpZHRoKSkpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IC1NYXRoLmFicygoLW1vdmVZUmF0aW8gKiAobmV3SW1hZ2VIZWlnaHQgLSBpbWFnZUhlaWdodCkpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExpbWl0Wm9vbSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5saW1pdFpvb20gPT09IFwib3JpZ2luYWwgaW1hZ2Ugc2l6ZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50VGFyZ2V0ID09PSBcIklNR1wiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKVswXTtcblxuICAgICAgICAgICAgICAgIGlmIChpbWcubmF0dXJhbFdpZHRoICYmIGltZy5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1heFNjYWxlID0gaW1nLm5hdHVyYWxXaWR0aCAvIGltZy5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF4U2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1heFNjYWxlID0gdGhpcy5tYXhIdG1sQ29udGVudFNjYWxlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1heFNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXhTY2FsZSA9IHRoaXMucHJvcGVydGllcy5saW1pdFpvb207XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXhTY2FsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVMZWZ0KGV2ZW50OiBhbnksIGluZGV4OiBudW1iZXIgPSAwKSB7XG4gICAgICAgIGNvbnN0IGNsaWVudFggPSB0aGlzLmdldENsaWVudFBvc2l0aW9uKGV2ZW50LCBpbmRleCkuY2xpZW50WDtcbiAgICAgICAgcmV0dXJuIGNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xuICAgIH1cblxuICAgIG1vdmVUb3AoZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlciA9IDApIHtcbiAgICAgICAgY29uc3QgY2xpZW50WSA9IHRoaXMuZ2V0Q2xpZW50UG9zaXRpb24oZXZlbnQsIGluZGV4KS5jbGllbnRZO1xuICAgICAgICByZXR1cm4gY2xpZW50WSAtIHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcDtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogRGV0ZWN0aW9uXG4gICAgICovXG5cbiAgICBjZW50ZXJpbmdJbWFnZSgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldClbMF07XG4gICAgICAgIGNvbnN0IGluaXRpYWxNb3ZlWCA9IHRoaXMubW92ZVg7XG4gICAgICAgIGNvbnN0IGluaXRpYWxNb3ZlWSA9IHRoaXMubW92ZVk7XG5cbiAgICAgICAgaWYgKHRoaXMubW92ZVkgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVZID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb3ZlWCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubW92ZVggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGltZykge1xuICAgICAgICAgICAgdGhpcy5saW1pdFBhblkoKTtcbiAgICAgICAgICAgIHRoaXMubGltaXRQYW5YKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGltZyAmJiB0aGlzLnNjYWxlIDwgMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubW92ZVggPCB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggKiAoMSAtIHRoaXMuc2NhbGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCAqICgxIC0gdGhpcy5zY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5pdGlhbE1vdmVYICE9PSB0aGlzLm1vdmVYIHx8IGluaXRpYWxNb3ZlWSAhPT0gdGhpcy5tb3ZlWTtcbiAgICB9XG5cbiAgICBsaW1pdFBhblkoKSB7XG4gICAgICAgIGNvbnN0IGltZ0hlaWdodCA9IHRoaXMuZ2V0SW1hZ2VIZWlnaHQoKTtcbiAgICAgICAgY29uc3Qgc2NhbGVkSW1nSGVpZ2h0ID0gaW1nSGVpZ2h0ICogdGhpcy5zY2FsZTtcbiAgICAgICAgY29uc3QgcGFyZW50SGVpZ2h0ID0gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgY29uc3QgZWxlbWVudEhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKHNjYWxlZEltZ0hlaWdodCA8IHBhcmVudEhlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IChwYXJlbnRIZWlnaHQgLSBlbGVtZW50SGVpZ2h0ICogdGhpcy5zY2FsZSkgLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgaW1nT2Zmc2V0VG9wID0gKChpbWdIZWlnaHQgLSBlbGVtZW50SGVpZ2h0KSAqIHRoaXMuc2NhbGUpIC8gMjtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZVkgPiBpbWdPZmZzZXRUb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVZID0gaW1nT2Zmc2V0VG9wO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoc2NhbGVkSW1nSGVpZ2h0ICsgTWF0aC5hYnMoaW1nT2Zmc2V0VG9wKSAtIHBhcmVudEhlaWdodCkgKyB0aGlzLm1vdmVZIDwgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVkgPSAtKHNjYWxlZEltZ0hlaWdodCArIE1hdGguYWJzKGltZ09mZnNldFRvcCkgLSBwYXJlbnRIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGltaXRQYW5YKCkge1xuICAgICAgICBjb25zdCBpbWdXaWR0aCA9IHRoaXMuZ2V0SW1hZ2VXaWR0aCgpO1xuICAgICAgICBjb25zdCBzY2FsZWRJbWdXaWR0aCA9IGltZ1dpZHRoICogdGhpcy5zY2FsZTtcbiAgICAgICAgY29uc3QgcGFyZW50V2lkdGggPSB0aGlzLnBhcmVudEVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRXaWR0aCA9IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBpZiAoc2NhbGVkSW1nV2lkdGggPCBwYXJlbnRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IChwYXJlbnRXaWR0aCAtIGVsZW1lbnRXaWR0aCAqIHRoaXMuc2NhbGUpIC8gMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGltZ09mZnNldExlZnQgPSAoKGltZ1dpZHRoIC0gZWxlbWVudFdpZHRoKSAqIHRoaXMuc2NhbGUpIC8gMjtcblxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZVggPiBpbWdPZmZzZXRMZWZ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWCA9IGltZ09mZnNldExlZnQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChzY2FsZWRJbWdXaWR0aCArIE1hdGguYWJzKGltZ09mZnNldExlZnQpIC0gcGFyZW50V2lkdGgpICsgdGhpcy5tb3ZlWCA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVYID0gLShpbWdXaWR0aCAqIHRoaXMuc2NhbGUgKyBNYXRoLmFicyhpbWdPZmZzZXRMZWZ0KSAtIHBhcmVudFdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEJhc2ljU3R5bGVzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAnMCAwJztcbiAgICAgICAgdGhpcy5zZXRJbWFnZVNpemUoKTtcbiAgICAgICAgdGhpcy5zZXREcmFnZ2FibGVJbWFnZSgpO1xuICAgIH1cblxuICAgIHJlbW92ZUJhc2ljU3R5bGVzKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9ICcnO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnJztcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICcnO1xuICAgICAgICB0aGlzLnJlbW92ZUltYWdlU2l6ZSgpO1xuICAgICAgICB0aGlzLnJlbW92ZURyYWdnYWJsZUltYWdlKCk7XG4gICAgfVxuXG4gICAgc2V0RHJhZ2dhYmxlSW1hZ2UoKSB7XG4gICAgICAgIGNvbnN0IGltZ0VsZW1lbnQgPSB0aGlzLmdldEltYWdlRWxlbWVudCgpO1xuXG4gICAgICAgIGlmIChpbWdFbGVtZW50KSB7XG4gICAgICAgICAgICBpbWdFbGVtZW50LmRyYWdnYWJsZSA9IHRoaXMucHJvcGVydGllcy5kcmFnZ2FibGVJbWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZURyYWdnYWJsZUltYWdlKCkge1xuICAgICAgICBjb25zdCBpbWdFbGVtZW50ID0gdGhpcy5nZXRJbWFnZUVsZW1lbnQoKTtcblxuICAgICAgICBpZiAoaW1nRWxlbWVudCkge1xuICAgICAgICAgICAgaW1nRWxlbWVudC5kcmFnZ2FibGUgPSAhdGhpcy5wcm9wZXJ0aWVzLmRyYWdnYWJsZUltYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW1hZ2VTaXplKCkge1xuICAgICAgICBjb25zdCBpbWdFbGVtZW50ID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldCk7XG5cbiAgICAgICAgaWYgKGltZ0VsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbWdFbGVtZW50WzBdLnN0eWxlLm1heFdpZHRoID0gJzEwMCUnO1xuICAgICAgICAgICAgaW1nRWxlbWVudFswXS5zdHlsZS5tYXhIZWlnaHQgPSAnMTAwJSc7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0QXV0b0hlaWdodCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0QXV0b0hlaWdodCgpIHtcbiAgICAgICAgY29uc3QgaW1nRWxlbWVudCA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzLmVsZW1lbnRUYXJnZXQpO1xuXG4gICAgICAgIGlmICghdGhpcy5wcm9wZXJ0aWVzLmF1dG9IZWlnaHQgfHwgIWltZ0VsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpbWdOYXR1cmFsV2lkdGggPSBpbWdFbGVtZW50WzBdLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpO1xuICAgICAgICBjb25zdCBpbWdOYXR1cmFsSGVpZ2h0ID0gaW1nRWxlbWVudFswXS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIik7XG4gICAgICAgIGNvbnN0IHNpemVSYXRpbyA9IGltZ05hdHVyYWxXaWR0aCAvIGltZ05hdHVyYWxIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuXG4gICAgICAgIGltZ0VsZW1lbnRbMF0uc3R5bGUubWF4SGVpZ2h0ID0gcGFyZW50V2lkdGggLyBzaXplUmF0aW8gKyBcInB4XCI7XG4gICAgfVxuXG4gICAgcmVtb3ZlSW1hZ2VTaXplKCkge1xuICAgICAgICBjb25zdCBpbWdFbGVtZW50ID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldCk7XG5cbiAgICAgICAgaWYgKGltZ0VsZW1lbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpbWdFbGVtZW50WzBdLnN0eWxlLm1heFdpZHRoID0gJyc7XG4gICAgICAgICAgICBpbWdFbGVtZW50WzBdLnN0eWxlLm1heEhlaWdodCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RWxlbWVudFBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRQb3NpdGlvbiA9IHRoaXMuZWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIGdldFRvdWNoc3RhcnRQb3NpdGlvbihldmVudDogYW55KSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNsaWVudFgsXG4gICAgICAgICAgICBjbGllbnRZXG4gICAgICAgIH0gPSB0aGlzLmdldENsaWVudFBvc2l0aW9uKGV2ZW50KTtcblxuICAgICAgICB0aGlzLnN0YXJ0WCA9IGNsaWVudFggLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xuICAgICAgICB0aGlzLnN0YXJ0WSA9IGNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3A7XG4gICAgfVxuXG4gICAgZ2V0Q2xpZW50UG9zaXRpb24oZXZlbnQ6IGFueSwgaW5kZXg6IG51bWJlciA9IDApIHtcbiAgICAgICAgbGV0IGNsaWVudFg7XG4gICAgICAgIGxldCBjbGllbnRZO1xuXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBcInRvdWNoc3RhcnRcIiB8fCBldmVudC50eXBlID09PSBcInRvdWNobW92ZVwiKSB7XG4gICAgICAgICAgICBjbGllbnRYID0gZXZlbnQudG91Y2hlc1tpbmRleF0uY2xpZW50WDtcbiAgICAgICAgICAgIGNsaWVudFkgPSBldmVudC50b3VjaGVzW2luZGV4XS5jbGllbnRZO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBcIm1vdXNlZG93blwiIHx8IGV2ZW50LnR5cGUgPT09IFwibW91c2Vtb3ZlXCIpIHtcbiAgICAgICAgICAgIGNsaWVudFggPSBldmVudC5jbGllbnRYO1xuICAgICAgICAgICAgY2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2xpZW50WCxcbiAgICAgICAgICAgIGNsaWVudFlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXNldFNjYWxlKCkge1xuICAgICAgICB0aGlzLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5tb3ZlWCA9IDA7XG4gICAgICAgIHRoaXMubW92ZVkgPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZUluaXRpYWxWYWx1ZXMoKTtcbiAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KHRoaXMucHJvcGVydGllcy50cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIH1cblxuICAgIHVwZGF0ZUluaXRpYWxWYWx1ZXMoKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFNjYWxlID0gdGhpcy5zY2FsZTtcbiAgICAgICAgdGhpcy5pbml0aWFsTW92ZVggPSB0aGlzLm1vdmVYO1xuICAgICAgICB0aGlzLmluaXRpYWxNb3ZlWSA9IHRoaXMubW92ZVk7XG4gICAgfVxuXG4gICAgZ2V0RGlzdGFuY2UodG91Y2hlczogYW55KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codG91Y2hlc1swXS5wYWdlWCAtIHRvdWNoZXNbMV0ucGFnZVgsIDIpICsgTWF0aC5wb3codG91Y2hlc1swXS5wYWdlWSAtIHRvdWNoZXNbMV0ucGFnZVksIDIpKTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZUhlaWdodCgpIHtcbiAgICAgICAgY29uc3QgaW1nID0gdGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRoaXMuZWxlbWVudFRhcmdldClbMF07XG4gICAgICAgIHJldHVybiBpbWcub2Zmc2V0SGVpZ2h0O1xuICAgIH1cblxuICAgIGdldEltYWdlV2lkdGgoKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IHRoaXMuZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0aGlzLmVsZW1lbnRUYXJnZXQpWzBdO1xuICAgICAgICByZXR1cm4gaW1nLm9mZnNldFdpZHRoO1xuICAgIH1cblxuICAgIHRyYW5zZm9ybUVsZW1lbnQoZHVyYXRpb246IGFueSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiYWxsIFwiICsgZHVyYXRpb24gKyBcIm1zXCI7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIm1hdHJpeChcIiArIE51bWJlcih0aGlzLnNjYWxlKSArIFwiLCAwLCAwLCBcIiArIE51bWJlcih0aGlzLnNjYWxlKSArIFwiLCBcIiArIE51bWJlcih0aGlzLm1vdmVYKSArIFwiLCBcIiArIE51bWJlcih0aGlzLm1vdmVZKSArIFwiKVwiO1xuICAgIH1cblxuICAgIGlzVG91Y2hTY3JlZW4oKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeGVzID0gJyAtd2Via2l0LSAtbW96LSAtby0gLW1zLSAnLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluY2x1ZGUgdGhlICdoZWFydHonIGFzIGEgd2F5IHRvIGhhdmUgYSBub24gbWF0Y2hpbmcgTVEgdG8gaGVscCB0ZXJtaW5hdGUgdGhlIGpvaW5cbiAgICAgICAgLy8gaHR0cHM6Ly9naXQuaW8vdnpuRkhcbiAgICAgICAgY29uc3QgcXVlcnkgPSBbJygnLCBwcmVmaXhlcy5qb2luKCd0b3VjaC1lbmFibGVkKSwoJyksICdoZWFydHonLCAnKSddLmpvaW4oJycpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRNYXRjaE1lZGlhKHF1ZXJ5KTtcbiAgICB9XG5cbiAgICBnZXRNYXRjaE1lZGlhKHF1ZXJ5OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzO1xuICAgIH1cblxuICAgIGlzRHJhZ2dpbmcoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuZGlzYWJsZVBhbikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW1nSGVpZ2h0ID0gdGhpcy5nZXRJbWFnZUhlaWdodCgpO1xuICAgICAgICBjb25zdCBpbWdXaWR0aCA9IHRoaXMuZ2V0SW1hZ2VXaWR0aCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnNjYWxlID4gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGltZ0hlaWdodCAqIHRoaXMuc2NhbGUgPiB0aGlzLnBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0IHx8XG4gICAgICAgICAgICAgICAgaW1nV2lkdGggKiB0aGlzLnNjYWxlID4gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNjYWxlID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gaW1nSGVpZ2h0ID4gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodCB8fFxuICAgICAgICAgICAgICAgIGltZ1dpZHRoID4gdGhpcy5wYXJlbnRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcG9sbExpbWl0Wm9vbSgpIHtcbiAgICAgICAgbGV0IHBvbGwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRMaW1pdFpvb20oKSkge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwocG9sbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBnZXRJbWFnZUVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IGltZ0VsZW1lbnQgPSB0aGlzLmVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGhpcy5lbGVtZW50VGFyZ2V0KTtcblxuICAgICAgICBpZiAoaW1nRWxlbWVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbWdFbGVtZW50WzBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlWm9vbShldmVudDogYW55ID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFNjYWxlID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmRvdWJsZVRhcFNjYWxlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWRUb3VjaGVzID0gZXZlbnQuY2hhbmdlZFRvdWNoZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuaW5pdGlhbFNjYWxlICogdGhpcy5wcm9wZXJ0aWVzLmRvdWJsZVRhcFNjYWxlO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZVggPSB0aGlzLmluaXRpYWxNb3ZlWCAtIChjaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYIC0gdGhpcy5lbGVtZW50UG9zaXRpb24ubGVmdCkgKiAodGhpcy5wcm9wZXJ0aWVzLmRvdWJsZVRhcFNjYWxlIC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlWSA9IHRoaXMuaW5pdGlhbE1vdmVZIC0gKGNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgLSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3ApICogKHRoaXMucHJvcGVydGllcy5kb3VibGVUYXBTY2FsZSAtIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjYWxlID0gdGhpcy5pbml0aWFsU2NhbGUgKiAodGhpcy5wcm9wZXJ0aWVzLnpvb21Db250cm9sU2NhbGUgKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVYID0gdGhpcy5pbml0aWFsTW92ZVggLSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGggKiAodGhpcy5zY2FsZSAtIDEpIC8gMjtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVZID0gdGhpcy5pbml0aWFsTW92ZVkgLSB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0ICogKHRoaXMuc2NhbGUgLSAxKSAvIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2VudGVyaW5nSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5pdGlhbFZhbHVlcygpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1FbGVtZW50KHRoaXMucHJvcGVydGllcy50cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZXNldFNjYWxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRab29tKHByb3BlcnRpZXM6IHtcbiAgICAgICAgc2NhbGU6IG51bWJlcixcbiAgICAgICAgY2VudGVyPzogbnVtYmVyW11cbiAgICB9KSB7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBwcm9wZXJ0aWVzLnNjYWxlO1xuXG4gICAgICAgIGxldCB4Q2VudGVyO1xuICAgICAgICBsZXQgeUNlbnRlcjtcbiAgICAgICAgbGV0IHZpc2libGVBcmVhV2lkdGggPSB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCB2aXNpYmxlQXJlYUhlaWdodCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBzY2FsaW5nUGVyY2VudCA9ICh2aXNpYmxlQXJlYVdpZHRoICogdGhpcy5zY2FsZSkgLyAodmlzaWJsZUFyZWFXaWR0aCAqIHRoaXMuaW5pdGlhbFNjYWxlKTtcblxuICAgICAgICBpZiAocHJvcGVydGllcy5jZW50ZXIpIHtcbiAgICAgICAgICAgIHhDZW50ZXIgPSBwcm9wZXJ0aWVzLmNlbnRlclswXTtcbiAgICAgICAgICAgIHlDZW50ZXIgPSBwcm9wZXJ0aWVzLmNlbnRlclsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHhDZW50ZXIgPSB2aXNpYmxlQXJlYVdpZHRoIC8gMiAtIHRoaXMuaW5pdGlhbE1vdmVYO1xuICAgICAgICAgICAgeUNlbnRlciA9IHZpc2libGVBcmVhSGVpZ2h0IC8gMiAtIHRoaXMuaW5pdGlhbE1vdmVZO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb3ZlWCA9IHRoaXMuaW5pdGlhbE1vdmVYIC0gKChzY2FsaW5nUGVyY2VudCAqIHhDZW50ZXIpIC0geENlbnRlcik7XG4gICAgICAgIHRoaXMubW92ZVkgPSB0aGlzLmluaXRpYWxNb3ZlWSAtICgoc2NhbGluZ1BlcmNlbnQgKiB5Q2VudGVyKSAtIHlDZW50ZXIpO1xuXG4gICAgICAgIHRoaXMuY2VudGVyaW5nSW1hZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbml0aWFsVmFsdWVzKCk7XG4gICAgICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudCh0aGlzLnByb3BlcnRpZXMudHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICBhbGlnbkltYWdlKCkge1xuICAgICAgICBjb25zdCBpc01vdmVDaGFuZ2VkID0gdGhpcy5jZW50ZXJpbmdJbWFnZSgpO1xuXG4gICAgICAgIGlmIChpc01vdmVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUluaXRpYWxWYWx1ZXMoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRWxlbWVudCh0aGlzLnByb3BlcnRpZXMudHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQmFzaWNTdHlsZXMoKTtcbiAgICAgICAgdGhpcy50b3VjaGVzLmRlc3Ryb3koKTtcbiAgICB9XG59Il19