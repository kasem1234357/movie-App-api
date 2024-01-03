export const randomize = (n)=>{
    let token = '';
    for(let i=0; i<n; i++){
      token += Math.floor(Math.random()*10).toString()
    }
    return token
  }