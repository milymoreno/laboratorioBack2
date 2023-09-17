# Guia para correr el proyecto
- Instalar las dependencias del proyecto:
``` 
npm install 
```

- El proyecto está utilizando una base de datos **sqlite3** por lo que deberias hacer ciertas configuraciones para que este pueda iniciar
- **1**: Crear un archivo **.env** en la carpeta raiz del proyecto que tenga el siguiente contenido: 
```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=TscNwu9JhiwwiEKCtrQtD0iZVxVoItxP
DRIVE_DISK=local
DB_CONNECTION=sqlite
 ```
- Cómo estamos usando sqlite3 deberemos crear la base de datos, lo que deberemos hacer será una carpeta **tmp** en la raiz del proyecto y dentro de esta carpeta un archivo **db.sqlite3**
- **2**: Deberia quedarte algo así: 
```
tmp/db.sqlite3
```
- En caso de querer visualizar los datos de sqlite3 instalas la dependencia de VS CODE **SQLite Viewer**:

- **3**: Una vez creado en archivo **db.sqlite3** dentro de la carpeta **tmp** deberas correr las migraciones de la siguiente manera: 
```
node ace migration:run
``` 

- **4**: Una vez corran las migraciones ya podras inicializar el proyecto con: 
```
npm run dev
```




