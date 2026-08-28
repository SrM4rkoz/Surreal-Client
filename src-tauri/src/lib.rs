use serde_json::Value;
use surrealdb::engine::remote::ws::Ws;
use surrealdb::opt::auth::Root;
use surrealdb::Surreal;

#[tauri::command]
async fn query(sql: String) -> Result<Value, String> {
    let db = Surreal::new::<Ws>("127.0.0.1:8080")
        .await
        .map_err(|e| e.to_string())?;

    db.signin(Root {
        username: "root".into(),
        password: "secret".into(),
    })
    .await
    .map_err(|e| e.to_string())?;

    db.use_ns("main")
        .use_db("main")
        .await
        .map_err(|e| e.to_string())?;

    let mut resposta = db
        .query("fn::query($sql);")
        .bind(("sql", sql))
        .await
        .map_err(|e| e.to_string())?;

    // O take com Vec<Value> consome todos os itens retornados pelo statement sem estourar o erro
    let resultados: Vec<Value> = resposta.take(0usize).map_err(|e| e.to_string())?;

    // Se retornar 1 item (que é o array da função), envia ele; se múltiplos, envia o array inteiro
    if resultados.len() == 1 {
        Ok(resultados[0].clone())
    } else {
        Ok(Value::Array(resultados))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![query])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
