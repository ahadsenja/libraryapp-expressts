'use strict';
var moment = require('moment');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      borrow_date: {
        type: Sequelize.DATEONLY,
        get() {
          return moment.utc(new Date('borrow_date')).format('DD/MM/YYYY');
        }
      },
      return_date: {
        type: Sequelize.DATEONLY,
        get() {
          return moment.utc(new Date('return_date')).format('DD/MM/YYYY');
        }
      },
      overdue: {
        type: Sequelize.INTEGER
      },
      charge: {
        type: Sequelize.INTEGER
      },
      paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: { model: 'books', key: 'id' },
        allowNull: false
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' },
        allowNull: false
      },
      operator_id: {
        type: Sequelize.INTEGER,
        references: { model: 'operators', key: 'id' },
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('borrows');
  }
};