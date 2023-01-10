const Orders = require('../models/orderModel')

exports.getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastmonth = new Date(date.setMonth() -1);
    const previousMonth = new Date(new Date.setMonth(lastmonth.getMonth() - 1))

    try {
        
    } catch (error) {
       res.status(500).json(err.message) 
    }

}