
const db = require('../db')
const requirementsController = {}

requirementsController.addRequirementsToFeature = async (req,res,next) => {
    console.log(res.locals.featureID)

    const { requirements } = req.body

    try {
        const linkRequirementToFeatureQuery = `
        INSERT INTO requirements (featureID, reqName, reqDescription)
        VALUES ($1, $2, $3)`

        for (let i = 0; i < requirements.length; i++) {
            const req = requirements[i]
            await db.query(linkRequirementToFeatureQuery, [res.locals.featureID, req.reqName, req.reqDesc])
        }
        return next()
    } catch (err) {
        return next({
            log: "Express error handler caught error in requirementsController.addRequirementsToFeature",
            status: 500,
            message: {err: err}
        })
    }
}

requirementsController.updateRequirements = async (req,res,next) => {
    const { featureName } = req.body
    const getFeatureIDQuery = 'SELECT featureID FROM features WHERE featurename=($1)'
    const deleteCurrentRequirementsQuery = 'DELETE FROM requirements WHERE featureID=($1)'
    try {
        let featureID = await db.query(getFeatureIDQuery, [featureName])
        featureID = featureID.rows[0].featureid

        await db.query(deleteCurrentRequirementsQuery, [featureID])
        res.locals.featureID = featureID;
        return next()
    } catch (err) {
        return next({
            log: "Express error handler caught error in requirementsController.updateRequirements",
            status: 500,
            message: {err: err}
        })
    }

    return next()
}

module.exports = requirementsController