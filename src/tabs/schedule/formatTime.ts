

export function formatTime(unix: number): string {
    let date = new Date(unix);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    let strTime = hours + ':' + minutes;

    return strTime + ' ' + ampm;
}
