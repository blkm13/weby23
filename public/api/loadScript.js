let before_load_time = new Date().getTime();
window.onload = pageLoadTime;

function pageLoadTime() {
    document.getElementById('time').innerHTML =
        'Page load time is ' +
        (new Date().getTime() - before_load_time) / 1000 +
        'seconds';
}