const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')
const salesController = require('../controllers/salesController')

router.get('/user/:user_id', verifyToken, salesController.getAllSales);
router.get('/:sale_id', verifyToken, salesController.getSale);

router.delete('/:id', verifyToken, salesController.deleteSale);
router.post('/:id', verifyToken, salesController.createSale);
router.put('/:sale_id', verifyToken, salesController.updateSale)

router.get('/dashboard/kpi', verifyToken, salesController.dashboardKpi)

module.exports = router