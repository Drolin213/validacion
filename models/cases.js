require('dotenv').config();
const db = require("../db");

const list = async (params = {}) => {
    try {
        const results = await db(process.env.T_CASES)
            .where(params)
            .select();
        return { success: true, data: results };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const create = async (obj) => {
    try {
        const results = await db(process.env.T_CASES).insert(obj);
        return { success: true, data: results };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

const update = async (params, obj) => {
    try {
        const results = await db(process.env.T_CASES).where(params).update(obj);
        return { success: true, data: results };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

module.exports = { list, create, update };
