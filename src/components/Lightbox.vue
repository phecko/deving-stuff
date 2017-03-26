<template>
  <span @click="open">
    <slot></slot>
  </span>
</template>

<script>

import {addClass,setStyle} from './utils.js'

const getUid = ()=>{
  return (""+(new Date()).getTime()+parseInt(Math.random()*1000)).toString(32)
}

const getWinWidth = ()=>{
  return window.innerWidth
}

const getWinHeight = ()=>{
  return window.innerHeight
}

const containerPadding = {
  top : 10,
  right : 10,
  bottom : 10,
  left : 10
}

const imageBorderWidth = {
  top : 4,
  right : 4,
  bottom : 4,
  left : 4
}


class Picture {
  constructor(src){
    this.src = src
    this.uid = getUid()
  }
}

class Album {
  constructor(name){
    this.name = name
    this.pictures = []
  }

  addPicture(uid){
    this.pictures.push(uid)
  }

  getPictureIndex(uid){
    for (var i = 0; i < this.pictures.length; i++) {
      if(this.pictures[i] == uid){
        return i+1
      }
    }
    return 0
  }

  getPicture(index){
    console.log(index,this.pictures, this.pictures[index-1])
    if (this.pictures.length < index) {
      return
    }
console.log("im ok")
    return this.pictures[index-1]
  }

  length(){
    return this.pictures.length
  }

}


