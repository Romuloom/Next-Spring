import {Layout,Loader} from 'components'
import Link from "next/link"
import {TabelaProdutos} from "./tabela"
import {Produto} from 'app/models/produtos'
import useSWR from "swr";
import {httpClient} from  "app/http"
import {AxiosResponse} from "axios";


export const ListagemProdutos: React.FC = () => {

    const {data: result} = useSWR<AxiosResponse<Produto>>('api/produtos', (url: string) => httpClient.get(url))

    return (
        <Layout titulo="Produtos">
            <Link href="/cadastros/produtos">
                <button className="button is-info">Novo</button>
            </Link>
            <br/>
            <Loader show={!result}></Loader>
            
            <TabelaProdutos produtos={result?.data|| [] }  />
        </Layout>
    )
}