const {User: userModel} = require("../models/users");

const userControler = {

    create: async(req,res) => {
        console.log(req.body)
        try{
            const user ={
                nome: req.body.nome,
                CPF: req.body.CPF,
                aniversario: req.body.aniversario,
                comida: req.body.comida
            };
            console.log(user)
            const response = await userModel.create(user);

            res.status(201).json({response, msg: "Serviço criado com sucesso!"})

        } catch (error){
            console.log(error);
        }
    },
    getAll: async (req, res) =>{
        try{
            const user = await userModel.find()

            res.json(user);
        } catch(error){
            console.log(error);
        }
    },
    delete: async(req, res) =>{
        try {
            console.log(req.body);

            if (!user) {
                res.status(404).json({msg: "Usuário não encontrado."});
                return;
            }

            res.status(200).json({deletedUser, msg: "Usuário excluido com sucesso!"});

        } catch (error) {
            console.log(error);
        }
    },
    update: async(req, res) =>{
        const user ={
            nome: req.body.nome,
            CPF: req.body.CPF,
            aniversario: req.body.aniversario,
            comida: req.body.comidaFavorita
        };

        if (!updatedUser) {
            res.status(404).json({msg: "Usuário não encontrado."});
            return;
        }

        res.status(200).json({user, msg: "Usuário atualizado com sucesso!"})
    }
};

module.exports = userControler;