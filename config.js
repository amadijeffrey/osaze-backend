var enviroment = {};

enviroment.development = {
    'port':5050,
    'envName':'development',
    'DBURL':process.env.DB_URL,
    'jwtSecretKey': process.env.JWT_SECRET,
    'jwtExpiry': process.env.JWT_EXPIRES_IN,
    'cloudName' : process.env.CLOUD_NAME,
    'apiKey' :    process.env.API_KEY,
    'apiSecret':  process.env.API_SECRET
}

enviroment.production = {
    'port':process.env.PORT || 5050,
    'envName':'production',
    'DBURL': process.env.DB_URL,
    'jwtSecretKey': process.env.JWT_SECRET,
    'jwtExpiry': process.env.JWT_EXPIRES_IN,
    'cloudName' : process.env.CLOUD_NAME,
    'apiKey' :    process.env.API_KEY,
    'apiSecret' :  process.env.API_SECRET,
}

// Check for present env
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : false;

// Env to export
var envToExport = typeof(enviroment[currentEnviroment]) == 'object' ? enviroment[currentEnviroment] : enviroment['development'];

module.exports = envToExport;