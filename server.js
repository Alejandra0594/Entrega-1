const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

const PORT = 3001;

// Ruta para devolver todos los productos de `cart`
app.get('/cart', (req, res) => {
    const filePath = path.join(__dirname, 'APIs', 'cart', 'buy.json');
    
    // Verificamos si el archivo existe antes de enviarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Archivo no encontrado:', filePath);
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        
        // Enviamos el archivo si existe
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err.message);
                res.status(500).json({ error: 'Error al enviar el archivo' });
            }
        });
    });
});


// Ruta para devolver todos los productos de `cats`
app.get('/categories', (req, res) => {
    const filePath = path.join(__dirname, 'APIs', 'cats', 'cat.json');
    
    // Verificamos si el archivo existe antes de enviarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Archivo no encontrado:', filePath);
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        
        // Enviamos el archivo si existe
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err.message);
                res.status(500).json({ error: 'Error al enviar el archivo' });
            }
        });
    });
});

// Ruta para devolver todos los productos de `cats_products`
app.get('/categories/:id', (req, res) => {
    const id = req.params.id; // Obtenemos el ID de los parámetros de la ruta
    const filePath = path.join(__dirname, 'APIs', 'cats_products', `${id}.json`); // Ruta dinámica para el archivo
    
    // Verificamos si el archivo existe antes de enviarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Archivo no encontrado:', filePath);
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        
        // Enviamos el archivo si existe
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err.message);
                res.status(500).json({ error: 'Error al enviar el archivo' });
            }
        });
    });
});

// Ruta para devolver todos los productos de `products`
app.get('/products/:id', (req, res) => {
    const id = req.params.id; // Obtenemos el ID de los parámetros de la ruta
    const filePath = path.join(__dirname, 'APIs', 'products', `${id}.json`); // Ruta dinámica para el archivo
    
    // Verificamos si el archivo existe antes de enviarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Archivo no encontrado:', filePath);
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        
        // Enviamos el archivo si existe
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err.message);
                res.status(500).json({ error: 'Error al enviar el archivo' });
            }
        });
    });
});

// Ruta para devolver todos los productos de `products_comments`
app.get('/products_comments/:id', (req, res) => {
    const id = req.params.id; // Obtenemos el ID de los parámetros de la ruta
    const filePath = path.join(__dirname, 'APIs', 'products_comments', `${id}.json`); // Ruta dinámica para el archivo
    
    // Verificamos si el archivo existe antes de enviarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Archivo no encontrado:', filePath);
            return res.status(404).json({ error: `Producto con ID ${id} no encontrado` });
        }
        
        // Enviamos el archivo si existe
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err.message);
                res.status(500).json({ error: 'Error al enviar el archivo' });
            }
        });
    });
});

// Ruta para devolver todos los productos de `sell`
app.get('/sell', (req, res) => {
    const filePath = path.join(__dirname, 'APIs', 'sell', 'publish.json');
    
    // Verificamos si el archivo existe antes de enviarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Archivo no encontrado:', filePath);
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        
        // Enviamos el archivo si existe
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err.message);
                res.status(500).json({ error: 'Error al enviar el archivo' });
            }
        });
    });
});

// Ruta para devolver todos los productos de `user_cart`
app.get('/user_cart', (req, res) => {
    const filePath = path.join(__dirname, 'APIs', 'user_cart', '25801.json');
    
    // Verificamos si el archivo existe antes de enviarlo
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Archivo no encontrado:', filePath);
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        
        // Enviamos el archivo si existe
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err.message);
                res.status(500).json({ error: 'Error al enviar el archivo' });
            }
        });
    });
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