const ModalManager = {
  zindex : 2000,
  _lightbox:false,
  _overlay : false,
  _outerContainer : false,
  _container : false,
  _image:false,
  _loader:false,

  _inited : false,


  _albums : {},
  _pictures : {},
  curAlbum:false,


  init(){
    var self = this
    if (this._inited) {

      this._image.src=""
      setStyle(this._loader,"display","block")
      self.sizeContainer(250,250)


      return
    }
    let div = document.createElement("div")
    div.innerHTML = '<div id="lightboxOverlay" class="lightboxOverlay"></div><div id="lightbox" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" /><div class="lb-nav"><a class="lb-prev" href="" ></a><a class="lb-next" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>'
    let divs = div.childNodes
    let elements = []
    for (var i = 0; i < divs.length; i++) {
      elements.push(divs[i])
    }
    let docFrag = document.createDocumentFragment();
    for(var i = 0; i < elements.length; i++) {
      docFrag.appendChild(elements[i]); // Note that this does NOT go to the DOM
    }
      document.body.appendChild(docFrag)

    this._lightbox = document.getElementById("lightbox")
    this._overlay = document.getElementById("lightboxOverlay")
    this._outerContainer = this._lightbox.querySelector(".lb-outerContainer")
    this._container = this._lightbox.querySelector(".lb-container")
    this._image = this._lightbox.querySelector(".lb-image")
    this._nav = this._lightbox.querySelector(".lb-nav")
    this._loader = this._lightbox.querySelector(".lb-loader")


    // 绑定事件
    this._lightbox.querySelector(".lb-close").addEventListener("click",(event)=>{
      self.end()
      event.stopPropagation()
    })

    this._nav.querySelector(".lb-prev").addEventListener("click",(event)=>{
      console.log("wahahah")
      self.changeImage(self.curIndex-1)
      event.preventDefault()
      event.stopPropagation()
    })

    this._nav.querySelector(".lb-next").addEventListener("click",(event)=>{
      console.log("wahahah")
      self.changeImage(self.curIndex+1)
      event.preventDefault()
      event.stopPropagation()
    })

    self.sizeContainer(250,250)
    this._inited = true
  },
  start(albumName,uid){
    this.init()
    var self = this
    let c = this._overlay
    this.sizeOverlay()
    setStyle(c,"display","block")
    setStyle(this._lightbox,"display","block")
    this.showImage(albumName,uid)
  },

  end(){
    setStyle(this._overlay,"display","none")
    setStyle(this._lightbox,"display","none")
  },

  showImage(albumName,uid){

    console.log("showshow",uid)
    let pic = this.getPicture(uid)
    let self = this
    let nav = this._container.querySelector(".lb-nav")
    let navPrev = nav.querySelector(".lb-prev")
    let navNext = nav.querySelector(".lb-next")
    if (!pic) {
      return 
    }
    var $image = this._lightbox.getElementsByTagName("img")[0]


    var preloader = new Image();
    setStyle(this._image,"visibility","hidden")
    setStyle(this._loader,"display","block")
    setStyle(this._nav,"display","none")
    setStyle(navPrev,"display","none")
    setStyle(navNext,"display","none")
    preloader.onload = ()=>{

      setTimeout(function(){

        let imageWidth = preloader.width,
          imageHeight = preloader.height
        let size = self.sizeContainer(imageWidth,imageHeight)
        setStyle(self._loader,"display","none")
        setStyle($image,"width",size[0]+"px")
        setStyle($image,"height",size[1]+"px")
        $image.src = preloader.src
        setStyle(self._image,"visibility","visible")

      },1500)
      

    }

    preloader.src = pic.src

    let album = this.getAlbum(albumName)
    if (!album) {
      return
    }
    this.curAlbum = album
    setStyle(nav,"display","block")

    let index = album.getPictureIndex(uid)
    if (!index) {
      return
    }
    this.curIndex = index

    if (index>1) {
      setStyle(navPrev,"display","block")
    }

    if (index < album.length()) {
      setStyle(navNext,"display","block")
    }


  },

  changeImage(index){
    if (!this.curAlbum) {
      console.log("noalbum")
      return
    }

    console.log(this.curAlbum,index)
    var pp = this.curAlbum.getPicture(index)
    console.log(this.curAlbum.getPicture(index))
    if (pp.len) {
      return
    }
    console.log(pp)


    this.showImage(this.curAlbum.name,pp)

  },

  sizeOverlay(){
    setStyle(this._overlay,"width",window.innerWidth+"px")
    setStyle(this._overlay,"height",window.innerHeight+"px")
  },

  sizeContainer(imageWidth,imageHeight){
    var self = this
    var oldWidth = this._outerContainer.outerWidth
    var oldHeight = this._outerContainer.outerHeight

    let newWidth = containerPadding.left + imageBorderWidth.left + imageWidth + imageBorderWidth.right + containerPadding.right

    let newHeight = containerPadding.top + imageBorderWidth.top + imageHeight + imageBorderWidth.bottom + containerPadding.bottom


    let maxWidth = getWinWidth()-60,
      maxHeight = getWinHeight()-60,
      ratio = imageWidth/imageHeight

      console.log(maxWidth,maxHeight,newWidth,newHeight)

    if (newWidth>maxWidth) {
      newWidth = maxWidth
      newHeight = newWidth/ratio
    }
    if (newHeight > maxHeight) {
      newHeight = maxHeight
      newWidth = ratio*newHeight
    }

    setStyle(this._outerContainer,"width",newWidth+"px")
    setStyle(this._lightbox,"width",newWidth+"px")
    setStyle(this._outerContainer,"height",newHeight+"px")

    this.positionLightbox(newWidth,newHeight)


    let newImageWidth = newWidth - (containerPadding.left + imageBorderWidth.left  + imageBorderWidth.right + containerPadding.right)
    let newImageHeight = newHeight - (containerPadding.top + imageBorderWidth.top  + imageBorderWidth.bottom + containerPadding.bottom)
    console.log([newImageWidth,newImageHeight])
    return [newImageWidth,newImageHeight]
  },

  positionLightbox(width,height){
    let ww = getWinWidth()
    let wh = getWinHeight()

    let top = (wh-height)/2
    let left = (ww-width)/2

    setStyle(this._lightbox,"top",top+"px")
    setStyle(this._lightbox,"left",left+"px")
  },

  addToAlbum(name,src,desc=""){

    console.log(this._albums)
    let pic  = new Picture(src)

    this._pictures[pic.uid] = pic
    if (!name) {
      return pic.uid
    }

    if (!this._albums[name]) {
      this._albums[name] = new Album(name)
    }
    this._albums[name].addPicture(pic.uid)
    return pic.uid
  },

  getAlbum(name){
    return this._albums[name]
  },

  getPicture(uid){
    return this._pictures[uid]
  }

}




