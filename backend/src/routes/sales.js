const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')
const salesController = require('../controllers/salesController')

router.get('/:user_id', verifyToken, salesController.getAllSales);
router.delete('/:id', verifyToken, salesController.deleteSale);
router.post('/:id', verifyToken, salesController.createSale);
router.put('/:id', verifyToken, salesController.updateSale)

router.get('/dashboard/kpi', verifyToken, salesController.dashboardKpi)

module.exports = router