async function loadHeader(target: HTMLElement): Promise<void> {
    const res = await fetch('/header.html');
    if (!res.ok) throw new Error(`Header fetch failed: ${res.status} ${res.statusText}`);
    target.innerHTML = await res.text();
}

const hostElement = document.getElementById('header');
if (hostElement) {
    loadHeader(hostElement).catch(console.error);
} else {console.error('Missing #header element');}