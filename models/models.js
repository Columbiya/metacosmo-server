import sequalize from '../db.js'
import { DataTypes } from "sequelize";


const Article = sequalize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true},
    quote: {type: DataTypes.STRING(512)},
    boldText: {type: DataTypes.TEXT},
    text: {type: DataTypes.TEXT},
    twoColumnContentFirst: {type: DataTypes.TEXT},
    twoColumnContentSecond: {type: DataTypes.TEXT},
    oneColumnContent: {type: DataTypes.TEXT},
    address: {type: DataTypes.STRING},
    author: {type: DataTypes.STRING, allowNull: false},
    hider: {type: DataTypes.STRING, defaultValue: 'light'},
})

const New = sequalize.define('new', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    subtitle: {type: DataTypes.STRING},
    title: {type: DataTypes.STRING, unique: true},
    boldText: {type: DataTypes.TEXT},
    text: {type: DataTypes.TEXT},
    twoColumnContentFirst: {type: DataTypes.TEXT},
    twoColumnContentSecond: {type: DataTypes.TEXT},
    oneColumnContent: {type: DataTypes.TEXT},
    img: {type: DataTypes.STRING},
    author: {type: DataTypes.STRING, allowNull: false},
    hider: {type: DataTypes.STRING, defaultValue: 'light'},
})

export default {
    Article,
    New,
}