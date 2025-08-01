import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config() 

export class Database {
  private static client: MongoClient; //Guarda o cliente que conecta ao MongoDb
  private static db: Db;

  //Método que conecta no MongoDB
  public static async  connect(): Promise<void> {
    const uri = process.env.MONGO_URI; 
    const dbName = process.env.MONGO_DB_NAME; 

    //Erro caso não encontre nome OU uri do nome do banco
    if (!uri || !dbName) {
      throw new Error("Variáveis de ambiente MONGO_URI e MONGO_DB_NAME são necessárias");
    }
    //Cria um novo cliente caso não ainda não tenha sido criado
    if (!Database.client) {
      Database.client = new MongoClient(uri);
      await Database.client.connect();
      Database.db = Database.client.db(dbName);

      console.log("Conectado ao MongoDb.")
    }
  }

  //Método que pega a instancia do banco e usa no resto do sistema
  public static getDb(): Db {
    //Erro caso não tenha conectado
    if (!Database.db) {
      throw new Error("Banco de dados não conectado. Chame Database.connect() primeiro.");
    }

    return Database.db;
  }
}


