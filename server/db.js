import Sequelize from 'sequelize';

const Conn = new Sequelize(
    'chrome',
    'chrome',
    'chrome@2',
    {
        dialect: "mysql",
        host: "localhost"
    }
);

const Photo = Conn.define('photos', {
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    ratio: {
        type: Sequelize.FLOAT,
        allowNull:false
    },
    rate: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
},{
    indexes:[
        { fields: ['ratio'] },
    ]
})

const User = Conn.define('users', {
    uuid: {
        type: Sequelize.STRING,
        allowNull:false
    },
},{
    indexes:[
        { fields: ['uuid'], unique: true },
    ]
})

const PhotoRecord = Conn.define('records', {
})

User.hasMany(PhotoRecord);
Photo.hasMany(PhotoRecord);
PhotoRecord.belongsTo(User);
PhotoRecord.belongsTo(Photo);

Conn.sync().then(()=>{
    console.log("sync done")
}, (err)=>{
    console.log("something wrong...!", err)
})

export default Conn;