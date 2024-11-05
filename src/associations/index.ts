const defineAssociationsDynamically = (models: any, associations: any) => {
    Object.keys(associations).forEach((modelName) => {
      const associationData = associations[modelName];
      const model = models[modelName];
  
      if (associationData.hasMany) {
        associationData.hasMany.forEach((assoc: any) => {
          model.hasMany(models[assoc.targetModel], { foreignKey: assoc.foreignKey, as: assoc.as });
        });
      }
  
      if (associationData.belongsTo) {
        associationData.belongsTo.forEach((assoc: any) => {
          model.belongsTo(models[assoc.targetModel], { foreignKey: assoc.foreignKey, as: assoc.as });
        });
      }
  
      if (associationData.hasOne) {
        associationData.hasOne.forEach((assoc: any) => {
          model.hasOne(models[assoc.targetModel], { foreignKey: assoc.foreignKey, as: assoc.as });
        });
      }
    });
  };
  
  export default defineAssociationsDynamically;
  