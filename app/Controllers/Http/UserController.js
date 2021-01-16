"use strict";

const User = use("App/Models/User");

class UserController {
    
  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    return token;
  }

  async logout({ auth, response }) {

    try {
        const check = await auth.check();
  
        if (check) {
          const token = await auth.getAuthHeader();
          await auth.authenticator("jwt").revokeTokens([token]);
          
          return response.status(200).send({
            status: "success",
            code:200,
            message:"Logout successfully"
          });
        }

      } catch (error) {

        return response.status(503).send({
            status: "error",
            code:503,
            message:"invalid jwt token"
          });
      }
  }

  async current({ auth, response }) {

    try {
        const check = await auth.check();
  
        if (check) {
           
          const user = await auth.getUser()

          return response.status(200).send({
            status: "success",
            code:200,
            data: user
          });
        }

      } catch (error) {

        return response.status(503).send({
            status: "error",
            code:503,
            message:"invalid jwt token"
          });
      }
  }

  /**
   * register regular user
   *
   * @method create
   * @param email
   * @param password
   * @return {Object}
   */

  async register({ request, response }) {
    const { email, password } = request.all();
    const userWithSameEmail = await User.findBy("email", email);

    if (userWithSameEmail) {
      return response.status(400).send({
        field: "email",
        message: "This e-mail is already exist",
      });
    }

    await User.create({
      email,
      password,
      username: email,
      is_admin: 0,
    });

    return response.status(200).send({
        status: "success",
        code: 200,
        message: "register success",
      });
  }

 /**
   * create user admin
   *
   * @method create
   * @param email
   * @param password
   * @return {Object}
   */

  async create({ request, response }) {
    const { email, password } = request.all();
    const userWithSameEmail = await User.findBy("email", email);

    if (userWithSameEmail) {
      return response.status(400).send({
        field: "email",
        message: "This e-mail is already exist",
      });
    }

    await User.create({
      email,
      password,
      username: email,
      is_admin: 1,
    });

    return response.status(200).send({
        status: "success",
        code: 200,
        message: "create admin success",
      });
  }
}

module.exports = UserController;
