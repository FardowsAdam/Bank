class Branch {
    name;
    customers=[];

    constructor(name){
        this.name=name;
    }

    getName(){
        return this.name;
    }

    getCustomers(){
        return this.customers;
    }


     addCustomer(Customer){
        if(this.customers.includes(Customer)){
            console.log("Customer already exists in this branch");
        }else{
            this.customers.push(Customer);
            console.log("Customer added successfully");
        }
    }

    addCustomerTransaction( customerId, amount){
        const customer = branch.find(c => c.id === customerId);
        if (!customer) {
            console.log("Customer not found in this branch");
            return;
        }
        customer.transactions.push(amount);
        console.log("Transaction added successfully");


    }


}

module.exports = Branch;