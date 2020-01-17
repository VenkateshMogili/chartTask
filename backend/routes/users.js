const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
//Set up default mongoose connection
let db = mongoose.connect('mongodb://venkatesh:venkatesh123@ds263928.mlab.com:63928/emptask',
{useNewUrlParser: true}, (err)=>{
    if(err){
        console.log("Some error"+err);
    } else{
        console.log("MongoDB is connected");
    }
});

let Employee = require("../models/employees.model");
let Admin = require("../models/admins.model");
let Manager = require("../models/managers.model");

router.post("/addUser",(req,res)=>{
    let data = req.body;
    if(!data.name || !data.email || !data.password || !data.usertype){
        res.send({
            success: false,
            message: "Invalid Data"
        });
    } else{
        let usertype = data.usertype;
        if(usertype==='employees'){

                    let employee = new Employee({ 
                        name: data.name, 
                        email:data.email,
                        password: data.password,
                        usertype:data.usertype
                    });
                    employee.save((err)=>{
                        if(err){
                            res.send({
                                success: false,
                                message: "Error occured while inserting"
                            });
                        } else{
                            res.send({
                                success: true,
                                message: "Employee added successfully..."
                            });
                        }
                    });
                }
                if(usertype==='admins'){

                    let admin = new Admin({ 
                        name: data.name, 
                        email:data.email,
                        password: data.password,
                        usertype:data.usertype
                    });
                    admin.save((err)=>{
                        if(err){
                            res.send({
                                success: false,
                                message: "Error occured while inserting"
                            });
                        } else{
                            res.send({
                                success: true,
                                message: "Admin added successfully..."
                            });
                        }
                    });
                }
                if(usertype==='managers'){

                    let manager = new Manager({ 
                        name: data.name, 
                        email:data.email,
                        password: data.password,
                        usertype:data.usertype
                    });
                    manager.save((err)=>{
                        if(err){
                            res.send({
                                success: false,
                                message: "Error occured while inserting"
                            });
                        } else{
                            res.send({
                                success: true,
                                message: "Manager added successfully..."
                            });
                        }
                    });
                }
            }
});

router.get("/all",(req,res)=>{
    var total_data = [];
    Employee.find((err,rows)=>{
        if(err){
            res.send({
                success: false
            });
        } else{
            total_data.push(rows);
            Admin.find((err,rows)=>{
                if(err){
                    res.send({
                        success: false
                    });
                } else{
                    total_data.push(rows);
                    Manager.find((err,rows)=>{
                        if(err){
                            res.send({
                                success: false
                            });
                        } else{
                            total_data.push(rows);
                            res.send({
                                success: true,
                                data: total_data
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;