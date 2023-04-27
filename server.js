import express  from "express";
import "dotenv/config" ;
import session from "express-session";


const PORT = process.env.PORT;
const SK = process.env.SECRET 
const app = express();


app.set("views", "./src/views")  
    .set("view engine", "ejs")
     .use(express.urlencoded({extended: true})) 


// configuration de la session
app.use(session({
    secret: SK,
    resave: false,
    saveUninitialized: false,    
}));

// init de la session à false 
app.use((req, res, next) => {
    //console.log(req.session)
    if(!req.session.isLogged) req.session.isLogged = false;
    //console.log(req.session.isLogged)
    next();
});


app.get("/", (req, res) => {
    if(req.session.isLogged){     
        console.log("connecté")   
        res.status(200).render("home", {user: req.session.alias});
        return;
    }
    console.log('non connecte')
    res.status(200).render("home", {user: null});
});

app.post("/home/connect", (req,res) => {
    const alias = req.body.alias;
    req.session.isLogged = true;
    console.log(req.session.isLogged);
    res.status(200).render("home", {user: alias});
})

app.post("/home/disConnect", (req,res) => {
    // on mets à jour la session 
    req.session.isLogged = false;
    console.log(req.session.isLogged);
    res.status(200).render("home", {user: null});
})











app.listen(PORT, (err) => {
    err
        ? console.log(err)
        : console.log(`Listening at http://localhost:${PORT}`);
});
