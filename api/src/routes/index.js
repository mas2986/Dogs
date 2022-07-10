const axios = require('axios');
const { Router } = require('express');

const {Dog, Temperament} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const URL = 'https://api.thedogapi.com/v1/breeds';
const {api_key} = process.env;

const router = Router();

const getDogsApi = async ()=>{
    try{
        let dogs = await axios.get(`${URL}?api_key=${api_key}`);
        //console.log(dogs);
        dogs = await dogs.data;
        let dogsApi = dogs.map(dog=>{
            return{
                id: dog.id,
                image: dog.image.url,
                name: dog.name,
                temperaments:dog.temperament?.split(', '),
                weight: dog.weight.metric?.split('-'),
                height: dog.height.metric?.split('-'),
                lifeSpan: dog.life_span?.split('-')
            }
        })        
        return dogsApi;
    }
    catch(e){return []};
};

const getDogsDB = async()=>{
    try{
        let dogsDB = await Dog.findAll({
            include:{
                model:Temperament,
                attributes:['name'],
                through: {
                    attributes:[]
                }
            }
        });
        dogsDB = dogsDB.map(dogDB=>dogDB.toJSON());  
        dogsDB.map(el=>{
            el.temperaments = el.temperaments.map(type=>type.name);
            });
        return dogsDB;
    }
    catch(e){console.log(e)};
}

const getAllDogs = async()=>{
    let dogsApi = await getDogsApi();
    let dogsDB = await getDogsDB();
    let allDogs = dogsApi.concat(dogsDB);
    return allDogs;
}

router.get('/dogs',async(req,res,next)=>{
    let {name} = req.query;
    try{
        let allDogs = await getAllDogs();
        if(!name){  
            return res.status(200).json(allDogs);
        }
        else{
            let dogsName = allDogs.filter(dog=>dog.name.toUpperCase().includes(name.toUpperCase()))
            dogsName.length?
            res.status(200).json(dogsName)
            :res.status(404).send('Tu búsqueda no produjo resultados')
        }
    }
    catch(e){next(e)}
})

router.get('/dogs/:id',async(req,res,next)=>{
    let {id} = req.params;
    try{
        let allDogs = await getAllDogs();
        let dogId = allDogs.find(dog=>dog.id==id);
        if(dogId) return res.status(200).json(dogId);
        return res.status(404).send('Tu búsqueda no produjo resultados');
    }
    catch(e){next(e)}
});

router.get('/temperament',async(req,res,next)=>{
    try{
        let allDogs = await getDogsApi();
        let temperament = allDogs.map(el=>el.temperaments).flat();
        let setTemperament = new Set(temperament);
        temperament = [...setTemperament];
        temperament = temperament.filter(Boolean)//elimina valores nulos
        await Promise.all(temperament.map(el=>{
            Temperament.findOrCreate({
                where:{name:el}
            })
        }));
        temperament = await Temperament.findAll();
        return res.status(200).json(temperament);
    }
    catch(e){next(e)}
    //console.log(temperament);    
})

router.post('/dog',async(req,res,next)=>{
    let {name,weight,height,temperament} = req.body;
    if(!name || !weight || !height || !temperament) return res.status(404).send('Faltan datos obligatorios');
    try{
        let dog = await Dog.create(req.body);
        let promises = temperament.map(el=>Temperament.findOne({where:{name:el},attributes:['id']}))
        let temperamentId = await Promise.all(promises);
        await dog.addTemperament(temperamentId);
        return res.status(201).json(dog);
    }
    catch(e){next(e)};

})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
