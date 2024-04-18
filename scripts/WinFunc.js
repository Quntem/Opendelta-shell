currentdir = ""

function closewin(elementid) {
    const element = document.getElementById(elementid);
    element.remove();
}
function setserve() {
    fetch('config/server.json')
        .then(response => response.json())
        .then(response => {
            termlog(response.location)
            fileserver = response.location
        })

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
            $( "#window" + newid ).resizable()
            $(".window").resizable()
            const closeIcon = newWindow.querySelector('#closebutton');
            closeIcon.setAttribute('onclick', `closewin('window${newid}')`);
            closeIcon.id = "closeicon" + newid;
        })
        .catch(error => console.error('Error fetching HTML:', error));
}
function newwinfromurl(winurl) {
    fetch(winurl)
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
            $( "#window" + newid ).resizable()
            $(".window").resizable()
            const closeIcon = newWindow.querySelector('#closebutton');
            closeIcon.setAttribute('onclick', `closewin('window${newid}')`);
            closeIcon.id = "closeicon" + newid;
        })
        .catch(error => console.error('Error fetching HTML:', error));
}
function termlog(text) {
    const terminal = document.getElementById('termoutput');
    terminal.innerHTML += '<div class="mt-2 bg-gray-500/10 backdrop-blur-lg text-sm text-white rounded-lg p-4 mb-5 ml-5 mr-5 break-words" role="alert"><span class="font-bold">Javascript:</span>' + ' ' + text + '</div>'
}
function termruncode(event) {
    code = document.getElementById("ConsoleTB").value;
    if (event.keyCode === 13) {
        const terminal = document.getElementById('termoutput');
        terminal.innerHTML += '<div class="mt-2 bg-gray-500/10 backdrop-blur-lg text-sm text-white rounded-lg p-4 mb-5 ml-5 mr-5 break-words" role="alert"><span class="font-bold">User:</span>' + ' ' + code + '</div>'
        try {
            eval(code);
        } catch (error) {
            termlog(error);
        };
        document.getElementById("ConsoleTB").value = "";
    };
}
function termgetpermission(permission, reason) {
    const terminal = document.getElementById('termoutput');
    terminal.innerHTML += '<div class="ml-5 mr-5 mb-5 bg-blue-100 border border-blue-200 text-gray-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-white" role="alert"> <div class="flex"> <div class="flex-shrink-0"> <svg class="flex-shrink-0 size-4 mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="10"></circle> <path d="M12 16v-4"></path> <path d="M12 8h.01"></path> </svg> </div> <div class="ms-3"> <h3 class="font-semibold"> This Script would like to access' + ' ' + permission + ' </h3> <div class="mt-2 text-sm text-gray-600 dark:text-gray-400"> ' + reason + ' </div> <div class="mt-4"> <div class="flex space-x-3"> <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"> Deny </button> <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400"> Allow </button> </div> </div> </div> </div> </div>'
}
function getfiles(fileurl) {
    files = {}
    fetch(fileurl)
        .then(response => response.json())
        .then (data => {
            termlog(data)
        })
    return files
}
function cd(dir) {
    if (dir == "clear") {
        currentdir == ""
    } else {
        currentdir += "/" + dir
    }
}
function ls() {
    files = [];
    fetch(fileserver + "/api/files/list/?dir=" + currentdir)
        .then(response => response.json())
        .then (data => {
            for(let i = 0; i < data.length; i++) {
                files += data[i] + ", ";
            };
            termlog(files);
        });
    return files
}
function sysinfo() {
    fetch(fileserver + "/api/system/getinfo")
        .then(response => response.json())
        .then (response => {
            termlog("system: " + response.systemtype + ", name: " + response.hostname + ", uptime: " + response.uptime)
        })
}
function sf(filename) {
    files = []
    fetch(fileserver + "/api/files/get/?file=" + filename)
        .then(response => response.json())
        .then (response => {
            termlog(response.data);
            console.log(response)
        })
    return files
}
function version() {
    termlog("Quntem OpenDelta 0.0.1");
}