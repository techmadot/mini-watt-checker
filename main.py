from microdot_asyncio import Microdot, Response, send_file
from microdot_utemplate import render_template
from microdot_asyncio_websocket import with_websocket
from ldr_photoresistor_module import LDR
from ble_plugmini import SwitchBotPlugMini
import time

# 監視対象のスマートプラグミニのアドレス
smartPlugMini = 'aa:bb:cc:dd:ee:ff' # この形式で設定してください

# Initialize MicroDot
app = Microdot()
Response.default_content_type = 'text/html'

plugmini = SwitchBotPlugMini(targetAddr=smartPlugMini)

# root route
@app.route('/')
async def index(request):
    return render_template('index.html')


@app.route('/ws')
@with_websocket
async def read_sensor(request, ws):
    while True:
        time.sleep(1.0)
        plugmini.scan(1000)
        await ws.send(str(plugmini.currentPower()))

# Static CSS/JSS
@app.route("/static/<path:path>")
def static(request, path):
    if ".." in path:
        # directory traversal is not allowed
        return "Not found", 404
    return send_file("static/" + path)


# shutdown
@app.get('/shutdown')
def shutdown(request):
    request.app.shutdown()
    return 'The server is shutting down...'


if __name__ == "__main__":
    try:
        app.run(port=80)
    except KeyboardInterrupt:
        pass
