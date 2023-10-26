package com.vendas.Model.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vendas.Model.Entity.ProdutoEntity;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ProdutoDTO {
    private Long id;
    private String nome;
    private String desc;

    private BigDecimal preco;
    private String sku;
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate cadastro;


    public static ProdutoDTO fromModel(ProdutoEntity produto) {
        return new ProdutoDTO(
                produto.getId(),
                produto.getNome(),
                produto.getDesc(),
                produto.getPreco(),
                produto.getSku(),
                produto.getDataCadastro());
    }

    public ProdutoEntity toModel() {
        return new ProdutoEntity(id, nome, desc, preco, sku);
    }

    public ProdutoDTO(String nome, String desc, BigDecimal preco, String sku ) {
        this.nome = nome;
        this.desc = desc;
        this.preco = preco;
        this.sku = sku;

    }

    public ProdutoDTO(Long id, String nome, String desc, BigDecimal preco, String sku, LocalDate cadastro) {
        super();
        this.id = id;
        this.nome = nome;
        this.desc = desc;
        this.preco = preco;
        this.sku = sku;
        this.cadastro = cadastro;
    }


    public ProdutoDTO() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public LocalDate getCadastro() {
        return cadastro;
    }

    public void setCadastro(LocalDate cadastro) {
        this.cadastro = cadastro;
    }

    @Override
    public String toString() {
        return "ProdutoDTO{" + "id=" + id + ", nome='" + nome + '\'' + ", desc='" + desc + '\'' + ", preco=" + preco + ", sku='" + sku + '\'' + '}';
    }
}
