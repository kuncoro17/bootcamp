    // import { where } from "sequelize";
    import User   from "../models/UserModel.js";
    // import { response } from "express";

    export const getUsers = async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.log(error);
        }   
    }
    export const getUsersbyId = async (req, res) => {
        try {
            const response = await User.findOne({
            where:{
            id:req.params.id
            }
        });  
        res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
    }
    }


    export const createUser = async (req, res) => {
        try {
        await  User.create(req.body);
        res.status(201).json({msg:"user created successfully"});
            } catch (error) {   
            console.log(error.message);
        }
    }
        
    export const updateUser = async (req, res) => {
        try {
            await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({msg:"user updated successfully"});
        } catch (error) {
            console.log(error.message);
        }
    }
    export const deleteUser = async (req, res) => {
        try {
            await User.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({msg:"user deleted successfully"});
        } catch (error) {
            console.log(error.message);
        }
    }

    export default User;