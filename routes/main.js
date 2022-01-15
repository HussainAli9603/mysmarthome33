var express = require('express');
var router = express.Router();
var Device = require('../models/devices');  

  // Get Home Page
router.get('/',(req,res)=>{
  Device.find((err,device)=>{
    res.render('admin/home',{      // renders views/admin/home.ejs
    device:device.length
  })
})
})

 // Get About Page
router.get('/about',(req,res)=>{
    res.render('admin/about')
})

 // Add Device Page 
router.get('/add-device',(req,res)=>{
    res.render('admin/add_device')
});

router.post('/add-device',(req,res)=>{
	// Retrieves fields from Add Device page from request body
	var name        = req.body.deviceName;
	var onOff       = req.body.onOff;
	var openClose   = req.body.openClose;
	var temperature = req.body.temperature;
  var volume      = req.body.volume;
	var channel      = req.body.channel;

   // Create new Device Object
    var newDevice         = new Device();
    newDevice.name        =  name;
    newDevice.onOff       =  onOff;
    newDevice.openClose   =  openClose;
    newDevice.temperature =  temperature;
    newDevice.volume      =  volume;
    newDevice.channel      =  channel;
         
    newDevice.save((device)=>{
    req.flash('success','Device was successfully Created');
    res.redirect('/add-device')   // redirect to this link http://localhost:8089/add-device

    });
});


 // Show Device Status Page
router.get('/show-device-status',(req,res)=>{
	Device.find((err,getAllDevices)=>{ // Retrieves all Devices from database
      res.render('admin/show_device_status',{
    	getAllDevices:getAllDevices   // passes Device object to ejs 
    })
  }); 
})

 // Update Device Status Page
router.get('/update-device-status',(req,res)=>{
	Device.find((err,getDevice)=>{ // Retrieves Single Device from database
    res.render('admin/update_device_status',{
    	getDevice:getDevice  // passes Device object to ejs 
    })
   })
})

 // Update1 Device Status Page
router.get('/update1-device-status/:id',(req,res)=>{
	var id = req.params.id
	Device.findOne({_id:id},(err,getDevice)=>{ // Retrieves Single Device from database
    res.render('admin/update1_device_status',{
    	getDevice:getDevice  // passes Device object to ejs 
    })
   })
})

 // POST method Update Device status
router.post('/update1-device-status/:id',(req,res)=>{
	// Retrieves fields from Add Device page from request body
	var name        = req.body.deviceName;
	var onOff       = req.body.onOff;
	var openClose   = req.body.openClose;
	var temperature = req.body.temperature;
	var volume      = req.body.volume;
  var channel      = req.body.channel;
  var id          = req.params.id;
    
    Device.findOne({_id:id},(err,getDevice)=>{
    	if(err) console.log(err)

    	getDevice.name        = name;
    	getDevice.onOff       = onOff;
    	getDevice.openClose   = openClose;
    	getDevice.temperature = temperature;
      getDevice.volume      = volume;
    	getDevice.channel      = channel;

    	getDevice.save().then(updatedDevice=>{
    		req.flash('success','Device was successfully Updated');
            res.redirect('/update-device-status');
        });
     })
});



 // Delete Device  Page
router.get('/delete-device-status',(req,res)=>{
	Device.find((err,getAllDevices)=>{ // Retrieves all Devices from database
       res.render('admin/delete_device',{
    	getAllDevices:getAllDevices   // passes Device object to ejs 
    })
  }); 
})

 // Device Delete Method 
router.get('/delete1-device/:id',(req,res)=>{
	var id = req.params.id;
	Device.deleteMany({_id:id},(err,deleteDevices)=>{ // Retrieves Single Device from database
        req.flash('success','Device was successfully Deleted!');
        res.redirect('/delete-device-status')
  }); 
})

module.exports = router;



