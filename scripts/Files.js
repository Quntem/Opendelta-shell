function createfileitems(id) {
    files = [];
    fileview = document.getElementById(id)
    fileview.innerHTML = ""
    console.log("test")
    fetch(fileserver + "/api/files/listenhanced/?dir=" + currentdir)
        .then(response => response.json())
        .then (data => {
            for(let i = 0; i < data.length; i++) {
                fn = data[i].name
                let icon = ""
                if(data[i].type == "directory") {
                    icon = 'apps/files/assets/foldericon.png" width="70px" height="70px"'
                    itemonclick = ''
                }
                if(data[i].type == "file") {
                    icon = 'apps/files/assets/fileicon.png" width="50px" height="50px"'
                    itemonclick = ''
                }
                fileview.innerHTML += '<div draggable="true" fn="' + fn + '" onclick="' + itemonclick + '" ondragstart="drag(event)" tabindex="1" class="fileapp-fileitem grid justify-items-center pt-4 pl-4 pr-4 pb-4 mr-2 ml-2 mt-2 rounded-lg hover:bg-slate-50 focus:bg-slate-100" style="font-size: 10px; max-width: min-content; justify-items: center; display: inline-grid;"><img class="pl-2 pr-2 pt-2 pb-2" draggable="false" src="' + icon + '></img><div style="font-size: 15px;" class="poppins-medium">' + fn + '</div></div>'
            };
        });
}
function drag(ev) {
    filename = ev.target.getAttribute("fn")
    ev.dataTransfer.setData("text", filename);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target.id)
    console.log(data)
    document.getElementById(ev.target.id).value = data
}
function texteditdrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(ev.target.id)
    console.log(data)
    fetch(fileserver + "/api/files/get/?file=" + data)
        .then(response => response.json())
        .then (response => {
            document.getElementById(ev.target.id).value = response.data
            document.getElementById("teditwindowtitle").innerHTML = "Text Editor - " + data
            document.getElementById("savebutton").setAttribute("filename", data)
            document.getElementById("savebutton").setAttribute("textbox", ev.target.id)
        })
}
function acceptdrop(ev) {
    ev.preventDefault();
}
function savefile(ev){
    file = document.getElementById(ev.target.id).getAttribute("filename")
    textbox = document.getElementById(ev.target.id).getAttribute("textbox")
    filedata = document.getElementById(textbox).value
    fetch(fileserver + "/api/files/savefile?file=" + file + "&filedata=" + filedata)
        .then(response => response.json())
        .then (response => {

        })
}
$(function() {
    $.contextMenu({
        selector: '.fileapp-fileitem', 
        callback: function(key, options) {
            var m = "clicked: " + key;
            window.console && console.log(m) || alert(m); 
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
            "cut": {name: "Cut", icon: "cut"},
            "copy": {name: "Copy", icon: "copy"},
            "paste": {name: "Paste", icon: "paste"},
            "delete": {name: "Delete", icon: "delete"},
        }
    });

    $('.fileapp-fileitem').on('click', function(e){
        console.log('clicked', this);
    })    
});
