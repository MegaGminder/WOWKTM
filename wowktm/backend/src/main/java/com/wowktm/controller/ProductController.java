package com.wowktm.controller;

import com.wowktm.model.Product;
import com.wowktm.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  @Autowired
  private ProductService productService;

  @GetMapping
  public Page<Product> getProducts(
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "8") int size) {
    return productService.getProducts(page, size);
  }
}