const billRepo = require('../repositories/bill');

exports.getBill = async () => {
    try {
        const rows = await billRepo.getBill();
        let result = {
            meta: {
              price_subtotal: 0,
              tax_subtotal: 0,
              grand_total: 0
            }
        };

        rows.forEach((row) => {
            row.refundable = (row.refundable === '1') ? 'Yes' : 'No';
            row.tax = 0;
            if (row.tax_code === '1') {        
                row.tax = (row.price * 10) /100;
            } else if (row.tax_code === '2') {
                row.tax = (row.price * 10) /100 + (row.price * 2) /100;
            } else if (row.price >= 100) {
                row.tax = ((row.price - 100) * 1) /100
            }
            row.amount = row.price + row.tax;
        
            result.meta.price_subtotal += row.price
            result.meta.tax_subtotal += row.tax
            result.meta.grand_total += row.amount
        });
    
        result.data = rows;

        return result;
    } catch (err) {
        return err;
    }
};

module.exports = exports;