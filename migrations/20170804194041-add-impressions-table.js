'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('impressions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
        allowNull: false
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
        allowNull: false
      },
      path: {
        field: 'path',
        type: Sequelize.STRING,
        allowNull: true
      },
      dsp: {
        field: 'dsp',
        type: Sequelize.STRING,
        allowNull: true
      },
      impression: {
        field: 'impression',
        type: Sequelize.STRING,
        allowNull: true
      },
      clickUrl: {
        field: 'click_url',
        type: Sequelize.STRING,
        allowNull: true
      },
      pageUrl: {
        field: 'page_url',
        type: Sequelize.STRING,
        allowNull: true
      },
      referrerUrl: {
        field: 'referrer_url',
        type: Sequelize.STRING,
        allowNull: true
      },
      deviceIdentifierType: {
        field: 'device_identifier_type',
        type: Sequelize.STRING,
        allowNull: true
      },
      deviceIdentifier: {
        field: 'device_identifier',
        type: Sequelize.STRING,
        allowNull: true
      },
      deviceIsp: {
        field: 'device_isp',
        type: Sequelize.STRING,
        allowNull: true
      },
      deviceModel: {
        field: 'device_model',
        type: Sequelize.STRING,
        allowNull: true
      },
      deviceOs: {
        field: 'device_os',
        type: Sequelize.STRING,
        allowNull: true
      },
      osVersion: {
        field: 'os_version',
        type: Sequelize.STRING,
        allowNull: true
      },
      ipAdd: {
        field: 'ip_add',
        type: Sequelize.STRING,
        allowNull: true
      },
      sourceId: {
        field: 'source_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      timestamp: {
        field: 'timestamp',
        type: Sequelize.STRING,
        allowNull: true
      },
      datetime: {
        field: 'datetime',
        type: Sequelize.STRING,
        allowNull: true
      },
      exchange: {
        field: 'exchange',
        type: Sequelize.STRING,
        allowNull: true
      },
      gps: {
        field: 'gps',
        type: Sequelize.STRING,
        allowNull: true
      },
      userAgent: {
        field: 'user_agent',
        type: Sequelize.STRING,
        allowNull: true
      },
      gaid: {
        field: 'gaid',
        type: Sequelize.STRING,
        allowNull: true
      },
      ifa: {
        field: 'ifa',
        type: Sequelize.STRING,
        allowNull: true
      },
      sha1Aid: {
        field: 'sha1_aid',
        type: Sequelize.STRING,
        allowNull: true
      },
      sha1Udid: {
        field: 'sha1_udid',
        type: Sequelize.STRING,
        allowNull: true
      },
      sha1Dpid: {
        field: 'sha1_dpid',
        type: Sequelize.STRING,
        allowNull: true
      },
      sha1Did: {
        field: 'sha1_did',
        type: Sequelize.STRING,
        allowNull: true
      },
      bundleId: {
        field: 'bundle_id',
        type: Sequelize.STRING,
        allowNull: true
      },
      orderId: {
        field: 'order_id',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lat: {
        field: 'lat',
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      lon: {
        field: 'lon',
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      postalCode: {
        field: 'postal_code',
        type: Sequelize.STRING,
        allowNull: true
      },
      dnt: {
        field: 'dnt',
        type: Sequelize.STRING,
        allowNull: true
      },
      adSize: {
        field: 'ad_size',
        type: Sequelize.STRING,
        allowNull: true
      },
      campaign: {
        field: 'campaign',
        type: Sequelize.INTEGER,
        allowNull: true
      },
      creativeType: {
        field: 'creative_type',
        type: Sequelize.STRING,
        allowNull: true
      },
    }).then(() => {
      return queryInterface.addIndex('impressions', ['created_at'], {
        indexName: 'idx_impression_created_at'
      })
    }).then(() => {
        return queryInterface.addIndex('impressions', ['order_id'], {
          indexName: 'idx_impressions_order_id'
        });
    }).then(() => {
        return queryInterface.addIndex('impressions', ['impression'], {
          indicesType: 'unique',
          indexName: 'idx_impressions_impression'
        });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('impressions');
  }
};
