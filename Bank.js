"use strict";
// Bank.js
class Bank {
    constructor(name) {
        this.Branches = [];
        this.name = name;
    }
    addBranch(branch) {
        if (this.Branches.includes(branch)) {
            console.log("Branches already exists");
        }
        else {
            this.Branches.push(branch);
            console.log("Branches added successfully");
        }
    }
    addCustomer(branch, customer) {
        if (branch.getCustomers().some(c => c.getId() === customer.getId())) {
            console.log("Customer already exists in this branch");
        }
        else {
            branch.getCustomers().push(customer);
            console.log("Customer added successfully");
        }
    }
    addCustomerTransaction(branch, customerId, amount) {
        const customer = branch.getCustomers().find(c => c.getId() === customerId);
        if (!customer) {
            console.log("Customer not found in this branch");
            return;
        }
        customer.transactions.push(new Transaction(amount, new Date()));
        console.log("Transaction added successfully");
    }
    findBranchByName(branchName) {
        const ls = [];
        this.Branches.forEach(branch => {
            if (branch.name === branchName) {
                ls.push(branch);
            }
        });
        return ls;
    }
    checkBranch(branch) {
        if (this.Branches.includes(branch))
            return true;
        else
            return false;
    }
    listCustomers(branch, includeTransaction) {
        branch.getCustomers().forEach(customer => {
            console.log("Customer: " + customer.getName());
            if (includeTransaction) {
                if (customer.getTransaction().length === 0) {
                    console.log("   No transactions.");
                }
                else {
                    customer.getTransaction().forEach(t => {
                        console.log("   Amount: " + t.amount + " | Date: " + t.date.toLocaleString());
                    });
                }
            }
        });
    }
}
// class Branches 
class Branch {
    constructor(name) {
        this.customers = [];
        this.name = name;
    }
    getName() {
        return this.name;
    }
    getCustomers() {
        return this.customers;
    }
    addCustomer(Customer) {
        if (this.customers.includes(Customer)) {
            console.log("Customer already exists in this branch");
        }
        else {
            this.customers.push(Customer);
            console.log("Customer added successfully");
        }
    }
    addCustomerTransaction(customerId, amount) {
        const customer = this.getCustomers().find(c => c.getId() === customerId);
        if (!customer) {
            console.log("Customer not found in this branch");
            return;
        }
        customer.transactions.push(new Transaction(amount, new Date()));
        console.log("Transaction added successfully");
    }
}
// class Customer
class Customer {
    constructor(name, id) {
        this.transactions = [];
        this.name = name;
        this.id = id;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getTransaction() {
        return this.transactions;
    }
    getBalance() {
        const total = this.transactions.reduce((acc, curr) => acc + curr.amount, 0);
        if (total < 0) {
            return 0;
        }
        return total;
    }
    addTransactions(amount) {
        if (amount === 0) {
            console.log("Transaction amount cannot be zero");
            return;
        }
        this.transactions.push(new Transaction(amount, new Date()));
        console.log("Transaction added successfully");
    }
}
//CLASS INSTANTIATION 
class Transaction {
    ;
    constructor(amount, date) {
        this.amount = amount;
        this.date = date;
    }
}
//Testing the Bank, Branches, and Customer classes
const arizonaBank = new Bank("Arizona");
const westBranch = new Branch("West Branches");
const sunBranch = new Branch("Sun Branches");
const customer1 = new Customer("John", 1);
const customer2 = new Customer("Anna", 2);
const customer3 = new Customer("Ali", 3);
arizonaBank.addBranch(westBranch);
arizonaBank.addBranch(sunBranch);
arizonaBank.addBranch(westBranch);
console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("Sun"));
arizonaBank.addCustomer(westBranch, customer1);
arizonaBank.addCustomer(westBranch, customer3);
arizonaBank.addCustomer(sunBranch, customer1);
arizonaBank.addCustomer(sunBranch, customer2);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000);
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000);
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000);
customer1.addTransactions(-1000);
console.log(customer1.getBalance());
console.log(arizonaBank.listCustomers(westBranch, true));
console.log(arizonaBank.listCustomers(sunBranch, true));
