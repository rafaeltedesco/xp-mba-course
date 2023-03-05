import { mongoDBConnection } from "./src/database/connection";

const main = async ()=> {
    const connection = await mongoDBConnection.connect()

    const result = connection.db('igti').collection('posts').find({
    })
    result.forEach(doc => console.log(doc))
        
}

main()