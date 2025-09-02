const {EmailService} = require('../services');


async function create(req,res){
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        return res.status(201).json({
            success: true,
            message: "Successfully created ticket",
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Not able to send email",
            data: {},
            err: error
        })
    }
}

module.exports = {
    create
};