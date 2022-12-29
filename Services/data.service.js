//to import JWT token
const res = require('express/lib/response');
const jwt= require('jsonwebtoken');


/////////import DB-----

const db=require('./db')


  userDetails=
  {
    1000:{acno:1000,username:'Abhi',password:1000,balance:1000,transaction:[]},
    1001:{acno:1001,username:'Abhilash',password:1001,balance:1000001,transaction:[]},
    1002:{acno:1002,username:'Abhilash Radhakarishna Pillai',password:1002,balance:100002,transaction:[]}//add transaction 
  }








const  register=(acno,username,password)=>{
   
  return db.User.findOne({acno})
  .then(user=>{//then to synchronize between ports
    if(user){
      return{
        status:false,
        statusCode:400,
        message:'User already registeredd'
      }

    }
    else
    {
      const newUser = new db.User({
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[]
      })
      newUser.save()//data saved in mogodb
      return{
        status:true,
        statusCode:200,
        message:'User  registration successful'
      }
    
   

 
  }})}

    // let userDetails=this.userDetail

    // if(acno in userDetails){
    //   return{
    //     status:false,
    //     statusCode:400,
    //     message:'User already registered'     
    // }//to display message in this format
    // }
    // else{
    //   userDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:0,
    //     transaction:[]//also here
    //   }
    //   console.log(userDetails);
    // //   this.saveDetails();
      
    //   return{
    //     status:true,
    //     statusCode:200,
    //     message:"register successfull"
    //   }
    // }

   

 const  login=(acno,pswd)=>{

    // let userDetails=this.userDetail

  //   if (acno in userDetails) {
    return db.User.findOne({acno,password:pswd})
    .then(user=>{
      if (user) {
        currentUser=user.username//assign username to the variable
        currentAcno=acno
        const token =jwt.sign({currentAcno:acno},'Key#23123')
        return{
          status:true,
          statusCode:200,
        message:"login successfull",
        token:token,
        currentUser:currentUser,
        currentAcno:currentAcno 
        
        } 
      }
      else{
        return{
          status:false,
          statusCode:400,
          message:"Invalid userdetails"
        }
      }
    })


  //        
   }
  const deposit=(acno,pswd,amt)=>{

    
      // let userDetails=this.userDetail
      var amount=parseInt(amt)
      return db.User.findOne({acno,pswd})
      .then(user=>{
        if (user) {

          user.balance+=amount;
          user.transaction.push({//push values to transaction array
            Type:'Credit',
            amount:amount//the Type name and amount name is refered in *ngFor
          })
         user.save();
          // console.log(userDetails);//to check whether the data is disolaying
          return{
            status:true,
            statusCode:200,
          message:`${amount} is credited and Balance:${user.balance}`
          }
  
          // this.saveDetails();
          return userDetails[acno]['balance']
  
        }
        else{
          // alert('password incorrect')
          return{
            status:false,
            statusCode:400,
            message:"InCORRECT USERDETAILS"
          }
        }
      })
    }




      // else{
      //   // alert('invalid userdetails')
      //   return{
      //     status:false,
      //     statusCode:400,
      //     message:"Invalid userdetails"
      //   }
      // }
    
  
  
     //exporting the function to use in other places
  
   
  const withdraw=(acno,pswd,amt)=>
   {
    //  let userDetails=this.userDetail
     var amount=parseInt(amt)
     return db.User.findOne({acno,pswd})
     .then(user=>{
       if (user)
        {

    //  if (acno in userDetails) {
    //     if(amount>userDetails[acno]['balance']){
    //      alert("transaction error")
 
    //      return{
    //       status:false,
    //       statusCode:400,
    //       message:"transaction error"
    //      }
    //    }
    //    else if (pswd==userDetails[acno]['password']) {
      if (user.balance>amount) {
        user.balance-=amount;
        user.transaction.push({//push values to transaction array
          Type:'Debit',
          amount:amount
        })
      
        //  userDetails[acno]['balance']-=amount;
        //  userDetails[acno]['transaction'].push({//push values to transaction array
        //    Type:'Debit',
        //    amount:amount
        //  })
        user.save();

        //  console.log(userDetails);
         
        //  this.saveDetails();
         return{
          status:true,
          statusCode:200,
        message:`${amount} is debited and Balance:${user.balance}` }
       }
      }
      else{
        //  alert('invalid userdetails')
        return {
          status:false,
          statusCode:400,
          message:"invalid userdetails"
         }
     
     }
    })
  }

     
 
    //    else{
    //      alert('password incorrect')
    //      return {
    //       status:false,
    //       statusCode:400,
    //       message:"password incorret"
    //      }
    //    }
    //  }
  //    else{
  //     //  alert('invalid userdetails')
  //     return {
  //       status:false,
  //       statusCode:400,
  //       message:"invalid userdetails"
  //      }
   
  //  }

  
 const getTransaction=(acno)=>{//acno arde ano ayalde acnt details kitnm
    return db.User.findOne({acno})
    .then(user=>{
      if (user)
       {
    return {
      status:true,
      statusCode:200,
      // message:"invalid userdetails"
     transaction: user.transaction

     }
    }
    else{
      return {
        status:false,
        statusCode:400,
        message:"User not Found"
       }
    }
  })}

  //to delete account

  const deleteAcc=(acno)=>{
    return db.User.deleteOne({acno})
    .then(user=>{
      if (user)
       {
        return{
          status:true,
          statusCode:200,
          message:'User  deleted successful'
        }
  }
  else{
    return {
      status:false,
      statusCode:400,
      message:"User not Found"
     }
  }
})}


   module.exports={
    register,login,deposit,withdraw,getTransaction,deleteAcc
   }
  
  