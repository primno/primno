/**
 * Inherit that interface in component with input.
 */
 export interface Input {
    input: any;
}

export interface OnInit {
    mnOnInit(): void;
}

export interface OnDestroy {
    mnOnDestroy(): void;
}