// //server creation


// //import express

const express = require('express');


//dataservice import

const dataService = require('./Services/data.service');

// import cors

const cors=require('cors')



const { append } = require('express/lib/response');

// ///creating an application for express

const app=express()



//Give command to share data via cors

app.use(cors({
    origin:'http://localhost:4200'
}))


//to parse json from req body

app.use(express.json())//--to veiw data in console



//application specific middleware

// const appMiddleware =(req,res,next)=>{
//     console.log('application specific middleware');
//     next();
// }
// app.use(appMiddleware)



const jwt = require('jsonwebtoken')
//router specific middleware

const jwtMiddleware=(req,res,next)=>{
    console.log('router specific middleware');
    const token = req.headers['x-access-token']

    //verify token
    const data=jwt.verify(token,'Key#23123');
    console.log(data);
    next();

}
// app.use(jwtMiddleware)

// //create a port number--for frnt end localhost:4200
// //here backend---3000





app.listen(3000,()=>{
    console.log('listening on port 3000');
})

// //http methods--get http req
// //'/' is root path 
// app.get('/',(req,res)=>{
//     res.send("Get Request");


// })

// app.post('/',(req,res)=>{
//     res.send("Post Request");


// })
// app.put('/',(req,res)=>{
//     res.send("Putt Request");//fulll update


// })
// app.patch('/',(req,res)=>{
//     res.send("Patch Request");//partial update


// })
// app.delete('/',(req,res)=>{
//     res.send("delete Request");


// })


//API CALL

//reg req

app.post('/register',(req,res)=>
{
    console.log(req.body);
      dataService.register(req.body.acno,req.body.username,req.body.password)//to access dataservice in index page ie,first
      .then(result=>{
        res.status(result.statusCode).json(result)//so we add staus etc on dataservice so display like that in json format so res.json(result)

      })
    //first we import data service then export in dataservice and then access


    // if (result) {
    // res.send('Register Successfull');

    // }
    // else{
    //     res.send("User Already Registered")
    // }

})

//login req
app.post('/login',(req,res)=>
{
    console.log(req.body);
 dataService.login(req.body.acno,req.body.password)//to access dataservice in index page ie,first
 .then(result=>{
    res.status(result.statusCode).json(result)//so we add staus etc on dataservice so display like that in json format so res.json(result)

 })
    //first we import data service then export in dataservice and then access


    // if (result) {
    // res.send('Register Successfull');

    // }
    // else{
    //     res.send("User Already Registered")
    // }

})

// app.post('/deposit',(req,res)=>
// {
//     console.log(req.body);
//  const result =dataService.deposit(req.body.acno,req.body.password,req.body.amount)//to access dataservice in index page ie,first
//     //first we import data service then export in dataservice and then access

//     res.status(result.statusCode).json(result)//so we add staus etc on dataservice so display like that in json format so res.json(result)

//     // if (result) {
//     // res.send('Register Successfull');

//     // }
//     // else{
//     //     res.send("User Already Registered")
//     // }

// })


//deposit req

app.post('/deposit',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
dataService.deposit(req.body.acno,req.body.password,req.body.amount)//to access dataservice in index page ie,first
.then(result=>{
    res.status(result.statusCode).json(result)//so we add staus etc on dataservice so display like that in json format so res.json(result)

 })
    //first we import data service then export in dataservice and then access

    // if (result) {
    // res.send('Register Successfull');

    // }
    // else{
    //     res.send("User Already Registered")
    // }

})

//withdraw req

app.post('/withdraw',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
dataService.withdraw(req.body.acno,req.body.password,req.body.amount)//to access dataservice in index page ie,first
.then(result=>{
    res.status(result.statusCode).json(result)//so we add staus etc on dataservice so display like that in json format so res.json(result)

 })
    //first we import data service then export in dataservice and then access


    // if (result) {
    // res.send('Register Successfull');

    // }
    // else{
    //     res.send("User Already Registered")
    // }

})

//transaction req

app.post('/transaction',jwtMiddleware,(req,res)=>
{
    console.log(req.body);
dataService.getTransaction(req.body.acno)//to access dataservice in index page ie,first
.then(result=>{
    res.status(result.statusCode).json(result)//so we add staus etc on dataservice so display like that in json format so res.json(result)

 })

    //first we import data service then export in dataservice and then access


    // if (result) {
    // res.send('Register Successfull');

    // }
    // else{
    //     res.send("User Already Registered")
    // }

})
app.delete('/deleteAcc/:acno',(req,res)=>
{
    // console.log(req.body);
dataService.deleteAcc(req.params.acno)//to access dataservice in index page ie,first
.then(result=>{
    res.status(result.statusCode).json(result)//so we add staus etc on dataservice so display like that in json format so res.json(result)

 })
})




//delete req



