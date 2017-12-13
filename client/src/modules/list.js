import {inject} from 'aurelia-framework';
import {Gallery} from '../resources/data/gallery';
import { AuthService } from 'aurelia-auth';
import {Pics} from '../resources/data/picList'

import {Router} from 'aurelia-router';

@inject(Router,Gallery,AuthService, Pics)
export class List {

  	constructor(router,gallery,auth, mypics) {
		this.mypics = mypics;
		this.router = router;
		this.message = 'List';
		this.auth = auth;
		this.gallery = gallery;
		this.user = JSON.parse(sessionStorage.getItem('user'));
		this.showList = 'galleryList';
		

	}

  	async activate(){
	await this.gallery.getUserGallery(this.user._id);
	}


	back() {
		this.showList = 'galleryList';
	}

  	createGallery(){	
		this.galleryObj = {
			userId: this.user._id,
			gallery: "",
			description: "",	
		}
		this.showList = 'galleryForm';		
  	}

  	async saveGallery(){
		if(this.galleryObj){		
			let response = await this.gallery.save(this.galleryObj);
			if(response.error){
				alert("There was an error creating the Gallery");
			} 
			else {
				var galleryId = response._id;
				                if(this.filesToUpload && this.filesToUpload.length){
				                    await this.gallery.uploadFile(this.filesToUpload, this.user._id, galleryId);
				                    this.filesToUpload = [];
				                }				
			this.showList = 'galleryList';
			}
		}
	}

	async saveMyPics(){
		var mypicsObj = {gallery:this.galleryObj._id}	
			let response = await this.mypics.save(mypicsObj);
			if(response.error){
				alert("There was an error saving pics");
			} 
			else {
				var galleryId = response._id;
				                if(this.filesToUpload && this.filesToUpload.length){
				                    await this.mypics.uploadFile(this.filesToUpload, this.user._id, galleryId);
				                    this.filesToUpload = [];
				                }				
			this.showList = 'picList';
			}
		
	}
	
	editGallery(gallery){

        this.galleryObj = gallery;
        this.showList = 'galleryForm';
    }

	async editMyPic(gallery){
		await this.mypics.getGalleryPics(gallery._id)
		this.galleryObj = gallery;
		this.showList = 'picList'
	}

    deleteGallery(gallery){
        this.gallery.deleteGallery(gallery._id);
    }	
	 deleteGalleryPics(id){
	 	this.mypics.deleteGalleryPics(id);
	 }	


	changeFiles(){
	    this.filesToUpload = new Array(); 
	    this.filesToUpload.push(this.files[0]);
	}

	removeFile(index){
	    this.filesToUpload.splice(index,1);
	}
														
	logout(){
		sessionStorage.removeItem('user');
		this.auth.logout();
	}
}

