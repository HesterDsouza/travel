import Package from "../models/Package.js";

export const createPackage = async (req, res, next) =>{

    const newPackage = new Package(req.body)
    
    try {
        const savedPackage = await newPackage.save()
        res.status(200).json(savedPackage)
    } catch (err) {
        next(err)
    }
}

export const updatePackage = async (req, res, next) =>{

    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedPackage)
    } catch (err) {
        next(err)
    }
}
export const deletePackage = async (req, res, next) =>{

    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id)
        res.status(200).json("Package has been deleted")
    } catch (err) {
        next(err)
    }
}
export const getPackage = async (req, res, next) =>{

    try {
        const pack_age = await Package.findById(req.params.id)
        res.status(200).json(pack_age)
    } catch (err) {
        next(err)
    }
}

export const getPackages = async (req, res, next) =>{

    try {
        const {limit, min, max, ...others} = req.query
        const packages = await Package.find({...others, price: {$gte: min || 1, $lte: max || 999999},
        }).limit(parseInt(limit));
        
        res.status(200).json(packages)
    } catch (err) {
        console.error("Error:",err);
        next(err)
    }
}

//Get all unique destinations
export const getAllUniqueDestinations = async (req, res, next) => {
    try {
        const uniqueDestinations = await Package.distinct("destinationName");
        res.status(200).json(uniqueDestinations);
    } catch (err) {
        next(err);
    }
}

// export const countByCity = async (req, res, next) =>{

//     const cities = req.query.cities.split(",");

//     try {
//         const list = await Promise.all(cities.map(city=>{
//             return Package.countDocuments({city:city})
//         }))
//         res.status(200).json(list)
//     } catch (err) {
//         next(err)
//     }
// }

export const countByType = async (req, res, next) =>{
    
    const packageTypes = req.query.packageType.split(",");

    try {
        const list = await Promise.all(packageTypes.map(packageType=>{
            return Package.countDocuments({packageType:packageType})
        }))
        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByPackageType = async (req, res, next) =>{
    
    try {
        //Show packageType:Name wth count:number
        // const packageTypes = await Package.distinct("packageType")
        
        // const countByType = await Promise.all(
        //     packageTypes.map(async (packageType)=>{
            //         const count = await Package.countDocuments({packageType})
            //         return {packageType, count};
            // })
            // );
        
        //Show packageType: number
        // const packageTypesCount = await  Package.aggregate([
        //     {$group: {_id: "$packageType", count: {$sum: 1}}}
        // ]);
        // const countByType = packageTypesCount.reduce((acc, {_id, count})=>{
        // acc[_id] = count;
        // return acc;
        // },{})
        // res.status(200).json(countByType)

        //Show number of packages
        const totalPackages = await Package.countDocuments();
        res.status(200).json(totalPackages);
    } catch (err) {
        next(err)
    }
}
