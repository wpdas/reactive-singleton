declare class Observable<D> {
    private observers;
    constructor();
    subscribe(handler: (data: D) => void): void;
    unsubbscribe(handler: (data: D) => void): void;
    notify(data: D): void;
}
export default Observable;
