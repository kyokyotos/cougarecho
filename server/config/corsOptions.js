const allowedOrigins = ['http://localhost:3000', 'http://localhost:443', 'https://cougarecho.de.r.appspot.com', ':///workspace']

const corsOptions = {
    origin: (origin, callback) => {
        console.log('Request from origin:', origin);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

export default corsOptions;