import mongoose from 'mongoose';
import Grade from "./grade.js";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grade = Grade(mongoose);

export { db };

