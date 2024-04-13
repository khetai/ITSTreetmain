function parseData(data) {
    const formData = new FormData()
    for (let [key, value] of Object.entries(data)) {
        formData.append(key, value)
    }
    return formData
}

function requset(url, data = false, method = "GET", type = "FORM_DATA" ,headers={}) {
    return new Promise(async (resolve, reject) => {
        const options = { method,headers }
        

        if (data && method === "POST" || data && method === "PUT") {
            options.body = type === "JSON" ? JSON.stringify(data) : parseData(data)
        }


        const response = await fetch(import.meta.env.VITE__API_URL + url, options)
        const result = await response.json()

        if (response.ok) {
            resolve(result)
        }
        else {
            reject(result)
        }
    })
}

export const get = (url,headers )=> requset(url,headers)
export const remove = (url,headers )=> requset(url,"DELETE",headers)
export const update = (url,headers )=> requset(url,data,"PUT",headers)
export const updateJSON = (url,headers )=> requset(url,data,"PUT","JSON",headers)
export const post = (url, data,headers) => requset(url, data, "POST",headers)
export const postJSON = (url, data,headers) => requset(url, data, "POST", "JSON",headers)

