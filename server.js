const express= require('express');
const mongoose=require('mongoose');

const app= express();
const PORT = proces.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(require('./controllers'));

app.listen(PORT,()=> console.log(`Connected to local host`));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/afsn'),{
    useFindAndModifity:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}