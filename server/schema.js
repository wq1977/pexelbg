import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql';
import Sequelize from "sequelize"
import DB from './db';

const Photo = new GraphQLObjectType({
    name: "photo",
    description: "获取一张图片",
    fields: {
        url: {
            type: GraphQLString,
            resolve: (photo) => {
                return photo.url + '?w=1880&auto=compress&cs=tinysrgb';
            }
        },
    }
})

const Query = new GraphQLObjectType({
    name: "Query",
    description: "this is the root query",
    fields: {
        photo: {
            type: Photo,
            args: {
                user: {
                    type: new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: (root, args, context) => {
                const userid = args.user;
                return DB.models.users.upsert({
                    uuid: userid,
                }).then(()=>{
                    return DB.models.users.find({where: {
                        uuid: userid
                    }})
                }).then((user) => {
                    context.__user = user;
                    return DB.models.photos.findAll({
                        include:[{
                            model: DB.models.users,
                            where:{
                                id: user.id
                            },
                            required: false
                        },{
                            model: DB.models.tags,
                            where: {
                                title:{
                                    $in:["sea", "mountain", "sky", "ocean"],
                                }
                            }
                        }],
                        where: {
                            '$`users`.id$':{
                                $eq: null,
                            }
                        },
                        order: [['ratio', 'DESC']],
                        subQuery:false,
                        limit:3
                    })
                }).then((photos) => {
                    if (photos.length>0){
                        return new Promise((resolve) => {
                            resolve(photos)
                        })
                    }
                    return DB.models.photos.findAll({
                        include:[{
                            model: DB.models.users,
                            where:{
                                id: context.__user.id
                            },
                            required: false
                        }],
                        where: {
                            '$`users`.id$':{
                                $eq: null,
                            }
                        },
                        order: [['ratio', 'DESC']],
                        subQuery:false,
                        limit:3
                    })                    
                }).then((photos) => {
                    return new Promise((resolve) => {
                        photos[0].addUser(context.__user).then(() => {
                            resolve(photos[0])
                        })
                    });
                })
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name : "Mutation",
    description: "Functions to create stuff",
    fields() {
        return {
            addPhoto: {
                type: Photo,
                args: {
                    url: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    ratio: {
                        type: new GraphQLNonNull(GraphQLFloat)
                    },
                    tags: {
                        type: new GraphQLList(GraphQLString) 
                    },
                },
                resolve(_, args){
                    return DB.models.photos.upsert({
                        url: args.url,
                        ratio : args.ratio
                    }).then(()=>{
                        return DB.models.photos.find({where: {
                            url: args.url
                        }})
                    }).then((photo) => {
                        return Promise.all(args.tags.map((title) => {
                            title = title.toLowerCase();
                            return DB.models.tags.upsert({
                                title
                            }).then(()=>{
                                return DB.models.tags.find({where: {
                                    title
                                }})
                            })
                        })).then((tags) => {
                            return photo.addTag(tags);
                        }).then(() => {
                            return new Promise((resolve)=> {
                                resolve(photo);
                            })
                        })
                    })
                }
            }
        }
    }
})

const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})

export default Schema;