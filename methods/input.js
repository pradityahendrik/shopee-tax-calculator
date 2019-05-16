const inputRepo = require('../repositories/input');

exports.inputData = async (params) => {
    try {
        const data = {
            name: params.body.name,
            tax_code: params.body.tax_code,
            price: params.body.price
        }
    
        const result = await inputRepo.inputData(data);
        
        return result;
    } catch (err) {
        return err;
    }
};

module.exports = exports;