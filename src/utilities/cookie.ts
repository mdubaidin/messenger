function getCookie(cname: string): string {
    let name: string = cname + '=';
    let decodedCookie: string = decodeURIComponent(document.cookie);
    let ca: string[] = decodedCookie.split(';');
    for (let i: number = 0; i < ca.length; i++) {
        let c: string = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

function setCookie(
    cname: string,
    cvalue: string,
    expires: number = 24 * 60 * 60,
    path: string = '/'
): void {
    let cookie: string = `${cname}=${cvalue};`;
    if (expires) {
        const d: Date = new Date();
        d.setTime(d.getTime() + expires * 1000);
        cookie += `expires=${d.toUTCString()};`;
    }
    if (path) {
        cookie += `path=${path};`;
    }
    document.cookie = cookie;
}

function clearCookie(cname: string, path: string = '/'): void {
    let cookie: string = `${cname}=;`;
    const d: Date = new Date();
    d.setTime(d.getTime() - 50 * 1000);
    cookie += `expires=${d.toUTCString()};`;
    cookie += `path=${path};`;
    document.cookie = cookie;
}

export { getCookie, setCookie, clearCookie };
