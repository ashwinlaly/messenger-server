const db = require("../../db"),
      ObjectID = require("mongodb").ObjectID,
      _ = require("lodash")

const insertOne = async (table, data, fields) => {
    let result = await db.get().collection(table).insertOne(data)
    if(!_.isEmpty(result)){
        where = {_id: ObjectID(result.ops[0]._id)}
        return await select(table, where, fields)
    }
    return [];
}

const select = async (table, where, fields) => {
    _where = {
        $match : where
    }
    _fields = {
        $project : fields
    }
    return await db.get().collection(table).aggregate([_where, _fields]).toArray()
}

const deleteOne = async (table, where) => {
    return await db.get().collection(table).deleteOne(where)
}

module.exports = {
    insertOne,
    select,
    deleteOne
}