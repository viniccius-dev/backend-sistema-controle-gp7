const UserRepository = require("../repositories/UserRepository");
const UsersService = require("../services/UsersService");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;

        const userRepository = new UserRepository();
        const usersService = new UsersService(userRepository);
        await usersService.userCreate({ name, email, password });

        return response.status(201).json({ message: "Perfil criado com sucesso." });
    };

    async show(request, response) {
        const { id } = request.params;

        const userRepository = new UserRepository();
        const usersService = new UsersService(userRepository);
        const user = await usersService.showUser(id);

        return response.json(user);
    }
}

module.exports = UsersController;