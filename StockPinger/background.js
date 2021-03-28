document.addEventListener('DOMContentLoaded', function () {

    chrome.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'Origin')
                    details.requestHeaders[i].value = 'https://order.mandarake.co.jp';
            }

            return {
                requestHeaders: details.requestHeaders
            };
        }, {
        urls: ["*://*.mandarake.co.jp/*"]
    },
        ["blocking", "requestHeaders", "extraHeaders"]);


    window.setInterval(async function () {
        chrome.storage.local.get((data) => {

            const items = data['stockitems']
            if(items){
            items.map(async (item) => {
                let form = new FormData();
                form.append('idx', item.itemid)
                form.append('lang', 'en')
                const res = await fetch('https://my.mandarake.co.jp/ItemDetailInfo/getInfo/', { method: "POST", headers: { 'Access-Control-Allow-Origin': '*', 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36', 'origin': 'https://order.mandarake.co.jp' }, body: form })
                const resinfo = await res.json()
                console.log(resinfo)
                if (resinfo.zaiko === 1) {
                    const itemName = `${item.category}`
                    const linkName = `https://order.mandarake.co.jp/order/detailPage/item?itemCode=${item.itemid}&lang=en`
                    alert(`Item:${item.category}                                                                                          https://order.mandarake.co.jp/order/detailPage/item?itemCode=${item.itemid}&lang=en`)
                    chrome.storage.local.get((data) => {

                        const items = data['stockitems']
                        if (items) {
                            const newitemslist = items.filter((initems) => {
                                return initems.itemid !== item.itemid
                            })
                            chrome.storage.local.set({ "stockitems": newitemslist })
                            console.log(newitemslist + "removed")
                        }

                    })


                    chrome.storage.local.get((data)=>{
                        const time = Date().toString().split("GMT")[0]
                        const items = data['oldmessages']
                        if(items){
                            items.unshift({itemname:itemName,linkname:linkName,time:time})
                            chrome.storage.local.set({"oldmessages":items})
                            console.log(items)
                        }else{
                            chrome.storage.local.set({"oldmessages":[{itemname:itemName,linkname:linkName,time:time}]})
                        }
                        
                    })
                }
            })

        }


        })


    }, 3000);


})