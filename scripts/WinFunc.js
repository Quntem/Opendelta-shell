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
function newwin() {
    fetch('elements/window.html')
        .then(response => response.text())
        .then(html => {
            const newid = new Date().getTime().toString();
            const desktop = document.getElementById('desktop');
            desktop.innerHTML += html;
            const newWindow = desktop.querySelector('#newwindow');
            newWindow.id = "window" + newid;
            const newTitlebar = desktop.querySelector('#newwindowtitlebar');
            newTitlebar.id = "titlebar" + newid;
            $( "#window" + newid ).draggable({ handle: "#titlebar" + newid });
            $('.window').draggable({ handle: ".titlebar" });
            const closeIcon = newWindow.querySelector('#closebutton');
            closeIcon.setAttribute('onclick', `closewin('window${newid}')`);
            closeIcon.id = "closeicon" + newid;
        })
        .catch(error => console.error('Error fetching HTML:', error));
}
function termlog(text) {
    const terminal = document.getElementById('termoutput');
    terminal.innerHTML += '<div class="mt-2 bg-gray-500/10 backdrop-blur-lg text-sm text-white rounded-lg p-4 mb-5 ml-5 mr-5" role="alert"><span class="font-bold">Javascript:</span>' + ' ' + text + '</div>'
}
function termruncode(event) {
    code = document.getElementById("ConsoleTB").value;
    if (event.keyCode === 13) {
        const terminal = document.getElementById('termoutput');
        terminal.innerHTML += '<div class="mt-2 bg-gray-500/10 backdrop-blur-lg text-sm text-white rounded-lg p-4 mb-5 ml-5 mr-5" role="alert"><span class="font-bold">User:</span>' + ' ' + code + '</div>'
        try {
            eval(code);
        } catch (error) {
            termlog(error);
        };
        document.getElementById("ConsoleTB").value = "";
    };
}