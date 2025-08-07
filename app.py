from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, HTMLResponse

app  = FastAPI()
templates = Jinja2Templates(directory="templates")

async def home(request: Request, name: str = Form(None), email: str = Form(None), password: str = Form(None)):
    print(name, email, password)
    return templates.TemplateResponse('home.html', {"request": request, "username": name})

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