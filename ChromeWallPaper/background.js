chrome.identity.getProfileUserInfo(function(info) { email = info.email;});

chrome.extension.onMessage.addListener(async function(request, sender, sendResponse) {
    sendResponse( {email: email})

});

{/* <div id="shortcuts-container">
<div id="shortcut-button-container"><button class="add-shortcut-button"><img
            src="./defaultImages/add.svg"></img></button><label class="button-label"
        for="add-shortcut-button">Add shortcut</label></div>
</div> */}