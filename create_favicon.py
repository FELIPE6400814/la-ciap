from PIL import Image
import sys

def create_favicon():
    try:
        # Abrir la imagen del logo
        img = Image.open('img/logo.png')
        
        # Convertir a RGB si es necesario
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Crear diferentes tamaños para el favicon
        sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
        
        # Guardar como favicon.ico
        img.save('favicon.ico', format='ICO', sizes=sizes)
        
        print("✅ Favicon creado exitosamente: favicon.ico")
        return True
        
    except FileNotFoundError:
        print("❌ Error: No se encontró el archivo img/logo.png")
        return False
    except Exception as e:
        print(f"❌ Error al crear el favicon: {e}")
        return False

if __name__ == "__main__":
    create_favicon()