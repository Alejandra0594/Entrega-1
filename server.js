const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";

const app = express();
app.use(cors());
app.use(express.json()); // Permite analizar cuerpos JSON


const PORT = 3001;
// post para la configuraciòn del token
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "admin@admin.com" && password === "admin") {
      const token = jwt.sign({ username }, SECRET_KEY);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
    }
  }); 
  


  // Middleware que autoriza a realizar peticiones a /cart
app.use("/cart", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });

// Middleware que autoriza a realizar peticiones a /categories
app.use("/categories", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });

  // Middleware que autoriza a realizar peticiones a /categories/:id
app.use("/categories/:id", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });

  // Middleware que autoriza a realizar peticiones a /products/:id
app.use("/products/:id", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });

  // Middleware que autoriza a realizar peticiones a /products_comments/:id
app.use("/products_comments/:id", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });

    // Middleware que autoriza a realizar peticiones a /sell
app.use("/sell", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });

  // Middleware que autoriza a realizar peticiones a /user_cart
app.use("/user_cart", (req, res, next) => {
    try {
      const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
      console.log(decoded);
      next();
    } catch (err) {
      res.status(401).json({ message: "Usuario no autorizado" });
    }
  });






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
