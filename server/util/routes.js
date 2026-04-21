const Router = require('express')
const messages = require('@controllers/messagesController')

const router = Router()

router.get('/health', (req, res) => {
  res.send('ok')
})

router.get('/messages', messages.getAll)
router.post('/messages', messages.create)
router.delete('/messages/:id', messages.destroy)

module.exports = router
