
// Bank.js

class Bank{
    name;
    Branch=[];

    constructor(name) {
        this.name = name;
        this.branch = null;
    }


    addBranch(branch){
        if(this.Branch.includes(branch)){
            console.log("Branch already exists");
        }
        else{
            this.Branch.push(branch);
            console.log("Branch added successfully");
        }
    }



    addCustomer(branch, customer) {
        if (branch.getCustomers().some(c => c.getId() === customer.getId())) {
            console.log("Customer already exists in this branch");
        } else {
            branch.getCustomers().push(customer);
            console.log("Customer added successfully");
        }
    }


    addCustomerTransaction(branch, customerId, amount){
        const customer = branch.getCustomers().find(c => c.id === customerId);
        if (!customer) {
            console.log("Customer not found in this branch");
            return;
        }
        customer.transactions.push(amount);
        console.log("Transaction added successfully");

    }

    findBranchByName(branchName) {
        const ls = [];
        this.Branch.forEach(branch => {
            if (branch.name === branchName) {
                ls.push(branch);
            }
        });
        return ls;
    }


    checkBranch(branch){
         if(this.Branch.includes(branch)) return true;
         else return false ;
    }

    listCustomers(branch, includeTransaction){
        if(includeTransaction){
            branch.getCustomers().forEach(customer => {
                console.log(customer.getName() + "   "+ customer.getTransaction());

            });
        }

    }


}

// class Branch 
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


// class Customer

class Customer{
    name;
    id;
    transactions=[];

    constructor(name,id){
        this.name=name;
        this.id=id;

    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getTransaction(){
        return this.transactions;
    }

    getBalance(){
        const total= this.transactions.reduce((acc, curr) => acc + curr, 0);
        if(total<0){
            return 0;
        }
        return total;
    }

    addTransactions(amount){
        if(amount === 0){
            console.log("Transaction amount cannot be zero");
            return;
        }
        this.transactions.push(amount);
        console.log("Transaction added successfully");
    }
}



//CLASS INSTANTIATION 

class   Transaction{
    amount ;
    date;
    constructor(amount, date){
        this.amount = amount;
        this.date = date;
    }
}








//Testing the Bank, Branch, and Customer classes


const arizonaBank = new Bank("Arizona")

const westBranch = new Branch("West Branch")
const sunBranch = new Branch("Sun Branch")

const customer1 = new Customer("John", 1)
const customer2 = new Customer("Anna", 2)
const customer3 = new Customer("Ali", 3)

arizonaBank.addBranch(westBranch)
arizonaBank.addBranch(sunBranch)
arizonaBank.addBranch(westBranch) 

console.log(arizonaBank.findBranchByName("bank"))
arizonaBank.findBranchByName("sun")

arizonaBank.addCustomer(westBranch, customer1)
arizonaBank.addCustomer(westBranch, customer3)
arizonaBank.addCustomer(sunBranch, customer1)
arizonaBank.addCustomer(sunBranch, customer2)

arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000)
arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000)
arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000)

customer1.addTransactions(-1000)
console.log(customer1.getBalance())
console.log(arizonaBank.listCustomers(westBranch, true))
console.log(arizonaBank.listCustomers(sunBranch,true))