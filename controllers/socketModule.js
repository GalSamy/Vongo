const {Users} = require("../models/userModel")
const socketIo = require('socket.io');
const { login } = require("./loginController")
const express = require("express")
const jwt = require('jsonwebtoken')
const {extractUserInfo,verify} = require('./servicesController') 
let io 
async function setupSocketListeners(_io) {
    io=_io
    // set up Socket.io event listeners for notifications
    io.on('connection', (socket) => {
      socket.on('subscribe', (authToken) => {
          console.log("(setupSocketListeners)userInfo "+ extractUserInfo(authToken)['email'])
          let email = extractUserInfo(authToken)['email']
        // subscribe the socket to notifications for the specified user
        socket.join(`notifications-${email}`);
      });
  
      socket.on('unsubscribe', (userId) => {
        // unsubscribe the socket from notifications for the specified user
        socket.leave(`notifications-${userId}`);
      });
  
      // ... other event listeners for notifications
      socket.on('joinListing',()=>{
        console.log("someone joined")
        socket.join('listings')
      })
      socket.on('notify',(message)=>{
        notifyUser(io,"please","ykvnkl2@gmail.com")
    })
    });
    console.log(io.of('/').adapter.rooms.has('listings'))
    io.to('listings').emit('newListing')

  }
function newListingNotify(){

    console.log('newListingNotify activated ')
    io.to('listings').emit('newListing')
}
function notifyUser(io,notification,targetEmail){
    console.log("--------"+io+notification+targetEmail)
     io.to(`notifications-${targetEmail}`).emit(`notification`,notification)
}
module.exports = {
    setupSocketListeners,notifyUser,newListingNotify
};