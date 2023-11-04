import React from "react";
import { Produto } from "app/models/produtos"

interface TabelaProdutosProps {
    produtos: Array<Produto>;
    onEdit: (produto: Produto) => void;
    onDelet: (produto: Produto) => void
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos, onEdit, onDelet }) => {

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
                    produtos.map(produto => <ProdutoRow onEdit={onEdit} onDelet={onDelet} key={produto.id} produto={produto} />)
                }
            </tbody>
        </table>
    )
}

interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: Produto) => void;
    onDelet: (produto: Produto) => void
}

const ProdutoRow: React.FC<ProdutoRowProps> = ({ produto, onEdit, onDelet }) => {
    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.sku}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td >
                <div className="buttons is-spaced">
                    <button onClick={e => onEdit(produto)} className="button is-info">Editar</button>
                    <button onClick={e => onDelet(produto)} className="button is-danger">Deletar</button>
                </div>
            </td>
        </tr>
    )
}