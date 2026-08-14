import { MongoClient, Db, GridFSBucket } from "mongodb";

// Global cache across hot reloads and warm serverless functions
interface MongoGlobal {
  _mongoClient?: MongoClient;
  _mongoDb?: Db;
  _mongoBucket?: GridFSBucket;
  _mongoPromise?: Promise<{ client: MongoClient; db: Db; bucket: GridFSBucket }>;
}

const g = global as unknown as MongoGlobal;

export const memoryEnquiries: Array<Record<string, unknown>> = [];
export const memoryCareers: Array<Record<string, unknown>> = [];

export async function connectToDatabase(): Promise<{
  db: Db | null;
  bucket: GridFSBucket | null;
  client: MongoClient | null;
}> {
  if (g._mongoDb && g._mongoBucket && g._mongoClient) {
    return { db: g._mongoDb, bucket: g._mongoBucket, client: g._mongoClient };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn("MONGODB_URI is not set. Operating in memory store mode.");
    return { db: null, bucket: null, client: null };
  }

  if (!g._mongoPromise) {
    g._mongoPromise = MongoClient.connect(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 5000,
      maxPoolSize: 10,
    }).then((client) => {
      const db = client.db(process.env.DB_NAME || "brandqube");
      const bucket = new GridFSBucket(db, { bucketName: "logos" });
      return { client, db, bucket };
    });
  }

  try {
    const res = await g._mongoPromise;
    g._mongoClient = res.client;
    g._mongoDb = res.db;
    g._mongoBucket = res.bucket;
    return { db: res.db, bucket: res.bucket, client: res.client };
  } catch (err) {
    g._mongoPromise = undefined;
    console.warn("MongoDB Atlas connection fallback:", (err as Error).message);
    return { db: null, bucket: null, client: null };
  }
}
