import {imageApi} from '../const/const'

interface typeImage{
    text:string,
    setImage: (value:string) => void,
    setloading:(value:boolean) => void

}


export function getImage({text,setImage,setloading}:typeImage){
    if(text === '') return
    const newImage = imageApi + text
    setImage(newImage)
    setloading(false)

  }