function listapps() {
    fetch('apps/apps.json')
        .then(response => response.json())
        .then(response => {
            appslist = response.apps
            appsnamelist = []
            appslist.forEach(element => {
                appsnamelist.push(element.title)
            });
            termlog(appsnamelist)
        })
}
function drawtbapps(taskbar) {
    taskbar = document.getElementById(taskbar)
    fetch('apps/apps.json')
        .then(response => response.json())
        .then(response => {
            appslist = response.apps
            appsnamelist = []
            appslist.forEach(element => {
                taskbar.innerHTML += ' <img src="' + element.icon + '" width="30px" height="30px" class="ml-2 mr-2" onclick="newwinfromurl(' + "'" + element.mainwin + "'" + ')"></img>'
            });
        })
}