const { hash } = require("bcryptjs");

const AppError = require("../utils/AppError");

class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    };

    async userCreate({ name, email, password }) {

        if( !name || !email || !password ) {
            throw new AppError("Favor inserir todas as informações");
        };

        const checkUserExist = await this.userRepository.findByEmail(email);

        if(checkUserExist) {
            throw new AppError("Este e-mail já está em uso.");
        };

        const hashedPassword = await hash(password, 10);

        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword });

        return userCreated;
    };

    async showUser(id) {
        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        delete user.password;

        return user;
    };
}

module.exports = UsersService;