function closewin(elementid) {
    const element = document.getElementById(elementid);
    element.remove();
}
function openwins() {
    var windowDivs = document.querySelectorAll('div.window');
    var windowIds = Array.from(windowDivs).map(function(div) {
        return div.id;
    });
    return windowIds
}