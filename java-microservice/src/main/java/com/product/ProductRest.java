package com.product;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


@Named
@Path("product")
public class ProductRest {
	private static List<Product> products = new ArrayList<Product>();
	static {
		Product product1 = new Product();
		product1.setId(1);
		product1.setSku("abcd1");
		product1.setDescription("Product1");
		Product product2 = new Product();
		product2.setId(2);
		product2.setSku("abcd2");
		product2.setDescription("Product2");
		Product product3 = new Product();
		product3.setId(3);
		product3.setSku("abcd3");
		product3.setDescription("Product3");
		Product product4 = new Product();
		product4.setId(4);
		product4.setSku("abcd4");
		product4.setDescription("Product4");
		products.add(product1);
		products.add(product2);
		products.add(product3);
		products.add(product4);
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Product> getProducts() {
		return products;
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Product getProduct(@PathParam("id") long id) {
		Product prod = null;
		for (Product p : products) {
			if (p.getId() == id)
				prod = p;
		}
		return prod;
	}
}