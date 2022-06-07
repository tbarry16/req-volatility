
const db = require('../db')
const requirementsController = {}

requirementsController.addRequirementsToFeature = async (req,res,next) => {
    console.log(res.locals.featureID)

    const { requirements } = req.body

    try {

    } catch (err) {
        return next({
            log: "Express error handler caught error in requirementsController.addRequirementsToFeature",
            status: 500,
            message: {err: err}
        })
    }
    return next();
}

module.exports = requirementsController