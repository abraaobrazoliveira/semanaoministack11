const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
        try {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
            return res.json({ id })
        } catch (err) {
          console.log(err)
        }
    },
    async getAll(req, res) {
        try {
            const ongs = await connection('ongs').select('*')
            return res.json(ongs);
        } catch (err) {
        console.log(err)
        }
    },
    async getById(req, res) {
        try {
            const { id } = req.params 
            const ongs = await connection('ongs').select('*').where('id', id)
            return res.json(ongs);
        } catch (err) {
          console.log(err)
        }
    } 
}