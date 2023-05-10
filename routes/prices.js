const router = require("express").Router();
const Flight = require("../models/flight");


router.get('/', (req,res) => {
    res.status(200).json({status: "success", msg: "This Flight API"}); 
});


// create a new flight...
router.post('/add', async (req, res) => {
    try{
        const {source, destination, airline, price, date} = req.body

        if( !(source && destination && airline && price))
            return res.status(400).json({status: "error", msg: "All fields are required.."});

        // creating new object to be passed..
        let newDataObject = {
                source: source.toLowerCase(), 
                destination: destination.toLowerCase(), 
                airline: airline.toLowerCase(),
                price
            }

        if(date){
            newDataObject["date"] = new Date(date);
        }
       
        const newData = new Flight(newDataObject);
 
        // save user in database..
        await newData.save()
        res.status(201).json({status: 'successful', msg: newData});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// get get flights
router.post('/get', async (req, res) => {

    const {source, destination, date} = req.body;
    const src = source.toLowerCase();
    const dest = destination.toLowerCase();
    let dateInput = date;
    if(!dateInput){
        dateInput = new Date();
    }
    else{
        dateInput = new Date(dateInput);
    }

    try{
        let availableFlights = await Flight.aggregate([
            { $match: {source: src} },
            { $match: {destination: dest} },

        ],
        { allowDiskUse: true }

        )


        availableFlights = availableFlights.filter( (each) => {
            const myDate = new Date(each.date);
            // matching the dates...

            // console.log("Database Date - ", myDate.toString());
            // console.log("Input Date - ", dateInput.toString());
            if(dateInput.toString().slice(4,15) === myDate.toString().slice(4,15)){
                return true
            }
            else {
                return false;
            }
        } )


        res.status(200).json({status: 'successful', msg: availableFlights});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// get all active flights
router.get('/all', async (req, res) => {

    try{
        const allFlight = await Flight.find().select("-__v");
        res.status(200).json({status: 'successful', msg: allFlight});
    }
    catch(err){
        res.status(500).json({status: 'failed', msg: err});
    }
})


// update the details of the flight..
router.patch('/update/:id', async(req, res) => {
    try{
        const {id} = req.params;

        const updatedObject = {}
        for(let each of Object.keys(req.body)){
            if(each !== "price" || each !== "date"){
                const lowerCase = req.body[each].toLowerCase();
                updatedObject[each] = lowerCase;
            }
        }

        // find and update the task in the table
        const updatedTask = await Flight.findOneAndUpdate({_id: id}, updatedObject, {
            new: true,
            runValidators: true
        })

        if(!updatedTask){
            return res.status(404).json({status: 'failed', msg: 'ID not found.'});
        }
        res.status(200).json({status: 'successful', msg: updatedTask});

    }
    catch(err) {
        res.status(500).json({status: 'failed', msg: err});
    }
})


module.exports = router;



