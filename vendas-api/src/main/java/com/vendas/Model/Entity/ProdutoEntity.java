package com.vendas.Model.Entity;

import javax.persistence.*;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "tb_produto")
public class ProdutoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nome", length = 100)
    private String nome;
    @Column(name = "descricao", length = 255)
    private String desc;
    @Column(name = "preco", precision =16,  scale = 2)
    private BigDecimal preco;
    @Column(name = "sku")
    private String sku;
    @Column(name = "data_cadastro")
    private LocalDate dataCadastro;

    @PrePersist
    public void prePersist(){
        setDataCadastro(LocalDate.now());
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

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public ProdutoEntity() {
        super();
    }

    public ProdutoEntity(String nome, String desc, BigDecimal preco, String sku) {
        this.nome = nome;
        this.desc = desc;
        this.preco = preco;
        this.sku = sku;
    }

    public ProdutoEntity(Long id, String nome, String desc, BigDecimal preco, String sku) {
        this.id = id;
        this.nome = nome;
        this.desc = desc;
        this.preco = preco;
        this.sku = sku;
    }

    @Override
    public String toString() {
        return "Produto{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", descricao='" + desc + '\'' +
                ", preco=" + preco +
                ", sku='" + sku + '\'' +
                '}';
    }
}
