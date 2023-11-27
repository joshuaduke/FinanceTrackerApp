import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {} ){

    let server = createServer({
        environment,

        models: {
            wallets: Model,
        },
    
        seeds(server) {
            server.create("wallet", { id: "1", name: "Gold Amex", initialBalance: 60, bank: "Scotiabank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple" })
            server.create("wallet", { id: "2", name: "TD Credit", initialBalance: 80, bank: "TD", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged" })
            server.create("wallet", { id: "3", name: "TD Chequing", initialBalance: 100, bank: "TD", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury" })
            server.create("wallet", { id: "4", name: "EQ Home Savings", initialBalance: 65, bank: "EQ Bank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple" })
            server.create("wallet", { id: "5", name: "EQ Auto Savings", initialBalance: 120, bank: "EQ Bank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury" })
            server.create("wallet", { id: "6", name: "Scotiabank Amex", initialBalance: 70, bank: "Scotiabank", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged" })
        },
    
        
        routes() {
            this.namespace = "api"
            // this.logging = false
    
            this.get("/wallet", (schema, request) => {
                console.log('req', request)
                return schema.wallets.all()
            })
            
            this.get("/wallet/:id", (schema, request) => {
                const id = request.params.id
                console.log('req', request)
                return schema.wallets.find(id)
            })
        }
    })

    return server;
} 