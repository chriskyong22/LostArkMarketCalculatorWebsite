
export function debounce(callback: (...args: any) => void, timeout: number = 1000): (...args: any) => void {
    let timer: NodeJS.Timeout;
    return (...args: any): void => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args)
        }, timeout);
    }
}