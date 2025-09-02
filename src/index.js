const express = require('express');
const amqplib = require('amqplib');
const {EmailService}= require('./services');

async function connectQueue() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('notification-queue', { durable: true });
        channel.consume('notification-queue', async (data) => {
            if (data !== null) {
                const objectData = JSON.parse(data.content.toString());
                await EmailService.sendEmail("lazylearner41@gmail.com" , objectData.recepientEmail, objectData.subject, objectData.text);
                console.log('Received message:', objectData);
                channel.ack(data);
            }
           
        });
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
        process.exit(1);
    }
}

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    connectQueue();
});
