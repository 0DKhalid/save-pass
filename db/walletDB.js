import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('wallet.db');

export const init = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((txt) => {
      txt.executeSql(
        'CREATE TABLE IF NOT EXISTS senstive_data(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL,  data TEXT NOT NULL, detial TEXT NOT NULL );',
        [],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const addData = (title, data, detial) => {
  const promise = new Promise((res, rej) => {
    db.transaction((txt) => {
      txt.executeSql(
        `INSERT INTO senstive_data (title, data, detial) VALUES (?, ?, ?);`,
        [title, data, detial],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const fetchAll = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((txt) => {
      txt.executeSql(
        'SELECT * FROM senstive_data',
        [],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const updateOne = (id, title, data, detial) => {
  const promise = new Promise((res, rej) => {
    db.transaction((txt) => {
      txt.executeSql(
        'UPDATE senstive_data SET title = ?, data = ?, detial = ? WHERE id = ?',
        [title, data, detial, id],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const deleteOne = (id) => {
  const promise = new Promise((res, rej) => {
    db.transaction((txt) => {
      txt.executeSql(
        'DELETE FROM senstive_data WHERE id = ?',
        [+id],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};

export const deleteAll = () => {
  const promise = new Promise((res, rej) => {
    db.transaction((txt) => {
      txt.executeSql(
        'DELETE FROM senstive_data',
        [],
        (_, result) => res(result),
        (_, err) => rej(err)
      );
    });
  });

  return promise;
};
