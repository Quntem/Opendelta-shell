function createfileitems(id) {
    files = [];
    fileview = document.getElementById(id)
    fileview.innerHTML = ""
    console.log("test")
    fetch(fileserver + "/api/files/list/?dir=" + currentdir)
        .then(response => response.json())
        .then (data => {
            for(let i = 0; i < data.length; i++) {
                fileview.innerHTML += '<div draggable="true" tabindex="1" class="fileapp-fileitem grid justify-items-center pt-4 pl-4 pr-4 pb-4 mr-2 ml-2 mt-2 rounded-lg hover:bg-slate-50 focus:bg-slate-100" style="font-size: 10px; max-width: min-content; justify-items: center; display: inline-grid;"><img class="pl-2 pr-2 pt-2 pb-2" src="apps/files/assets/fileicon.png" width="50px" height="50px"></img><div style="font-size: 15px;" class="poppins-medium">' + data[i] + '</div></div>'
            };
        });
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
           copy: {name: "Copy", icon: "copy"},
            "paste": {name: "Paste", icon: "paste"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {name: "Quit", icon: function(){
                return 'context-menu-icon context-menu-icon-quit';
            }}
        }
    });

    $('.fileapp-fileitem').on('click', function(e){
        console.log('clicked', this);
    })    
});