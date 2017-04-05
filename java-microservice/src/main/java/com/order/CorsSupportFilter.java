package com.order;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.MultivaluedMap;

public class CorsSupportFilter implements ContainerResponseFilter {

	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext)
			throws IOException {
        MultivaluedMap<String, Object> headers = responseContext.getHeaders();

        addIfNotExists(headers, "Access-Control-Allow-Origin", "*");
        addIfNotExists(headers, "Access-Control-Allow-Headers",
                "origin, content-type, accept, authorization");
        addIfNotExists(headers, "Access-Control-Allow-Credentials", "true");
        addIfNotExists(headers, "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS, HEAD");
	}

    private void addIfNotExists(MultivaluedMap<String, Object> headers,
                                String key,
                                String value) {
        if(!headers.containsKey(key)) {
            headers.add(key, value);
        }
    }
}