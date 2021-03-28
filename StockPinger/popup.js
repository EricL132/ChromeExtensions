window.onload = function () {
    const ele = document.getElementById('old-items')
    chrome.storage.local.get((data) => {
        if (data.stockitems) {
            data.stockitems.map((item) => {
                const newChild = document.createElement("span")
                newChild.classList = "spanItem"
                newChild.innerText = "Item Name: " + item.category + "   ItemID: " + item.itemid
                ele.appendChild(newChild)
            })
        }
    })


    chrome.storage.local.get((data) => {
        console.log(data)
        const oldmesele = document.getElementById('oldMessages')

        if (data.oldmessages) {
            data.oldmessages.map((item) => {
                const newChild = document.createElement("span")
                newChild.classList = "spanItem"
                newChild.innerText ="Time: "+item.time+"\nItem Name: " + item.itemname + "\nLink: " + item.linkname
                oldmesele.appendChild(newChild)
            })
        }
    })


};


document.addEventListener('DOMContentLoaded', function () {


    document.getElementById('clear-local').addEventListener('click', () => {
        chrome.storage.local.clear()
    })

    document.getElementById('button-add').addEventListener('click', () => {
        const inputvalue = document.getElementById('input-field').value
        const catvalue = document.getElementById('cat-field').value
        chrome.storage.local.get((data) => {

            const items = data['stockitems']
            if (items) {
                items.push({ itemid: inputvalue, category: catvalue })
                chrome.storage.local.set({ "stockitems": items })
                console.log(items)
            } else {
                chrome.storage.local.set({ "stockitems": [{ itemid: inputvalue, category: catvalue }] })
            }

        })

    })


    document.getElementById('button-remove').addEventListener('click', () => {
        const inputvalue = document.getElementById('input-field').value

        chrome.storage.local.get((data) => {
            const items = data['stockitems']
            if (items) {
                const newitemslist = items.filter((item) => {
                    return item.itemid !== inputvalue
                })
                chrome.storage.local.set({ "stockitems": newitemslist })
                console.log(newitemslist)
            }

        })



    })
})