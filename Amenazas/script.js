// A. Estructura de Datos y Variables
let inventory = {
    'Laptop': 10,
    'Mouse': 50,
    'Teclado': 25, 
    'Monitor': 15,
    'Webcam': 40,
    'Router': 30
};

// Función auxiliar para dibujar la tabla de inventario, ahora con filtro
function displayInventory(filter = '') {
    const body = document.getElementById('inventory-body');
    body.innerHTML = '';
    
    const lowerCaseFilter = filter.toLowerCase().trim(); 
    let resultsFound = false;

    for (const [product, stock] of Object.entries(inventory)) {
        if (lowerCaseFilter === '' || product.toLowerCase().includes(lowerCaseFilter)) {
            const row = body.insertRow();
            row.insertCell().textContent = product;
            row.insertCell().textContent = stock;
            resultsFound = true;
        }
    }
    
    if (!resultsFound && lowerCaseFilter !== '') {
         const row = body.insertRow();
         const cell = row.insertCell();
         cell.colSpan = 2;
         cell.textContent = `No se encontraron productos que coincidan con "${filter}".`;
    }
}

// B. Función para Reiniciar (Inicio de la demo)
function resetInventario() {
    inventory = { 'Laptop': 10, 'Mouse': 50, 'Teclado': 25, 'Monitor': 15, 'Webcam': 40, 'Router': 30 }; 
    document.getElementById('product-name').value = '';
    
    document.getElementById('message').className = 'result-message safe';
    document.getElementById('message').innerHTML = '✅ **MODO SEGURO POR DISEÑO.** Sistema protegido por Consultas Parametrizadas.';
    displayInventory(); 
}

// C. Función Principal: Simula la Consulta (El valor central de la demo)
function simularAtaque() {
    const productName = document.getElementById('product-name').value;
    const messageDiv = document.getElementById('message');
    
    if (productName.trim() === '') {
        displayInventory();
        messageDiv.textContent = 'Escribe un producto para buscar o atacar.';
        return;
    }
    
    // ---------------------------------------------------------------------
    // ZONA CRÍTICA DE LA DEMOSTRACIÓN (CÓDIGO SEGURO POR DEFECTO)
    // ---------------------------------------------------------------------
    
    // --- ✅ CÓDIGO SEGURO: El requisito de diseño está implementado ---
    
// --- 🔴 CÓDIGO VULNERABLE: El desarrollador reimplementa con concatenación ---
    
    messageDiv.className = 'result-message vulnerable';
    
    if (productName.includes("' --")) {
        // ATAQUE EXITOSO (Tampering)
        inventory['Mouse'] = inventory['Mouse'] - 5;
        inventory['Laptop'] = inventory['Laptop'] - 5;
        inventory['Router'] = inventory['Router'] - 5;
        
        messageDiv.innerHTML = `🔴 **¡FALLO EN EL DISEÑO!** La inyección modificó el stock.<br>Consulta Insegura: <code>UPDATE inventario SET stock = stock - 5 WHERE producto = \'${productName}\'</code>`;
    } else {
        messageDiv.textContent = `Buscando: ${productName}. MODO ACTUAL: VULNERABLE.`;
    }
    // ---------------------------------------------------------------------
    // FIN ZONA CRÍTICA
    // ---------------------------------------------------------------------
    
    // Esta lógica de filtrado final solo se ejecuta si la función no ha salido.
    if (!productName.includes("' --")) {
        displayInventory(productName);
    } else {
        // Si fue un ataque fallido, mostramos toda la tabla intacta
        displayInventory();
    }
}

// D. Inicialización: Se ejecuta cuando la página se carga.
window.onload = resetInventario;