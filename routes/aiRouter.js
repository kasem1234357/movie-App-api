const router = require('express').Router()
const {CohereClient} = require("cohere-ai")
router.post('/',async(req,res)=>{
    const {text} = req.body
    console.log(text)
    const cohere = new CohereClient({ token: "nOH5htFAQaGXdJsm6AcTkQPTl59XfXoNDczJLp60" }); 
    const response = await cohere.chat({
        model: "command-r-plus",
        message: `${text} 
        [{
        title:title of the movie",
        year,
        duration,
        language,
        description,
        genre
        }]
        1- don't use any special letter beacuse that's give me error
        1- dont send json format send as js array have multible objects 
        2- dont change the sentence "name=movie" in the link attribute`
        
      });
      if(response){

        res.status(200).json(response)
      }
      else{
        res.status(500).json('error')
      }
      
})
module.exports = router
