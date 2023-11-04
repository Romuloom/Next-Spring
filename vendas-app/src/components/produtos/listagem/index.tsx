import { Layout, Loader } from 'components'
import Link from "next/link"
import Router from "next/router"
import { TabelaProdutos } from "./tabela"
import { Produto } from 'app/models/produtos'
import useSWR from "swr";
import { httpClient } from "app/http"
import { AxiosResponse } from "axios";
import { useProdutoService } from "app/services";
import { useEffect, useState } from 'react'
import { Alert } from 'components/common/message'


export const ListagemProdutos: React.FC = () => {

    const service = useProdutoService();

    const [messages, setmessages] = useState<Array<Alert>>([])

    const { data: result } = useSWR<AxiosResponse<Produto>>('api/produtos', (url: string) => httpClient.get(url))

    const [lista, setLista] = useState<Produto[]>()

    useEffect(()=>{
        setLista(result?.data || [])
    }, [result])

    const editar = (produto: Produto) => {
        const url = `/cadastros/produtos?id=${produto.id}`
        Router.push(url)
    }

    const deletar = (produto: Produto) => {
        service.deletar(produto.id).then(response => {
            setmessages([
                { tipo: "success", texto: "Produto excluido com sucesso!" }
            ])
        })
    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>
            <Link href="/cadastros/produtos">
                <button className="button is-success">Novo</button>
            </Link>
            <br />
            <Loader show={!result}></Loader>

            <TabelaProdutos onEdit={editar} onDelet={deletar} produtos={result?.data || []} />
        </Layout>
    )
}