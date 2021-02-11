var express = require('express');
var router = express.Router();

const request = require('request');


var responseObject = {
    "actions": [
    ]
};

router.post('/start/:botname', (req, res) => {
    const botname = req.params.botname;
  
  console.log('pistart', req.body);
  
  function txtHandler (msg, tres)  {
    
    responseObject = {
        "reply": msg
    };
    
        try{
          //console.log('resstatus', req.app.locals.clients[req.body.botSessionId].res.finished);
          if(req.app.locals.clients[req.body.botSessionId].res.finished == false){

            req.app.locals.clients[req.body.botSessionId].res.json(responseObject);
          } else {
            req.app.locals.clients[req.body.botSessionId].cache = responseObject
            console.log('no valid response, need to push out');
          }
        }
        catch(err){
            console.log(err);
        }
    //app.locals.reso.json({return : msg})
      
    //console.log("send msg: " + msg + ", result: " + result);
  }

  if(req.app.locals.clients[req.body.botSessionId] && req.app.locals.clients[req.body.botSessionId].hasSession){
    
    req.app.locals.clients[req.body.botSessionId].res = res;
    if(req.body.CurrentInput == 'cache'){
      req.app.locals.clients[req.body.botSessionId].res.json(req.app.locals.clients[req.body.botSessionId].cache || {});
      delete req.app.locals.clients[req.body.botSessionId].cache
    }
    else {
    try{
 req.app.locals.clients[req.body.botSessionId].send(req.body.CurrentInput);
    } catch(error) {
        console.log('res not here', error);
    }
  }
  } else {
    console.log('start new bot')
    //var jsonDataObj2 = {'so' : 'bot'};
    //var jsonSend = JSON.stringify(jsonDataObj);
   
    var botconfig = {
      
      "endpointUrl": "https://d.gla3-phx.gus.salesforce.com/chat/rest/",
      "version": 50,
      "organizationId": "00DB0000000YRSt",
      "deploymentId": "572B00000001Oue",
      "buttonId": "573B00000001Y96",
      "botid": "appi"
  }
    botid = 'default';
    var langs = 'en';
   console.log('memory', req.body.botid);
   botid = req.body.botid;
    
   // console.log('twilio', req.body)
    
     langs='en-US';
    
    
      botid = req.body.botid
    
    var clientInfo = {
      name: "Spaghetti Proxy User",
      language: "en_US",
      screenResolution: "none",
      visitorName: "BotProxy",
      prechatDetails : [
        {"label":"proxyChannel__c","value": 'roblox',"displayToAgent":true,"transcriptFields": ["proxyChannel__c"]},
        {"label":"proxyLanguage__c","value": langs,"transcriptFields":[ "proxyLanguage__c" ],"displayToAgent":true},
        {"label":"proxyUserId__c","value": botid,"transcriptFields":[ "proxyUserId__c" ],"displayToAgent":true},
        {"label":"botProxyId__c","value": req.body.botSessionId,"transcriptFields":[ "botProxyId__c" ],"displayToAgent":true}
        ]
  }

  req.app.locals.clients[req.body.botSessionId] = new req.app.locals.la.Client(botconfig, clientInfo);
    /*
    if(req.body.Memory.twilio.botid){
      botid = req.body.Memory.twilio.botid
     }

      BotConfig.find({ botid: botid }, function (err, configs) {
        if (err){ 
          req.app.locals.clients[req.body.botSessionId] = new req.app.locals.la.Client(botconfig, clientInfo);
        req.app.locals.clients[req.body.botSessionId].res = res;
        req.app.locals.clients[req.body.botSessionId].startmessage = req.body.CurrentInput;
 req.app.locals.clients[req.body.botSessionId].start(txtHandler);
 return;
        }
        if(configs[0]){
        botconfig = configs[0];} 
        console.log('myconfig', configs);
        req.app.locals.clients[req.body.botSessionId] = new req.app.locals.la.Client(botconfig, clientInfo);
        req.app.locals.clients[req.body.botSessionId].res = res;
        req.app.locals.clients[req.body.botSessionId].startmessage = req.body.CurrentInput;
 req.app.locals.clients[req.body.botSessionId].start(txtHandler);
      })
    


      */
 

}})
/* GET users listing. */
router.get('/', function(req, res, next) {
  
 
  res.json(req.app.locals.respo);
});

router.get('/new', function(req,res,next)  {

  req.app.locals.client = new req.app.locals.la.Client(req.app.locals.opt, req.app.locals.clientInfo);
/*
const txtHandler = (msg) => {
    //const result = client.send(msg);
    res.json({return : msg})
    //console.log("send msg: " + msg + ", result: " + result);
}
*/
req.app.locals.reso = res;
req.app.locals.client.start(req.app.locals.txtHandler);
});

router.get('/more', function(req,res,next)  {
  //console.log(req.app.locals.client);
  req.app.locals.reso = res;
  req.app.locals.client.send('send');
});

module.exports = router;
