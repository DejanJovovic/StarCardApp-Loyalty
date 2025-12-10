import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import * as SQLite from "expo-sqlite";
import dbFile from "../assets/database/starcard.sqlite";
import schemaSqlFile from "../assets/database/starcard_schema.sqlite.sql";

const DB_NAME = "starcard.sqlite";

// Import the .sqlite file as a module so Metro resolves it reliably
const asset = Asset.fromModule(dbFile as any);
const schemaAsset = Asset.fromModule(schemaSqlFile as any);

async function copyDatabaseIfNeeded() {
    const SQLITE_DIR = FileSystem.documentDirectory + "SQLite/"; // expo-sqlite expects DBs under DocumentDirectory/SQLite/
    const dest = SQLITE_DIR + DB_NAME;

    // Ensure the SQLite directory exists
    await FileSystem.makeDirectoryAsync(SQLITE_DIR, { intermediates: true }).catch(() => {});

    const fileInfo = await FileSystem.getInfoAsync(dest);
    if (fileInfo.exists) {
        try {
            const db = SQLite.openDatabaseSync(DB_NAME);
            const row: any = db.getFirstSync(
                "SELECT COUNT(*) as c FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
            );
            const hasUserTables = row && (row.c ?? row["COUNT(*)"]) > 0;
            if (hasUserTables) return; // already a populated DB
        } catch (e) {
            // fall through to overwrite
        }
        // Existing DB seems empty or invalid — replace it from the bundled asset
        try { await FileSystem.deleteAsync(dest, { idempotent: true }); } catch {}
    }

    await asset.downloadAsync();

    if (!asset.localUri) throw new Error("Failed to load database asset");

    await FileSystem.copyAsync({
        from: asset.localUri,
        to: dest,
    });
}


async function ensureSchemaIfEmpty(db: SQLite.SQLiteDatabase) {
    try {
        const row: any = db.getFirstSync(
            "SELECT COUNT(*) as c FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
        );
        const count = row?.c ?? row?.["COUNT(*)"] ?? 0;
        if (count > 0) return;
    } catch {
        // proceed to initialize schema
    }

    // Fallback: load and execute the schema SQL from bundled asset
    await schemaAsset.downloadAsync();
    if (!schemaAsset.localUri) throw new Error("Failed to load schema SQL asset");
    const schemaSql = await FileSystem.readAsStringAsync(schemaAsset.localUri);

    // Split into statements by semicolon followed by line break, keep it simple
    const statements = schemaSql
        .split(/;\s*(?:\n|\r|\r\n)/g)
        .map(s => s.trim())
        .filter(s => s.length > 0);

    // Run statements sequentially
    for (const stmt of statements) {
        db.runSync(stmt);
    }
}

export async function openDatabase() {
    await copyDatabaseIfNeeded();
    const db = SQLite.openDatabaseSync(DB_NAME);  // NEW API
    await ensureSchemaIfEmpty(db);
    return db;
}

export function run(db: SQLite.SQLiteDatabase, sql: string, params: any[] = []) {
    return db.runSync(sql, params);
}

export function getAll(db: SQLite.SQLiteDatabase, sql: string, params: any[] = []) {
    return db.getAllSync(sql, params);
}

export function getOne(db: SQLite.SQLiteDatabase, sql: string, params: any[] = []) {
    return db.getFirstSync(sql, params);
}
