import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {} ){

    let server = createServer({
        environment,

        models: {
            wallets: Model,
            transactions: Model,
        },
    
        seeds(server) {
            server.create("wallet", { id: "1", name: "Gold Amex", initialBalance: 60, bank: "Scotiabank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple" })
            server.create("wallet", { id: "2", name: "TD Credit", initialBalance: 80, bank: "TD", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged" })
            server.create("wallet", { id: "3", name: "TD Chequing", initialBalance: 100, bank: "TD", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury" })
            server.create("wallet", { id: "4", name: "EQ Home Savings", initialBalance: 65, bank: "EQ Bank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple" })
            server.create("wallet", { id: "5", name: "EQ Auto Savings", initialBalance: 120, bank: "EQ Bank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury" })
            server.create("wallet", { id: "6", name: "Scotiabank Amex", initialBalance: 70, bank: "Scotiabank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged" }),
            server.create("transaction", { id: "1", category: "Food & Drink", description: "Chic Fil A", transactionAmount: -115.45, wallet: "Scotiabank Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "monthly"})
            server.create("transaction", { id: "2", category: "Transportation", description: "Gas", transactionAmount: -60, wallet: "Gold Amex", date: "2023-11-01", importance: "Essential" , recurrence: "never"})
            server.create("transaction", { id: "3", category: "Bill", description: "Phone Bill", transactionAmount: -56.5, wallet: "TD Chequing", date: "2023-11-08", importance: "Essential" , recurrence: "Monthly"})
            server.create("transaction", { id: "4", category: "Payment", description: "Paycheck", transactionAmount: 1938.53, wallet: "TD Chequing", date: "2023-11-08", importance: "" , recurrence: "Bi-weekly"})
            server.create("transaction", { id: "5", category: "Entertainment", description: "Napoleon Movie", transactionAmount: -46.00, wallet: "Gold Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
            server.create("transaction", { id: "11", category: "Food & Drink", description: "Chic Fil A", transactionAmount: -115.45, wallet: "Scotiabank Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
            server.create("transaction", { id: "21", category: "Transportation", description: "Gas", transactionAmount: -60, wallet: "Gold Amex", date: "2023-11-01", importance: "Essential" , recurrence: "never"})
            server.create("transaction", { id: "31", category: "Bill", description: "Phone Bill", transactionAmount: -56.5, wallet: "TD Chequing", date: "2023-11-08", importance: "Essential" , recurrence: "Monthly"})
            server.create("transaction", { id: "41", category: "Payment", description: "Paycheck", transactionAmount: 1938.53, wallet: "TD Chequing", date: "2023-11-08", importance: "" , recurrence: "Bi-weekly"})
            server.create("transaction", { id: "51", category: "Entertainment", description: "Napoleon Movie", transactionAmount: -46.00, wallet: "Gold Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})

            server.create("transaction", { id: "100", category: "Food & Drink", description: "Chic Fil A", transactionAmount: -115.45, wallet: "Scotiabank Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "monthly"})
            server.create("transaction", { id: "101", category: "Transportation", description: "Gas", transactionAmount: -60, wallet: "Gold Amex", date: "2023-11-01", importance: "Essential" , recurrence: "never"})
            server.create("transaction", { id: "102", category: "Bill", description: "Phone Bill", transactionAmount: -56.5, wallet: "TD Chequing", date: "2023-11-08", importance: "Essential" , recurrence: "Monthly"})
            server.create("transaction", { id: "103", category: "Payment", description: "Paycheck", transactionAmount: 1938.53, wallet: "TD Chequing", date: "2023-11-08", importance: "" , recurrence: "Bi-weekly"})
            server.create("transaction", { id: "104", category: "Entertainment", description: "Napoleon Movie", transactionAmount: -46.00, wallet: "Gold Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
            server.create("transaction", { id: "195", category: "Food & Drink", description: "Chic Fil A", transactionAmount: -115.45, wallet: "Scotiabank Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
            server.create("transaction", { id: "106", category: "Transportation", description: "Gas", transactionAmount: -60, wallet: "Gold Amex", date: "2023-11-01", importance: "Essential" , recurrence: "never"})
            server.create("transaction", { id: "107", category: "Bill", description: "Phone Bill", transactionAmount: -56.5, wallet: "TD Chequing", date: "2023-11-08", importance: "Essential" , recurrence: "Monthly"})
            server.create("transaction", { id: "108", category: "Payment", description: "Paycheck", transactionAmount: 1938.53, wallet: "TD Chequing", date: "2023-11-08", importance: "" , recurrence: "Bi-weekly"})
            server.create("transaction", { id: "109", category: "Entertainment", description: "Napoleon Movie", transactionAmount: -46.00, wallet: "Gold Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
            server.create("transaction", { id: "110", category: "Food & Drink", description: "Chic Fil A", transactionAmount: -115.45, wallet: "Scotiabank Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "monthly"})
            server.create("transaction", { id: "111", category: "Transportation", description: "Gas", transactionAmount: -60, wallet: "Gold Amex", date: "2023-11-01", importance: "Essential" , recurrence: "never"})
            server.create("transaction", { id: "112", category: "Bill", description: "Phone Bill", transactionAmount: -56.5, wallet: "TD Chequing", date: "2023-11-08", importance: "Essential" , recurrence: "Monthly"})
            server.create("transaction", { id: "113", category: "Payment", description: "Paycheck", transactionAmount: 1938.53, wallet: "TD Chequing", date: "2023-11-08", importance: "" , recurrence: "Bi-weekly"})
            server.create("transaction", { id: "114", category: "Entertainment", description: "Napoleon Movie", transactionAmount: -46.00, wallet: "Gold Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
            server.create("transaction", { id: "115", category: "Food & Drink", description: "Chic Fil A", transactionAmount: -115.45, wallet: "Scotiabank Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
            server.create("transaction", { id: "116", category: "Transportation", description: "Gas", transactionAmount: -60, wallet: "Gold Amex", date: "2023-11-01", importance: "Essential" , recurrence: "never"})
            server.create("transaction", { id: "117", category: "Bill", description: "Phone Bill", transactionAmount: -56.5, wallet: "TD Chequing", date: "2023-11-08", importance: "Essential" , recurrence: "Monthly"})
            server.create("transaction", { id: "118", category: "Payment", description: "Paycheck", transactionAmount: 1938.53, wallet: "TD Chequing", date: "2023-11-08", importance: "" , recurrence: "Bi-weekly"})
            server.create("transaction", { id: "119", category: "Entertainment", description: "Napoleon Movie", transactionAmount: -46.00, wallet: "Gold Amex", date: "2023-11-10", importance: "Shouldn't Have" , recurrence: "never"})
        },
    
        
        routes() {
            this.namespace = "api"
            // this.logging = false
    
            this.get("/wallet", (schema, request) => {
                // console.log('req', request)
                return schema.wallets.all()
            })
            
            this.get("/wallet/:id", (schema, request) => {
                const id = request.params.id
                // console.log('req', request)
                return schema.wallets.find(id)
            })

            this.get("/transaction", (schema, request) => {
                // console.log('req', request);
                // console.log('Schema', schema.transactions.all() );
                return schema.transactions.all()
            })

            this.get("/transaction/:id", (schema, request) => {
                const id = request.params.id
                // console.log('req', request)
                return schema.transactions.find(id)
            })
            console.log('')
        }
    })

    return server;
} 