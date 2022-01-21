const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const app=express()

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Albert Narzary'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name: 'Albert Narzary'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This page is basically made to help you with your problems.",
        title:'help',
        name:'Albert Narzary'
    })
})

// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Albert',
//         age:20
//     },{
//         name: 'sarah'
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>ABOUT</h1>')
// })

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
           return res.send({error})
        }

        forecast(latitude, longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Albert Narzary',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Albert Narzary',
        errorMessage:'Page Not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})