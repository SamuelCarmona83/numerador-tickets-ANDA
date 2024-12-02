import os
import folium
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)


setup_admin(app)
setup_commands(app)


app.register_blueprint(api, url_prefix='/api')


sucursales = [
    {"nombre": "Casa Central", "lat": -34.89968, "lon": -56.17428}, 
    {"nombre": "Alquileres", "lat": -34.89824, "lon": -56.16731}, 
    {"nombre": "Centro", "lat": -34.90576, "lon": -56.18929},
    {"nombre": "Artigas", "lat": -30.40306, "lon": -56.46803}, 
    {"nombre": "Canelones", "lat": -34.52403, "lon": -56.28228}, 
    {"nombre": "Melo", "lat": -32.36953, "lon": -54.16886}, 
    {"nombre": "Colonia", "lat": -34.47040, "lon": -57.84339}, 
    {"nombre": "Durazno", "lat": -33.38090, "lon": -56.52351},  
    {"nombre": "Flores", "lat": -33.51632, "lon": -56.89747}, 
    {"nombre": "Florida", "lat": -34.09782, "lon": -56.21644}, 
    {"nombre": "Lavalleja", "lat": -34.37715, "lon": -55.23766}, 
    {"nombre": "Piriapolis", "lat": -34.86177, "lon": -55.27035},  
    {"nombre": "Paysandu", "lat": -32.31648, "lon": -58.08621}, 
    {"nombre": "Rivera", "lat": -30.90027, "lon": -55.54019}, 
    {"nombre": "Rocha", "lat": -34.48026, "lon": -54.33647}, 
    {"nombre": "Salto", "lat": -31.38738, "lon": -57.96516},
    {"nombre": "San Jose", "lat": -34.33967, "lon": -56.71167}, 
    {"nombre": "Tacuarembo", "lat": -31.71386, "lon": -55.98190},
    {"nombre": "Treinta y Tres", "lat": -33.23303, "lon": -54.38667},
]


@app.route('/mapa_sucursales')
def mapa_sucursales():
   
    mapa = folium.Map(location=[19.432608, -99.133209], zoom_start=5)

 
    for sucursal in sucursales:
        folium.Marker(
            location=[sucursal["lat"], sucursal["lon"]],
            popup=sucursal["nombre"],
            icon=folium.Icon(color="blue", icon="info-sign")
        ).add_to(mapa)

    mapa_path = os.path.join(static_file_dir, 'mapa_sucursales.html')
    mapa.save(mapa_path)

    
    return send_from_directory(static_file_dir, 'mapa_sucursales.html')


@app.errorhandler(Exception)
def handle_error(error):
    return jsonify({"message": str(error)}), 500


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  
    return response


@app.route('/')
def index():
    return send_from_directory(static_file_dir, 'index.html')


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
