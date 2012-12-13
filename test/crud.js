var Crud = require('../lib/cli/Crud'),
    crud = new Crud({
      baseURL: 'http://localhost:5000'
    });

crud.run();

