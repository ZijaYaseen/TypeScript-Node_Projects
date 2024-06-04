#!usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

class UserId {
    public firstName: string;
    public lastName:string;
    public country: string;
    public city: string;
    public email: any;
    public password:any

    constructor(firstName:string,lastName:string,country:string,city:string,email:any,password:any){
        this.firstName = firstName
        this.lastName = lastName
        this.country = country
        this.city = city
        this.email = email
        this.password = password
    }
    fullUserName(){
        return `${this,this.firstName.trim()} ${this.lastName.trim()}`
    }

    userInfo(){
        return `First Name: ${this.firstName}\nLast Name: ${this.lastName}\nCountry Name: ${this.country}\nCity Name: ${this.city}\nE-mail Address: ${this.email}\nPassword: ${this.password} `
    }
};


class EventsManager{
  
    public category :string;
    public title : string
    public date: string;
    public time : string;
    public city:string;
    public price:number;
    public seats : number;
    public bookNow ="Book Now"
    private brSpace = "---------------------------";
    public ticketsBooked :number = 0
    // public seats : string;
    

    constructor(category:string,title : string,date:string,time : string,city:string,price:number,seats:number){
        this.category = category;
        this.title = title;
        this.date = date;
        this.time = time;
        this.city = city;
        this.price = price;
        this.seats = seats;

      
        // this.seats = seats;
    }

    public adminViewEventsHistory(){
        return chalk.greenBright(`\nCategory: ${chalk.yellow(this.category)}\nTitle: ${chalk.yellow(this.title)}\nDate: ${chalk.yellow(this.date)}\nTime: ${chalk.yellow(this.time)}\nCity: ${chalk.yellow(this.city)}\nPrice (Per Ticket): ${chalk.yellow("$"+this.price)}\nTickets Stock: ${chalk.yellow(this.seats)}\n\n${chalk.bold.italic.magenta(this.brSpace)}\n`)
    }

    public userViewAllEvents(){
        return chalk.greenBright(`\nCategory: ${chalk.yellow(this.category)}\nTitle: ${chalk.yellow(this.title)}\nDate: ${chalk.yellow(this.date)}\nTime: ${chalk.yellow(this.time)}\nCity: ${chalk.yellow(this.city)}\nPrice (Per Ticket): ${chalk.yellow("$"+this.price)}\nTickets Stock: ${chalk.yellow(this.seats)}\n${chalk.bgBlue(this.bookNow)}\n\n${chalk.bold.italic.magenta(this.brSpace)}\n`)
    }

    public userViewAllBookedEvents(){
        return chalk.greenBright(`\nCategory: ${chalk.yellow(this.category)}\nTitle: ${chalk.yellow(this.title)}\nDate: ${chalk.yellow(this.date)}\nTime: ${chalk.yellow(this.time)}\nCity: ${chalk.yellow(this.city)}\nPrice (Per Ticket): ${chalk.yellow("$"+this.price)}\nBooked Tickets: ${chalk.yellow(this.ticketsBooked)}\n\n${chalk.bold.italic.magenta(this.brSpace)}\n`)
    }

    public userViewbookTickets(bookedSeats: number) {
        return this.ticketsBooked = bookedSeats;
    }

    public selectTicketsHistory(){
        return chalk.greenBright(`\nCategory: ${chalk.yellow(this.category)}\nTitle: ${chalk.yellow(this.title)}\nDate: ${chalk.yellow(this.date)}\nTime: ${chalk.yellow(this.time)}\nCity: ${chalk.yellow(this.city)}\nPrice (Per Ticket): ${chalk.yellow("$"+this.price)}\nTickets Stock: ${chalk.yellow(this.seats)}\n${chalk.bgCyan(this.bookNow)}\n\n${chalk.bold.italic.magenta(this.brSpace)}\n`)
    }

}

let userViewBookedEvents : EventsManager[] = []
let eventsStore:EventsManager[] = []

