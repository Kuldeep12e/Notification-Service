const {TicketRepository} = require('../repositories');
const ticketRepository = new TicketRepository();
const {Mailer} = require('../config');


async function sendEmail(mailFrom, mailTo, subject, text){
    try{
        const response = await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });
        console.log("Email sent successfully", response);
        return response;
    }catch(error){
        console.log("Error in sending email", error);
        throw error;
    }
}


async function createTicket(data){
    try{
        const ticket = await ticketRepository.create(data);
        return ticket;
    }catch(error){
        console.log("Error in creating ticket", error);
        throw error;
    }
}


async function getPendingEmails(){
    try{
        const tickets = await ticketRepository.getPendingTickets();
        return tickets;
    }catch(error){
        console.log("Error in fetching pending tickets", error);
        throw error;
    }
}

module.exports = {
    sendEmail,
    createTicket,
    getPendingEmails
};

