const RANGES = {
    A_F:{},
    G_L:{},
    M_R:{},
    S_Z:{},
    other:{}
}
const Movies = require('../models/Movies')
const checkLink = async(req,res)=>{
     const {year,month,range,name} =req.body
    try {
        const movie =await Movies.findOne({year:year,month:month})
        if(movie.ranges[range][name]){
            res.status(200).json({data:movie.ranges[range][name]})
        }else{
            res.status(404).json('error') 
        }
    } catch (error) {
        res.status(500).json('error') 
    }
}
const addLink = async(req,res)=>{
    const {year,month,name,range,data} =req.body
    try {
        const movie = await Movies.findOne({year:year,month:month})
        if(movie){
           await movie.updateOne({
            $set:{
                   [`ranges.${range}.${name}`]: data,
                 },
          })
          res.status(200).json('done')
        }else{

            const newList = new Movies({
                year,
                month,
                ranges:{ ...RANGES,
                [range]:{
                    [name]:data
                   }}
            })
            
            const list = await newList.save()
            res.status(200).json(list)
        }
    } catch (error) {
        res.status(500).json('error') 
    }
}
module.exports ={
    checkLink,
    addLink
}