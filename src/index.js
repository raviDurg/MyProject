const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const {collection,vendorCollection}=require("./mongodb")
const passport = require("passport"); // Importing passport
const session = require('express-session');
const LocalStrategy = require("passport-local").Strategy;

const tempelatePath=path.join(__dirname,'../tempelates')

     
app.use(express.json())
app.set("view engine","hbs") 
app.set("views",tempelatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, '../public'))); 

// Apply session middleware
app.use(session({
  secret: 'f1g2h3j4', // replace with a strong secret key
  resave: false,
  saveUninitialized: true
}));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await collection.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await collection.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use('/',router);

router.get('/book/:serviceId', ensureAuthenticated, (req, res) => {
  const serviceId = req.params.serviceId;
  // Your booking logic here, e.g., render the booking page
  res.render('services2', { serviceId });
});

// Login route
router.get('/Login1', (req, res) => {
  res.render('Login1');
});

router.post('/Login2', passport.authenticate('local', {
successRedirect: '/services', // Redirect to services page after login
failureRedirect: '/Login2',
failureFlash: true
}));

module.exports = router; 



router.get('/logout', (req, res) => {
  req.logout((err) => {
      if (err) {
          return next(err);
      }
      res.redirect('/Login2');
  });
});



router.get('/getVendors', async (req, res) => {
  try {
    const vendors = await vendorCollection.find().lean(); // Retrieve all vendors
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});



router.get('/services', (req, res) => {
  res.render('services');
});

app.get("/",(req,res)=>{
    res.render("indexmain")
})

app.get("/indexmain",(req,res)=>{
  res.render("indexmain")
})

app.get("/customerlogin",(req,res)=>{
    
    res.render("customerlogin")
})

app.get("/Login2", (req, res) => {
    res.render("Login2");
});

app.get("/Login1", (req, res) => {
    res.render("Login1");
  });

  app.get("/Login3", (req, res) => {
    res.render("Login3");
  });

app.get("/vendorlogin", (req, res) => {
    res.render("vendorlogin");
  }); 

app.get("/services", (req, res) => {
    res.render("services");
  }); 

app.get("/contacts", (req, res) => {
    res.render("contacts");
  });

app.get("/billing", (req, res) => {
    res.render("billing");
  });
  
app.get("/adminHome", (req, res) => {
    res.render("adminHome");
  }); 
  
app.get("/AddVendor", (req, res) => {
    res.render("AddVendor");
  });

  app.get("/Login3", (req, res) => {
    res.render("Login3");
  });

  app.get("/indexmain", (req, res) => {
    res.render("indexmain");
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  app.get("/clientsreview", (req, res) => {
    res.render("clientsreview");
  });

  app.get("/bookvendor", (req, res) => {
    res.render("bookvendor");
  });




    


app.post("/customerlogin",async (req,res)=>{     

const data={
    fname:req.body.fname,
    lname:req.body.lname,
    mobno:req.body.mobno,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password,
    adress:req.body.adress,
    pincode:req.body.pincode,
    city:req.body.city
}

await collection.insertMany([data])

res.render("indexmain")

})


app.post("/Login2",async (req,res)=>{     

    try{
        const check=await collection.findOne({username:req.body.username})
        
        if(check.password===req.body.password){
            res.render("indexmain")
        }
        else{
            res.render("error", { message: "wrong username or password", backLink: "/Login2" })
       }
    }
    catch{
        res.render("error", { message: "Wrong details", backLink: "/Login2" })     
    }

    })


    app.post("/vendorlogin", async (req, res) => {
        const data = {
          fname: req.body.fname,
          lname: req.body.lname,
          mobno: req.body.mobno,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          businessName: req.body.businessName,
          adress: req.body.adress,
          pincode: req.body.pincode,
          city: req.body.city,
          image: req.body.image
        };
      
        await vendorCollection.insertMany([data]);
        res.render("indexmain");
      });

    
      app.post("/login1", async (req, res) => {
        try {
          const check = await vendorCollection.findOne({ username: req.body.username });
          if (check.password === req.body.password) {
            res.render("indexmain");
          } else {
            res.render("error", { message: "wrong username or password", backLink: "/login1" });
          }
        } catch {
          res.render("error", { message: "Wrong details", backLink: "/login1" });
        }
      });


      app.post("/adminHome", (req, res) => {
        res.render("adminHome");
    });
    
     
    







      
        
app.listen(3001,()=>{
    console.log("port connected")
})
