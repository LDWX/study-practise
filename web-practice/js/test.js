function Teacher () {
    
}
Teacher.prototype = {
    money: 1000000,
    job: {
        salary: 50000
    },
    buySomething() {
        this.money -= 100
        console.log(this.money)
    },
    getSalary() {
        this.job.salary += 1000
        console.log(this.job.salary)
    }    
}

let husband = new Teacher()
let wife = new Teacher()
husband.buySomething() 	//999900
husband.getSalary()		//51000

console.log(husband)

wife.buySomething()		//999900
wife.getSalary()		//52000
console.log(wife)