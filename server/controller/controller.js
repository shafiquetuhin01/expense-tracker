const model = require('../models/models')

// post:http://localhost:9000/api/categories 
async function create_Categories(req, res){
    const Create = new model.Categories({
        type:"Investment",
        color:"#fcbe44"
    })

   await Create.save(function(err){
        if(!err) return res.json(Create)
        return res.status(400).json({message:`Error white creating categories ${err}`})
    })
}

// get:http://localhost:9000/api/categories 
async function get_Categories(req, res){
    let data = await model.Categories.find({})
    let filter = await data.map(v=>Object.assign({},{type:v.type,color:v.color}))
    return res.json(filter)
}

// post:http://localhost:9000/api/transaction 
async function create_Transaction(req, res){
    if(!req.body) return res.status(400).json("Post http data not provided")
    let{name, type, amount} = req.body
    const create = await new model.Transaction({
        name, type, amount, date: new Date()
    })
    create.save(function(err){
        if(!err) return res.json(create)
        return res.status(400).json({message:`Error while crating transaction ${err}`})
    })
}

// get:http://localhost:9000/api/transaction 
async function get_Transaction(req, res){
    let data = await model.Transaction.find({})
    // let filter = await data.map(v=>Object.assign({},{type:v.type,color:v.color}))
    return res.json(data)
}

// delete:http://localhost:9000/api/transaction 
async function delete_Transaction(req, res){
    if(!req.body)res.status(400).json({message:"Requested id is not found"})
    await model.Transaction.deleteOne(req.body, function(err){
        if(!err)res.json("Record deleted")
    }).clone().catch(function(err){
        res.json(`Error occured while deleting id ${err}`)
    })
}

// get:http://localhost:9000/api/labels 
async function get_Labels(req, res){
    model.Transaction.aggregate([
        {
            $lookup:{
                from:"categories",
                localField:"type",
                foreignField:"type",
                as:"categories_info"
            }
        },
        {
            $unwind:"$categories_info"
        }
    ]).then(result=>{
        let data = result.map(v=>Object.assign({},{_id:v._id,name:v.name,type:v.type,amount:v.amount,color:v.categories_info['color']}))
        res.json(data)
    }).catch(error=>{
        res.status(400).json(`Lookup collection error ${error}`)
    })
}
module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}