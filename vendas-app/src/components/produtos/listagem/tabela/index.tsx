import React, { useState } from "react";
import { Produto } from "app/models/produtos"

interface TabelaProdutosProps {
    produtos: Array<Produto>;
    onEdit: (produto: Produto) => void;
    onDelete: (produto:Produto) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos, onEdit, onDelete }) => {



    return (
        <table className="table is-hoverable">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>SKU</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    produtos.map(produto => <ProdutoRow onEdit={onEdit} onDelete={onDelete} key={produto.id} produto={produto} />)
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelete: (produto: Produto) => void
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto, onEdit, onDelete }) => {

    const [deletando, setDeletando] = useState<boolean>(false);

    const onDeleteClick = (produto: Produto) => {
        if (deletando) {
            onDelete(produto)
            setDeletando(false)
        } else {
            setDeletando(true)
        }
    }

    const cancelaDelete = () => setDeletando(false);

    1
    return (
        <tr>
            <td>{produto.id}</td>   
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td >
                <div className="buttons is-spaced">
                    {!deletando &&
                        <button onClick={e => onEdit(produto)} className="button is-info">Editar</button>
                    }

                    <button onClick={e => onDeleteClick(produto)} className="button is-danger">{deletando ? "Comfirmar" : "Deletar"}</button>

                    {deletando &&
                        <button onClick={cancelaDelete} className="button">Cancelar</button>
                    }



                </div>
            </td>
        </tr>
    )
}