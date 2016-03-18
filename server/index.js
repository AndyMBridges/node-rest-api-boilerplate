import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import db from './db';
import middleware from './middleware';
import api from './api';

var app = express();
app.server = http.createServer(app);

if ('development' == app.get('env')) {
	app.use(errorHandler());
}

// connect to db
db( λ => {
	// 3rd party middleware
	app.use(cors({ exposedHeaders: ['Link'] }));
	app.use(morgan('dev'));
	app.use(methodOverride());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(middleware());
	app.use('/api', api());
	app.server.listen(process.env.PORT || 8000);
	console.log(`Magic happening on port ${app.server.address().port}`);
});

export default app;
