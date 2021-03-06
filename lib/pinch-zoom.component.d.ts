import { ElementRef, OnDestroy } from '@angular/core';
import { Properties } from './interfaces';
export declare class PinchZoomComponent implements OnDestroy {
    private elementRef;
    pinchZoom: any;
    _properties: Properties;
    properties: Properties;
    transitionDuration: number;
    doubleTap: boolean;
    doubleTapScale: number;
    autoZoomOut: boolean;
    limitZoom: number | "original image size";
    disabled: boolean;
    disablePan: boolean;
    overflow: "hidden" | "visible";
    zoomControlScale: number;
    disableZoomControl: "disable" | "never" | "auto";
    backgroundColor: string;
    limitPan: boolean;
    minScale: number;
    listeners: 'auto' | 'mouse and touch';
    wheel: boolean;
    autoHeight: boolean;
    wheelZoomFactor: number;
    draggableImage: boolean;
    readonly hostOverflow: "hidden" | "visible";
    readonly hostBackgroundColor: string;
    readonly isTouchScreen: boolean;
    readonly isDragging: any;
    readonly isDisabled: number;
    readonly scale: any;
    readonly isZoomedIn: boolean;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
    initPinchZoom(): void;
    getProperties(changes: any): {};
    renameProperties(options: Properties): Properties;
    applyOptionsDefault(defaultOptions: any, options: any): void;
    toggleZoom(): void;
    isControl(): boolean;
    pollLimitZoom(): void;
    destroy(): void;
}
