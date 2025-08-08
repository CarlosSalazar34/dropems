from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, HTMLResponse
from starlette.middleware.sessions import SessionMiddleware
from pydantic import BaseModel

class Note(BaseModel):
    note: str
    description: str



app  = FastAPI()
app.add_middleware(SessionMiddleware, secret_key = 'secreto')
templates = Jinja2Templates(directory="templates")

# MANEJO DE RUTAS

@app.post("/publish-note")
async def publish_note(note: Note):
    print(note.note)
    print(note.description)
    return {"message": "true"}


# MANEJO DE TEMPLATES

async def home(request: Request, name: str = Form(None), email: str = Form(None), password: str = Form(None)):
    print(name, email, password)

    request.session['username'] = name

    username = request.session['username']

    return templates.TemplateResponse('home.html', {"request": request, "username": username})

async def index(request: Request):
    if request.method == "POST":
        return RedirectResponse(url="/home")

    return templates.TemplateResponse('index.html', {"request": request})

app.mount("/static", StaticFiles(directory="static"), "static")
app.add_api_route('/', index, methods=["GET", "POST"])
app.add_api_route("/home", home, methods=["GET", "POST"], response_class=HTMLResponse)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
