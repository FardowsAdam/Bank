
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


module.exports = Customer;