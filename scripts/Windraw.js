var currentwin = ""
var windraw = {
    init: function() {
        fetch('elements/Windraw.html')
            .then(response => response.text())
            .then(html => {
                const newid = new Date().getTime().toString();
                const desktop = document.getElementById('desktop');
                desktop.innerHTML += html;
                const newWindow = desktop.querySelector('#newwindow');
                newWindow.id = "window" + newid;
                const newTitlebar = desktop.querySelector('#newwindowtitlebar');
                newTitlebar.id = "titlebar" + newid;
                const newContent = desktop.querySelector('#newwindowcontent');
                newContent.id = "content" + newid;
                $( "#window" + newid ).draggable({ handle: "#titlebar" + newid });
                $('.window').draggable({ handle: ".titlebar" });
                $( "#window" + newid ).resizable();
                $(".window").resizable();
                const closeIcon = newWindow.querySelector('#closebutton');
                closeIcon.setAttribute('onclick', `closewin('window${newid}')`);
                closeIcon.id = "closeicon" + newid;
                termlog("content" + newid);
                currentwin = document.getElementById("content" + newid)
            })
            .catch(error => console.error('Error fetching HTML:', error));
    },
    drawtext: function(type, title, text) {
        if(type == "inline"){
            fetch('windraw/elements/text/inline.html')
                    .then(response => response.text())
                    .then(html => {
                        currentwin.innerHTML += html
                        titletext = document.getElementById("wd-title")
                        titletext.innerHTML = title
                        titletext.id = "wd-text-done"
                        subtext = document.getElementById("wd-text")
                        subtext.innerHTML = text
                        subtext.id = "wd-text-done"
                    })
                    .catch(error => console.error('Error fetching HTML:', error));
        } 
        if(type == "container"){
            fetch('windraw/elements/text/container.html')
                    .then(response => response.text())
                    .then(html => {
                        currentwin.innerHTML += html
                        titletext = document.getElementById("wd-title")
                        titletext.innerHTML = title
                        titletext.id = "wd-text-done"
                        subtext = document.getElementById("wd-text")
                        subtext.innerHTML = text
                        subtext.id = "wd-text-done"
                    })
                    .catch(error => console.error('Error fetching HTML:', error));
        }
    },
    drawlist: function(id, items) {
        fetch('windraw/elements/list/container.html')
            .then(response => response.text())
            .then(html => {
                currentwin.innerHTML += html
                listcontainer = document.getElementById("listcontainer")
                listcontainer.id = id

                items.forEach(element => {
                    fetch('windraw/elements/list/item.html')
                    .then(response => response.text())
                    .then(html => {
                        listcontainer.innerHTML += html
                        title = document.getElementById("listtitle")
                        title.innerHTML = element.title
                        title.id = "let-done"
                        sub = document.getElementById("listsub")
                        sub.innerHTML = element.sub
                        sub.id = "les-done"
                    })
                    .catch(error => console.error('Error fetching HTML:', error));
                });
                
            })
            .catch(error => console.error('Error fetching HTML:', error));
    },
};