
const db = require('../db')
const featuresController = {}


featuresController.getAllFeatures = async (req, res, next) => {
    console.log('in features')
    const getFeaturesListQuery = `SELECT * FROM features`

    try {
        const features = await db.query(getFeaturesListQuery)
        res.locals.features = features.rows
        return next()
    } catch (err) {
        return next({
            log: "Express error handler caught error in featuresController.getAllFeatures",
            status: 500,
            message: {err: err}
        })
    }
}

featuresController.getUserFeatures = async (req, res, next) => {
    const email = req.params.email

    const userIDQuery = `SELECT userID FROM users WHERE email=($1)`
    const featuresQuery = `
    SELECT 
        f.featureID, 
        f.featureName, 
        f.featureDescription,
        r.reqName,
        r.reqDescription 
    FROM 
        features f
            INNER JOIN user_with_feature uwf ON f.featureID = uwf.featureID
            INNER JOIN requirements r ON f.featureID = r.featureID
    WHERE uwf.userID=($1)`
    
    try {
        let userID = await db.query(userIDQuery, [email])
        userID = userID.rows[0].userid
        let features = await db.query(featuresQuery, [userID])
        features = features.rows
        res.locals.features = features
        return next()
    } catch (err) {
        return next({
            log: "Express error handler caught error in featuresController.getUserFeatures",
            status: 500,
            message: {err: err}
        })
    }
}

featuresController.subscribeUserToFeature = async (req, res, next) => {
    const { email, feature } = req.params

    const getUserIdQuery = 'SELECT userID FROM users WHERE email=($1)'
    const getFeatureIdQuery = 'SELECT featureID FROM features WHERE featureName=($1)'
    const subscribeQuery = 'INSERT INTO user_with_feature (userID,featureID) VALUES ($1, $2)'
    try {
        let userID = await db.query(getUserIdQuery, [email])
        let featureID = await db.query(getFeatureIdQuery, [feature])
        userID = userID.rows[0].userid
        featureID = featureID.rows[0].featureid

        await db.query(subscribeQuery, [userID, featureID])
        res.locals.message = 'User subscription to feature created!'
        return res.status(200).send('User subscription to feature created!')

    } catch (err) {
        return next({
            log: "Express error handler caught error in featuresController.subscribeUserToFeature",
            status: 500,
            message: {err: err}
        })
    }
}

featuresController.createNewFeature = async (req, res, next) => {
    console.log(req.body)

    const { featureName, featureDescription } = req.body

    const createFeatureQuery = 'INSERT INTO features (featureName, featureDescription) VALUES ($1,$2)'
    const getNewFeatureID = 'SELECT featureID FROM features WHERE featureName=($1)'

    try {
        await db.query(createFeatureQuery, [featureName, featureDescription])
        const featureID = await db.query(getNewFeatureID, [featureName])
        res.locals.featureID = featureID.rows[0].featureid
        return next()
    } catch (err) {
        return next({
            log: "Express error handler caught error in featuresController.createNewFeature",
            status: 500,
            message: {err: err}
        })
    }
    return next()
}

module.exports = featuresController