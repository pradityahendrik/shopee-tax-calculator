const db = require('../config/database');

exports.getBill = async () => {
    const result = await db.query('SELECT * FROM tax, code WHERE tax.tax_code=code.code');
    return result;
};