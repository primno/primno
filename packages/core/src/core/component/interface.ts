/**
 * Inherit that interface in component with input.
 * @category Component
 */
 export interface Input {
    input: any;
}

/**
 * Inherit that interface in component when you want to be notified when the component is initialized.
 * @category Component
 */
export interface OnInit {
    mnOnInit(): void;
}

/**
 * Inherit that interface in component when you want to be notified when the component is destroyed.
 * @category Component
 */
export interface OnDestroy {
    mnOnDestroy(): void;
}

/**
 * Inherit that interface in component with config.
 * @category Component
 */
export interface Config {
    config: any;
}