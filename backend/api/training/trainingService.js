const Training = require('./training')
const _ = require('lodash')

Training.methods(['get', 'post', 'delete', 'put'])
Training.updateOptions({new: true, runValidators: true})

Training.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
    const bundle = res.locals.bundle

    if(bundle.errors) {
        let errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    }else{
        next()
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors
}

Training.route('count', function(req, res, next) {
    Training.count(function(error, value) {
        if(error) {
            res.status(500).json({errors: [error]})
        }else{
            res.json({value})
        }
    })
})

module.exports = Training