module.exports = function(Sequelize, DataType){
  const OrderDetail = Sequelize.define('orderDetail', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    createdAt: {
      field: 'created_at',
      type: DataType.DATE,
      defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataType.DATE,
      defaultValue: Sequelize.literal("(now() at time zone 'utc')"),
      allowNull: false
    },
    orderId: {
      field: 'order_id',
      type: DataType.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      field: 'name',
      type: DataType.STRING,
      allowNull: false
    },
  },
  {
    tableName: 'order_details',
    timestamps: false,
  });

  return OrderDetail;
};
