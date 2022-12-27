/**
 * Inherit that interface in component with input.
 */
 export interface Input {
    input: any;
}

/**
 * Inherit that interface in component with output.
 */
export interface OnInit {
    mnOnInit(): void;
}

export interface OnDestroy {
    mnOnDestroy(): void;
}

/**
 * Inherit that interface in component with config.
 */
export interface Config {
    config: any;
}