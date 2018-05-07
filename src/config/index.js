
import SQLite from 'react-native-sqlite-storage';

var db = SQLite.openDatabase({
    name : "bulas.db",
    createFromLocation : 1} 
);

db.executeSql("CREATE TABLE IF NOT EXISTS historico ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `bulaId` INTEGER, FOREIGN KEY(`bulaId`) REFERENCES `bula`(`id`) )");
db.executeSql("CREATE TABLE IF NOT EXISTS favorito ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `bulaId` INTEGER, FOREIGN KEY(`bulaId`) REFERENCES `bula`(`id`) )");

export default db;