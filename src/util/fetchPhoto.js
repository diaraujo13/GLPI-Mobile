import { CLIENT_ID } from "../config/const";


export default class FotosFetchService{    
    static send(data, id){

        let formData = new FormData();
        
        // formData.append('file', {uri:data.uri, type:data.type, name:data.fileName});
        formData.append('image', data.data);
        
        const uri = "https://api.imgur.com/3/image";

        const requestInfo ={
            method:     'POST',
            body:       formData,
            headers:    new Headers({
                'Content-Type':'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': 'Client-ID ' + CLIENT_ID
            })
        };

        return fetch(uri, requestInfo)
            

        
    }
}