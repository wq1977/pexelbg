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
                }).then((err, user) => {
                    return DB.models.photos.findOne();
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
                },
                resolve(_, args){
                    return DB.models.photos.upsert({
                        url: args.url,
                        ratio : args.ratio
                    }).then(()=>{
                        return DB.models.photos.find({where: {
                            url: args.url
                        }})
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