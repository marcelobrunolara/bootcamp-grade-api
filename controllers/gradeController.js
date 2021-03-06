import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grade = db.grade;

const create = async (req, res) => {
  try {
    const {name, subject, type, value} = req.body;

    const gradeToInsert = {
      name,
      subject,
      type,
      value,
      lastModified : Date.now()
    }

    logger.info(`POST /grade - ${JSON.stringify(gradeToInsert)}`);
    await Grade.create(gradeToInsert);
    return res.send({ message: 'Grade inserido com sucesso' });

  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    logger.info(`GET /grade`);

    const gradeFound = await Grade.find(condition);
    
    return res.send(gradeFound);

  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`GET /grade - ${id}`);
    const gradeFound = await Grade.findOne({_id : id});
    return res.send(gradeFound);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  const {name, subject, type, value} = req.body;

  try {
    
    const result = await Account.findOneAndUpdate(
      { _id: id },
      { name,
        subject,
        type,
        value,
        lastModified : Date.now()
       },
      {
        new: true,
        runValidators: true,
      }
    );

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    return res.status(200).send(result.balance);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`DELETE /grade - ${id}`);
    await  Grade.remove({_id : id});
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE /grade`);
    await  Grade.removeAll();
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
