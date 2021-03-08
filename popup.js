
document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('clear-local').addEventListener('click',()=>{
        chrome.storage.local.clear()
    })

    document.getElementById('button-add').addEventListener('click', () => {
        const inputvalue = document.getElementById('input-field').value
        const catvalue  = document.getElementById('cat-field').value
        chrome.storage.local.get((data)=>{
        
            const items = data['stockitems']
            if(items){
                items.push({itemid:inputvalue,category:catvalue})
                chrome.storage.local.set({"stockitems":items})
                console.log(items)
            }else{
                chrome.storage.local.set({"stockitems":[{itemid:inputvalue,category:catvalue}]})
            }
            
        })
       

        
    })


    document.getElementById('button-remove').addEventListener('click', () => {
        const inputvalue = document.getElementById('input-field').value

        chrome.storage.local.get((data)=>{
            const items = data['stockitems']
            if(items){
                const newitemslist =items.filter((item)=>{
                    return item.itemid!==inputvalue
                })
                chrome.storage.local.set({"stockitems":newitemslist})
                console.log(newitemslist)
            }
            
        })
    })
})