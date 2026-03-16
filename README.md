# Lowes Books API

A full-stack book management app with a .NET API backend and a React TypeScript frontend.

## Project Structure

```
lowes-books-api/
├── LowesBooksAPI.slnx              # .NET solution file
├── LowesBooksAPI/                   # Backend - ASP.NET Core Web API
│   ├── Controllers/
│   │   └── BooksController.cs       # CRUD endpoints for books
│   ├── Models/
│   │   └── Book.cs                  # Book model
│   ├── Program.cs                   # App startup, CORS, Swagger config
│   ├── LowesBooksAPI.csproj         # .NET project file
│   ├── LowesBooksAPI.http           # HTTP request samples
│   ├── appsettings.json
│   └── appsettings.Development.json
└── WebApp/                          # Frontend - React + TypeScript + Vite
    ├── src/
    │   ├── api/
    │   │   └── booksApi.ts          # API client for all book endpoints
    │   ├── components/
    │   │   ├── BookCard.tsx          # Book row display component
    │   │   └── BookForm.tsx          # Add/edit book form
    │   ├── types/
    │   │   └── Book.ts              # Book type definition
    │   ├── App.tsx                   # Main app component
    │   ├── main.tsx                  # Entry point
    │   └── index.css                # Styles
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    └── package.json
```

## Getting Started

### Backend

```bash
dotnet run --project LowesBooksAPI
```

Runs on `http://localhost:5118`. Swagger UI available at `http://localhost:5118/swagger`.

### Swagger

The API includes Swagger/OpenAPI documentation for interactive testing:

- Swagger UI: `http://localhost:5118/swagger`
- OpenAPI JSON: `http://localhost:5118/swagger/v1/swagger.json`

Swagger is enabled in development mode only.

### Frontend

```bash
cd WebApp
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint                        | Description     |
|--------|---------------------------------|-----------------|
| GET    | `/api/Books/getBooks`           | List all books  |
| GET    | `/api/Books/getBookById/{id}`   | Get book by ID  |
| POST   | `/api/Books/addBook`            | Add a book      |
| PUT    | `/api/Books/updateBook/{id}`    | Update a book   |
| DELETE | `/api/Books/deleteBook/{id}`    | Delete a book   |
