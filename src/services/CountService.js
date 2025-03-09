const { format } = require("fast-csv");
const CountRepository = require("../repositories/CountRepository");
const AppError = require("../utils/AppError");

class CountService {
    constructor(countRepository) {
        this.countRepository = countRepository;
    }

    async countCreate({ data }) {
        if(!data) {
            throw new AppError(`Favor selecionar uma planilha com extensão .csv`);
        }

        const countRepository = new CountRepository();
        await countRepository.deleteAll();
        await countRepository.insertMany(data);
    }

    async exportCSV(res) {
        const countRepository = new CountRepository();
        const data = await countRepository.getAll();

        if(data.length === 0) {
            throw new AppError("Não há dados para exportar.", 404);
        }

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=produtos.csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        // Escreve os dados no CSV
        data.forEach(row => {
            csvStream.write(row);
        });

        csvStream.end();
    }

    async countUpdated({ item_id, pallet, ballast, boxes, units }) {
        const item = await this.countRepository.findById(item_id);

        if(!item) {
            throw new AppError("Produto não encontrado.", 404);
        }

        item.pallet = pallet ?? item.pallet;
        item.ballast = ballast ?? item.ballast;
        item.boxes = boxes ?? item.boxes;
        item.units = units ?? item.units;

        const itemUpdated = await this.countRepository.updateItem(item);

        return itemUpdated;
    }
}

module.exports = CountService;