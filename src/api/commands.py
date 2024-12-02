def setup_commands(app):
    @app.cli.command("create_db")
    def create_db():
        db.create_all()
        print("Base de datos creada")
