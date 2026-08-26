# Configurar EmailJS en el portfolio

## 1. Instalar el paquete

```bash
npm install @emailjs/browser
```

## 2. Crear cuenta en EmailJS
Ve a https://www.emailjs.com y crea una cuenta gratuita.


[he hecho hasta aquí]


## 3. Crear un Email Service
- Panel → Email Services → Add New Service
- Conecta tu cuenta de Gmail (u otro proveedor)
- Copia el **Service ID** (ej: `service_abc123`)

## 4. Crear un Email Template
- Panel → Email Templates → Create New Template
- Configura el template así:

```
Asunto: Nuevo mensaje de {{name}} — Portfolio

De: {{name}} ({{email}})
Mensaje:
{{message}}
```

- Los nombres de las variables deben coincidir exactamente con
  los atributos `name` de los inputs del formulario:
  - name="name"
  - name="email"  
  - name="message"

- Copia el **Template ID** (ej: `template_xyz456`)

## 5. Obtener la Public Key
- Panel → Account → General → Public Key
- Copia la clave (ej: `user_XXXXXXXXXXXXXXX`)

## 6. Reemplazar en Home.tsx
Busca estas tres líneas y sustitúyelas:

```tsx
"YOUR_SERVICE_ID"   →  "service_abc123"
"YOUR_TEMPLATE_ID"  →  "template_xyz456"
"YOUR_PUBLIC_KEY"   →  "user_XXXXXXXXXXXXXXX"
```

## 7. (Opcional) Inicializar EmailJS globalmente
Si prefieres, puedes inicializar EmailJS una sola vez en main.tsx:

```tsx
import emailjs from "@emailjs/browser";
emailjs.init("YOUR_PUBLIC_KEY");
```

Y eliminar el cuarto parámetro de `emailjs.sendForm(...)` en Home.tsx.

## Límites del plan gratuito
- 200 emails/mes
- Suficiente para un portfolio personal
