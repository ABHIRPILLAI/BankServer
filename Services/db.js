//server---mongodb integration



//1--import mongoose


const mongoose=require('mongoose');



//2----State connection string via mongoose

mongoose.connect('mongodb://localhost:27017/BankServer',{

    useNewUrlParser:true  //to avoid unwanted warning

});

//3-----Define bank db model


const User=mongoose.model('User',{
    //schema creation ie table header

    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]

});
//in db the document name always plural ie users not user

//4---export collection

module.exports={
    User
}








