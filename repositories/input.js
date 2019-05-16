const db = require('../config/database');

exports.inputData = async (data) => {
    await db.query(`INSERT INTO tax(name, tax_code, price)  VALUES('${data.name}', '${data.tax_code}', '${data.price}')`);
    return 'success';
};