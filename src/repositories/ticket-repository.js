const CrudRepository = require('./crud-repository');
const {Ticket} = require('../models');

class TicketRepository extends CrudRepository{
    constructor(){
        super(Ticket);
    }

    async getPendingTickets(){
        const response = await this.model.findAll({
            where: {
                status: 'PENDING'
            }
        });
        return response;
    }
}

module.exports = TicketRepository;