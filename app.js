import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rnbezvycjinjslrujqay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuYmV6dnljamluanNscnVqcWF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNzU4NjEsImV4cCI6MjAyODY1MTg2MX0.sULCXQJQ2ZcAhiko1w7wK4RSo4Atn_79O9fYHtMxavE'; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addProductForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const detalles = document.getElementById('detalles').value;
        const cantidad = document.getElementById('cantidad').value;

        try {
            const { data, error } = await supabase.from('productos').insert([
                { nombre, precio, detalles, cantidad }
            ]);

            if (error) throw error;

            console.log('Producto añadido', data);
            form.reset();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });

    async function loadProducts() {
        try {
            const { data: productos, error } = await supabase.from('productos').select('*');
            if (error) throw error;
            console.log('Productos cargados:', productos);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    loadProducts();
});
