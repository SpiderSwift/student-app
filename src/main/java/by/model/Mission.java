package by.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;


@Entity
@Table(name = "t_mission")
public class Mission {

    private Integer id;
    private String rank;
    private String price;
    private String description;
    private String sensei;

    @JsonIgnore
    private Customer customer;

    @Override
    public String toString() {
        return id + ";" + rank + ";" + price + ";" + description + ";" + sensei + ";";
    }


    public Mission(Integer id, String rank, String price, String description, String sensei) {
        this.id = id;
        this.rank = rank;
        this.price = price;
        this.description = description;
        this.sensei = sensei;
    }


    public Mission() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id")
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "f_rank")
    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    @Column(name = "f_price")
    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    @Column(name = "f_description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "f_sensei")
    public String getSensei() {
        return sensei;
    }

    public void setSensei(String sensei) {
        this.sensei = sensei;
    }


    @ManyToOne
    @JoinColumn(name = "f_customer_id")
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
