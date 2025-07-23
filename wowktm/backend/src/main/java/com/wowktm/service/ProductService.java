package com.wowktm.service;

import com.wowktm.model.Product;
import com.wowktm.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
  @Autowired
  private ProductRepository productRepository;

  public Page<Product> getProducts(int page, int size) {
    return productRepository.findAll(PageRequest.of(page - 1, size));
  }
}