import { DatabaseModel } from "./model/DatabaseModel.js";
import { server } from "./server.js"

const port: number = Number(process.env.PORT) || 3333;

// liga o servidor HTTP
new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        })
    } else {
        console.log('Não foi possível conectar ao banco de dados');
    }
})