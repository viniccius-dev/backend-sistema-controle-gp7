const CountRepository = require("../repositories/CountRepository");
const CountService = require("../services/CountService");

class CountController {
    async index(request, response) {
        const countRepository = new CountRepository();
        const items = await countRepository.getAll();

        return response.json(items);
    }

    async show(request, response) {
        const { id } = request.params;

        const countRepository = new CountRepository();
        const item = await countRepository.findById(id);

        return response.json(item);
    }

    async create(request, response) {
        const { data } = request.body;

        const countRepository = new CountRepository();
        const countService = new CountService(countRepository);
        await countService.countCreate({ data });

        return response.status(201).json({ message: "Upload da contagem realizado com sucesso!" });
    }

    async exportCSV(request, response) {
        const countService = new CountService();
        await countService.exportCSV(response);
    }

    async update(request, response) {
        const { item_id, pallet, ballast, boxes, units } = request.body;

        const countRepository = new CountRepository();
        const countService = new CountService(countRepository);
        await countService.countUpdated({
            item_id,
            pallet,
            ballast,
            boxes,
            units
        })

        return response.json({ message: "Contagem do produto atualizada com sucesso."});
    }
}

module.exports = CountController;