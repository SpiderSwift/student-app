package by.service;

import by.DAO.DAO;
import by.model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

@Service("customerService")
public class CustomerService {

    @Autowired
    private DAO<Customer> customerDAO;


    @Transactional
    public void add(Customer customer) {
        customerDAO.create(customer);
    }


    @Transactional
    public void delete(Customer customer) {
        customerDAO.delete(customer);
    }

    @Transactional
    public void edit(Customer customer) {
        customerDAO.update(customer);
    }


    @Transactional
    public List<Customer> get() {
        return customerDAO.read();
    }


    @Transactional
    public Customer getById(Serializable id) {
        return customerDAO.readById(id);
    }

}
