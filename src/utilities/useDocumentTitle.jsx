import { useEffect } from "react"



export const useDocumentTitle = (title,description='')=>{
    useEffect(()=>{
        document.title = title

        if (description) {
            let meta =document.querySelector('meta[name=description]')
            if (!meta) {
                meta = document.createElement('met')
                meta.name = 'description'
                document.head.appendChild(meta)
            }
            meta.content =  description
        }
    },[title,description])
}