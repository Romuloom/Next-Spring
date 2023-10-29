import {Layout, Input,Message} from 'components';
import {useState} from 'react';
import {useProdutoService} from 'app/services'
import {Produto} from 'app/models/produtos'
import {converterEmBigDecimal} from 'app/util/money'
import {Alert} from 'components/common/message'
import Link from "next/link"
import * as yup from 'yup';

const msgCampoObrigatorio = "Campo Obrigatorio"

const validationSchema = yup.object().shape({
    sku:yup.string().trim().required(msgCampoObrigatorio),
    preco:yup.number().required(msgCampoObrigatorio).moreThan(0, "Valor deve ser mair que 0,00"),
    nome:yup.string().trim().required(msgCampoObrigatorio),
    desc:yup.string().trim().required(msgCampoObrigatorio)
})

interface FormErros {
    sku?: String,
    preco?:String,
    nome?:String,
    desc?:String
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [preco, setpreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [cadastro, setCadastro] = useState<string>('')
    const [messages, setmessages] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<FormErros>({})

    const submit = () => {
        const produto: Produto = {
            id:id,
            sku: sku,
            preco: converterEmBigDecimal(preco),
            nome: nome,
            desc: desc
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})
            if (id) {

                service.atualizar(produto).then(response => setmessages([{
                    tipo:"success", texto:"Produto atualizado com sucesso"
                }]))
    
            } else {
                service.salvar(produto).then(produtoResposta => {
                    // @ts-ignore
                    setId(produtoResposta.id)
                    // @ts-ignore
                    setCadastro(produtoResposta.cadastro)
                    setmessages([{
                        tipo:"success", texto:"Produto salvo com sucesso"
                    }])
                })
            }
    
        }).catch(err => {
            const field = err.path
            const message =  err.message

            setErrors({
                [field]: message
            })

        })

    }



    return (
        <Layout titulo='Cadastro de Produtos' mensagens={messages}>
            {id &&
                <div className="columns">

                    <Input columnClasses='is-half' id='inputId' label='Código:' value={id} disabled={true}/>

                    <Input columnClasses='is-half' id='inputDataCastro' label='Data Cadastro:' value={cadastro}
                           disabled={true}/>
                </div>
            }

            <div className="columns">
                <Input columnClasses='is-half'
                       id='inputSku' label='SKU:*'
                       placeholder='Digite o SKU do produto'
                       value={sku}
                       onChange={setSku}
                       error={errors.sku}
                       />

                <Input columnClasses='is-half'
                       id='inputPreco'
                       label='Preço:*'
                       placeholder='Digite o Preço do produto'
                       value={preco}
                       onChange={setpreco} currency maxLength={16}
                       error={errors.preco}
                />

            </div>
            <div className='columns'>

                <Input columnClasses='is-full'
                       id='inputNome'
                       label='Nome:*'
                       placeholder='Digite o Nome do produto'
                       value={nome}
                       onChange={setNome}
                       error={errors.nome}/>

            </div>
            <div className='columns'>
                <div className='field column is-full'>
                    <label className='label' htmlFor='inputDesc'>Descrição:*</label>
                    <div className='control'>
                        <textarea
                            className='textarea'
                            placeholder='Digite a descrição do produto'
                            id='inputDesc'
                            value={desc}
                            onChange={event => setDesc(event.target.value)}
                        />
                        {
                            errors.desc && <p className= "help is-danger">{errors.desc}</p>
                        }

                    </div>
                </div>
            </div>

            <div className='field is-grouped'>
                <div className='control'>
                    <button onClick={submit} className='button is-link is-rounded'>{id ? 'Atualizar' : 'Salvar'}</button>
                </div>
                <div className='control'>
                    <Link href='/consultas/produtos'>
                    <button className='button is-rounded'>Voltar</button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}