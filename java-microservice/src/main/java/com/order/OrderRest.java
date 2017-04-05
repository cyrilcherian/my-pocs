package com.order;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.web.client.RestTemplate;

import com.customer.Customer;
import com.product.Product;

@Named
@Path("order")
public class OrderRest {
	private long id = 1;
	@Inject
	private RestTemplate restTemplate;

	@GET
	@Path("customer/{idCustomer}/product/{idProduct}")
	@Produces(MediaType.APPLICATION_JSON)
	public Order submitOrder(@PathParam("idCustomer") long idCustomer, @PathParam("idProduct") long idProduct,
			@QueryParam("amount") long amount) {
		Order order = new Order();
		Customer customer = restTemplate.getForObject("http://localhost:8182/customer/{id}", Customer.class,
				idCustomer);
		Product product = restTemplate.getForObject("http://localhost:8181/product/{id}", Product.class, idProduct);
		order.setCustomer(customer);
		order.setProduct(product);
		order.setId(id);
		order.setAmount(amount);
		order.setDateOrder(new Date());
		id++;
		return order;
	}
}