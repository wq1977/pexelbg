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

User.belongsToMany(Photo, {through: 'records'});
Photo.belongsToMany(User, {through: 'records'});

Conn.sync().then(()=>{
    console.log("sync done")
}, (err)=>{
    console.log("something wrong...!", err)
})

export default Conn;