const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Gerente = require('./models/Gerente')
const Setor = require('./models/Setor')
const Atividade = require('./models/Atividade')

const PORT = 3000
const hostname = 'localhost'

let log = false
let nomeGerente = ''

// ----------- Config express ----------------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// ----------- Config handlebars -------------
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
// -------------------------------------------

app.post('/editar_atividade', async (req,res)=>{
    const num_atividade = req.body.num_atividade
    const nome_atividade = req.body.nome_atividade
    const setorId = Number(req.body.setorId)
    const novo_nome_atividade = req.body.novo_nome_atividade
    console.log(num_atividade,nome_atividade, setorId, novo_nome_atividade)
    const pesq = await Atividade.findOne({raw: true, where: {nome_atividade: nome_atividade}})
    console.log(pesq)

    let msg = 'Dados Atualizados'
    let msg2 = 'Dados não encontrados'

    const dados = {
        num_atividade: num_atividade,
        nome_atividade: novo_nome_atividade, 
        setorId: setorId
    }
    console.log()

    if(pesq == null){
        res.render('editar_atividade', {log,nomeGerente,msg2})
    }else if(pesq.nome_atividade == nome_atividade){
        await Atividade.update(dados, {where: {nome_atividade: pesq.nome_atividade}})
        res.render('editar_atividade', {log,nomeGerente,msg})
    }else{
        res.render('editar_atividade', {log,nomeGerente,msg2})
    }   
    // res.redirect('/editar_setor')
})

app.get('/editar_atividade', (req,res)=>{
    res.render('editar_atividade', {log,nomeGerente})
})

app.post('/editar_setor', async (req,res)=>{
    const num_setor = req.body.num_setor
    const nome_setor = req.body.nome_setor
    const gerenteId = Number(req.body.gerenteId)
    const novo_nome_setor = req.body.novo_nome_setor
    console.log(num_setor,nome_setor, gerenteId, novo_nome_setor)
    const pesq = await Setor.findOne({raw: true, where: {nome_setor: nome_setor}})
    console.log(pesq)

    let msg = 'Dados Atualizados'
    let msg2 = 'Dados não encontrados'

    const dados = {
        num_setor: num_setor,
        nome_setor: novo_nome_setor, 
        gerenteId: gerenteId
    }
    console.log()

    if(pesq == null){
        res.render('editar_setor', {log,nomeGerente,msg2})
    }else if(pesq.nome_setor == nome_setor){
        await Setor.update(dados, {where: {nome_setor: pesq.nome_setor}})
        res.render('editar_setor', {log,nomeGerente,msg})
    }else{
        res.render('editar_setor', {log,nomeGerente,msg2})
    }   
    // res.redirect('/editar_setor')
})

app.get('/editar_setor', (req,res)=>{
    res.render('editar_setor', {log,nomeGerente})
})

app.post('/excluir_atividade', async (req,res)=>{
    const nome_atividade = req.body.nome_atividade
    const pesq = await Atividade.findOne({where: {nome_atividade: nome_atividade}})
    console.log(pesq)
    let msg = 'Atividade excluída'
    let msg2 = 'Atividade não encontrada'
    if(pesq == null){
        res.render('excluir_atividade', {log,nomeGerente,msg2})
    }else if(pesq.nome_atividade == nome_atividade){
        await Atividade.destroy({where: {nome_atividade: pesq.nome_atividade}})
        res.render('excluir_atividade', {log,nomeGerente,msg})
    }else{
        res.render('excluir_atividade', {log,nomeGerente,msg2})
    }
})

app.get('/excluir_atividade', (req,res)=>{
    res.render('excluir_atividade', {log,nomeGerente})
})


app.post('/excluir_setor', async (req,res)=>{
    const nome_setor = req.body.nome_setor
    const pesq = await Setor.findOne({where: {nome_setor: nome_setor}})
    console.log(pesq)
    let msg = 'Setor excluído'
    let msg2 = 'Setor não encontrado'
    if(pesq == null){
        res.render('excluir_setor', {log,nomeGerente,msg2})
    }else if(pesq.nome_setor == nome_setor){
        await Setor.destroy({where: {nome_setor: pesq.nome_setor}})
        res.render('excluir_setor', {log,nomeGerente,msg})
    }else{
        res.render('excluir_setor', {log,nomeGerente,msg2})
    }
})

app.get('/excluir_setor', (req,res)=>{
    res.render('excluir_setor', {log,nomeGerente})
})

app.get('/listar_atividade', async (req,res)=>{
    const pesq = await Atividade.findAll({raw:true})
    console.log(pesq)
    res.render('listar_atividade', {valores: pesq, log, nomeGerente})
})

app.get('/listar_setor', async (req,res)=>{
    const pesq = await Setor.findAll({raw:true})
    console.log(pesq)
    res.render('listar_setor', {valores: pesq, log, nomeGerente})
})

app.post('/cadastrar_atividade', async (req,res)=>{
    const num_atividade = Number(req.body.num_atividade)
    const nome_atividade = req.body.nome_atividade
    const setorId = Number(req.body.setorId)
    console.log(num_atividade,nome_atividade, setorId)
    await Atividade.create({num_atividade:num_atividade, nome_atividade:nome_atividade, setorId: setorId})
    let msg = 'Dados Cadastrados'
    res.render('cadastrar_atividade', {log, nomeGerente,msg})
})

app.get('/cadastrar_atividade', (req,res)=>{
    res.render('cadastrar_atividade', {log, nomeGerente})
})

app.post('/cadastrar_setor', async (req,res)=>{
    const num_setor = req.body.num_setor
    const nome_setor = req.body.nome_setor
    const gerenteId = req.body.gerenteId
    console.log(num_setor,nome_setor, gerenteId)
    await Setor.create({num_setor:num_setor, nome_setor:nome_setor, gerenteId: gerenteId})
    let msg = 'Dados Cadastrados'
    res.render('cadastrar_setor', {log, nomeGerente,msg})
})

app.get('/cadastrar_setor', (req,res)=>{
    res.render('cadastrar_setor', {log, nomeGerente})
})

app.get('/gerenciador', (req,res)=>{
    res.render('gerenciador', {log, nomeGerente})
})

app.post('/login', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    console.log(email,senha)
    const pesq = await Gerente.findOne({raw:true, where:{email:email,senha:senha}})
    console.log(pesq)
    let msg = 'Usuário não Cadastrado'
    if(pesq == null){
        res.render('home', {msg})
    }else if(email == pesq.email && senha == pesq.senha){
        log = true
        nomeGerente = pesq.nome
        res.render('gerenciador', {log, nomeGerente})
        
    }else{
        res.render('home', {msg})
    }
    // res.redirect('/')
})

app.get('/logout', (req,res)=>{
    log = false
    nomeGerente = ''
    res.render('home', {log, nomeGerente})
})
app.get('/', (req,res)=>{
    log = false
    nomeGerente = ''
    res.render('home', {log, nomeGerente})
})
// -------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error('Não foi possível concectar com o Banco de dados' + error)
})