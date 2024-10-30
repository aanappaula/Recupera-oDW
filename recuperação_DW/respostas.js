/* QUESTÃO 1
O trecho de código abaixo mostra uma rota para criar e listar usuários. No entanto, ele está no Nível 1 do modelo de maturidade e precisa ser ajustado para o Nível 2.
 1. app.post('/users/create', (req, res) => {
 2.     const newUser = { id: users.length + 1, ...req.body };
 3.     users.push(newUser);
 4.     res.status(201).json(newUser);
 5. });
 6.  
 7. app.get('/users/getAll', (req, res) => {
 8.     res.status(200).json(users);
 9. });
10.  

QUESTÃO 2
O código abaixo tenta implementar a exclusão de um usuário específico, mas não atende aos requisitos de uso correto de códigos de status HTTP.
 1. app.delete('/users/:id', (req, res) => {
 2.     const id = parseInt(req.params.id);
 3.     const userIndex = users.findIndex(user => user.id === id);
 4.     if (userIndex !== -1) {
 5.         users.splice(userIndex, 1);
 6.         res.json({ message: 'Usuário excluído' });
 7.     } else {
 8.         res.json({ message: 'Usuário não encontrado' });
 9.     }
10. });
11.  

Pergunta:
a) Identifique o problema com os códigos de status HTTP usados no código.
b) Corrija o código, adicionando os status HTTP adequados para uma resposta RESTful.



QUESTÃO 3
Abaixo, há uma rota para atualizar um usuário existente. Porém, o código não diferencia uma atualização parcial de uma atualização completa.
 1. app.put('/users/:id', (req, res) => {
 2.     const id = parseInt(req.params.id);
 3.     const user = users.find(user => user.id === id);
 4.     if (user) {
 5.         user.name = req.body.name;
 6.         res.status(200).json(user);
 7.     } else {
 8.         res.status(404).json({ message: 'Usuário não encontrado' });
 9.     }
10. });
11.  

Pergunta:
a) Explique a diferença entre os métodos PUT e PATCH em uma API REST.
b) Corrija o código acima, implementando uma rota PATCH para permitir atualizações parciais.

QUESTÃO 4
A resposta da API no trecho abaixo não inclui hipermídia (HATEOAS), necessária para atingir o Nível 3 do modelo de maturidade de Richardson.
 1. app.get('/users/:id', (req, res) => {
 2.     const id = parseInt(req.params.id);
 3.     const user = users.find(user => user.id === id);
 4.     if (user) {
 5.         res.status(200).json(user);
 6.     } else {
 7.         res.status(404).json({ message: 'Usuário não encontrado' });
 8.     }
 9. });
10.  

Pergunta:
a) Explique o que é HATEOAS e por que ele é importante no modelo REST.
b) Altere o código para incluir links HATEOAS na resposta da API.

QUESTÃO 5
Observe o código abaixo, que faz uma busca por um usuário específico. Identifique o problema relacionado à validação e segurança.
 1. app.get('/users/:id', (req, res) => {
 2.     const id = req.params.id;
 3.     const user = users.find(user => user.id === id);
 4.     if (user) {
 5.         res.status(200).json(user);
 6.     } else {
 7.         res.status(404).json({ message: 'Usuário não encontrado' });
 8.     }
 9. });
10.  

Pergunta:
a) Qual é o problema relacionado à validação nesse código?
b) Corrija o código para incluir a validação adequada.

QUESTÃO 6
Abaixo temos uma rota que adiciona um novo usuário, mas não faz validação do corpo da requisição.
1. app.post('/users', (req, res) => {
2.     const newUser = { id: users.length + 1, ...req.body };
3.     users.push(newUser);
4.     res.status(201).json(newUser);
5. });
6.  

Pergunta:
a) Qual é o problema de segurança com a falta de validação no corpo da requisição?
b) Corrija o código para validar se o campo name está presente e atende a requisitos básicos, como ser uma string com pelo menos 3 caracteres.

/* RESPOSTAS!

1A) O código acima está usando a ação que ele quer retornar na rota. Isso não é uma boa prática, já que para a ação já temos os verbos HTTP. Em tese, as rotas deveriam ser padrões. Ex: '/users'
1B) Para adequar, eu utlizaria os verbos nas rotas (POST, DELTE, PUT, PATCH, GET)
2A) O problema é que o resultado que ele retorna não está certo, no caso a mensagem de erro. Em caso de sucesso (primeira condição do código), deveria ser o status 204, e no caso de falha (segunda condição), deveria ser o status 404
3A) O método put atualiza todo o objeto, já o patch atualiza apenas um campo em específico no qual você queira mudar.
4A) É um principio do modelo RestFul, onde uma resptas de uma API inclui links para outra ações, relacionadas a requisão atual. Ela é importante pois todas as rotas ficarão documentadas, e o usuário consiguirá navegar mais facilmente.
5A) O problema é que o req.params.id está sendo usado sem nem ter uma verificação antes. Se caso ele não existir ou não for um número válido, não deveria nem entrar na ação.
6A) O problema é que não fazendo uma verificação para fazer uma ação de inserir, que no caso é bem importante pois serão novos dados salvos, poderá ser inserido algo malicioso, ou não atender alguma regra de negócio da aplicação. Ex: o usuário tem ter no minímo 3 caracteres
*/

// CÓDIGOS!!

//1C)
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});


app.get('/users', (req, res) => {
    res.status(200).json(users);
});

//2B
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' }); 
    }
});

//3 
app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        Object.assign(user, req.body); 
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

//4
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (user) {
        res.status(200).json({
            ...user,
            links: {
                self: '/users/${id}',
                allUsers: '/users',
                deleteUser: '/users/${id}',
                updateUser: '/users/${id}'
            }
        });
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

//5
app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' }); 
    }
    
    const user = users.find(user => user.id === id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
    }
});

//6
app.post('/users', (req, res) => {
    const { name } = req.body;
    
    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório e deve ter pelo menos 3 caracteres.' });
    }
    
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    res.status(201).json(newUser);
});