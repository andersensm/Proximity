module.exports = function(sequelize, DataTypes) {
  var RecruiterPosts = sequelize.define("Post", {
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,30]
      }
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [15,255]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,2]
      }
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: ["[a-z]",'i'], //not allow letters
        len: [5,5]
      }
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        not: ["[a-z]",'i'], //not allow letters
        min: -90,
        max: 90,
        len: [2,10]
      }
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        not: ["[a-z]",'i'], //not allow letters
        min: -180,
        max: 180,
        len: [3,10]
      }
    }
  });
  return RecruiterPosts;
}
