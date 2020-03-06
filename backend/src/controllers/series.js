const seriesDao = new (require('../models/Series'))();

module.exports = {

    async listar(req, res){
        try{
            const lista = await seriesDao.lista()

            if(lista)
                return res.send(lista)
            
            res.status(404).send({})
        }catch(erro){

        }
    },

    async insere(req, res){
        let serie = req.body;

        try {
            const resultado = await seriesDao.insere(serie)
            const insertId = resultado.insertId;
            serie = {id:insertId, ...serie}
            return res.status(201).send(serie)
        } catch (erro){
            return res.status(500).send(erro)
        }
        
    },

    async buscaPorId(req, res){
        const id = req.params.id
        let serie = await seriesDao.buscaPorId(id)
        serie = serie[0]
        if(!serie)
            return res.status(404).send({erro: 'série não encontrada'})
        res.send(serie)
    },

    async atualiza(req, res){
        const id = req.params.id
        const serie = req.body
        serie.id = id

        const retorno = await seriesDao.atualiza(serie)
        if(!retorno.affectedRows){
            return res.status(404).send({erro: "Série Não encontrada"})
            
        }
        res.send(serie);
    },
    

    async delete(req, res){
        const id= req.params.id
        const retorno = await seriesDao.delete(id)

        if(!retorno.affectedRows){
            return res.status(404).send({erro: 'Série não encontrada'})
        }
        res.status(204).send(retorno)
    }
}