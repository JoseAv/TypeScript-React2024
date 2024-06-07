export async function Questions(){
    try {
    const res = await fetch('http://localhost:5173/PreguntasCiencias.json')
    const resolve = res.json()
    return resolve
    }catch(err){
        console.log(err)
    }

}