const request=require('request')


const geocode=(address,callback)=>{
const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxiZXJ0bnp5IiwiYSI6ImNreHZ6dGo1MzRjNmIyeHVibDh2Ymdkbm0ifQ.RGAGAw0Zlrn4MtCW-H_J2w'

request({url, json:true},(error,{body})=>{
     if(error){
          callback('Unable to connect to locatrio services!',undefined)
     }else if(body.features.length===0){
          callback('Unable to find location.Try another services',undefined)
     }else{
          callback(undefined,{
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name

          })
     }
})

}

module.exports=geocode