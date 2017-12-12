import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Pics {
	constructor(data) {
        this.data = data;
        this.PIC_SERVICE = 'pics';
        this.picArray = [];
   		}   

    async getGalleryPics(id){
        let response = await this.data.get(this.PIC_SERVICE + "/user/gallery" + id);
            if(!response.error && !response.message){
                this.picArray = response;
            }
    }

    async deleteGalleryPics(id){
        let response = await this.data.delete(this.PIC_SERVICE + "/user/gallery" + id);
            if(!response.error){
                for(let i = 0; i < this.picArray.length; i++){
                    if(this.picArray[i]._id === id){
                        this.picArray.splice(i,1);
                    }
                }
            }
    }

     async uploadFile(files, userId, galleryId){
         let formData = new FormData();
             files.forEach((item, index) => {
             formData.append("file" + index, item);
                 });
         let response = await this.data.uploadFiles(formData, this.PIC_SERVICE + "/upload/" + userId + "/" + galleryId);
            return response;
     }
        
    async save(pics){
        if(pics){
             if(!pics._id){
        let serverResponse = await this.data.post(pics, this.PIC_SERVICE);
        if(! serverResponse.error){
            this.picArray.push(serverResponse);
        }
        return serverResponse;
            } 
        else {
                    let response = await this.data.put(pics, this.PIC_SERVICE + "/" + gallery._id);
                    if(!response.error){
                        // this.updateArray(response);
                    }
                    return response;
                }
        }
    }
}
