import {textApi} from '../const/const'



 const getText =async (text:string):Promise<string> =>{


     try {
         const res = await fetch(textApi)
         const data = await res.json()
         return Separete(data.fact, text)
     } catch (e) {
        console.log('Error en la solicitud',e)
         return ''
     }



}

export default getText


function Separete(fact:string,text:string): string | Promise<string>{

    const newfact = fact.split(' ').slice(0,3).join(' ')
    if(text === newfact){
        return getText(newfact)
    }else{
    return newfact
    }


}
