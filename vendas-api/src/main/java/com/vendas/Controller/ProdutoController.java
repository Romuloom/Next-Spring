package com.vendas.Controller;

import com.vendas.Model.DTO.ProdutoDTO;
import com.vendas.Model.Entity.ProdutoEntity;
import com.vendas.Model.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin
public class ProdutoController {

    @Autowired
    private ProdutoRepository repository;

    @GetMapping
    public List<ProdutoDTO> getLista() {
        return repository.findAll().stream().map(p -> ProdutoDTO.fromModel(p)).collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public ResponseEntity<ProdutoDTO> getById(@PathVariable Long id) {
        Optional<ProdutoEntity> produtoExistente = repository.findById(id);
        if (produtoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        var produto = produtoExistente.map(ProdutoDTO::fromModel).get();
        return ResponseEntity.ok(produto);
    }

    @PostMapping
    public ProdutoDTO salvar(@RequestBody ProdutoDTO produto) {

        ProdutoEntity entidadeProduto = produto.toModel();

        repository.save(entidadeProduto);

        return ProdutoDTO.fromModel(entidadeProduto);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> Deletar(@PathVariable Long id) {
        Optional<ProdutoEntity> produtoExistente = repository.findById(id);
        if (produtoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        repository.delete(produtoExistente.get());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> Atualizar(@PathVariable Long id, @RequestBody ProdutoDTO produto) {
        Optional<ProdutoEntity> produtoExistente = repository.findById(id);
        if (produtoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        ProdutoEntity entidadeProduto = produto.toModel();
        entidadeProduto.setId(id);
        repository.save(entidadeProduto);
        return ResponseEntity.ok().build();
    }
}
