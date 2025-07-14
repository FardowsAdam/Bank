
console.log("Script started...");

const Branch = require('./branch');
const Customer = require('./customer');
const Transaction = require('./transaction');



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