let adminName: string = "Admin";
let adminPassword: string = "222222";
const usersInfo: UserId[] = [];

async function eventsFlow(){
    let loopmMain = true;
    while (loopmMain) {

    let {entry} = await inquirer.prompt(
        {
            name:"entry",
            type:"list",
            message:"What do you want to do? ",
            choices:["Sign Up Account","Login Account","Quit App"]
        }
    )
    if(entry === "Quit App"){
        loopmMain = false;
    }
    else if(entry === "Sign Up Account"){

        let signUpAcc = await inquirer.prompt([
            {
                name:"firstName",
                type:"input",
                message:"Enter Your First Name: ",
                validate:(input) =>{
                    if(!isNaN(input)){
                        return"Please Enter Your First Name!";
                    }
                    else{
                        return true
                    }
                }
            },
            {
                name:"lastName",
                type:"input",
                message:"Enter Your Last Name: ",
                validate:(input) =>{
                    if(!isNaN(input)){
                        return"Please Enter Your Last Name!";
                    }
                    else{
                        return true
                        }
                    }
                },
                {
                    name:"country",
                    type:"input",
                    message:"Enter Your Country Name: ",
                    validate:(input)=>{
                        if(!isNaN(input)){
                            return `Please Enter Your Country Name!!`;
                        }
                        else{
                            return true;
                        }
                    }
                },
                {
                    name:"city",
                    type:"input",
                    message:"Enter Your City Name: ",
                    validate:(input)=>{
                        if(!isNaN(input)){
                            return `Please Enter Your City Name!!`;
                        }
                        else{
                            return true;
                        }
                    }
                },
                {
                    name:"email",
                    type:"input",
                    message:"Enter Your E-mail Address: ",
                    validate:(input) =>{
                        if(!isNaN(input)){
                            return"Please Enter Your Email Address!";
                        }
                        else{
                            return true
                            }
                        }
                },
                {
                    name:"password",
                    type:"password",
                    mask:'*',
                    message:"Enter 6-8 digits Password: ",
                    validate:(input)=>{
                        if(input.length < 6 || input.length > 8){
                            return `Please Enter 6-8 digits Password! `
                        }
                        else{
                            return true
                        }
                    }
                },
              
            ])
            //for user seen userID method: 
            let userAccInfo = new UserId(
                signUpAcc.firstName,
                signUpAcc.lastName,
                signUpAcc.country,
                signUpAcc.city,
                signUpAcc.email,
                signUpAcc.password);
                // push user data;
                const isUserNameTaken = usersInfo.some(user => user.fullUserName().toLowerCase() === userAccInfo.fullUserName().toLowerCase());
                
                if (isUserNameTaken) {
                    console.log(chalk.red.bold.italic(`User Name ${userAccInfo.fullUserName()} is already taken. Please enter a new user name!\n`));
                } else {
                    usersInfo.push(userAccInfo);

                    console.log(chalk.bold.italic.greenBright(`\nYour Account Created Successfully!\n`));
                }
            }

        else{

            let {loginAcc} = await inquirer.prompt(
                {
                    name:"loginAcc",
                    type:"list",
                    message:"Choose account:",
                    choices:["User Login Account", "Admin Login Account"]
                }
            )

            if(loginAcc === "Admin Login Account"){
                // admin login account finctionality;\
                let adminInfo = await inquirer.prompt([
                    {
                        name:"adminName",
                        type:"input",
                        message:"Enter Your Name: ",
                        validate:(input) =>{
                            if(!isNaN(input)){
                                return"Please Enter Your Name!";
                            }
                            else{
                                return true
                            }
                        }   
                    },
                    {
                        name:"adminPassword",
                        type:"password",
                        mask:"*",
                        message:"Enter Your Password: ",
                        validate:(input)=>{
                            if(input.length == 0 || input.length < 6){
                                return `Please Enter Your Correct Password! `;
                            }
                            else{
                                return true;
                            }
                        }
                    }
                ]);

                if(adminInfo.adminName !== adminName || adminInfo.adminPassword !== adminPassword){
                    console.log(chalk.bold.italic.red(`\nIncorrect User Name Or Password!\n`));
                }
                else{
                    console.log(chalk.greenBright.bold.italic(`\nLogin Successful!\n`));
                    let loopAdmin = true;
                    while(loopAdmin){
                    //   todo list;
                    let {todoList} = await inquirer.prompt([
                        {
                            name:"todoList",
                            type: "list",
                            choices:["Create Events","Update Events","View Events","Delete Events","Log Out Account"],
                            message:"What Do You Want To Do? "
                        }
                    ]);
                    if(todoList === "Create Events"){
                        let createEvents = await inquirer.prompt([
                            {
                               name:"category",
                               type:"list",
                               message:"Add Event Category: ",
                               choices:["Sports","Exhibition","Theatre","Travel","Education","Music","Festival","Fashion","Food","Kids","Comedy","Photography","Magic Show"]
                            },
                            {
                                name:"title",
                                type:"input",
                                message:"Add Event Title: ",
                                validate:(input)=>{
                                 if(!isNaN(input)){
                                   return `Enter Event Title!`
                                 }
                                 else{
                                     return true;
                                 }
                                } 
                            },
                            {
                                name:"date",
                               type:"input",
                               message:"Add Event Date (YYYY-MM-DD): ",
                               validate:(input)=>{
                                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                                if (!dateRegex.test(input)) {
                                    return `Enter Event Date (YYYY-MM-DD)!`;
                                } else {
                                    return true;
                                }

                               }
                            },
                            {
                                name: "time",
                                type: "input",
                                message: "Add Event Time (HH:MM AM/PM): ",
                                validate: input => {
                                    const timeRegex = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/;
                                    if (!timeRegex.test(input)) {
                                        return "Enter Event Time (HH:MM AM/PM)!";
                                    } else {
                                        return true;
                                    }
                                }
                            },
                            {
                                name:"city",
                                type:"input",
                                message:"Add Event City: ",
                                validate:(input)=>{
                                 if(!isNaN(input)){
                                   return `Enter Event City!`
                                 }
                                 else{
                                     return true;
                                 }
                                }  
                            },
                            {
                                name:"price",
                                type:"number",
                                message:"Add Event Ticket Price: ",
                                validate:(input)=>{
                                 if(isNaN(input)){
                                   return `Enter Event Price!`
                                 }
                                 else{
                                     return true;
                                 }
                                }  
                            },
                            {
                                name:"seatsStock",
                                type:"number",
                                message:"Add Event Seats: ",
                                validate:(input)=>{
                                 if(isNaN(input)){
                                   return `Enter Event Seats!`
                                 }
                                 else{
                                     return true;
                                 }
                                }  
                            }
                        ]);
                        let eventsData = new EventsManager(createEvents.category,createEvents.title,createEvents.date,createEvents.time,createEvents.city,createEvents.price,createEvents.seatsStock);
                        eventsStore.push(eventsData);
                        console.log(chalk.bold.italic.greenBright(`\nEvent Created Successfully!\n`));
                        
                        
                    }
                    else if(todoList === "Update Events"){
                        if(eventsStore.length === 0){
                            console.log(chalk.bold.italic.red(`Empty List!!`)); 
                        }
                        else{

                            const eventChoices = eventsStore.map(event => ({
                                name: event.adminViewEventsHistory(), // Display event details
                                value: event // Set the event object as the value
                            }))
                            let {updateEvent} = await inquirer.prompt(
                                {
                                    name:"updateEvent",
                                    type:"list",
                                    message:"Which Event Do You Want To Update? ",
                                    choices: eventChoices
                                }
                            );
                            let updatedAddEvent = await inquirer.prompt([
                                {
                                    name:"addEvent",
                                    type:"list",
                                    message:"Enter Event Category: ",
                                    choices:["Sports","Exhibition","Theatre","Travel","Education","Music","Festival","Fashion","Food","Kids","Comedy","Photography","Magic Show"]
                                },
                                {
                                    name:"title",
                                    type:"input",
                                    message:"Add Event Title: ",
                                    validate:(input)=>{
                                     if(!isNaN(input)){
                                       return `Enter Event Title!`
                                     }
                                     else{
                                         return true;
                                     }
                                    } 
                                },
                                {
                                    name:"date",
                                   type:"input",
                                   message:"Add Event Date (YYYY-MM-DD): ",
                                   validate:(input)=>{
                                    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                                    if (!dateRegex.test(input)) {
                                        return `Enter Event Date (YYYY-MM-DD)!`;
                                    } else {
                                        return true;
                                    }
    
                                   }
                                },
                                {
                                    name: "time",
                                    type: "input",
                                    message: "Add Event Time (HH:MM AM/PM): ",
                                    validate: input => {
                                        const timeRegex = /^(0?[1-9]|1[0-2]):([0-5]\d)\s?(AM|PM)$/;
                                        if (!timeRegex.test(input)) {
                                            return "Enter Event Time (HH:MM AM/PM)!";
                                        } else {
                                            return true;
                                        }
                                    }
                                },
                                {
                                    name:"city",
                                    type:"input",
                                    message:"Add Event City: ",
                                    validate:(input)=>{
                                     if(!isNaN(input)){
                                       return `Enter Event City!`
                                     }
                                     else{
                                         return true;
                                     }
                                    }  
                                },
                                {
                                    name:"price",
                                    type:"number",
                                    message:"Add Event Ticket Price: ",
                                    validate:(input)=>{
                                     if(isNaN(input)){
                                       return `Enter Event Price!`
                                     }
                                     else{
                                         return true;
                                     }
                                    }  
                                },
                                {
                                    name:"seatsStock",
                                    type:"number",
                                    message:"Add Event Seats: ",
                                    validate:(input)=>{
                                     if(isNaN(input)){
                                       return `Enter Event Seats!`
                                     }
                                     else{
                                         return true;
                                     }
                                    }  
                                }
                            ]);

                                const index = eventsStore.findIndex(event => event === updateEvent);

                                // Update the properties of the selected event object
                                eventsStore[index].category = updatedAddEvent.addEvent;
                                eventsStore[index].title = updatedAddEvent.title;
                                eventsStore[index].date = updatedAddEvent.date;
                                eventsStore[index].time = updatedAddEvent.time;
                                eventsStore[index].city = updatedAddEvent.city;
                                eventsStore[index].price = updatedAddEvent.price;
                                eventsStore[index].seats = updatedAddEvent.seatsStock;

        console.log(chalk.greenBright.bold.italic(`\nEvent Updated successfully!\n`));

                        }
                    }
                    else if(todoList === "View Events"){
                        console.log(chalk.bold.italic.magenta(`\nFEATURED EVENTS!!`));
                            eventsStore.forEach(event => {
                                console.log(event.adminViewEventsHistory());
                        })  
                    }
                    else if(todoList === "Delete Events"){
                        const eventChoices = eventsStore.map(event => ({
                            name: event.adminViewEventsHistory(), // Display event details
                            value: event // Set the event object as the value
                        }))
                        let {deleteEvent} = await inquirer.prompt(
                            {
                                name:"deleteEvent",
                                type:"list",
                                message:"Which Event Do You Want To Delete? ",
                                choices: eventChoices
                            }
                        );
                        let newDeleteEvent = eventsStore.filter(val => val !== deleteEvent)
                        eventsStore = [...newDeleteEvent];
                        console.log(chalk.bold.italic.greenBright(`\nEvent Deleted Successfully!!\n`));
                        
                    }
                    else if(todoList === "Log Out Account"){
                        loopAdmin = false;
                    }
                }
            }
        }
            else{

                let loginUserAcc = await inquirer.prompt([
                    {
                        name:"userName",
                        type:"input",
                        message:"Enter Your User Name: ",
                        validate:(input) =>{
                            if(!isNaN(input)){
                                return"Please Enter Your User Name!";
                            }
                            else{
                                return true
                                }
                            }
                    },
                    {
                        name:"userPassword",
                        type:"password",
                        mask:"*",
                        message:"Enter Your Password: ",
                        validate:(input)=>{
                            if(input.length == 0 || input.length < 6){
                                return `Please Enter Your Correct Password! `;
                            }
                            else{
                                return true;
                            }
                        }
                    }
                ])
                //  usersInfo array he.
                const userAccInfo = usersInfo.find((u) => u.fullUserName() === loginUserAcc.userName && u.password === loginUserAcc.userPassword);
                if(!userAccInfo){
                    console.log(chalk.red.italic.bold(`\nIncorrect User Name Or Password!\n`)); 
                }
                else{
                    console.log(chalk.bold.italic.greenBright(`\nWelcome to Your Account ${userAccInfo.fullUserName()}!\n`));
                    let loop:boolean= true
                    while(loop){
                    
                    let {options} = await inquirer.prompt([
                        {
                            name:"options",
                            type:"list",
                            message:"Select Options: ",
                            choices:["View All Events","Browse Events", "View Booked Events","Log Out Account"]
                        }
                    ]);

                    if(options === "Log Out Account"){
                        loop = false;
                    }

        
                    else if(options === "Browse Events"){

                         let events = await inquirer.prompt([
                            {
                                name:"byCategory",
                                type:"list",
                                message:"Select By Category: ",
                                choices:["Sports","Exhibition","Theatre","Travel","Educcation","Music","Festival","Fashion","Food","Kids","Kids","Comedy","Photography","Magic Show"]
                            },
                            {
                                name:"date",
                                type:"list",
                                message:"Select Date: ",
                                choices:["26-May-2024", "02-May-2024","03-June-2024","04-June-2024","05-June-2024","06-June-2024","07-June-2024"]
                            },
                            {
                                name:"city",
                                type:"list",
                                message:"Select Date: ",
                                choices:["Karachi","Lahore","Islamabad","Multan","Peshawar","Faisalabad","Rawalpindi","Hyderabad","Quetta","Balochistan"]
                            },
                            {
                                name:"keyword",
                                type:"input",
                                message:"Search Event By Keyword: "
                            }
                        ]);
                
                          const filteredEvents :EventsManager[]= eventsStore.filter((e)=> e.category.toLowerCase() === events.byCategory.toLowerCase() && e.title.toLowerCase() === events.keyword.toLowerCase());
                          if(filteredEvents.length === 0){
                            console.log(chalk.red(`\nSorry! We do not find any events matching your query.\n`)); 
                          }
                          else{
                               
                            let {bookTicket} = await inquirer.prompt([
                                {
                                    name:"bookTicket",
                                    type:"list",
                                    message:"Select An Event For Booking: \n",
                                    default : true,
                                    choices: filteredEvents.map(event => ({
                                        name: event.selectTicketsHistory(),
                                        value: event // Set the event object as the value
                                    }))
                                }
                            ]);

                            const selectedEvent = bookTicket;
                
                            if (new Date(selectedEvent.date) < new Date()) {
                                console.log(chalk.red.italic(`Out Of Date Event!!\n`));  
                            } 
                            else{   

                                  let {bookSeats} = await inquirer.prompt([
                                {
                                    name:"bookSeats",
                                    type:"number",
                                    message:"How Many Tickets Do You Want To Book? ",
                                    validate:(input)=>{
                                        if(isNaN(input)){
                                          return `Enter Event Seats!`
                                        }
                                        else{
                                            return true;
                                        }
                                    }
                                }
                            ]);
    
                            const numberOfSeats = bookSeats;
                            selectedEvent.userViewbookTickets(numberOfSeats);
                            if (numberOfSeats > bookTicket.seats) {
                                console.log(chalk.bold.italic.red(`\nSorry! Not enough seats available for booking.\n`));
                            } else {
                                selectedEvent.seats -= numberOfSeats;
                            let {paymentMethod} = await inquirer.prompt([
                                          {
                                            name:"paymentMethod",
                                            type:"list",
                                            message:"Select Payment Method: ",
                                            choices:["Debit / Credit Card","Bank Transfer"]
                                           }
                                        ]);
                                        if(paymentMethod === "Debit / Credit Card" || "Bank Transfer") {
                                            console.log(chalk.yellow(`\nAmount $${selectedEvent.price * selectedEvent.ticketsBooked} deducted Successfully!`));
                                            console.log(chalk.bold.italic.greenBright(`\nTicket Booked Successfully!\n`));
                                            userViewBookedEvents.push(selectedEvent);
                                    } 
                                }
                            }
                        }
                    }       //  View All Events
                        else if(options === "View All Events"){

                            const eventChoices = eventsStore.map(event => ({
                                name: event.userViewAllEvents(), // Display event details
                                value: event // Set the event object as the value
                            }))

                            let {userSelectedViewAllEvents} = await inquirer.prompt(
                                {
                                    name:"userSelectedViewAllEvents",
                                    type:"list",
                                    message:"Select An Event For Booking: \n",
                                    choices: eventChoices
                                }
                            );

                            const userSelectViewAllEvents = userSelectedViewAllEvents;
                            
                            if (new Date(userSelectViewAllEvents.date) < new Date()) {
                                console.log(chalk.red.italic(`Out Of Date Event!!\n`));  
                            } 
                            else{   

                                  let {bookSeats} = await inquirer.prompt([
                                {
                                    name:"bookSeats",
                                    type:"number",
                                    message:"How Many Tickets Do You Want To Book? ",
                                    validate:(input)=>{
                                        if(isNaN(input)){
                                          return `Enter Event Seats!`
                                        }
                                        else{
                                            return true;
                                        }
                                    }
                                }
                            ]);
    
                            const numberOfSeats = bookSeats;
                            userSelectViewAllEvents.userViewbookTickets(numberOfSeats); // Update booked tickets
                            if (numberOfSeats > userSelectViewAllEvents.seats) {
                                console.log(chalk.bold.italic.red(`\nSorry! Not enough seats available for booking.\n`));
                            } else {
                             
                              userSelectViewAllEvents.seats -= numberOfSeats;
                            
                            let {paymentMethod} = await inquirer.prompt([
                                          {
                                            name:"paymentMethod",
                                            type:"list",
                                            message:"Select Payment Method: ",
                                            choices:["Debit / Credit Card","Bank Transfer"]
                                           }
                                        ]);
                                        if(paymentMethod === "Debit / Credit Card" || paymentMethod === "Bank Transfer") {
                                            console.log(chalk.yellow(`\nAmount $${userSelectViewAllEvents.price * bookSeats} deducted Successfully!`));
                                            console.log(chalk.bold.italic.greenBright(`\nTicket Booked Successfully!\n`));
                                            userViewBookedEvents.push(userSelectViewAllEvents);
                                    }
                                }
                            }
                        }
                            // user view booked tickets;

                            if(options === "View Booked Events"){

                                if(userViewBookedEvents.length === 0){
                                    console.log(chalk.bold.italic.green(`\nNo Events Booked!!\n`));
                                }
                                else{  
                                     
                                console.log(chalk.bold.italic.magenta(`\nFEATURED EVENTS!!`));
                                userViewBookedEvents.forEach(event => {
                                console.log(event.userViewAllBookedEvents());
                            })

                            // userViewBookedEvents.forEach(event => {
                            //     console.log(event.category,event.title,event.date,event.time,event.city,event.price,event.ticketsBooked)
                            // })
                            
                        }
                            
                        }
                    }
                }
            }
        }
            
    } 
}       


eventsFlow()