export default {
  name: 'hello',
  props:["src","desc","album"],
  data () {
    return {
      uid:""
    }
  },
  methods:{
    open(){
      ModalManager.start(this.album,this.uid)
    }
  },
  mounted(){
    this.uid = ModalManager.addToAlbum(this.album,this.src)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* Preload images */
body:after {
  content: url(../assets/images/close.png) url(../assets/images/loading.gif) url(../assets/images/prev.png) url(../assets/images/next.png);
  display: none;
}

body.lb-disable-scrolling {
  overflow: hidden;
}

.lightboxOverlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: black;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
  opacity: 0.8;
  display: none;
}

.lightbox {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10000;
  text-align: center;
  line-height: 0;
  font-weight: normal;
}

.lightbox .lb-image {
  display: block;
  height: auto;
  max-width: inherit;
  max-height: none;
  border-radius: 3px;

  /* Image border */
  border: 4px solid white;
}

.lightbox a img {
  border: none;
}

.lb-outerContainer {
  position: relative;
  *zoom: 1;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  border-radius: 4px;

  /* Background color behind image.
     This is visible during transitions. */
  background-color: white;
}

.lb-outerContainer:after {
  content: "";
  display: table;
  clear: both;
}

.lb-loader {
  position: absolute;
  top: 43%;
  left: 0;
  height: 25%;
  width: 100%;
  text-align: center;
  line-height: 0;
}

.lb-cancel {
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  background: url(../assets/images/loading.gif) no-repeat;
}

.lb-nav {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
}

.lb-container {
  padding: 10px;
}

.lb-container > .nav {
  left: 0;
}

.lb-nav a {
  outline: none;
  background-image: url('data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==');
}

.lb-prev, .lb-next {
  height: 100%;
  cursor: pointer;
  display: block;
}

.lb-nav a.lb-prev {
  width: 34%;
  left: 0;
  float: left;
  background: url(../assets/images/prev.png) left 48% no-repeat;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  -webkit-transition: opacity 0.6s;
  -moz-transition: opacity 0.6s;
  -o-transition: opacity 0.6s;
  transition: opacity 0.6s;
}

.lb-nav a.lb-prev:hover {
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}

.lb-nav a.lb-next {
  width: 64%;
  right: 0;
  float: right;
  background: url(../assets/images/next.png) right 48% no-repeat;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  -webkit-transition: opacity 0.6s;
  -moz-transition: opacity 0.6s;
  -o-transition: opacity 0.6s;
  transition: opacity 0.6s;
}

.lb-nav a.lb-next:hover {
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}

.lb-dataContainer {
  margin: 0 auto;
  padding-top: 5px;
  *zoom: 1;
  width: 100%;
  -moz-border-radius-bottomleft: 4px;
  -webkit-border-bottom-left-radius: 4px;
  border-bottom-left-radius: 4px;
  -moz-border-radius-bottomright: 4px;
  -webkit-border-bottom-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.lb-dataContainer:after {
  content: "";
  display: table;
  clear: both;
}

.lb-data {
  padding: 0 4px;
  color: #ccc;
}

.lb-data .lb-details {
  width: 85%;
  float: left;
  text-align: left;
  line-height: 1.1em;
}

.lb-data .lb-caption {
  font-size: 13px;
  font-weight: bold;
  line-height: 1em;
}

.lb-data .lb-caption a {
  color: #4ae;
}

.lb-data .lb-number {
  display: block;
  clear: left;
  padding-bottom: 1em;
  font-size: 12px;
  color: #999999;
}

.lb-data .lb-close {
  display: block;
  float: right;
  width: 30px;
  height: 30px;
  background: url(../assets/images/close.png) top right no-repeat;
  text-align: right;
  outline: none;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);
  opacity: 0.7;
  -webkit-transition: opacity 0.2s;
  -moz-transition: opacity 0.2s;
  -o-transition: opacity 0.2s;
  transition: opacity 0.2s;
}

.lb-data .lb-close:hover {
  cursor: pointer;
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}

</style>
